import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {AccountService} from '../../../../services/account.service';
import User from '../../../../../core/data/model/user.model';
import {Store} from '@ngrx/store';
import {State} from '../../../../../app.state';
import {GlobalNotifyErrorMessage} from '../../../../../core/data/actions';
import {NotifyMessage} from '../../../../../core/data/model/notify-message.model';

@Component({
  selector: 'app-account-active-switcher',
  templateUrl: './account-active-switcher.component.html',
  styleUrls: ['./account-active-switcher.component.css']
})
export class AccountActiveSwitcherComponent implements OnInit {

  @Input() account: User;

  isLoading: boolean = false;

  constructor(private service: AccountService, private store: Store<State>, private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {

  }

  onClickHandler(event)
  {
    if (this.isLoading)
    {
      return;
    }

    this.isLoading = true;

    const account = {...this.account};
    account.isActive = !this.account.isActive;

    this.service.changeActive(<User>account)
        .toPromise()
        .then((account) => {
          this.account = account;
          this.isLoading = false;

          this.changeDetector.markForCheck();
        })
        .catch((error) => {

          this.store.dispatch(new GlobalNotifyErrorMessage(new NotifyMessage(
              'Cannot to change active status of account "' + this.account.fullName
          )));

          this.isLoading = false;

          this.changeDetector.markForCheck();
        });
  }

}
