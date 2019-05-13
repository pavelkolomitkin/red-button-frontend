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
import {PictureListComponent} from './components/picture/picture-list/picture-list.component';
import {PictureItemComponent} from './components/picture/picture-item/picture-item.component';
import {VideoListComponent} from './components/video/video-list/video-list.component';
import {VideoItemComponent} from './components/video/video-item/video-item.component';

import { IssueCommentListComponent } from './components/issue-comment-list/issue-comment-list.component';
import { IssueCommentItemComponent } from './components/issue-comment-list/issue-comment-item/issue-comment-item.component';
import { IssueCommentFormComponent } from './components/issue-comment-list/issue-comment-form/issue-comment-form.component';
import {NgxPermissionsModule} from 'ngx-permissions';


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
      MultiLinePipe,
      PictureListComponent,
      PictureItemComponent,
      VideoListComponent,
      VideoItemComponent,
      IssueCommentListComponent,
      IssueCommentItemComponent,
      IssueCommentFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InfiniteScrollModule,
    MomentModule,
    NgbModule,
      LightboxModule,
      NgxPermissionsModule.forChild()

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
        MultiLinePipe,
        PictureListComponent,
        PictureItemComponent,
        VideoListComponent,
        VideoItemComponent,
        IssueCommentListComponent,
        IssueCommentItemComponent,
        IssueCommentFormComponent
    ],
  entryComponents: [MapComponent]
})
export class SharedModule { }
