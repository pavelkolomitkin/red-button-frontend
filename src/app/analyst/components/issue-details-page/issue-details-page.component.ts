import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {IssueService} from '../../services/issue.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Issue} from '../../../core/data/model/issue.model';
import {Subscription} from 'rxjs';
import {GlobalPageTitle} from '../../../core/data/actions';

@Component({
  selector: 'app-issue-details-page',
  templateUrl: './issue-details-page.component.html',
  styleUrls: ['./issue-details-page.component.css']
})
export class IssueDetailsPageComponent implements OnInit, OnDestroy {

  issue: Issue;

  paramsSubscription: Subscription;

  constructor(
      private store: Store<State>,
      private service: IssueService,
      private router: Router,
      private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.store.dispatch(new GlobalPageTitle(''));

    this.paramsSubscription = this.route.params.subscribe(async (params) => {

      const issue = this.service.get(+params['id']).toPromise();

      try
      {
        this.issue = await issue;
      }
      catch (e)
      {
        this.router.navigateByUrl('/analytics/404');
      }

      this.store.dispatch(new GlobalPageTitle('Issue', '#' + this.issue.id));

    });

  }

  ngOnDestroy(): void {

    this.paramsSubscription.unsubscribe();

  }
}
