import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import {ClientRoutingModule} from './client-routing.module';
import { ComplaintListPageComponent } from './components/complaint/complaint-list-page/complaint-list-page.component';
import { ComplaintDetailsPageComponent } from './components/complaint/complaint-details-page/complaint-details-page.component';
import { ComplaintCreatePageComponent } from './components/complaint/complaint-create-page/complaint-create-page.component';
import { ComplaintEditPageComponent } from './components/complaint/complaint-edit-page/complaint-edit-page.component';
import { ComplaintFormComponent } from './components/complaint/complaint-form/complaint-form.component';
import { SharedModule } from '../shared/shared.module';
import {Store, StoreModule} from '@ngrx/store';
import { reducer as videoReducer } from './data/video.reducer';
import { reducer as complaintTagReducer } from './data/complaint-tag.reducer';
import { reducer as complaintPictureReducer } from './data/complaint-picture.reducer';
import { reducer as issuePictureReducer } from './data/issue-picture.reducer';
import { reducer as complaintReducer } from './data/complaint.reducer';
import { reducer as issueReducer } from './data/issue.reducer';
import { reducer as geoLocationReducer } from './data/geo-location.reducer';
import { reducer as profileReducer } from './data/profile.reducer';
import { reducer as complaintConfirmationReducer } from './data/complaint-confirmation.reducer';
import {EffectsModule} from '@ngrx/effects';
import {VideoEffects} from './data/effects/video.effects';
import {ComplaintTagEffects} from './data/effects/complaint-tag.effects';
import {ComplaintPictureEffects} from './data/effects/complaint-picture.effects';
import {ComplaintEffects} from './data/effects/complaint.effects';
import { GeoLocationSelectorFieldComponent } from './components/complaint/geo-location-selector-field/geo-location-selector-field.component';
import { ComplaintPicturesFieldComponent } from './components/complaint/complaint-pictures-field/complaint-pictures-field.component';
import { GeoLocationSelectorComponent } from './components/complaint/geo-location-selector/geo-location-selector.component';
import { MapSelectedLocationComponent } from './components/complaint/map-selected-location/map-selected-location.component';
import { UploadPicturePreviewComponent } from './components/common/upload-picture-preview/upload-picture-preview.component';
import {UploadedPicturePreviewComponent} from './components/common/uploaded-picture-preview/uploaded-picture-preview.component';
import { VideoListFieldComponent } from './components/common/video-list-field/video-list-field.component';
import { VideoItemFormFieldComponent } from './components/common/video-item-form-field/video-item-form-field.component';
import { VideoFormComponent } from './components/common/video-form/video-form.component';
import { TagListFieldComponent } from './components/common/tag-list-field/tag-list-field.component';
import { TagItemComponent } from './components/common/tag-list-field/tag-item/tag-item.component';
import { ComplaintItemComponent } from './components/complaint/complaint-list-page/complaint-item/complaint-item.component';
import { CommonTagItemComponent } from './components/common/common-tag-item/common-tag-item.component';
import { PictureItemComponent } from './components/common/picture/picture-item/picture-item.component';
import { VideoItemComponent } from './components/common/video/video-item/video-item.component';
import { CommonLayoutComponent } from './components/common/common-layout/common-layout.component';
import { MapViewComponent } from './components/complaint/complaint-details-page/map-view/map-view.component';
import { PictureListComponent } from './components/common/picture/picture-list/picture-list.component';
import { VideoListComponent } from './components/common/video/video-list/video-list.component';
import { ComplaintDetailsBalloonComponent } from './components/complaint/complaint-details-page/complaint-details-balloon/complaint-details-balloon.component';
import { CreateIssuePageComponent } from './components/issue/create-issue-page/create-issue-page.component';
import { IssueFormComponent } from './components/issue/issue-form/issue-form.component';
import { IssueListPageComponent } from './components/issue/issue-list-page/issue-list-page.component';
import { IssueGeoLocationSelectorComponent } from './components/issue/issue-form/issue-geo-location-selector/issue-geo-location-selector.component';
import { IssueGeoLocationSelectorFieldComponent } from './components/issue/issue-form/issue-geo-location-selector-field/issue-geo-location-selector-field.component';
import { IssueCompanySelectorFieldComponent } from './components/issue/issue-form/issue-company-selector-field/issue-company-selector-field.component';
import { SearchFormComponent } from './components/issue/issue-form/issue-geo-location-selector/search-form/search-form.component';
import { IssueMapBalloonComponent } from './components/issue/issue-form/issue-geo-location-selector/issue-map-balloon/issue-map-balloon.component';
import { ComplaintConfirmationMapBalloonComponent } from './components/issue/issue-form/issue-geo-location-selector/complaint-confirmation-map-balloon/complaint-confirmation-map-balloon.component';
import { ComplaintMapBalloonComponent } from './components/issue/issue-form/issue-geo-location-selector/complaint-map-balloon/complaint-map-balloon.component';
import {SearchTagItemComponent} from './components/issue/issue-form/issue-geo-location-selector/search-form/tag-item/tag-item.component';
import { CompanySearchFormComponent } from './components/issue/issue-form/issue-company-selector-field/company-search-form/company-search-form.component';
import { IssuePictureListFieldComponent } from './components/issue/issue-form/issue-picture-list-field/issue-picture-list-field.component';
import {IssuePictureEffects} from './data/effects/issue-picture.effects';
import {IssueEffects} from './data/effects/issue.effects';
import { EditIssuePageComponent } from './components/issue/edit-issue-page/edit-issue-page.component';
import { IssueDetailsPageComponent } from './components/issue/issue-details-page/issue-details-page.component';
import { IssueMapViewComponent } from './components/issue/issue-details-page/issue-map-view/issue-map-view.component';
import { IssueViewBalloonComponent } from './components/issue/issue-details-page/issue-map-view/issue-view-balloon/issue-view-balloon.component';
import { ComplaintConfirmationViewBalloonComponent } from './components/issue/issue-details-page/issue-map-view/complaint-confirmation-view-balloon/complaint-confirmation-view-balloon.component';
import { IssueItemComponent } from './components/issue/issue-list-page/issue-item/issue-item.component';
import {ProfileEffects} from './data/effects/profile.effects';
import {State} from '../app.state';
import {ProfileGetCommonInfoStart} from './data/profile.actions';
import {ComplaintConfirmationEffects} from './data/effects/complaint-confirmation.effects';
import { ConfirmationControlComponent } from './components/issue/issue-details-page/confirmation-control/confirmation-control.component';
import { IssueCommentListComponent } from './components/issue/issue-details-page/issue-comment-list/issue-comment-list.component';
import { IssueCommentItemComponent } from './components/issue/issue-details-page/issue-comment-list/issue-comment-item/issue-comment-item.component';
import { IssueCommentFormComponent } from './components/issue/issue-details-page/issue-comment-list/issue-comment-form/issue-comment-form.component';
import { IssueLikeControlComponent } from './components/issue/issue-details-page/issue-like-control/issue-like-control.component';


