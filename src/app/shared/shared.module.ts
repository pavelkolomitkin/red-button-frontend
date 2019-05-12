import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FormFieldErrorListComponent} from '../core/components/form-field-error-list/form-field-error-list.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MomentModule } from 'ngx-moment';
import {MapComponent} from './components/map/map.component';
import { MapBalloonComponent } from './components/map-balloon/map-balloon.component';
import { UploadItemComponent } from './components/upload-item/upload-item.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PreventEnterSubmitFormDirective} from './directives/prevent-enter-submit-form.directive';
import {PageHeaderDirective} from './directives/page-header.directive';
import {LightboxModule} from 'ngx-lightbox';
import { VideoFrameComponent } from './components/video-frame/video-frame.component';
import {NotFoundPageComponent} from './components/not-found-page/not-found-page.component';
import { DateRangePickerComponent } from './components/date-range-picker/date-range-picker.component';
import { MultiLinePipe } from './pipes/multi-line.pipe';


@NgModule({
  declarations: [
    FormFieldErrorListComponent,
    MapComponent,
    MapBalloonComponent,
    UploadItemComponent,
    PreventEnterSubmitFormDirective,
    PageHeaderDirective,
    VideoFrameComponent,
      NotFoundPageComponent,
      DateRangePickerComponent,
      MultiLinePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    InfiniteScrollModule,
    MomentModule,
    NgbModule,
      LightboxModule

  ],
    exports: [
        FormsModule,
        InfiniteScrollModule,
        MomentModule,
        NgbModule,
        FormFieldErrorListComponent,
        MapComponent,
        MapBalloonComponent,
        UploadItemComponent,
        PreventEnterSubmitFormDirective,
        PageHeaderDirective,
        LightboxModule,
        VideoFrameComponent,
        NotFoundPageComponent,
        DateRangePickerComponent,
        MultiLinePipe
    ],
  entryComponents: [MapComponent]
})
export class SharedModule { }
