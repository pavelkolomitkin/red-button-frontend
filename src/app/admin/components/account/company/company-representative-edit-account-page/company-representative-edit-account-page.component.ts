import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../../app.state';
import {ActivatedRoute, Router} from '@angular/router';
import {CompanyRepresentativeUser} from '../../../../../core/data/model/company-representative-user.model';
import {Observable, Subscription} from 'rxjs';
import {AccountGetReset, AccountGetStart, AccountUpdateReset, AccountUpdateStart} from '../../../../data/account.actions';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-company-representative-edit-account-page',
  templateUrl: './company-representative-edit-account-page.component.html',
  styleUrls: ['./company-representative-edit-account-page.component.css']
})
export class CompanyRepresentativeEditAccountPageComponent implements OnInit, OnDestroy {

  account: CompanyRepresentativeUser;
  errors: Observable<Object>;

  detailsSubscription: Subscription;
  detailsErrorSubscription: Subscription;
  updateSubscription: Subscription;
  paramsSubscription: Subscription;

  constructor(
      private store: Store<State>,
      private router: Router,
      private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.store.dispatch(new AccountUpdateReset());
    this.store.dispatch(new AccountGetReset());

    this.detailsSubscription = this.store.pipe(
        select(state => state.adminAccount.details),
        filter(result => !!result)
    ).subscribe((account: CompanyRepresentativeUser) => {

      this.account = account;

    });

    this.detailsErrorSubscription = this.store.pipe(
        select(state => state.adminAccount.detailsErrors),
        filter(result => !!result),
        filter(result => Object.keys(result).length > 0)
    ).subscribe(() => {
      this.router.navigateByUrl('/admin/404');
    });


    this.errors = this.store.pipe(select(state => state.adminAccount.updateErrors));

    this.updateSubscription = this.store.pipe(
        select(state => state.adminAccount.updated),
        filter(result => !!result)
    ).subscribe((account: CompanyRepresentativeUser) => {
      this.router.navigateByUrl('/admin/account/company-representative/list');
    });

    this.paramsSubscription = this.route.params.subscribe((params) => {
      this.store.dispatch(new AccountGetStart(+params['id']));
    });
  }

  ngOnDestroy(): void
  {
    this.detailsSubscription.unsubscribe();
    this.detailsErrorSubscription.unsubscribe();
    this.updateSubscription.unsubscribe();
    this.paramsSubscription.unsubscribe();
  }

  onSubmitFormHandler({ account })
  {
    this.store.dispatch(new AccountUpdateStart(account));
  }

}
