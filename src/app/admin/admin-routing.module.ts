import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfilePageComponent} from './profile-page/profile-page.component';

const routes: Routes = [
    { path: '', children: [
            { path: 'profile', component: ProfilePageComponent }
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
