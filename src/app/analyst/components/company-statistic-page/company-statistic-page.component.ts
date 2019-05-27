import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {StatisticService} from '../../services/statistic.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Company} from '../../../core/data/model/company.model';
import {Issue} from '../../../core/data/model/issue.model';
import {environment} from '../../../../environments/environment';
import {Subscription} from 'rxjs';
import {GlobalPageTitle} from '../../../core/data/actions';
import {CompanyService} from '../../services/company.service';

@Component({
  selector: 'app-company-statistic-page',
  templateUrl: './company-statistic-page.component.html',
  styleUrls: ['./company-statistic-page.component.css']
})
export class CompanyStatisticPageComponent implements OnInit, OnDestroy {

  selectedYear: number;
  endYear: number;
  startYear: number;

  company: Company;

  statistics: any;
  dynamics: any;
  popularIssues: Array<Issue>;

  routeParamsSubscription: Subscription;

  constructor(
      private store: Store<State>,
      private companyService: CompanyService,
      private statisticService: StatisticService,
      private router: Router,
      private route: ActivatedRoute
  ) { }

  ngOnInit() {

    const currentData = new Date()
    this.selectedYear = currentData.getFullYear();
    this.endYear = currentData.getFullYear();
    this.startYear = environment.statisticsStartYear;

    this.routeParamsSubscription = this.route.params.subscribe(async (params) => {

      if (!params['year'])
      {
        this.router.navigateByUrl('/analytics/statistic/company/' + params['id'] + '/' + this.selectedYear);
        return;
      }

      this.selectedYear = +params['year'];

      if (!this.company || (this.company.id !== +params['id']))
      {
        try
        {
          this.company = await this.companyService.get(+params['id']).toPromise();
        }
        catch (e)
        {
          this.router.navigateByUrl('/analytics/404');
        }
      }

      this.store.dispatch(new GlobalPageTitle(this.company.title, this.company.legalFormText));

      const statistics = this.statisticService.getCompanyServiceTypeIssueNumbers(this.company, this.selectedYear).toPromise();
      const dynamics = this.statisticService.getCompanyServiceTypeIssueNumberDynamic(this.company, this.selectedYear).toPromise();

      this.statistics = await statistics;
      this.dynamics = await dynamics;

    });

  }

  ngOnDestroy(): void {

    this.routeParamsSubscription.unsubscribe();

  }

}
