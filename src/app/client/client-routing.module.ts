import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfilePageComponent} from './components/profile-page/profile-page.component';
import {ComplaintListPageComponent} from './components/complaint-list-page/complaint-list-page.component';
import {ComplaintCreatePageComponent} from './components/complaint-create-page/complaint-create-page.component';
import {ComplaintEditPageComponent} from './components/complaint-edit-page/complaint-edit-page.component';
import {ComplaintDetailsPageComponent} from './components/complaint-details-page/complaint-details-page.component';
import {BreadCrumb} from '../core/data/model/bread-crumb.model';


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
                data: {
                    pageTitle: 'Edit Complaint',
                    pageSubTitle: '',
                    breadCrumbs: [
                        new BreadCrumb('Home', '/', 'home'),
                        new BreadCrumb('Edit Complaint', null, 'edit')
                    ]
                }
            },
            { path: 'complaint/:id', component: ComplaintDetailsPageComponent, pathMatch: 'full' },
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
