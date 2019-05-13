import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {DatePeriod} from '../../../../shared/data/model/date-period.model';
import {Region} from '../../../../core/data/model/region.model';
import {ServiceType} from '../../../../core/data/model/service-type.model';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';

@Component({
  selector: 'app-admin-default-entity-filter',
  templateUrl: './default-entity-filter.component.html',
  styleUrls: ['./default-entity-filter.component.css']
})
export class DefaultEntityFilterComponent implements OnInit {

  @Output('onPeriodChange') periodChangeEvent: EventEmitter<DatePeriod> = new EventEmitter();
  @Output('onRegionChange') regionChangeEvent: EventEmitter<Region> = new EventEmitter();
  @Output('onServiceTypeChange') serviceTypeChangeEvent: EventEmitter<ServiceType> = new EventEmitter();
  @Output('onChange') changeEvent: EventEmitter<{ period: DatePeriod, region: Region, serviceType: ServiceType }> = new EventEmitter();

  selectedPeriod: DatePeriod = null;
  selectedRegion: Region;
  selectedServiceType: ServiceType;

  regions: Observable<Array<Region>>;
  serviceTypes: Observable<Array<ServiceType>>;

  constructor(private store: Store<State>) { }

  ngOnInit() {

    this.regions = this.store.pipe(select(state => state.region.list));
    this.serviceTypes = this.store.pipe(select(state => state.serviceType.list));
  }

  compareEntity(a: any, b: any)
  {
    if (!a || !b)
    {
      return false;
    }

    return a.id === b.id;
  }

  onRegionChangeHandler(event)
  {
    this.regionChangeEvent.emit(this.selectedRegion);
  }

  onServiceTypeChangeHandler(event)
  {
    this.serviceTypeChangeEvent.emit(this.selectedServiceType);
  }

  onDatePeriodChangeHandler(period: DatePeriod)
  {
    this.selectedPeriod = period;
    this.periodChangeEvent.emit(this.selectedPeriod);
  }

  onChangeHandler(event)
  {
    this.changeEvent.emit({
      period: this.selectedPeriod,
      region: this.selectedRegion,
      serviceType: this.selectedServiceType
    });
  }

}
