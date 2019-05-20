import {Component, Input, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../../app.state';
import {Observable} from 'rxjs';
import {FederalDistrict} from '../../../../../core/data/model/federal-district.model';

@Component({
  selector: 'app-analyst-country-map',
  templateUrl: './country-map.component.html',
  styleUrls: ['./country-map.component.css']
})
export class CountryMapComponent implements OnInit {

  @Input() statistic: any;

  federalDistricts: Observable<Array<FederalDistrict>>;

  constructor(private store: Store<State>) { }

  ngOnInit() {

    this.federalDistricts = this.store.pipe(select(state => state.federalDistrict.list));

  }

  getItemTitle(district: FederalDistrict)
  {
    let result = district.title + '\n';

    const statisticData = (<Array<any>>this.statistic).find((item) => {
      return item.code === district.code;
    });


    if (!!statisticData)
    {
      let totalIssue = 0;

      statisticData.serviceTypes.forEach((serviceType) => {

        if (serviceType.issueNumber > 0)
        {
          result += (serviceType.title ? serviceType.title : 'Others') + ': ' + serviceType.issueNumber + '\n';

          totalIssue += serviceType.issueNumber;
        }

      });

      if (totalIssue > 0)
      {
        result += 'Total: ' + totalIssue;
      }

    }

    return result;
  }

}
