import {Component, OnDestroy, OnInit} from '@angular/core';
import User from '../../../../../core/data/model/user.model';
import {Observable, Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../../app.state';
import {Router} from '@angular/router';
import {AccountCreateReset, AccountCreateStart} from '../../../../data/account.actions';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-analyst-account-create-page',
  templateUrl: './analyst-account-create-page.component.html',
  styleUrls: ['./analyst-account-create-page.component.css']
})
export class AnalystAccountCreatePageComponent implements OnInit, OnDestroy {

  account: User = new User();

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
    ).subscribe((account: User) => {

      this.router.navigateByUrl('/admin/account/' + account.id);
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
