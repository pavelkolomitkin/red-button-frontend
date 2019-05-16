import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfilePageComponent} from './components/profile-page/profile-page.component';
import {BreadCrumb} from '../core/data/model/bread-crumb.model';
import {IssueListPageComponent} from './components/issue/issue-list-page/issue-list-page.component';
import {IssueDetailsPageComponent} from './components/issue/issue-details-page/issue-details-page.component';
import {IssueGeographyPageComponent} from './components/issue/issue-geography-page/issue-geography-page.component';

const routes: Routes = [
    {
        path: '', children: [
            { path: '', redirectTo: 'issue/list', pathMatch: 'full' },
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
            {
                path: 'issue/geo',
                component: IssueGeographyPageComponent,
                data: {
                    pageTitle: 'Issues',
                    pageSubTitle: 'map',
                    breadCrumbs: [
                        new BreadCrumb('Home', '/', 'home'),
                        new BreadCrumb('Issue Geography', null, 'map-marker')
                    ]
                }
            },
            {
                path: 'issue/:id',
                component: IssueDetailsPageComponent,
                pathMatch: 'full'
            },

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