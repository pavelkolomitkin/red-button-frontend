import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {StatisticService} from '../../services/statistic.service';
import {ServiceType} from '../../../core/data/model/service-type.model';

@Component({
  selector: 'app-common-country-statistic-page',
  templateUrl: './common-country-statistic-page.component.html',
  styleUrls: ['./common-country-statistic-page.component.css']
})
export class CommonCountryStatisticPageComponent implements OnInit, OnDestroy {

  static DEFAULT_YEAR_RANGE = 2;

  selectedYear: number;
  startYear: number;
  endYear: number;

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

    this.paramSubscription = this.route.params.subscribe((params) => {

      if (!params['year'])
      {
        this.router.navigateByUrl('/analytics/statistic/common/' + currentDate.getFullYear());
        return;
      }
      else
      {
        this.selectedYear = +params['year'];
      }

      this.startYear = currentDate.getFullYear() - CommonCountryStatisticPageComponent.DEFAULT_YEAR_RANGE;
      this.endYear = currentDate.getFullYear();

      this.service.getCountryServiceTypeIssueNumbers(this.selectedYear)
          .toPromise()
          .then(({ statistics, year }) => {

            //console.log(statistics);
            // { common, byFederalDistricts }
            this.calculateServiceTypePercentage(statistics.common);
            this.statistics = statistics;

          })
          .catch((error) => {
            console.log(error);
          });

      this.service.getCountryServiceTypeIssueNumberDynamic(this.selectedYear)
          .toPromise()
          .then((data) => {

            this.statisticsDynamic = data;

            //console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });

    });

  }

  ngOnDestroy(): void {

    this.paramSubscription.unsubscribe();

  }

  calculateServiceTypePercentage(commonStatistic: Array<{ issueNumber: number, serviceType: ServiceType, percentage?: number }>)
  {
    let totalIssues: number = 0;

    commonStatistic.forEach((item) => {

      totalIssues += item.issueNumber;

    });

    commonStatistic.forEach((item) => {

      if (totalIssues > 0)
      {
        item.percentage = (item.issueNumber * 100 / totalIssues);
      }
      else
      {
        item.percentage = 0;
      }

    });

  }

}
