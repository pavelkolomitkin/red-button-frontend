import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {ActivatedRoute, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {Issue} from '../../../../core/data/model/issue.model';
import {IssueGetReset, IssueGetStart} from '../../../data/issue.actions';
import {Subscription} from 'rxjs';
import {GlobalPageTitle} from '../../../../core/data/actions';

@Component({
  selector: 'app-issue-details-page',
  templateUrl: './issue-details-page.component.html',
  styleUrls: ['./issue-details-page.component.css']
})
export class IssueDetailsPageComponent implements OnInit, OnDestroy {

  issue: Issue;

  detailsSubscription: Subscription;
  idSubscription: Subscription;
  detailsErrorSubscription: Subscription;

  constructor(
      private store: Store<State>,
      private router: Router,
      private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.store.dispatch(new IssueGetReset());

    this.detailsSubscription = this.store.pipe(
        select(state => state.adminIssue.details),
        filter(result => !!result)
    ).subscribe((issue: Issue) => {
      
      this.issue = issue;

      this.store.dispatch(new GlobalPageTitle('Issue', '#' + this.issue.id.toString()));

    });

    this.detailsErrorSubscription = this.store.pipe(
        select(state => state.adminIssue.detailsErrors),
        filter(result => !!result),
        filter(result => Object.keys(result).length > 0)
    ).subscribe((result) => {
      this.router.navigateByUrl('/admin/404');
    });


    this.idSubscription = this.route.params.subscribe((params) => {

      this.store.dispatch(new IssueGetStart(+params['id']));

    });




  }

  ngOnDestroy(): void {

    this.detailsSubscription.unsubscribe();
    this.idSubscription.unsubscribe();
    this.detailsErrorSubscription.unsubscribe();

  }

  onDeleteClickHandler(event)
  {

  }

}
