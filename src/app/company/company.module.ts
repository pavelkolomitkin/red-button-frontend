import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {CompanyRoutingModule} from './company-routing.module';
import { IssueListPageComponent } from './components/issue/issue-list-page/issue-list-page.component';
import { IssueDetailsPageComponent } from './components/issue/issue-details-page/issue-details-page.component';
import { IssueGeographyPageComponent } from './components/issue/issue-geography-page/issue-geography-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import {IssueService} from './services/issue.service';
import {StoreModule} from '@ngrx/store';
import { reducer as issueReducer } from './data/issue.reducer';
import { reducer as complaintReducer } from './data/complaint.reducer';
import {EffectsModule} from '@ngrx/effects';
import {IssueEffects} from './data/effects/issue.effects';
import { CommonLayoutComponent } from './components/common/common-layout/common-layout.component';
import { IssueSearchFilterComponent } from './components/issue/issue-list-page/issue-search-filter/issue-search-filter.component';
import { ComplaintDetailsPageComponent } from './components/complaint/complaint-details-page/complaint-details-page.component';
import {ComplaintService} from './services/complaint.service';
import {ComplaintEffects} from './data/effects/complaint.effects';
import { IssueSignatureItemComponent } from './components/issue/issue-details-page/issue-signature-item/issue-signature-item.component';


@NgModule({
  declarations: [
    IssueListPageComponent,
    IssueDetailsPageComponent,
    IssueGeographyPageComponent,
    ProfilePageComponent,
    CommonLayoutComponent,
    IssueSearchFilterComponent,
    ComplaintDetailsPageComponent,
    IssueSignatureItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CompanyRoutingModule,
      StoreModule.forFeature('companyIssue', issueReducer),
      StoreModule.forFeature('companyComplaint', complaintReducer),
      EffectsModule.forFeature([
          IssueEffects,
          ComplaintEffects
      ])
  ],
  exports: [
    SharedModule,
    StoreModule,
    EffectsModule
  ],
  providers: [
      IssueService,
      ComplaintService
  ]
})
export class CompanyModule { }
