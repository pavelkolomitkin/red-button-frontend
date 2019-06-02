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
import {CompanyRepresentativeCreateAccountPageComponent} from './components/account/company/company-representative-create-account-page/company-representative-create-account-page.component';
import {CompanyRepresentativeEditAccountPageComponent} from './components/account/company/company-representative-edit-account-page/company-representative-edit-account-page.component';
import {AnalystAccountCreatePageComponent} from './components/account/analyst/analyst-account-create-page/analyst-account-create-page.component';
import {AnalystAccountEditPageComponent} from './components/account/analyst/analyst-account-edit-page/analyst-account-edit-page.component';
import {AnalystListPageComponent} from './components/account/analyst/analyst-list-page/analyst-list-page.component';
import {CompanyRepresentativeListComponent} from './components/account/company/company-representative-list/company-representative-list.component';
import {ClientListPageComponent} from './components/account/client/client-list-page/client-list-page.component';
import {AccountCommonDetailsPageComponent} from './components/account/common/account-common-details-page/account-common-details-page.component';

const routes: Routes = [
    { path: '', children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                path: 'dashboard',
                component: DashboardPageComponent,
                data: {
                    pageTitle: 'HOME',
                    pageSubTitle: '',
                    breadCrumbs: [
                        new BreadCrumb('HOME', '/', 'home'),
                        new BreadCrumb('Dashboard', null, 'dashboard')
                    ]
                }
            },

            {
                path: 'complaint/list',
                component: ComplaintListPageComponent,
                data: {
                    pageTitle: 'COMPLAINTS',
                    pageSubTitle: 'LATEST',
                    breadCrumbs: [
                        new BreadCrumb('HOME', '/', 'home'),
                        new BreadCrumb('COMPLAINTS', null, 'file-text-o')
                    ]
                }
            },
            { path: 'complaint/:id', component: ComplaintDetailsPageComponent, pathMatch: 'full' },

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
            { path: 'issue/:id', component: IssueDetailsPageComponent, pathMatch: 'full' },
            {
                path: '404',
                component: NotFoundPageComponent,
                data: {

                }
            },

            {
                path: 'account/client/list',
                component: ClientListPageComponent,
                data: {
                    pageTitle: 'CLIENT_ACCOUNTS',
                    pageSubTitle: 'LATEST',
                    breadCrumbs: [
                        new BreadCrumb('HOME', '/', 'home'),
                        new BreadCrumb('CLIENT_ACCOUNTS', null, 'users'),
                    ]
                }
            },

            {
                path: 'account/company-representative/list',
                component: CompanyRepresentativeListComponent,
                data: {
                    pageTitle: 'COMPANY_REPRESENTATIVE_ACCOUNTS',
                    pageSubTitle: 'LATEST',
                    breadCrumbs: [
                        new BreadCrumb('HOME', '/', 'home'),
                        new BreadCrumb('COMPANY_REPRESENTATIVE_ACCOUNTS', null, 'users'),
                    ]
                }
            },

            {
                path: 'account/company-representative/create',
                component: CompanyRepresentativeCreateAccountPageComponent,
                data: {
                    pageTitle: 'CREATE_AN_ACCOUNT',
                    pageSubTitle: 'COMPANY_REPRESENTATIVE_ACCOUNT',
                    breadCrumbs: [
                        new BreadCrumb('HOME', '/', 'home'),
                        new BreadCrumb('ACCOUNTS', '/account/company-representative/list', 'users'),
                        new BreadCrumb('NEW_ACCOUNT', null, 'user'),
                    ]
                }
            },
            {
                path: 'account/company-representative/:id/edit',
                component: CompanyRepresentativeEditAccountPageComponent,
                data: {
                    pageTitle: 'EDIT_ACCOUNT',
                    pageSubTitle: 'COMPANY_REPRESENTATIVE_ACCOUNT',
                    breadCrumbs: [
                        new BreadCrumb('HOME', '/', 'home'),
                        new BreadCrumb('ACCOUNTS', '/account/company-representative/list', 'users'),
                        new BreadCrumb('EDIT_ACCOUNT', null, 'user'),
                    ]
                },
                pathMatch: 'full'
            },

            {
                path: 'account/analyst/list',
                component: AnalystListPageComponent,
                data: {
                    pageTitle: 'ANALYSTS',
                    pageSubTitle: 'LATEST',
                    breadCrumbs: [
                        new BreadCrumb('HOME', '/', 'home'),
                        new BreadCrumb('ANALYSTS', null, 'users'),
                    ]
                }
            },

            {
                path: 'account/analyst/create',
                component: AnalystAccountCreatePageComponent,
                data: {
                    pageTitle: 'CREATE_AN_ACCOUNT',
                    pageSubTitle: 'ANALYST_ACCOUNT',
                    breadCrumbs: [
                        new BreadCrumb('HOME', '/', 'home'),
                        new BreadCrumb('ACCOUNTS', '/account/analyst/list', 'users'),
                        new BreadCrumb('NEW_ACCOUNT', null, 'user'),
                    ]
                }
            },

            {
                path: 'account/analyst/:id/edit',
                component: AnalystAccountEditPageComponent,
                data: {
                    pageTitle: 'EDIT_ACCOUNT',
                    pageSubTitle: 'ANALYST_ACCOUNT',
                    breadCrumbs: [
                        new BreadCrumb('HOME', '/', 'home'),
                        new BreadCrumb('ACCOUNTS', '/account/analyst/list', 'users'),
                        new BreadCrumb('EDIT_ACCOUNT', null, 'user'),
                    ]
                },
                pathMatch: 'full'
            },

            {
                path: 'account/:id',
                component: AccountCommonDetailsPageComponent,
                data: {
                    pageTitle: 'ACCOUNT',
                    pageSubTitle: '',
                    breadCrumbs: [
                        new BreadCrumb('HOME', '/', 'home'),
                        new BreadCrumb('ACCOUNT', null, 'user'),
                    ]
                },
                pathMatch: 'full'
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
