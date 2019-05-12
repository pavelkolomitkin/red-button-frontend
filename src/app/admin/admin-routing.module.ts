import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfilePageComponent} from './components/profile-page/profile-page.component';
import {ComplaintListPageComponent} from './components/complaint/complaint-list-page/complaint-list-page.component';
import {ComplaintDetailsPageComponent} from './components/complaint/complaint-details-page/complaint-details-page.component';
import {IssueListPageComponent} from './components/issue/issue-list-page/issue-list-page.component';
import {IssueDetailsPageComponent} from './components/issue/issue-details-page/issue-details-page.component';
import {DashboardPageComponent} from './components/dashboard/dashboard-page/dashboard-page.component';
import {BreadCrumb} from '../core/data/model/bread-crumb.model';
import {NotFoundPageComponent} from '../shared/components/not-found-page/not-found-page.component';

const routes: Routes = [
    { path: '', children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                path: 'profile',
                component: ProfilePageComponent,
                data: {
                    pageTitle: 'Profile',
                    pageSubTitle: '',
                    breadCrumbs: [
                        new BreadCrumb('Home', '/', 'home'),
                        new BreadCrumb('My Profile', null, 'user')
                    ]
                }

            },

            {
                path: 'dashboard',
                component: DashboardPageComponent,
                data: {
                    pageTitle: 'Dashboard',
                    pageSubTitle: '',
                    breadCrumbs: [
                        new BreadCrumb('Home', '/', 'home'),
                        new BreadCrumb('Dashboard', null, 'dashboard')
                    ]
                }
            },

            {
                path: 'complaint/list',
                component: ComplaintListPageComponent,
                data: {
                    pageTitle: 'Complaints',
                    pageSubTitle: 'latest',
                    breadCrumbs: [
                        new BreadCrumb('Home', '/', 'home'),
                        new BreadCrumb('Complaints', null, 'file-text-o')
                    ]
                }
            },
            { path: 'complaint/:id', component: ComplaintDetailsPageComponent, pathMatch: 'full' },

            {
                path: 'issue/list',
                component: IssueListPageComponent,
                data: {
                    pageTitle: 'Issues',
                    pageSubTitle: 'latest',
                    breadCrumbs: [
                        new BreadCrumb('Home', '/', 'home'),
                        new BreadCrumb('Issues', null, 'file-text-o')
                    ]
                }
            },
            { path: 'issue/:id', component: IssueDetailsPageComponent, pathMatch: 'full' },
            {
                path: '404',
                component: NotFoundPageComponent,
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
export class AdminRoutingModule {}
