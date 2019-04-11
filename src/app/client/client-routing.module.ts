import {NgModule} from '@angular/core';
import {Routes} from '@angular/router';
import {ProfilePageComponent} from './profile-page/profile-page.component';

const routes: Routes = [
    { path: 'profile', component: ProfilePageComponent }
];

@NgModule()
export class ClientRoutingModule {}
