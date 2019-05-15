import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import User from '../../../../core/data/model/user.model';
import {AccountService} from '../../../services/account.service';

@Component({
  selector: 'app-account-reset-password',
  templateUrl: './account-reset-password.component.html',
  styleUrls: ['./account-reset-password.component.css']
})
export class AccountResetPasswordComponent implements OnInit {

  @Output('onPasswordReset') passwordResetEvent: EventEmitter<User> = new EventEmitter();

  @Input() account: User;

  errors = {};

  isLoading: boolean = false;

  constructor(private service: AccountService) { }

  ngOnInit() {

  }

  onSubmitHandler(form: NgForm)
  {
    const { password, passwordRepeat } = form.value;

    this.isLoading = true;

    this.service.resetAccountPassword(this.account, password, passwordRepeat)
        .toPromise()
        .then((account) => {

          this.account = account;

          this.isLoading = false;

          this.passwordResetEvent.emit(this.account);

        })
        .catch((errors) => {

          this.errors = errors.error.errors;

          this.isLoading = false;

        });
  }

}
