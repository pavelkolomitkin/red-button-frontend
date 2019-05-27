import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {RegionService} from '../../../core/services/region.service';
import {StatisticService} from '../../services/statistic.service';
import {Region} from '../../../core/data/model/region.model';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {GlobalPageTitle} from '../../../core/data/actions';

@Component({
  selector: 'app-region-statistic-page',
  templateUrl: './region-statistic-page.component.html',
  styleUrls: ['./region-statistic-page.component.css']
})
export class RegionStatisticPageComponent implements OnInit, OnDestroy {

  selectedYear: number;
  endYear: number;
  startYear: number;

  region: Region;

  statistics: any;
  dynamics: any;
  companies: any;

  routeParamsSubscription: Subscription;

  constructor(
      private regionService: RegionService,
      private statisticService: StatisticService,
      private router: Router,
      private route: ActivatedRoute,
      private store: Store<State>
  ) { }

  ngOnInit() {

    const currentData = new Date()
    this.selectedYear = currentData.getFullYear();
    this.endYear = currentData.getFullYear();
    this.startYear = environment.statisticsStartYear;

    this.routeParamsSubscription = this.route.params.subscribe(async (params) => {

      if (!params['year'])
      {
        this.router.navigateByUrl('/analytics/statistic/region/' + params['id'] + '/' + this.selectedYear);
        return;
      }

      this.selectedYear = +params['year'];

      if (!this.region || (this.region.id !== +params['id']))
      {
        try
        {
          this.region = await this.regionService.get(+params['id']).toPromise();
        }
        catch (e) {
          this.router.navigateByUrl('/analytics/404');
        }
      }

      this.store.dispatch(new GlobalPageTitle(this.region.title, this.region.federalDistrict.title));

      const statistics = this.statisticService.getRegionServiceTypeIssueNumbers(this.region, this.selectedYear).toPromise();
      const dynamics = this.statisticService.getRegionServiceTypeIssueNumberDynamic(this.region, this.selectedYear).toPromise();
      const companies = this.statisticService.getRegionPopularCompanies(this.region, this.selectedYear).toPromise();

      this.statistics = await statistics;
      this.dynamics = await dynamics;
      this.companies = await companies;
    });
  }

  ngOnDestroy(): void {

    this.routeParamsSubscription.unsubscribe();

  }

}
