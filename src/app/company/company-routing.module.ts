import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BreadCrumb} from '../core/data/model/bread-crumb.model';
import {IssueListPageComponent} from './components/issue/issue-list-page/issue-list-page.component';
import {IssueDetailsPageComponent} from './components/issue/issue-details-page/issue-details-page.component';
import {IssueGeographyPageComponent} from './components/issue/issue-geography-page/issue-geography-page.component';
import {NotFoundPageComponent} from '../shared/components/not-found-page/not-found-page.component';
import {ComplaintDetailsPageComponent} from './components/complaint/complaint-details-page/complaint-details-page.component';

const routes: Routes = [
    {
        path: '', children: [
            { path: '', redirectTo: 'issue/list', pathMatch: 'full' },
            {
                path: 'issue/list',
                component: IssueListPageComponent,
                data: {
                    pageTitle: 'ISSUES',
                    pageSubTitle: 'LATEST',
                    breadCrumbs: [
                        new BreadCrumb('HOME', '/', 'home'),
                        new BreadCrumb('ISSUES', null, 'file-text-o')
                    ]
                }
            },
            {
                path: 'issue/geo',
                component: IssueGeographyPageComponent,
                data: {
                    pageTitle: 'ISSUES',
                    pageSubTitle: 'ON_THE_MAP',
                    breadCrumbs: [
                        new BreadCrumb('HOME', '/', 'home'),
                        new BreadCrumb('ON_THE_MAP', null, 'map-marker')
                    ]
                }
            },
            {
                path: 'issue/:id',
                component: IssueDetailsPageComponent,
                pathMatch: 'full'
            },
            {
                path: '404',
                component: NotFoundPageComponent,
                data: {

                }
            },
            {
                path: 'complaint/:id',
                component: ComplaintDetailsPageComponent,
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
export class CompanyRoutingModule {}