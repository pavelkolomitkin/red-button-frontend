import {AfterContentInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../../app.state';
import {Observable} from 'rxjs';
import {FederalDistrict} from '../../../../../core/data/model/federal-district.model';
import {ColorValueScaleService} from '../../../../services/color-value-scale.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-analyst-country-map',
  templateUrl: './country-map.component.html',
  styleUrls: ['./country-map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountryMapComponent implements OnInit {

  static OTHERS_LABEL: string = null;
  static TOTAL_LABEL: string = null;

  @Output('onDistrictSelect') districtSelectEvent: EventEmitter<FederalDistrict> = new EventEmitter();

  @Input() statistic: any;

  federalDistricts: Observable<Array<FederalDistrict>>;


  constructor(
      private store: Store<State>,
      private colorService: ColorValueScaleService,
      private translator: TranslateService
  ) {

    (async () => {

      if (!CountryMapComponent.OTHERS_LABEL || !CountryMapComponent.TOTAL_LABEL)
      {
        CountryMapComponent.OTHERS_LABEL = await this.translator.get('OTHERS').toPromise();
        CountryMapComponent.TOTAL_LABEL = await this.translator.get('TOTAL').toPromise();
      }

    })();

  }

  ngOnInit (){

    this.federalDistricts = this.store.pipe(select(state => state.federalDistrict.list));

  }

  getItemTitle = (district: FederalDistrict) =>
  {
    if (!this.statistic)
    {
      return '';
    }

    let result = district.title + '\n';

    const statisticData = (<Array<any>>this.statistic).find((item) => {
      return item.code === district.code;
    });

    if (!!statisticData)
    {

      statisticData.serviceTypes.forEach((serviceType) => {

        if (serviceType.issueNumber > 0)
        {
          result += (serviceType.title ? serviceType.title : CountryMapComponent.OTHERS_LABEL) + ': ' + serviceType.issueNumber + '\n';
        }

      });

      if (statisticData.totalIssues > 0)
      {
        result += CountryMapComponent.TOTAL_LABEL + ': ' + statisticData.totalIssues;
      }
    }

    return result;
  }

  getItemTotal(district: FederalDistrict)
  {
    if (!this.statistic)
    {
      return 0;
    }

    const statisticData = (<Array<any>>this.statistic).find((item) => {
      return item.code === district.code;
    });

    let result = 0;

    if (!!statisticData)
    {
      result = statisticData.totalIssues;
    }

    return result;
  }

  getFillColor(issueNumber: number)
  {
    return this.colorService.getFederalDistrictColor(issueNumber);
  }

  onFederalDistrictClickHandler(district: FederalDistrict)
  {
    this.districtSelectEvent.emit(district);
  }

}
