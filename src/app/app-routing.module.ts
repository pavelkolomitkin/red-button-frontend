import {NgModule} from "@angular/core";
import {RouterModule, Routes} from '@angular/router';
import {NotFoundPageComponent} from './shared/components/not-found-page/not-found-page.component';
import {AuthUserGuardService} from "./security/services/guards/auth-user-guard.service";
import {DefaultRedirectGuard} from './security/services/guards/default-redirect-guard.service';
import {AppSecurityLayoutComponent} from './components/app-security-layout/app-security-layout.component';
import {AppLayoutComponent} from './components/app-layout/app-layout.component';

const routes: Routes = [
    { path: 'security', component:AppSecurityLayoutComponent,  loadChildren: './security/security.module#SecurityModule' },
    { path: 'client', component: AppLayoutComponent,  loadChildren: './client/client.module#ClientModule', canActivate: [AuthUserGuardService]},
    { path: 'admin', component: AppLayoutComponent, loadChildren: './admin/admin.module#AdminModule', canActivate: [AuthUserGuardService]},
    { path: 'company', component: AppLayoutComponent, loadChildren: './company/company.module#CompanyModule', canActivate: [AuthUserGuardService] },
    { path: 'analytics', component: AppLayoutComponent, loadChildren: './analyst/analyst.module#AnalystModule', canActivate: [AuthUserGuardService] },
    { path: '', component: AppLayoutComponent, canActivate: [DefaultRedirectGuard], pathMatch: 'full', children: [] },
    { path: '404', component: NotFoundPageComponent },
    { path: '**', redirectTo: '404', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
