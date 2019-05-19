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

@NgModule({
  declarations: [
      CommonLayoutComponent,
      CommonCountryStatisticPageComponent,
      FederalDistrictStatisticPageComponent,
      RegionStatisticPageComponent
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
