import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { ConfirmationPageComponent } from './components/confirmation-page/confirmation-page.component';
import { SecurityRoutingModule } from './security-routing.module';
import { RegisterSuccessfulPageComponent } from './components/register-successful-page/register-successful-page.component';

@NgModule({
  declarations: [
    RegisterPageComponent,
    LoginPageComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ConfirmationPageComponent,
    RegisterSuccessfulPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SecurityRoutingModule,
  ]
})
export class SecurityModule { }
