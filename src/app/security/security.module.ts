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
import { PasswordRecoveryRequestPageComponent } from './components/password-recovery-request-page/password-recovery-request-page.component';
import { PasswordResetPageComponent } from './components/password-reset-page/password-reset-page.component';
import { CommonHeaderComponent } from './components/common-header/common-header.component';

@NgModule({
  declarations: [
    RegisterPageComponent,
    LoginPageComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ConfirmationPageComponent,
    RegisterSuccessfulPageComponent,
    PasswordRecoveryRequestPageComponent,
    PasswordResetPageComponent,
    CommonHeaderComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        SecurityRoutingModule
    ]
})
export class SecurityModule { }
