import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

import {NgxPermissionsService} from 'ngx-permissions';

@Injectable()
export class AuthUserGuard implements CanActivate, CanActivateChild {

  static routePermissionRules: { [s: string]: Array<string> } = {
      admin: [ 'ROLE_ADMIN' ],
      client: [ 'ROLE_CLIENT' ]
  };

  constructor(
      private router: Router,
      private permissionService: NgxPermissionsService
      ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.getAuthChecker(route);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.getAuthChecker(childRoute);
  }


  private getAuthChecker(route: ActivatedRouteSnapshot)
  {
      return new Promise<boolean>((resolve, reject) => {

          let result: boolean = false;

          const urlPrefix = route.url[0].toString();
          const routeRoles = AuthUserGuard.routePermissionRules[urlPrefix];

          const permissions = this.permissionService.getPermissions();
          for (let role in permissions)
          {
              result = routeRoles.includes(role);
              if (result)
              {
                  break;
              }
          }

          resolve(result);
      });
  }
}
