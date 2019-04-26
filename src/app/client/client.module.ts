import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import {ClientRoutingModule} from './client-routing.module';
import { ComplaintListPageComponent } from './components/complaint-list-page/complaint-list-page.component';
import { ComplaintDetailsPageComponent } from './components/complaint-details-page/complaint-details-page.component';
import { ComplaintCreatePageComponent } from './components/complaint-create-page/complaint-create-page.component';
import { ComplaintEditPageComponent } from './components/complaint-edit-page/complaint-edit-page.component';
import { ComplaintFormComponent } from './components/complaint-form/complaint-form.component';
import { SharedModule } from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import { reducer as videoReducer } from './data/video.reducer';
import { reducer as complaintTagReducer } from './data/complaint-tag.reducer';
import { reducer as complaintPictureReducer } from './data/complaint-picture.reducer';
import { reducer as complaintReducer } from './data/complaint.reducer';
import { reducer as geoLocationReducer } from './data/geo-location.reducer';
import {EffectsModule} from '@ngrx/effects';
import {VideoEffects} from './data/effects/video.effects';
import {ComplaintTagEffects} from './data/effects/complaint-tag.effects';
import {ComplaintPictureEffects} from './data/effects/complaint-picture.effects';
import {ComplaintEffects} from './data/effects/complaint.effects';
import { GeoLocationSelectorFieldComponent } from './components/geo-location-selector-field/geo-location-selector-field.component';
import { ComplaintPicturesFieldComponent } from './components/complaint-pictures-field/complaint-pictures-field.component';
import { GeoLocationSelectorComponent } from './components/geo-location-selector/geo-location-selector.component';
import { MapSelectedLocationComponent } from './components/map-selected-location/map-selected-location.component';
import { UploadPicturePreviewComponent } from './components/upload-picture-preview/upload-picture-preview.component';
import {UploadedComplaintPicturePreviewComponent} from './components/complaint-pictures-field/uploaded-complaint-picture-preview/uploaded-complaint-picture-preview.component';
import { VideoListFieldComponent } from './components/video-list-field/video-list-field.component';
import { VideoItemFormFieldComponent } from './components/video-item-form-field/video-item-form-field.component';
import { VideoFormComponent } from './components/video-form/video-form.component';
import { TagListFieldComponent } from './components/tag-list-field/tag-list-field.component';
import { TagItemComponent } from './components/tag-list-field/tag-item/tag-item.component';
import { ComplaintItemComponent } from './components/complaint-list-page/complaint-item/complaint-item.component';
import { CommonTagItemComponent } from './components/common-tag-item/common-tag-item.component';
import {ComplaintPictureItemComponent} from './components/picture/complaint-picture-item/complaint-picture-item.component';
import { VideoItemComponent } from './components/video/video-item/video-item.component';
import { CommonLayoutComponent } from './components/common-layout/common-layout.component';
import { MapViewComponent } from './components/complaint-details-page/map-view/map-view.component';
import { PictureListComponent } from './components/complaint-details-page/picture-list/picture-list.component';
import { VideoListComponent } from './components/complaint-details-page/video-list/video-list.component';
import { ComplaintDetailsBalloonComponent } from './components/complaint-details-page/complaint-details-balloon/complaint-details-balloon.component';


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
    UploadedComplaintPicturePreviewComponent,
    VideoListFieldComponent,
    VideoItemFormFieldComponent,
    VideoFormComponent,
    TagListFieldComponent,
    TagItemComponent,
    ComplaintItemComponent,
    CommonTagItemComponent,
    ComplaintPictureItemComponent,
    VideoItemComponent,
    CommonLayoutComponent,
    MapViewComponent,
    PictureListComponent,
    VideoListComponent,
    ComplaintDetailsBalloonComponent
  ],
    imports: [
        CommonModule,
        ClientRoutingModule,
        SharedModule,
        StoreModule.forFeature('clientVideo', videoReducer),
        StoreModule.forFeature('clientComplaintTag', complaintTagReducer),
        StoreModule.forFeature('clientComplaintPicture', complaintPictureReducer),
        StoreModule.forFeature('clientComplaint', complaintReducer),
        StoreModule.forFeature('clientGeoLocation', geoLocationReducer),
        EffectsModule.forFeature([
            VideoEffects,
            ComplaintTagEffects,
            ComplaintPictureEffects,
            ComplaintEffects
        ]),
    ],
  exports: [
      StoreModule,
      EffectsModule
  ],
  entryComponents: [MapSelectedLocationComponent, ComplaintDetailsBalloonComponent]
})
export class ClientModule { }
