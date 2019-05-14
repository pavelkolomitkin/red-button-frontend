import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {ActivatedRoute, Router} from '@angular/router';
import User from '../../../../core/data/model/user.model';
import {AccountGetReset, AccountGetStart} from '../../../data/account.actions';
import {Observable, Subscription} from 'rxjs';
import {filter, take} from 'rxjs/operators';

@Component({
  selector: 'app-account-common-details-page',
  templateUrl: './account-common-details-page.component.html',
  styleUrls: ['./account-common-details-page.component.css']
})
export class AccountCommonDetailsPageComponent implements OnInit, OnDestroy {

  account: Observable<User>;

  idSubscription: Subscription;



  constructor(
      private store: Store<State>,
      private router: Router,
      private route: ActivatedRoute
      ) { }

  ngOnInit() {

    this.store.dispatch(new AccountGetReset());

    this.account = this.store.pipe(select(state => state.adminAccount.details), filter(result => !!result));

    this.store.pipe(
        select(state => state.adminAccount.detailsErrors),
        filter(result => Object.keys(result).length > 0),
        take(1)
        ).subscribe(() => {
          this.router.navigateByUrl('/admin/404');
    });

    this.idSubscription = this.route.params.subscribe((params) => {

      this.store.dispatch(new AccountGetStart(+params['id']));

    });
  }

  ngOnDestroy(): void {

    this.idSubscription.unsubscribe();

  }

  onResetPasswordClickHandler(event)
  {

  }
}
