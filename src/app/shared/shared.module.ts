import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FormFieldErrorListComponent} from '../core/components/form-field-error-list/form-field-error-list.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MomentModule } from 'ngx-moment';
import {MapComponent} from './components/map/map.component';
import { MapBalloonComponent } from './components/map-balloon/map-balloon.component';
import { UploadItemComponent } from './components/upload-item/upload-item.component';

@NgModule({
  declarations: [
    FormFieldErrorListComponent,
    MapComponent,
    MapBalloonComponent,
    UploadItemComponent
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
        MapComponent,
        MapBalloonComponent,
        UploadItemComponent
    ],
  entryComponents: [MapComponent]
})
export class SharedModule { }
