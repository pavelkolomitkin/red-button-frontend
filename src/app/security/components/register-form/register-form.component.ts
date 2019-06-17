import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import RegisterData from "../../data/model/register-data.model";
import {Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {GlobalUserAgreementVisibility} from '../../../core/data/actions';
declare var $: any;

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  static DEFAULT_PHONE_COUNTRY_CODE = '+7';

  phoneNumber: string = '';

  @Input() validationErrors:any = {
    plainPassword: {}
  };

  @Output('onSubmit') onSubmitEvent: EventEmitter<RegisterData> = new EventEmitter();

  constructor(private store: Store<State>) { }

  ngOnInit() {

    $('form [name="phoneNumber"]').inputmask({
      mask: '(999) 999-9999',
      autoUnmask: true,
      oncomplete: this.onPhoneNumberChange
    })
  }

  onPhoneNumberChange = (event) => {
    this.phoneNumber = RegisterFormComponent.DEFAULT_PHONE_COUNTRY_CODE + event.currentTarget.value;
  }

  onSubmit(form:NgForm)
  {
    const { email, fullName, password, passwordRepeat } = form.value;

    const data: RegisterData = {
      email: email,
      fullName: fullName,
      phoneNumber: this.phoneNumber,
      plainPassword: {
        password: password,
        passwordRepeat: passwordRepeat
      }
    };

    this.onSubmitEvent.emit(data);
  }

  onAgreementClickHandler(event)
  {
    this.store.dispatch(new GlobalUserAgreementVisibility(true));
  }
}
