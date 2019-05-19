import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonLayoutComponent } from './components/common/common-layout/common-layout.component';
import {SharedModule} from '../shared/shared.module';
import {AnalystRoutingModule} from './analyst-routing.module';
import {CommonCountryStatisticPageComponent} from './components/common-country-statistic-page/common-country-statistic-page.component';
import {FederalDistrictStatisticPageComponent} from './components/federal-district-statistic-page/federal-district-statistic-page.component';
import {RegionStatisticPageComponent} from './components/region-statistic-page/region-statistic-page.component';
import {Store} from '@ngrx/store';
import {State} from '../app.state';
import {FederalDistrictGetListStart} from '../core/data/federal-district.actions';
import { YearTimeFilterComponent } from './components/common/year-time-filter/year-time-filter.component';
import { CountryMapComponent } from './components/common/vector-map/country-map/country-map.component';
import { MapContainerComponent } from './components/common/vector-map/map-container/map-container.component';
import { FederalDistrictComponent } from './components/common/vector-map/federal-district/federal-district.component';

@NgModule({
  declarations: [
      CommonLayoutComponent,
      CommonCountryStatisticPageComponent,
      FederalDistrictStatisticPageComponent,
      RegionStatisticPageComponent,
      YearTimeFilterComponent,
      CountryMapComponent,
      MapContainerComponent,
      FederalDistrictComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AnalystRoutingModule
  ],
  exports: [
      SharedModule
  ]
})
export class AnalystModule
{
  constructor(private store: Store<State>) {

    this.store.dispatch(new FederalDistrictGetListStart());

  }
}
