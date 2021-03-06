import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {IssueGetReset, IssueGetStart} from '../../../data/issue.actions';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {Issue} from '../../../../core/data/model/issue.model';
import {GlobalPageTitle} from '../../../../core/data/actions';

@Component({
  selector: 'app-issue-details-page',
  templateUrl: './issue-details-page.component.html',
  styleUrls: ['./issue-details-page.component.css']
})
export class IssueDetailsPageComponent implements OnInit, OnDestroy {

  issue: Issue;

  idSubscription: Subscription;

  constructor(
      private store: Store<State>,
      private router: Router,
      private route: ActivatedRoute
      ) { }

  ngOnInit() {

    this.store.dispatch(new IssueGetReset());

    this.store.pipe(
        select(state => state.companyIssue.details),
        filter(result => !!result)
    ).subscribe((issue: Issue) => {
      this.issue = issue;

      this.store.dispatch(new GlobalPageTitle('ISSUE', this.issue.client.fullName));
    });

    this.store.pipe(
        select(state => state.companyIssue.detailsErrors),
        filter(result => Object.keys(result).length > 0)
    ).subscribe(() => {
      this.router.navigateByUrl('/company/404');
    });

    this.idSubscription =  this.route.params.subscribe((params) => {

      this.store.dispatch(new IssueGetStart(+params['id']));

    });

  }

  ngOnDestroy(): void {

    this.idSubscription.unsubscribe();

  }

}
