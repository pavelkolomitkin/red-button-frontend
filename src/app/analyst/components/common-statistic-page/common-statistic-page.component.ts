import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {combineLatest, Subscription} from 'rxjs';
import {StatisticService} from '../../services/statistic.service';
import {ServiceType} from '../../../core/data/model/service-type.model';
import {FederalDistrict} from '../../../core/data/model/federal-district.model';
import {Region} from '../../../core/data/model/region.model';
import {select, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {GlobalPageTitle} from '../../../core/data/actions';
import {filter, withLatestFrom} from 'rxjs/operators';

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

  districtList: Array<FederalDistrict> = [];

  statistics: { common: any, byFederalDistricts: any };
  statisticsDynamic: any;

  paramSubscription: Subscription;
  districtsSubscription: Subscription;
  routeParamsSubscription: Subscription;

  constructor(
      private store: Store<State>,
      private route: ActivatedRoute,
      private router: Router,
      private service: StatisticService
      ) { }

  ngOnInit() {

    const currentDate = new Date();

    this.paramSubscription = this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        withLatestFrom(this.route.params, this.route.queryParams)
    ).subscribe(([event, params, queryParams]) => {

      this.onInitPage(params, queryParams);

    });

    this.districtsSubscription = this.store.pipe(
        select(state => state.federalDistrict.list),
        filter(result => result.length > 0)
    ).subscribe((list) => {
          this.districtList = list;
          this.updatePageHeader();
        });

    const { params, queryParams } = this.route.snapshot;
    this.onInitPage(params, queryParams);

  }

  onInitPage = (params, queryParams) =>
  {
    const currentDate = new Date();

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
    this.updatePageHeader();
    if (!!this.federalDistrictId)
    {
      this.service.getFederalDistrictServiceTypeIssueNumbers(this.federalDistrictId, this.selectedYear)
          .toPromise()
          .then(({ statistics, year }) => {

            // { common, byRegions }
            this.statistics = statistics;
            //this.updatePageHeader();
          });

      this.service.getFederalDistrictServiceTypeIssueNumberDynamic(this.federalDistrictId, this.selectedYear)
          .toPromise()
          .then((data) => {

            this.statisticsDynamic = data;
            //this.updatePageHeader();

          });
    }
    else
    {
      this.service.getCountryServiceTypeIssueNumbers(this.selectedYear)
          .toPromise()
          .then(({ statistics, year }) => {

            this.statistics = statistics;

            //this.updatePageHeader();
          });

      this.service.getCountryServiceTypeIssueNumberDynamic(this.selectedYear)
          .toPromise()
          .then((data) => {

            this.statisticsDynamic = data;
            //this.updatePageHeader();
          });
    }
  }

  updatePageHeader = () =>
  {
    let pageTitle: string = 'Россия';

    if (!!this.federalDistrictId)
    {
      const district = this.districtList.find(item => item.id === this.federalDistrictId);
      if (!!district)
      {
        pageTitle += ' - ' + district.title;
      }
    }

    this.store.dispatch(new GlobalPageTitle(pageTitle));
  }

  ngOnDestroy(): void {

    this.paramSubscription.unsubscribe();
    this.districtsSubscription.unsubscribe();
  }

  onDistrictSelectHandler(district: FederalDistrict)
  {
    this.router.navigateByUrl('/analytics/statistic/common/' + this.selectedYear + '?fd=' + district.id);
  }

  onRegionSelectHandler(region: Region)
  {
    this.router.navigateByUrl('/analytics/statistic/region/' + region.id);
  }

}
