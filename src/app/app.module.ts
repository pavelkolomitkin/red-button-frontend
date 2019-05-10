import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {AppRoutingModule} from './app-routing.module';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import { AppSecurityLayoutComponent } from './components/app-security-layout/app-security-layout.component';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    AppSecurityLayoutComponent,
    AppLayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    StoreDevtoolsModule.instrument(
        {
          maxAge: 25,
          logOnly: !environment.production
        }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
