import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {CompanyRoutingModule} from './company-routing.module';
import { IssueListPageComponent } from './components/issue/issue-list-page/issue-list-page.component';
import { IssueDetailsPageComponent } from './components/issue/issue-details-page/issue-details-page.component';
import { IssueGeographyPageComponent } from './components/issue/issue-geography-page/issue-geography-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import {IssueService} from './services/issue.service';
import {Store, StoreModule} from '@ngrx/store';
import { reducer as issueReducer } from './data/issue.reducer';
import { reducer as complaintReducer } from './data/complaint.reducer';
import { reducer as profileReducer } from './data/profile.reducer';
import {EffectsModule} from '@ngrx/effects';
import {IssueEffects} from './data/effects/issue.effects';
import { CommonLayoutComponent } from './components/common/common-layout/common-layout.component';
import { IssueSearchFilterComponent } from './components/issue/issue-list-page/issue-search-filter/issue-search-filter.component';
import { ComplaintDetailsPageComponent } from './components/complaint/complaint-details-page/complaint-details-page.component';
import {ComplaintService} from './services/complaint.service';
import {ComplaintEffects} from './data/effects/complaint.effects';
import { IssueSignatureItemComponent } from './components/issue/issue-details-page/issue-signature-item/issue-signature-item.component';
import {CommonInfoService} from './services/common-info.service';
import {ProfileEffects} from './data/effects/profile.effects';
import {State} from '../app.state';
import {CompanyModuleInitialized} from './data/profile.actions';
import { IssueGeoSearchFilterComponent } from './components/issue/issue-geography-page/issue-geo-search-filter/issue-geo-search-filter.component';
import {IssueBalloonComponent} from './components/issue/issue-geography-page/issue-balloon/issue-balloon.component';


@NgModule({
  declarations: [
    IssueListPageComponent,
    IssueDetailsPageComponent,
    IssueGeographyPageComponent,
    ProfilePageComponent,
    CommonLayoutComponent,
    IssueSearchFilterComponent,
    ComplaintDetailsPageComponent,
    IssueSignatureItemComponent,
    IssueGeoSearchFilterComponent,
      IssueBalloonComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CompanyRoutingModule,
      StoreModule.forFeature('companyIssue', issueReducer),
      StoreModule.forFeature('companyComplaint', complaintReducer),
      StoreModule.forFeature('companyProfile', profileReducer),
      EffectsModule.forFeature([
          IssueEffects,
          ComplaintEffects,
          ProfileEffects
      ])
  ],
  exports: [
    SharedModule,
    StoreModule,
    EffectsModule
  ],
  providers: [
      IssueService,
      ComplaintService,
      CommonInfoService
  ],
  entryComponents: [
    IssueBalloonComponent
  ]
})
export class CompanyModule
{
  constructor(private store: Store<State>)
  {
    this.store.dispatch(new CompanyModuleInitialized());
  }
}
