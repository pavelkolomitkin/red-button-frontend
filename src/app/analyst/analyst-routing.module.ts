import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonStatisticPageComponent} from './components/common-statistic-page/common-statistic-page.component';
import {BreadCrumb} from '../core/data/model/bread-crumb.model';
import {RegionStatisticPageComponent} from './components/region-statistic-page/region-statistic-page.component';
import {CompanyStatisticPageComponent} from './components/company-statistic-page/company-statistic-page.component';

const routes: Routes = [
    {
        path: '', children: [
            { path: '', redirectTo: 'statistic/common', pathMatch: 'full' },
            {
                path: 'statistic/common',
                component: CommonStatisticPageComponent,
                data: {
                    pageTitle: 'Россия',
                    pageSubTitle: '',
                    breadCrumbs: [
                        new BreadCrumb('Home', '/', 'home'),
                        new BreadCrumb('Country', null, 'bar-chart')
                    ]
                }
            },
            {
                path: 'statistic/common/:year',
                component: CommonStatisticPageComponent,
                data: {
                    // pageTitle: 'Россия',
                    // pageSubTitle: '',
                    breadCrumbs: [
                        new BreadCrumb('Home', '/', 'home'),
                        new BreadCrumb('Statistics', null, 'bar-chart')
                    ]
                }
            },
            {
                path: 'statistic/region/:id',
                component: RegionStatisticPageComponent,
                data: {

                }
            },
            {
                path: 'statistic/region/:id/:year',
                component: RegionStatisticPageComponent,
                data: {

                }
            },
            {
                path: 'statistic/company/:id',
                component: CompanyStatisticPageComponent,
                data: {

                }
            },
            {
                path: 'statistic/company/:id/:year',
                component: CompanyStatisticPageComponent,
                data: {

                }
            }

        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AnalystRoutingModule {}