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

import { IssueCommentListComponent } from './components/issue/issue-comment-list/issue-comment-list.component';
import { IssueCommentItemComponent } from './components/issue/issue-comment-list/issue-comment-item/issue-comment-item.component';
import { IssueCommentFormComponent } from './components/issue/issue-comment-list/issue-comment-form/issue-comment-form.component';
import {NgxPermissionsModule} from 'ngx-permissions';
import {IssueMapViewComponent} from './components/issue/issue-map-view/issue-map-view.component';
import {IssueViewBalloonComponent} from './components/issue/issue-map-view/issue-view-balloon/issue-view-balloon.component';
import {ComplaintConfirmationViewBalloonComponent} from './components/issue/issue-map-view/complaint-confirmation-view-balloon/complaint-confirmation-view-balloon.component';
import {RouterModule} from '@angular/router';
import {ComplaintMapViewComponent} from './components/complaint-map-view/complaint-map-view.component';
import {ComplaintDetailsBalloonComponent} from './components/complaint-map-view/complaint-details-balloon/complaint-details-balloon.component';
import {CompanySearchFormComponent} from './components/company-search-form/company-search-form.component';
import { CompanySearchFieldComponent } from './components/company-search-form/company-search-field/company-search-field.component';
import {PaginatorComponent} from './components/paginator/paginator.component';
import {IssueSignatureProgressComponent} from './components/issue/issue-signature-progress/issue-signature-progress.component';
import {SignatureListComponent} from './components/issue/signature-list/signature-list.component';
import {SignatureItemComponent} from './components/issue/signature-list/signature-item/signature-item.component';
import { CommonChartComponent } from './components/chart/common-chart/common-chart.component';
import { DateTimeViewComponent } from './components/date-time-view/date-time-view.component';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {environment} from '../../environments/environment';
import {TranslationLoaderService} from './services/translation-loader.service';
import { NounFormPipe } from './pipes/noun-form.pipe';
import { MapBalloonGroupComponent } from './components/map-balloon-group/map-balloon-group.component';
import { DefaultComplaintMarkComponent } from './components/map-balloon/default-complaint-mark/default-complaint-mark.component';
import { DefaultIssueMarkComponent } from './components/map-balloon/default-issue-mark/default-issue-mark.component';
import { DefaultComplaintConfirmationMarkComponent } from './components/map-balloon/default-complaint-confirmation-mark/default-complaint-confirmation-mark.component';


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
      IssueCommentFormComponent,
      IssueMapViewComponent,
      IssueViewBalloonComponent,
      ComplaintConfirmationViewBalloonComponent,
      ComplaintMapViewComponent,
      ComplaintDetailsBalloonComponent,
      CompanySearchFormComponent,
      CompanySearchFieldComponent,
      PaginatorComponent,
      IssueSignatureProgressComponent,
      SignatureListComponent,
      SignatureItemComponent,
      CommonChartComponent,
      DateTimeViewComponent,
      NounFormPipe,
      MapBalloonGroupComponent,
      DefaultComplaintMarkComponent,
      DefaultIssueMarkComponent,
      DefaultComplaintConfirmationMarkComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    InfiniteScrollModule,
    MomentModule,
    NgbModule,
      RouterModule,
      LightboxModule,
      NgxPermissionsModule.forChild(),
      TranslateModule.forRoot({
          loader: {
              provide: TranslateLoader,
              useClass: TranslationLoaderService
          },
          useDefaultLang: true
      })
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
        IssueCommentFormComponent,
        IssueMapViewComponent,
        IssueViewBalloonComponent,
        ComplaintConfirmationViewBalloonComponent,
        ComplaintMapViewComponent,
        ComplaintDetailsBalloonComponent,
        CompanySearchFormComponent,
        CompanySearchFieldComponent,
        PaginatorComponent,
        IssueSignatureProgressComponent,
        SignatureListComponent,
        SignatureItemComponent,
        CommonChartComponent,
        DateTimeViewComponent,
        TranslateModule,
        NounFormPipe,
        DefaultComplaintMarkComponent,
        DefaultIssueMarkComponent,
        DefaultComplaintConfirmationMarkComponent,
    ],
  entryComponents: [
      MapComponent,
      IssueViewBalloonComponent,
      ComplaintConfirmationViewBalloonComponent,
      ComplaintDetailsBalloonComponent,
  ]
})
export class SharedModule {

    constructor(private translate: TranslateService)
    {
        this.translate.setDefaultLang(environment.lang);
    }
}
