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
import {Store, StoreModule} from '@ngrx/store';

import { reducer as complaintReducer } from './data/complaint.reducer';
import { reducer as issueReducer } from './data/issue.reducer';
import { reducer as profileReducer } from './data/profile.reducer';
import { reducer as accountReducer } from './data/account.reducer';
import {EffectsModule} from '@ngrx/effects';
import {IssueEffects} from './data/effects/issue.effects';
import { IssueItemComponent } from './components/issue/issue-list-page/issue-item/issue-item.component';
import {State} from '../app.state';
import {RegionAllGetStart} from '../core/data/region.actions';
import {ServiceTypeListLoadStart} from '../core/data/service-type.actions';
import { SignaturesWidgetComponent } from './components/issue/issue-details-page/signatures-widget/signatures-widget.component';
import { LikeWidgetComponent } from './components/issue/issue-details-page/like-widget/like-widget.component';
import {CommonInfoService} from './services/common-info.service';
import { IssueService } from './services/issue.service';
import {ProfileEffects} from './data/effects/profile.effects';
import {AdminModuleInitialized} from './data/profile.actions';
import {ComplaintService} from './services/complaint.service';
import {ComplaintEffects} from './data/effects/complaint.effects';
import { DefaultEntityFilterComponent } from './components/common/default-entity-filter/default-entity-filter.component';
import { ComplaintItemComponent } from './components/complaint/complaint-list-page/complaint-item/complaint-item.component';
import { CompanyRepresentativeFormComponent } from './components/account/company/company-representative-form/company-representative-form.component';
import { CompanyRepresentativeCreateAccountPageComponent } from './components/account/company/company-representative-create-account-page/company-representative-create-account-page.component';
import { CompanyRepresentativeEditAccountPageComponent } from './components/account/company/company-representative-edit-account-page/company-representative-edit-account-page.component';
import { AnalystAccountFormComponent } from './components/account/analyst/analyst-account-form/analyst-account-form.component';
import { AnalystAccountCreatePageComponent } from './components/account/analyst/analyst-account-create-page/analyst-account-create-page.component';
import { AnalystAccountEditPageComponent } from './components/account/analyst/analyst-account-edit-page/analyst-account-edit-page.component';
import { AnalystListPageComponent } from './components/account/analyst/analyst-list-page/analyst-list-page.component';
import { CompanyRepresentativeListComponent } from './components/account/company/company-representative-list/company-representative-list.component';
import { ClientListPageComponent } from './components/account/client/client-list-page/client-list-page.component';
import {AccountService} from './services/account.service';
import {AccountEffects} from './data/effects/account.effects';
import { CommonListPageComponent } from './components/account/common/common-list-page/common-list-page.component';
import { AccountCommonListComponent } from './components/account/common/account-common-list/account-common-list.component';
import { AccountCommonFormComponent } from './components/account/common/account-common-form/account-common-form.component';
import { AccountCommonDetailsPageComponent } from './components/account/common/account-common-details-page/account-common-details-page.component';
import { AccountResetPasswordComponent } from './components/account/common/account-reset-password/account-reset-password.component';
import { AccountActiveSwitcherComponent } from './components/account/common/account-active-switcher/account-active-switcher.component';
import { DashboardLastComplaintsWidgetComponent } from './components/dashboard/widgets/dashboard-last-complaints-widget/dashboard-last-complaints-widget.component';
import { DashboardLastIssuesWidgetComponent } from './components/dashboard/widgets/dashboard-last-issues-widget/dashboard-last-issues-widget.component';
import { DashboardLastIssueCommentsWidgetComponent } from './components/dashboard/widgets/dashboard-last-issue-comments-widget/dashboard-last-issue-comments-widget.component';
import { DashboardLastClientsWidgetComponent } from './components/dashboard/widgets/dashboard-last-clients-widget/dashboard-last-clients-widget.component';
import { DashboardCommonWidgetComponent } from './components/dashboard/widgets/dashboard-common-widget/dashboard-common-widget.component';
import {IssueCommentService} from './services/issue-comment.service';

@NgModule({
  declarations: [
      ProfilePageComponent,
    IssueListPageComponent,
    IssueDetailsPageComponent,
    ComplaintListPageComponent,
    ComplaintDetailsPageComponent,
    DashboardPageComponent,
    CommonLayoutComponent,
    IssueItemComponent,
    SignaturesWidgetComponent,
    LikeWidgetComponent,
    DefaultEntityFilterComponent,
    ComplaintItemComponent,
    CompanyRepresentativeFormComponent,
    CompanyRepresentativeCreateAccountPageComponent,
    CompanyRepresentativeEditAccountPageComponent,
    AnalystAccountFormComponent,
    AnalystAccountCreatePageComponent,
    AnalystAccountEditPageComponent,
    AnalystListPageComponent,
    CompanyRepresentativeListComponent,
    ClientListPageComponent,
    CommonListPageComponent,
    AccountCommonListComponent,
    AccountCommonFormComponent,
    AccountCommonDetailsPageComponent,
    AccountResetPasswordComponent,
    AccountActiveSwitcherComponent,
    DashboardLastComplaintsWidgetComponent,
    DashboardLastIssuesWidgetComponent,
    DashboardLastIssueCommentsWidgetComponent,
    DashboardLastClientsWidgetComponent,
    DashboardCommonWidgetComponent,
  ],
    imports: [
        CommonModule,
        SharedModule,
        AdminRoutingModule,
        StoreModule.forFeature('adminComplaint', complaintReducer),
        StoreModule.forFeature('adminIssue', issueReducer),
        StoreModule.forFeature('adminProfile', profileReducer),
        StoreModule.forFeature('adminAccount', accountReducer),
        EffectsModule.forFeature([
            ComplaintEffects,
            IssueEffects,
            ProfileEffects,
            AccountEffects
        ]),
    ],
    providers: [
        CommonInfoService,
        IssueService,
        ComplaintService,
        AccountService,
        IssueCommentService
    ],
    exports: [
        StoreModule,
        EffectsModule,
        SharedModule,
        AnalystListPageComponent
    ]
})
export class AdminModule {

  constructor(private store: Store<State>) {

    this.store.dispatch(new RegionAllGetStart());
    this.store.dispatch(new ServiceTypeListLoadStart());
    this.store.dispatch(new AdminModuleInitialized());
  }

}
