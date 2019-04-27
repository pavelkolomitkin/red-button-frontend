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
import { RegisterEffects } from '../security/data/effects/register.effects';
import { AuthEffects } from '../security/data/effects/auth.effects';
import { AuthUserGuard } from '../security/services/guards/AuthUserGuard';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { GlobalProgressComponent } from './components/global-progress/global-progress.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { SecurityService } from '../security/services/security.service';
import { NgxPermissionsModule } from 'ngx-permissions';
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

const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: BaseApiUrlInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: DefaultHttpHeadersInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInjectorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorResponseHandlerInterceptor, multi: true },
];

@NgModule({
  declarations: [
    NotFoundPageComponent,
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
      MessageNotifierComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    SharedModule,
    NgxPermissionsModule.forRoot(),
    ToastrModule.forRoot(),
    StoreModule.forRoot({
      core: coreReducer,
      security: securityReducer,
      geoLocation: geoLocationReducer,
      serviceType: serviceTypeReducer
    }),
    EffectsModule.forRoot([
      RegisterEffects, AuthEffects, ServiceTypeEffects, ClientDeviceEffects
    ])
  ],
  providers: [
    AuthUserGuard,
    DefaultRedirectGuard,
    httpInterceptorProviders,
    SecurityService,
    LocalStorageService,
    GeoLocationService,
    VideoService,
    ComplaintTagService,
    ComplaintPictureService,
    ServiceTypeService,
    ComplaintService,
    ClientLocationService,
    AppInitializerService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializeHandler,
      deps: [AppInitializerService],
      multi: true
    }
  ],
    exports: [
        GlobalProgressComponent,
        CommonLayoutComponent,
        ContentComponent,
        ContentHeaderComponent,
        HeaderComponent,
        MainFooterComponent,
        MainMenuComponent,
        StoreModule,
        EffectsModule,
        NgxPermissionsModule,
        ConfirmationComponent,
        MessageNotifierComponent,
        ToastrModule
    ]
})
export class CoreModule { }
