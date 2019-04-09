import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FormFieldErrorListComponent} from '../core/form-field-error-list/form-field-error-list.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MomentModule } from 'ngx-moment';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    FormFieldErrorListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InfiniteScrollModule,
    NgbModule,
    MomentModule
  ],
  exports: [
    FormsModule,
    FormFieldErrorListComponent,
    InfiniteScrollModule,
    MomentModule,
    NgbModule
  ]
})
export class SharedModule { }
