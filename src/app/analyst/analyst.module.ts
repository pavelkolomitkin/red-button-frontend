import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonLayoutComponent } from './components/common/common-layout/common-layout.component';
import {SharedModule} from '../shared/shared.module';
import {AnalystRoutingModule} from './analyst-routing.module';
import {CommonStatisticPageComponent} from './components/common-statistic-page/common-statistic-page.component';
import {RegionStatisticPageComponent} from './components/region-statistic-page/region-statistic-page.component';
import {Store, StoreModule} from '@ngrx/store';
import {State} from '../app.state';
import {FederalDistrictGetListStart} from '../core/data/federal-district.actions';
import { CountryMapComponent } from './components/common/vector-map/country-map/country-map.component';
import { MapContainerComponent } from './components/common/vector-map/map-container/map-container.component';
import { FederalDistrictComponent } from './components/common/vector-map/federal-district/federal-district.component';
import { reducer as filterReducer } from './data/filter.reducer';
import { StatisticFilterComponent } from './components/common/statistic-filter/statistic-filter.component';
import {StatisticService} from './services/statistic.service';
import { ServiceTypesStatisticsComponent } from './components/common/service-types-statistics/service-types-statistics.component';
import { ServiceTypeItemComponent } from './components/common/service-types-statistics/service-type-item/service-type-item.component';
import { ServiceTypeSharesChartComponent } from './components/common/charts/service-type-shares-chart/service-type-shares-chart.component';
import { ServiceTypesDynamicYearComponent } from './components/common/charts/service-types-dynamic-year/service-types-dynamic-year.component';
import { FederalDistrictMapComponent } from './components/common/vector-map/federal-district-map/federal-district-map.component';
import { VectorRegionItemComponent } from './components/common/vector-map/federal-district-map/vector-region-item/vector-region-item.component';
import {ColorValueScaleService} from './services/color-value-scale.service';
import { RegionMapWidgetComponent } from './components/region-statistic-page/map/region-map-widget/region-map-widget.component';
import { RegionMapComponent } from './components/region-statistic-page/map/region-map/region-map.component';
import {ServiceTypeListLoadStart} from '../core/data/service-type.actions';
import {IssueService} from './services/issue.service';
import { IssueBalloonComponent } from './components/common/map/issue-balloon/issue-balloon.component';
import { CompanyItemComponent } from './components/region-statistic-page/company-item/company-item.component';
import { CompanyStatisticPageComponent } from './components/company-statistic-page/company-statistic-page.component';
import { IssueDetailsPageComponent } from './components/issue-details-page/issue-details-page.component';
import {CompanyService} from './services/company.service';
import { CompanyMapComponent } from './components/company-statistic-page/map/company-map/company-map.component';
import { CompanyMapWidgetComponent } from './components/company-statistic-page/map/company-map-widget/company-map-widget.component';
import { IssueItemComponent } from './components/company-statistic-page/issue-item/issue-item.component';

@NgModule({
  declarations: [
      CommonLayoutComponent,
      CommonStatisticPageComponent,
      RegionStatisticPageComponent,
      CountryMapComponent,
      MapContainerComponent,
      FederalDistrictComponent,
      StatisticFilterComponent,
      ServiceTypesStatisticsComponent,
      ServiceTypeItemComponent,
      ServiceTypeSharesChartComponent,
      ServiceTypesDynamicYearComponent,
      FederalDistrictMapComponent,
      VectorRegionItemComponent,
      RegionMapWidgetComponent,
      RegionMapComponent,
      IssueBalloonComponent,
      CompanyItemComponent,
      CompanyStatisticPageComponent,
      IssueDetailsPageComponent,
      CompanyMapComponent,
      CompanyMapWidgetComponent,
      IssueItemComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        AnalystRoutingModule,

        StoreModule.forFeature('analyticsFilter', filterReducer),
    ],
  exports: [
      SharedModule,
      StoreModule
  ],
    providers: [
        StatisticService,
        ColorValueScaleService,
        IssueService,
        CompanyService
    ],
    entryComponents: [
        IssueBalloonComponent
    ]
})
export class AnalystModule
{
  constructor(private store: Store<State>) {

    this.store.dispatch(new FederalDistrictGetListStart());
    this.store.dispatch(new ServiceTypeListLoadStart());

  }
}
