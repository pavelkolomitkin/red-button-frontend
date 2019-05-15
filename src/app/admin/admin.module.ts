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
import { PaginatorComponent } from './components/common/paginator/paginator.component';
import { IssueItemComponent } from './components/issue/issue-list-page/issue-item/issue-item.component';
import {State} from '../app.state';
import {RegionAllGetStart} from '../core/data/region.actions';
import {ServiceTypeListLoadStart} from '../core/data/service-type.actions';
import { SignatureListComponent } from './components/issue/issue-details-page/signature-list/signature-list.component';
import { SignatureItemComponent } from './components/issue/issue-details-page/signature-list/signature-item/signature-item.component';
import { SignaturesWidgetComponent } from './components/issue/issue-details-page/signatures-widget/signatures-widget.component';
import { LikeWidgetComponent } from './components/issue/issue-details-page/like-widget/like-widget.component';
import {CommonInfoService} from './services/common-info.service';
import { IssueService } from './services/issue.service';
import {ProfileEffects} from './data/effects/profile.effects';
import {AdminModuleInitialized, ProfileGetCommonInfoStart} from './data/profile.actions';
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

@NgModule({
  declarations: [
      ProfilePageComponent,
    IssueListPageComponent,
    IssueDetailsPageComponent,
    ComplaintListPageComponent,
    ComplaintDetailsPageComponent,
    DashboardPageComponent,
    CommonLayoutComponent,
    PaginatorComponent,
    IssueItemComponent,
    SignatureListComponent,
    SignatureItemComponent,
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
        AccountService
    ],
  exports: [
    StoreModule,
    EffectsModule,
    SharedModule
  ]
})
export class AdminModule {

  constructor(private store: Store<State>) {

    this.store.dispatch(new RegionAllGetStart());
    this.store.dispatch(new ServiceTypeListLoadStart());
    this.store.dispatch(new AdminModuleInitialized());
  }

}
