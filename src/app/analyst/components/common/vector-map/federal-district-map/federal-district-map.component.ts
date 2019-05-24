import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FederalDistrict} from '../../../../../core/data/model/federal-district.model';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../../app.state';
import {Subscription} from 'rxjs';
import {FEDERAL_DISTRICTS} from '../../../../../core/data/map-vector-paths';
import {Region} from '../../../../../core/data/model/region.model';
import {ColorValueScaleService} from '../../../../services/color-value-scale.service';

@Component({
  selector: 'app-analyst-federal-district-map',
  templateUrl: './federal-district-map.component.html',
  styleUrls: ['./federal-district-map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FederalDistrictMapComponent implements OnInit, OnDestroy {

  @Output('onRegionSelect') regionSelectEvent: EventEmitter<Region> = new EventEmitter();

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


  constructor(
      private store: Store<State>,
      private colorService: ColorValueScaleService,
      private changeDetector: ChangeDetectorRef
  ) {

  }

  updateMap()
  {
    this.federalDistrict = this.federalDistricts.find(item => item.id === this._districtId);
    if (!!this.federalDistrict) {
      this.viewBox = FEDERAL_DISTRICTS[this.federalDistrict.code].viewBox;
    }

    this.changeDetector.markForCheck();
  }

  ngOnInit() {

    this.districtSubscription = this.store.pipe(
        select(state => state.federalDistrict.list)
    ).subscribe((list: Array<FederalDistrict>) => {
      this.federalDistricts = list;
      this.updateMap();
    });
  }

  ngOnDestroy(): void {
    this.districtSubscription.unsubscribe();
  }

  getRegionTitle(region: Region)
  {
    if (!this.statistics)
    {
      return '';
    }

    let result = region.title + '\n';

    const statisticData = (<Array<any>>this.statistics).find((item) => {
      return item.code === region.code;
    });


    if (!!statisticData)
    {
      statisticData.serviceTypes.forEach((serviceType) => {

        if (serviceType.issueNumber > 0)
        {
          result += (serviceType.title ? serviceType.title : 'Остальные') + ': ' + serviceType.issueNumber + '\n';
        }

      });

      if (statisticData.totalIssues > 0)
      {
        result += 'Всего: ' + statisticData.totalIssues;
      }

    }

    return result;
  }

  getRegionColor(region: Region)
  {
    if (!this.statistics)
    {
      return '';
    }

    const statisticData = (<Array<any>>this.statistics).find((item) => {
      return item.code === region.code;
    });

    if (!!statisticData)
    {
      return this.colorService.getRegionColor(statisticData.totalIssues);
    }
    else
    {
      return '';
    }
  }

  onRegionClickHandler(region: Region)
  {
    this.regionSelectEvent.emit(region);
  }

}
