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


const routes: Routes = [
    { path: '', children:
        [
            { path: '', redirectTo: 'profile', pathMatch: 'full' },
            {
                path: 'profile',
                component: ProfilePageComponent,
                data: {
                    pageTitle: 'Profile',
                    pageSubTitle: '',
                    breadCrumbs: [
                        new BreadCrumb('Home', '/', 'home'),
                        new BreadCrumb('Profile', null, 'user')
                    ]
                }
            },
            {
                path: 'complaint/list',
                component: ComplaintListPageComponent,
                data: {
                    pageTitle: 'My Complaints',
                    pageSubTitle: 'latest',
                    breadCrumbs: [
                        new BreadCrumb('Home', '/', 'home'),
                        new BreadCrumb('My Complaints', null, 'file-text-o')
                    ]
                }
            },
            {
                path: 'complaint/create',
                component: ComplaintCreatePageComponent,
                canDeactivate: [ConfirmLeavePageGuardService],
                data: {
                    pageTitle: 'New Complaint',
                    pageSubTitle: '',
                    breadCrumbs: [
                        new BreadCrumb('Home', '/', 'home'),
                        new BreadCrumb('Add Complaint', null, 'file-text-o')
                    ]
                }
            },
            {
                path: 'complaint/:id/edit',
                component: ComplaintEditPageComponent,
                canDeactivate: [ConfirmLeavePageGuardService],
                data: {
                    pageTitle: 'Edit Complaint',
                    pageSubTitle: '',
                    breadCrumbs: [
                        new BreadCrumb('Home', '/', 'home'),
                        new BreadCrumb('Edit Complaint', null, 'edit')
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
                    pageTitle: 'New Issue',
                    pageSubTitle: '',
                    breadCrumbs: [
                        new BreadCrumb('Home', '/', 'home'),
                        new BreadCrumb('Add Issue', null, 'file-text-o')
                    ]
                }
            },

            {
                path: 'issue/:id/edit',
                component: EditIssuePageComponent,
                canDeactivate: [ConfirmLeavePageGuardService],
                data: {
                    pageTitle: 'Edit Issue',
                    pageSubTitle: '',
                    breadCrumbs: [
                        new BreadCrumb('Home', '/', 'home'),
                        new BreadCrumb('Edit Issue', null, 'file-edit')
                    ]
                }
            },

            {
                path: 'issue/list',
                component: IssueListPageComponent,
                data: {
                    pageTitle: 'My Issues',
                    pageSubTitle: 'latest',
                    breadCrumbs: [
                        new BreadCrumb('Home', '/', 'home'),
                        new BreadCrumb('My Issues', null, 'file-edit')
                    ]
                }
            },

            {
                path: 'issue/:id',
                component: IssueDetailsPageComponent,
                data: {
                    pageTitle: 'Issue',
                    pageSubTitle: '',
                    breadCrumbs: [
                        new BreadCrumb('Home', '/', 'home'),
                        new BreadCrumb('Issue', null, 'file-text-o')
                    ]
                }
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
export class ClientRoutingModule {}
