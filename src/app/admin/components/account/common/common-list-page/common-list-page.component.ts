import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../../app.state';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import User from '../../../../../core/data/model/user.model';
import {AccountGetListReset, AccountGetListStart} from '../../../../data/account.actions';
import {GlobalConfirmationReset} from '../../../../../core/data/actions';

@Component({
  selector: 'app-common-list-page',
  templateUrl: './common-list-page.component.html',
  styleUrls: ['./common-list-page.component.css']
})
export class CommonListPageComponent implements OnInit, OnDestroy {

  list: Array<User> = null;
  total: number = null;
  currentPage: number;
  searchParams: any = {};

  listSubscription: Subscription;
  queryParamSubscription: Subscription;

  constructor(
      private store: Store<State>,
      private router: Router,
      private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.store.dispatch(new AccountGetListReset());
    this.store.dispatch(new GlobalConfirmationReset());

    this.listSubscription = this.store.pipe(select(state => state.adminAccount)).subscribe(
        ({ list, listTotal }) => {
          this.list = list;
          this.total = listTotal;
        }
    );

    this.queryParamSubscription = this.route.queryParams.subscribe((params) => {

      this.currentPage = (!!params.page && params.page > 0) ? params.page : 1;

      this.searchParams = this.getSearchParams();

      this.store.dispatch(new AccountGetListStart(this.searchParams, this.currentPage));
    });

  }

  getSearchParams() {
    return {};
  }

  ngOnDestroy(): void {
    this.listSubscription.unsubscribe();
    this.queryParamSubscription.unsubscribe();
  }

}
