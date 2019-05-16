import {Component, OnDestroy, OnInit} from '@angular/core';
import {Issue} from '../../../../core/data/model/issue.model';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {ActivatedRoute, Router} from '@angular/router';
import {IssueListLoadStart, IssueListReset} from '../../../data/issue.actions';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-issue-list-page',
  templateUrl: './issue-list-page.component.html',
  styleUrls: ['./issue-list-page.component.css']
})
export class IssueListPageComponent implements OnInit, OnDestroy {

  list: Array<Issue> = [];
  total: number = null;

  listSubscription: Subscription;
  queryParamSubscription: Subscription;
  currentPage: number;

  searchParams: any = {};

  constructor(
      private store: Store<State>,
      private router: Router,
      private route: ActivatedRoute
  ) { }

  ngOnInit()
  {
    this.store.dispatch(new IssueListReset());

    this.listSubscription = this.store.pipe(select(state => state.companyIssue)).subscribe(
        ({ list, total }) => {
          this.list = list;
          this.total = total;
        }
    );

    this.queryParamSubscription = this.route.queryParams.subscribe((params) => {

      this.currentPage = (!!params.page && params.page > 0) ? params.page : 1;

      this.store.dispatch(new IssueListLoadStart(this.currentPage, this.searchParams));

    });
  }

  ngOnDestroy()
  {
    this.listSubscription.unsubscribe();
    this.queryParamSubscription.unsubscribe();
  }

  resetList()
  {
    if (this.currentPage !== 1)
    {
      this.router.navigateByUrl('/company/issue/list');
    }
    else
    {
      this.store.dispatch(new IssueListLoadStart(this.currentPage, this.searchParams));
    }
  }

}
