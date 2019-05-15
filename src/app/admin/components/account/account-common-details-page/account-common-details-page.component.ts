import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {ActivatedRoute, Router} from '@angular/router';
import User from '../../../../core/data/model/user.model';
import {AccountGetReset, AccountGetStart} from '../../../data/account.actions';
import {Observable, Subscription} from 'rxjs';
import {filter, take} from 'rxjs/operators';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {GlobalNotifySuccessMessage} from '../../../../core/data/actions';
import {NotifyMessage} from '../../../../core/data/model/notify-message.model';

@Component({
  selector: 'app-account-common-details-page',
  templateUrl: './account-common-details-page.component.html',
  styleUrls: ['./account-common-details-page.component.css']
})
export class AccountCommonDetailsPageComponent implements OnInit, OnDestroy {

  account: Observable<User>;

  idSubscription: Subscription;

  @ViewChild('resetPasswordWindow') resetPasswordWindowTemplate: TemplateRef<any>;
  resetPasswordWindow: NgbModalRef = null;



  constructor(
      private store: Store<State>,
      private router: Router,
      private route: ActivatedRoute,
      private modal: NgbModal
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
    this.resetPasswordWindow = this.modal.open(this.resetPasswordWindowTemplate, {centered: true});
    this.resetPasswordWindow.result
        .then((result) => {
          this.resetPasswordWindow = null;
        }, () => {
          this.resetPasswordWindow = null;
        });
  }

  onPasswordResetHandler(account: User)
  {
    this.resetPasswordWindow.close();

    this.store.dispatch(new GlobalNotifySuccessMessage(new NotifyMessage('The account password has been reset!')));
  }
}
