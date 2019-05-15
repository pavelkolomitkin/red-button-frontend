import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import User from '../../../../../core/data/model/user.model';

@Component({
  selector: 'app-analyst-account-form',
  templateUrl: './analyst-account-form.component.html',
  styleUrls: ['./analyst-account-form.component.css']
})
export class AnalystAccountFormComponent implements OnInit {

  @Output('onSubmit') submitEvent: EventEmitter<{account: User, password: string, passwordRepeat: string}> = new EventEmitter();

  @Input() account: User;

  @Input() errors = {};

  constructor() { }

  ngOnInit() {
  }

  onSubmitHandler({ account, password, passwordRepeat })
  {
    this.submitEvent.emit({
      account: this.account,
      password: password,
      passwordRepeat: passwordRepeat
    });
  }

}
