import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FederalDistrict} from '../../../../../core/data/model/federal-district.model';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../../app.state';
import {Observable, Subscription} from 'rxjs';
import {filter, find, map} from 'rxjs/operators';
import {FEDERAL_DISTRICTS} from '../../../../../core/data/map-vector-paths';
import {Region} from '../../../../../core/data/model/region.model';

@Component({
  selector: 'app-analyst-federal-district-map',
  templateUrl: './federal-district-map.component.html',
  styleUrls: ['./federal-district-map.component.css']
})
export class FederalDistrictMapComponent implements OnInit, OnDestroy {

  _districtId: number;

  @Input()
  set districtId(value: number)
  {
    this._districtId = value;
    this.updateMap();
  }

  @Input() statistics: any;

  federalDistricts: Array<FederalDistrict> = [];

  federalDistrict: FederalDistrict;
  viewBox: string

  districtSubscription: Subscription;


  constructor(private store: Store<State>) {

    this.districtSubscription = this.store.pipe(
        select(state => state.federalDistrict.list)
    ).subscribe((list: Array<FederalDistrict>) => {
      this.federalDistricts = list;
    });

  }

  updateMap()
  {
    this.federalDistrict = this.federalDistricts.find(item => item.id === this._districtId);
    if (!!this.federalDistrict) {
      this.viewBox = FEDERAL_DISTRICTS[this.federalDistrict.code].viewBox;
    }
  }

  ngOnInit() {
    this.updateMap();
  }

  ngOnDestroy(): void {
    this.districtSubscription.unsubscribe();
  }

  getRegionTitle(region: Region)
  {
    let result = region.title + '\n';

    const statisticData = (<Array<any>>this.statistics).find((item) => {
      return item.code === region.code;
    });


    if (!!statisticData)
    {
      let totalIssue = 0;

      statisticData.serviceTypes.forEach((serviceType) => {

        if (serviceType.issueNumber > 0)
        {
          result += (serviceType.title ? serviceType.title : 'Остальные') + ': ' + serviceType.issueNumber + '\n';

          totalIssue += serviceType.issueNumber;
        }

      });

      if (totalIssue > 0)
      {
        result += 'Всего: ' + totalIssue;
      }

    }

    return result;
  }

}
