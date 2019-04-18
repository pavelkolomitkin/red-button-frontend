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
import {EffectsModule} from '@ngrx/effects';
import {VideoEffects} from './data/effects/video.effects';
import {ComplaintTagEffects} from './data/effects/complaint-tag.effects';
import {ComplaintPictureEffects} from './data/effects/complaint-picture.effects';

@NgModule({
  declarations: [
    ProfilePageComponent,
    ComplaintListPageComponent,
    ComplaintDetailsPageComponent,
    ComplaintCreatePageComponent,
    ComplaintEditPageComponent,
    ComplaintFormComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule,
    StoreModule.forFeature('video', videoReducer),
    StoreModule.forFeature('complaintTag', complaintTagReducer),
    StoreModule.forFeature('complaintPicture', complaintPictureReducer),
    EffectsModule.forFeature([VideoEffects, ComplaintTagEffects, ComplaintPictureEffects])
  ],
  exports: [
      StoreModule,
      EffectsModule
  ]
})
export class ClientModule { }
