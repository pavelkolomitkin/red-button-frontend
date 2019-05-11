import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { IssueListPageComponent } from './components/issue/issue-list-page/issue-list-page.component';
import { IssueDetailsPageComponent } from './components/issue/issue-details-page/issue-details-page.component';
import { ComplaintListPageComponent } from './components/complaint/complaint-list-page/complaint-list-page.component';
import { ComplaintDetailsPageComponent } from './components/complaint/complaint-details-page/complaint-details-page.component';
import { DashboardPageComponent } from './components/dashboard/dashboard-page/dashboard-page.component';
import { CommonLayoutComponent } from './components/common/common-layout/common-layout.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
      ProfilePageComponent,
    IssueListPageComponent,
    IssueDetailsPageComponent,
    ComplaintListPageComponent,
    ComplaintDetailsPageComponent,
    DashboardPageComponent,
    CommonLayoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
