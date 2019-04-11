import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import RegisterData from "../data/model/register-data.model";
declare var $: any;

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  @Input() validationErrors:{} = {
    plainPassword: {}
  };

  @Output('onSubmit') onSubmitEvent: EventEmitter<RegisterData> = new EventEmitter();

  constructor() { }

  ngOnInit() {

    $('[data-mask]').inputmask();
  }

  onSubmit(form:NgForm)
  {
    const { email, fullName, phoneNumber, password, passwordRepeat } = form.value;

    const data: RegisterData = {
      email: email,
      fullName: fullName,
      phoneNumber: phoneNumber,
      plainPassword: {
        password: password,
        passwordRepeat: passwordRepeat
      }
    };

    this.onSubmitEvent.emit(data);
  }
}
