import {Component, OnDestroy, OnInit} from '@angular/core';
import {CompanyRepresentativeUser} from '../../../../../core/data/model/company-representative-user.model';
import {Observable, Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../../app.state';
import {AccountCreateReset, AccountCreateStart} from '../../../../data/account.actions';
import {filter} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-company-representative-create-account-page',
  templateUrl: './company-representative-create-account-page.component.html',
  styleUrls: ['./company-representative-create-account-page.component.css']
})
export class CompanyRepresentativeCreateAccountPageComponent implements OnInit, OnDestroy {

  account: CompanyRepresentativeUser = new CompanyRepresentativeUser();
  errors: Observable<Object>;

  createdSubscription: Subscription;

  constructor(
      private store: Store<State>,
      private router: Router
  ) { }

  ngOnInit() {

    this.store.dispatch(new AccountCreateReset());


    this.createdSubscription = this.store.pipe(
        select(state => state.adminAccount.created),
        filter(result => !!result)
    ).subscribe((account: CompanyRepresentativeUser) => {

      this.router.navigateByUrl('/admin/account/company-representative/list');
    });

    this.errors = this.store.pipe(select(state => state.adminAccount.createErrors));

  }

  ngOnDestroy(): void {
    this.createdSubscription.unsubscribe();
  }

  onSubmitFormHandler({ account, password, passwordRepeat })
  {
    this.store.dispatch(new AccountCreateStart(account, password, passwordRepeat));
  }

}
