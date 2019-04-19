import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FormFieldErrorListComponent} from '../core/components/form-field-error-list/form-field-error-list.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MomentModule } from 'ngx-moment';
import {MapComponent} from './components/map/map.component';

@NgModule({
  declarations: [
    FormFieldErrorListComponent,
    MapComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    InfiniteScrollModule,
    MomentModule
  ],
  exports: [
    FormsModule,
    InfiniteScrollModule,
    MomentModule,
    FormFieldErrorListComponent,
    MapComponent
  ],
  entryComponents: [MapComponent]
})
export class SharedModule { }
