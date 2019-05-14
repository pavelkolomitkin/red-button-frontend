import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import User from '../../../../core/data/model/user.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-account-common-form',
  templateUrl: './account-common-form.component.html',
  styleUrls: ['./account-common-form.component.css']
})
export class AccountCommonFormComponent implements OnInit {

  @Output('onSubmit') submitEvent: EventEmitter<{ account: User, password: string, passwordRepeat: string }> = new EventEmitter();

  @Input() account: User;
  @Input() errors = {};

  @Input('additionValidation') additionValidation: Function;

  constructor() { }

  ngOnInit() {
  }

  onSubmitHandler(form: NgForm)
  {
    const { password, passwordRepeat } = form.value;

    this.submitEvent.emit({
      account: this.account,
      password,
      passwordRepeat
    });
  }

}
