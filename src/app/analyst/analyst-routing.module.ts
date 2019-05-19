import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonCountryStatisticPageComponent} from './components/common-country-statistic-page/common-country-statistic-page.component';
import {BreadCrumb} from '../core/data/model/bread-crumb.model';
import {FederalDistrictStatisticPageComponent} from './components/federal-district-statistic-page/federal-district-statistic-page.component';

const routes: Routes = [
    {
        path: '', children: [
            { path: '', redirectTo: 'statistic/common', pathMatch: 'full' },
            {
                path: 'statistic/common',
                component: CommonCountryStatisticPageComponent,
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
                path: 'statistic/federal-district/:id',
                component: FederalDistrictStatisticPageComponent,
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