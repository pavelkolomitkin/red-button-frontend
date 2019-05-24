import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest, Subscription} from 'rxjs';
import {StatisticService} from '../../services/statistic.service';
import {ServiceType} from '../../../core/data/model/service-type.model';

@Component({
  selector: 'app-analyst-common-statistic-page',
  templateUrl: './common-statistic-page.component.html',
  styleUrls: ['./common-statistic-page.component.css']
})
export class CommonStatisticPageComponent implements OnInit, OnDestroy {

  static DEFAULT_YEAR_RANGE = 2;

  selectedYear: number;
  startYear: number;
  endYear: number;
  federalDistrictId: number;

  statistics: { common: any, byFederalDistricts: any };
  statisticsDynamic: any;

  paramSubscription: Subscription;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private service: StatisticService
      ) { }

  ngOnInit() {

    const currentDate = new Date();

    this.paramSubscription = combineLatest(this.route.params, this.route.queryParams)
        .subscribe(([params, queryParams]) => {

      this.federalDistrictId = !!queryParams ? +queryParams['fd'] : undefined;

      if (!params['year'])
      {
        this.router.navigateByUrl('/analytics/statistic/common/' + currentDate.getFullYear());
        return;
      }
      else
      {
        this.selectedYear = +params['year'];
      }

      this.startYear = currentDate.getFullYear() - CommonStatisticPageComponent.DEFAULT_YEAR_RANGE;
      this.endYear = currentDate.getFullYear();

      if (!!this.federalDistrictId)
      {
        this.service.getFederalDistrictServiceTypeIssueNumbers(this.federalDistrictId, this.selectedYear)
            .toPromise()
            .then(({ statistics, year }) => {

              // { common, byRegions }
              this.statistics = statistics;
            });

        this.service.getFederalDistrictServiceTypeIssueNumberDynamic(this.federalDistrictId, this.selectedYear)
            .toPromise()
            .then((data) => {

              this.statisticsDynamic = data;

            });
      }
      else
      {
        this.service.getCountryServiceTypeIssueNumbers(this.selectedYear)
            .toPromise()
            .then(({ statistics, year }) => {

              //console.log(statistics);
              // { common, byFederalDistricts }

              this.statistics = statistics;

            });

        this.service.getCountryServiceTypeIssueNumberDynamic(this.selectedYear)
            .toPromise()
            .then((data) => {

              this.statisticsDynamic = data;

              //console.log(data);
            });
      }



    });

  }

  ngOnDestroy(): void {

    this.paramSubscription.unsubscribe();

  }

}
