import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {
  USER_INITIALIZE_ERROR,
  USER_INITIALIZE_START, USER_INITIALIZE_SUCCESS,
  USER_LOGIN_START,
  USER_LOGIN_SUCCESS, USER_LOGOUT,
  UserInitializeError, UserInitializeStart,
  UserInitializeSuccess,
  UserLoginError,
  UserLoginStart,
  UserLoginSuccess
} from '../actions';
import {mergeMap, catchError, map, tap} from 'rxjs/operators';
import { SecurityService } from '../../services/security.service';
import User from '../../../core/data/model/user.model';
import {State} from '../../../core/data/reducer';
import {GlobalProgressHide, GlobalProgressShow} from '../../../core/data/actions';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../../core/services/local-storage.service';
import {NgxPermissionsService} from 'ngx-permissions';


@Injectable()
export class AuthEffects
{
    /*
    possibleUserRoles = [
        'ROLE_CLIENT_USER',
        'ROLE_ADMIN_USER'
    ];
    userRoleProfileRouteMap = {
        'ROLE_CLIENT_USER': '/client/profile',
        'ROLE_ADMIN_USER': '/admin/profile',
    };
*/

  @Effect()
  loginStart: Observable<Action> = this.actions.pipe(
    ofType(USER_LOGIN_START),
    tap((action) => {
      this.store.dispatch(new GlobalProgressShow());
    }),
    mergeMap((action: UserLoginStart) => {

      const { credentials } = action;

      return this.service.login(credentials).pipe(
        map((token: string) => {
          return new UserLoginSuccess(token);
        }),
        catchError((errors) => {
          return of(new UserLoginError(errors.error));
        })
      );

    }),
    tap((result) => {
      this.store.dispatch(new GlobalProgressHide());
    })
  );

  @Effect()
  loginSuccess: Observable<Action> = this.actions.pipe(
    ofType(USER_LOGIN_SUCCESS),
    tap((action: UserLoginSuccess) => {
      this.localStorageService.set('token', action.token);
      this.store.dispatch(new GlobalProgressShow());
    }),

    mergeMap((action: UserLoginSuccess) => {

      return this.service.getAuthorizedUser().pipe(
        map((user: User) => {
          return new UserInitializeSuccess(user, this.localStorageService.get('token'));
        }),
        catchError((errors: Object) => {
          return of(new UserInitializeError(errors));
        })
      );
    }),
    tap((result) => {
      this.store.dispatch(new GlobalProgressHide());
    })
  );

  @Effect()
  initializeUserStart: Observable<Action> = this.actions.pipe(
    ofType(USER_INITIALIZE_START),
    mergeMap((action: UserInitializeStart) => {

      return this.service.getAuthorizedUser().pipe(
        map((user: User) => {
          return new UserInitializeSuccess(user, this.localStorageService.get('token'));
        }),
        catchError((errors: Object) => {
          return of(new UserInitializeError(errors));
        })
      );
    })
  );

  @Effect({dispatch: false})
  logout: Observable<Action> = this.actions.pipe(
    ofType(USER_LOGOUT),
    tap(() => {
      this.localStorageService.remove('token');
      this.permissionService.loadPermissions([]);
      this.router.navigate(['/security', 'login']);
    })
  );

  @Effect({ dispatch: false })
  initializeSuccess: Observable<Action> = this.actions.pipe(
      ofType(USER_INITIALIZE_SUCCESS),
      tap((action:UserInitializeSuccess) => {

        const { user: { roles } } = action;

        this.permissionService.loadPermissions(roles);
/*
        for (let role of this.possibleUserRoles)
        {
            if (roles.includes(role))
            {
                this.router.navigateByUrl(this.userRoleProfileRouteMap[role]);
                return;
            }
        }

          this.router.navigateByUrl('/');*/
      })
  );

  @Effect({ dispatch: false })
  initializeError: Observable<Action> = this.actions.pipe(
      ofType(USER_INITIALIZE_ERROR),
      tap(() => {
        this.permissionService.loadPermissions([]);
        this.router.navigate(['/security', 'login']);
      })
  );

  constructor(
    private actions: Actions,
    private service: SecurityService,
    private store: Store<State>,
    private router: Router,
    private localStorageService: LocalStorageService,
    private permissionService: NgxPermissionsService
  ) {}
}
