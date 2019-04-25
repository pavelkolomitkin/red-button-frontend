import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfilePageComponent} from './components/profile-page/profile-page.component';
import {ComplaintListPageComponent} from './components/complaint-list-page/complaint-list-page.component';
import {ComplaintCreatePageComponent} from './components/complaint-create-page/complaint-create-page.component';
import {ComplaintEditPageComponent} from './components/complaint-edit-page/complaint-edit-page.component';
import {ComplaintDetailsPageComponent} from './components/complaint-details-page/complaint-details-page.component';


const routes: Routes = [
    { path: '', children:
        [
            { path: '', redirectTo: 'profile', pathMatch: 'full' },
            { path: 'profile', component: ProfilePageComponent},
            { path: 'complaint/list', component: ComplaintListPageComponent },
            { path: 'complaint/create', component: ComplaintCreatePageComponent },
            { path: 'complaint/:id/edit', component: ComplaintEditPageComponent },
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
