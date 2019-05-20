import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonLayoutComponent } from './components/common/common-layout/common-layout.component';
import {SharedModule} from '../shared/shared.module';
import {AnalystRoutingModule} from './analyst-routing.module';
import {CommonCountryStatisticPageComponent} from './components/common-country-statistic-page/common-country-statistic-page.component';
import {FederalDistrictStatisticPageComponent} from './components/federal-district-statistic-page/federal-district-statistic-page.component';
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
import { ServiceTypePercentageItemComponent } from './components/common/charts/service-type-percentage-item/service-type-percentage-item.component';

@NgModule({
  declarations: [
      CommonLayoutComponent,
      CommonCountryStatisticPageComponent,
      FederalDistrictStatisticPageComponent,
      RegionStatisticPageComponent,
      CountryMapComponent,
      MapContainerComponent,
      FederalDistrictComponent,
      StatisticFilterComponent,
      ServiceTypesStatisticsComponent,
      ServiceTypeItemComponent,
      ServiceTypeSharesChartComponent,
      ServiceTypePercentageItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AnalystRoutingModule,

      StoreModule.forFeature('analyticsFilter', filterReducer)
  ],
  exports: [
      SharedModule,
      StoreModule
  ],
    providers: [
        StatisticService
    ]
})
export class AnalystModule
{
  constructor(private store: Store<State>) {

    this.store.dispatch(new FederalDistrictGetListStart());

  }
}
