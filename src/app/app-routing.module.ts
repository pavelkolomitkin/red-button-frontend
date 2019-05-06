import {NgModule} from "@angular/core";
import {RouterModule, Routes} from '@angular/router';
import {NotFoundPageComponent} from './core/components/not-found-page/not-found-page.component';
import {AuthUserGuardService} from "./security/services/guards/auth-user-guard.service";
import {DefaultRedirectGuard} from './security/services/guards/default-redirect-guard.service';

const routes: Routes = [
    { path: 'security', loadChildren: './security/security.module#SecurityModule' },
    { path: 'client', loadChildren: './client/client.module#ClientModule', canActivate: [AuthUserGuardService]},
    { path: 'admin', loadChildren: './admin/admin.module#AdminModule', canActivate: [AuthUserGuardService]},
    { path: '', canActivate: [DefaultRedirectGuard], pathMatch: 'full', children: [] },
    { path: '404', component: NotFoundPageComponent },
    { path: '**', redirectTo: '404', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
