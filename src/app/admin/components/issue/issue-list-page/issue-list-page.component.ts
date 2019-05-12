import {AfterContentInit, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Issue} from '../../../../core/data/model/issue.model';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {IssueDeleteReset, IssueListLoadStart, IssueListReset} from '../../../data/issue.actions';
import {GlobalConfirmationReset} from '../../../../core/data/actions';
import {DatePeriod} from '../../../../shared/data/model/date-period.model';

@Component({
  selector: 'app-issue-list-page',
  templateUrl: './issue-list-page.component.html',
  styleUrls: ['./issue-list-page.component.css']
})
export class IssueListPageComponent implements OnInit, OnDestroy {


  @ViewChild('datePeriodFilter') datePeriodFilter: ElementRef;

  list: Array<Issue> = null;
  total: number = null;

  listSubscription: Subscription;
  queryParamSubscription: Subscription;
  currentPage: number;

  searchParams: any = {};

  constructor(
      private store: Store<State>,
      private router: Router,
      private route: ActivatedRoute
  ) {

  }

  ngOnInit() {

    this.store.dispatch(new IssueListReset());
    this.store.dispatch(new IssueDeleteReset());
    this.store.dispatch(new GlobalConfirmationReset());

    this.listSubscription = this.store.pipe(select(state => state.adminIssue)).subscribe(
        ({ list, listTotal }) => {
          this.list = list;
          this.total = listTotal;
        }
    );

    this.queryParamSubscription = this.route.queryParams.subscribe((params) => {

      this.currentPage = (!!params.page && params.page > 0) ? params.page : 1;

      this.store.dispatch(new IssueListLoadStart(this.currentPage));
    });
  }

  ngOnDestroy(): void {
    this.listSubscription.unsubscribe();
    this.queryParamSubscription.unsubscribe();
  }

  resetList()
  {
    if (this.currentPage !== 1)
    {
      this.router.navigateByUrl('/admin/issue/list');
    }
    else
    {
      this.currentPage = 1;
      this.store.dispatch(new IssueListLoadStart(this.currentPage, this.searchParams));
    }
  }

  onDeleteIssueHandler(issue: Issue)
  {
    this.resetList();
  }

  onDatePeriodChangeHandler(period: DatePeriod)
  {
    if (period !== null)
    {
      this.searchParams.startDate = period.startDate.toDateString();
      this.searchParams.endDate = period.endDate.toDateString();
    }
    else
    {
      delete this.searchParams.startDate;
      delete this.searchParams.endDate;
    }

    this.resetList();
  }

}
