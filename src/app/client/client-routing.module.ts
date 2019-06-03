import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfilePageComponent} from './components/profile-page/profile-page.component';
import {ComplaintListPageComponent} from './components/complaint/complaint-list-page/complaint-list-page.component';
import {ComplaintCreatePageComponent} from './components/complaint/complaint-create-page/complaint-create-page.component';
import {ComplaintEditPageComponent} from './components/complaint/complaint-edit-page/complaint-edit-page.component';
import {ComplaintDetailsPageComponent} from './components/complaint/complaint-details-page/complaint-details-page.component';
import {BreadCrumb} from '../core/data/model/bread-crumb.model';
import {CreateIssuePageComponent} from './components/issue/create-issue-page/create-issue-page.component';
import {IssueListPageComponent} from './components/issue/issue-list-page/issue-list-page.component';
import {IssueDetailsPageComponent} from './components/issue/issue-details-page/issue-details-page.component';
import {EditIssuePageComponent} from './components/issue/edit-issue-page/edit-issue-page.component';
import {ConfirmLeavePageGuardService} from '../core/services/guards/confirm-leave-page-guard.service';
import {NotFoundPageComponent} from '../shared/components/not-found-page/not-found-page.component';
import {GeographyPageComponent} from './components/geography/geography-page/geography-page.component';


const routes: Routes = [
    { path: '', children:
        [
            { path: '', redirectTo: 'profile', pathMatch: 'full' },
            {
                path: 'geo',
                component: GeographyPageComponent,
                data: {
                    pageTitle: 'MAP',
                    pageSubTitle: '',
                    breadCrumbs: [
                        new BreadCrumb('HOME', '/', 'home'),
                        new BreadCrumb('MAP', null, 'map-marker')
                    ]
                }
            },
            {
                path: 'profile',
                component: ProfilePageComponent,
                data: {
                    pageTitle: 'PROFILE',
                    pageSubTitle: '',
                    breadCrumbs: [
                        new BreadCrumb('HOME', '/', 'home'),
                        new BreadCrumb('PROFILE', null, 'user')
                    ]
                }
            },
            {
                path: 'complaint/list',
                component: ComplaintListPageComponent,
                data: {
                    pageTitle: 'MY_COMPLAINTS',
                    pageSubTitle: 'LATEST',
                    breadCrumbs: [
                        new BreadCrumb('HOME', '/', 'home'),
                        new BreadCrumb('MY_COMPLAINTS', null, 'file-text-o')
                    ]
                }
            },
            {
                path: 'complaint/create',
                component: ComplaintCreatePageComponent,
                canDeactivate: [ConfirmLeavePageGuardService],
                data: {
                    pageTitle: 'DESCRIBE_A_PROBLEM',
                    pageSubTitle: '',
                    breadCrumbs: [
                        new BreadCrumb('HOME', '/', 'home'),
                        new BreadCrumb('TO_COMPLAIN', null, 'file-text-o')
                    ]
                }
            },
            {
                path: 'complaint/:id/edit',
                component: ComplaintEditPageComponent,
                canDeactivate: [ConfirmLeavePageGuardService],
                data: {
                    pageTitle: 'EDIT_COMPLAINT',
                    pageSubTitle: '',
                    breadCrumbs: [
                        new BreadCrumb('HOME', '/', 'home'),
                        new BreadCrumb('EDIT_COMPLAINT', null, 'edit')
                    ]
                }
            },
            {
                path: 'complaint/:id',
                component: ComplaintDetailsPageComponent,
                pathMatch: 'full'
            },

            {
                path: 'issue/create',
                component: CreateIssuePageComponent,
                canDeactivate: [ConfirmLeavePageGuardService],
                data: {
                    pageTitle: 'NEW_ISSUE',
                    pageSubTitle: '',
                    breadCrumbs: [
                        new BreadCrumb('HOME', '/', 'home'),
                        new BreadCrumb('NEW_ISSUE', null, 'file-text-o')
                    ]
                }
            },

            {
                path: 'issue/:id/edit',
                component: EditIssuePageComponent,
                canDeactivate: [ConfirmLeavePageGuardService],
                data: {
                    pageTitle: 'EDIT_ISSUE',
                    pageSubTitle: '',
                    breadCrumbs: [
                        new BreadCrumb('HOME', '/', 'home'),
                        new BreadCrumb('EDIT_ISSUE', null, 'file-edit')
                    ]
                }
            },

            {
                path: 'issue/list',
                component: IssueListPageComponent,
                data: {
                    pageTitle: 'MY_ISSUES',
                    pageSubTitle: 'LATEST',
                    breadCrumbs: [
                        new BreadCrumb('HOME', '/', 'home'),
                        new BreadCrumb('MY_ISSUES', null, 'file-edit')
                    ]
                }
            },

            {
                path: 'issue/:id',
                component: IssueDetailsPageComponent,
                data: {
                    pageTitle: 'ISSUE',
                    pageSubTitle: '',
                    breadCrumbs: [
                        new BreadCrumb('HOME', '/', 'home'),
                        new BreadCrumb('ISSUE', null, 'file-text-o')
                    ]
                }
            },

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
export class ClientRoutingModule {}
