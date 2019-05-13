import {Component, OnDestroy, OnInit} from '@angular/core';
import {Complaint} from '../../../../core/data/model/complaint.model';
import {Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalConfirmationReset} from '../../../../core/data/actions';
import {ComplaintDeleteReset, ComplaintListLoadStart, ComplaintListReset} from '../../../data/complaint.actions';
import {IssueListLoadStart} from '../../../data/issue.actions';

@Component({
  selector: 'app-complaint-list-page',
  templateUrl: './complaint-list-page.component.html',
  styleUrls: ['./complaint-list-page.component.css']
})
export class ComplaintListPageComponent implements OnInit, OnDestroy {

  list: Array<Complaint> = [];
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

  ngOnInit() {

    this.store.dispatch(new ComplaintListReset());
    this.store.dispatch(new ComplaintDeleteReset());
    this.store.dispatch(new GlobalConfirmationReset());

    this.listSubscription = this.store.pipe(select(state => state.adminComplaint)).subscribe(
        ({ list, listTotal }) => {
          this.list = list;
          this.total = listTotal;
        }
    );

    this.queryParamSubscription = this.route.queryParams.subscribe((params) => {

      this.currentPage = (!!params.page && params.page > 0) ? params.page : 1;

      this.store.dispatch(new ComplaintListLoadStart(this.currentPage, this.searchParams));

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
      this.router.navigateByUrl('/admin/complaint/list');
    }
    else
    {
      this.store.dispatch(new ComplaintListLoadStart(this.currentPage, this.searchParams));
    }
  }

  onSearchFilterChangeHandler({ period, region, serviceType })
  {
    if (period !== null)
    {
      this.searchParams.startDate = period.startDate.toUTCString();
      this.searchParams.endDate = period.endDate.toUTCString();
    }
    else
    {
      delete this.searchParams.startDate;
      delete this.searchParams.endDate;
    }

    this.searchParams.region = !!region ? region.id : null;

    this.searchParams.serviceType = !!serviceType ? serviceType.id : null;

    this.resetList();
  }

}
