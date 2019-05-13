import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { BaseApiUrlInterceptor } from './services/interceptors/base-api-url.interceptor';
import { DefaultHttpHeadersInterceptor } from './services/interceptors/default-http-headers.interceptor';
import { AuthTokenInjectorInterceptor } from './services/interceptors/auth-token-injector.interceptor';
import { ErrorResponseHandlerInterceptor } from './services/interceptors/error-response-handler.interceptor';

import { LocalStorageService } from './services/local-storage.service';
import { appInitializeHandler, AppInitializerService } from './services/app-initializer.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer as coreReducer } from './data/reducer';
import { reducer as securityReducer } from '../security/data/reducer';
import { reducer as geoLocationReducer } from './data/geo-location.reducer';
import { reducer as serviceTypeReducer } from './data/service-type.reducer';
import { reducer as mapReducer } from '../shared/data/map.reducer';
import { reducer as regionReducer } from './data/region.reducer';
import { RegisterEffects } from '../security/data/effects/register.effects';
import { AuthEffects } from '../security/data/effects/auth.effects';
import { AuthUserGuardService } from '../security/services/guards/auth-user-guard.service';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { GlobalProgressComponent } from './components/global-progress/global-progress.component';
import { SecurityService } from '../security/services/security.service';
import {DefaultRedirectGuard} from '../security/services/guards/default-redirect-guard.service';
import {CommonLayoutComponent} from './components/common-layout/common-layout.component';
import {ContentComponent} from './components/content/content.component';
import {ContentHeaderComponent} from './components/content-header/content-header.component';
import {HeaderComponent} from './components/header/header.component';
import {MainFooterComponent} from './components/main-footer/main-footer.component';
import {MainMenuComponent} from './components/main-menu/main-menu.component';
import {GeoLocationService} from './services/geo-location.service';
import {VideoService} from '../client/services/video.service';
import {ComplaintTagService} from '../client/services/complaint-tag.service';
import {ComplaintPictureService} from '../client/services/complaint-picture.service';
import {ServiceTypeEffects} from './data/effects/service-type.effects';
import {ServiceTypeService} from './services/service-type.service';
import {ComplaintService} from '../client/services/complaint.service';
import {ClientLocationService} from './services/client-location.service';
import {ClientDeviceEffects} from './data/effects/client-device.effects';
import { ConfirmationWindowComponent } from './components/confirmation-window/confirmation-window.component';
import { ControlItemComponent } from './components/confirmation-window/control-item/control-item.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import {MessageNotifierComponent} from './components/message-notifier/message-notifier.component';
import {ToastrModule} from 'ngx-toastr';
import {CompanyService} from './services/company.service';
import {IssuePictureService} from '../client/services/issue-picture.service';
import {FileUploadService} from './services/file-upload.service';
import {IssueService} from '../client/services/issue.service';
import {ProfileService} from '../client/services/profile.service';
import { SignatureRequestComponent } from './components/header/signature-request/signature-request.component';
import {ComplaintConfirmationService} from '../client/services/complaint-comfirmation.service';
import {ConfirmLeavePageGuardService} from './services/guards/confirm-leave-page-guard.service';
import {IssueCommentService} from './services/issue-comment.service';
import {OSMSearchService} from './services/osm-search.service';

import { IssueService as AdminIssueService } from '../admin/services/issue.service';
import {RegionService} from './services/region.service';
import {RegionEffects} from './data/effects/region.effects';
import {NgxPermissionsModule, NgxPermissionsService} from 'ngx-permissions';

const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: BaseApiUrlInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: DefaultHttpHeadersInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInjectorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorResponseHandlerInterceptor, multi: true },
];

@NgModule({
  declarations: [
    GlobalProgressComponent,
    CommonLayoutComponent,
    ContentComponent,
    ContentHeaderComponent,
    HeaderComponent,
    MainFooterComponent,
    MainMenuComponent,
    ConfirmationWindowComponent,
    ControlItemComponent,
    ConfirmationComponent,
      MessageNotifierComponent,
      SignatureRequestComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
      NgxPermissionsModule.forRoot(),
    SharedModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot({
      core: coreReducer,
      security: securityReducer,
      geoLocation: geoLocationReducer,
      serviceType: serviceTypeReducer,
      map: mapReducer,
      region: regionReducer
    }),
    EffectsModule.forRoot([
      RegisterEffects,
      AuthEffects,
      ServiceTypeEffects,
      ClientDeviceEffects,
      RegionEffects
    ])
  ],
  providers: [
    AuthUserGuardService,
    DefaultRedirectGuard,
    httpInterceptorProviders,
    SecurityService,
    LocalStorageService,
    GeoLocationService,
    VideoService,
    ComplaintTagService,
    ComplaintPictureService,
    IssuePictureService,
    ServiceTypeService,
    ComplaintService,
    ClientLocationService,
    CompanyService,
    IssueService,
    FileUploadService,
    ProfileService,
    ComplaintConfirmationService,
    ConfirmLeavePageGuardService,
    IssueCommentService,
    OSMSearchService,
    AdminIssueService,
    RegionService,
    AppInitializerService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializeHandler,
      deps: [AppInitializerService],
      multi: true
    }
  ],
    exports: [
        NgxPermissionsModule,
        SharedModule,
        GlobalProgressComponent,
        CommonLayoutComponent,
        ContentComponent,
        ContentHeaderComponent,
        HeaderComponent,
        MainFooterComponent,
        MainMenuComponent,
        StoreModule,
        EffectsModule,
        ConfirmationComponent,
        MessageNotifierComponent,
        ToastrModule
    ]
})
export class CoreModule { }