@NgModule({
  declarations: [
    ProfilePageComponent,
    ComplaintListPageComponent,
    ComplaintDetailsPageComponent,
    ComplaintCreatePageComponent,
    ComplaintEditPageComponent,
    ComplaintFormComponent,
    GeoLocationSelectorFieldComponent,
    ComplaintPicturesFieldComponent,
    GeoLocationSelectorComponent,
    MapSelectedLocationComponent,
    UploadPicturePreviewComponent,
    UploadedPicturePreviewComponent,
    VideoListFieldComponent,
    VideoItemFormFieldComponent,
    VideoFormComponent,
    TagListFieldComponent,
    TagItemComponent,
    ComplaintItemComponent,
    CommonTagItemComponent,
    PictureItemComponent,
    VideoItemComponent,
    CommonLayoutComponent,
    MapViewComponent,
    PictureListComponent,
    VideoListComponent,
    ComplaintDetailsBalloonComponent,
    CreateIssuePageComponent,
    IssueFormComponent,
    IssueListPageComponent,
    IssueGeoLocationSelectorComponent,
    IssueGeoLocationSelectorFieldComponent,
    IssueCompanySelectorFieldComponent,
    SearchFormComponent,
    IssueMapBalloonComponent,
    ComplaintConfirmationMapBalloonComponent,
    ComplaintMapBalloonComponent,
      SearchTagItemComponent,
      CompanySearchFormComponent,
      IssuePictureListFieldComponent,
      EditIssuePageComponent,
      IssueDetailsPageComponent,
      IssueMapViewComponent,
      IssueViewBalloonComponent,
      ComplaintConfirmationViewBalloonComponent,
      IssueItemComponent,
      ConfirmationControlComponent,
      IssueCommentListComponent,
      IssueCommentItemComponent,
      IssueCommentFormComponent,
      IssueLikeControlComponent
  ],
    imports: [
        CommonModule,
        ClientRoutingModule,
        SharedModule,
        StoreModule.forFeature('clientVideo', videoReducer),
        StoreModule.forFeature('clientComplaintTag', complaintTagReducer),
        StoreModule.forFeature('clientComplaintPicture', complaintPictureReducer),
        StoreModule.forFeature('clientIssuePicture', issuePictureReducer),
        StoreModule.forFeature('clientComplaint', complaintReducer),
        StoreModule.forFeature('clientIssue', issueReducer),
        StoreModule.forFeature('clientGeoLocation', geoLocationReducer),
        StoreModule.forFeature('clientProfile', profileReducer),
        StoreModule.forFeature('clientConfirmation', complaintConfirmationReducer),
        EffectsModule.forFeature([
            VideoEffects,
            ComplaintTagEffects,
            ComplaintPictureEffects,
            IssuePictureEffects,
            ComplaintEffects,
            IssueEffects,
            ProfileEffects,
            ComplaintConfirmationEffects
        ])
    ],
  exports: [
      StoreModule,
      EffectsModule,
      SharedModule
  ],
  entryComponents: [
      MapSelectedLocationComponent,
      ComplaintDetailsBalloonComponent,
      ComplaintMapBalloonComponent,
      IssueMapBalloonComponent,
      ComplaintConfirmationMapBalloonComponent,
      IssueViewBalloonComponent,
      ComplaintConfirmationViewBalloonComponent
  ]
})
export class ClientModule {
    constructor(private store: Store<State>)
    {
        this.store.dispatch(new ProfileGetCommonInfoStart());
    }
}
