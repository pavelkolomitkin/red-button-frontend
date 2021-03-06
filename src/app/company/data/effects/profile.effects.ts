import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {CommonInfoService} from '../../services/common-info.service';
import {environment} from '../../../../environments/environment';
import {
    COMPANY_MODULE_INITIALIZED,
    PROFILE_GET_COMMON_INFO_START, ProfileGetCommonInfoError,
    ProfileGetCommonInfoReset,
    ProfileGetCommonInfoStart,
    ProfileGetCommonInfoSuccess
} from '../profile.actions';
import {Observable, of} from 'rxjs';
import {USER_INITIALIZE_SUCCESS, USER_LOGOUT, UserInitializeSuccess} from '../../../security/data/actions';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {ProfileCommonInfo} from '../model/profile-common-info.model';

@Injectable()
export class ProfileEffects
{
    @Effect()
    commonInfoGetStart: Observable<Action> = this.actions.pipe(
        ofType(PROFILE_GET_COMMON_INFO_START),
        mergeMap((action: ProfileGetCommonInfoStart) => {

            return this.service.getInfo().pipe(
                map((info: ProfileCommonInfo) => {
                    return new ProfileGetCommonInfoSuccess(info);
                }),
                catchError((errors) => {
                    return of(new ProfileGetCommonInfoError(errors.error.errors));
                })
            );
        })
    );


    @Effect({ dispatch: false })
    userLogout: Observable<Action> = this.actions.pipe(
        ofType(
            USER_LOGOUT
        ),
        tap(() => {

            this.toggleGettingProfileInfoInterval(false);
            this.store.dispatch(new ProfileGetCommonInfoReset());

        })
    );

    @Effect({ dispatch: false })
    userInitialize: Observable<Action> = this.actions.pipe(
        ofType(
            USER_INITIALIZE_SUCCESS
        ),
        tap((action: UserInitializeSuccess) => {
            if (action.user.isCompanyRepresentative())
            {
                this.emitGetUserInfo();
                this.toggleGettingProfileInfoInterval(true);
            }
        })
    );

    @Effect({ dispatch: false })
    moduleInitialized: Observable<Action> = this.actions.pipe(
        ofType(COMPANY_MODULE_INITIALIZED),
        tap(() => {

            this.emitGetUserInfo();
            this.toggleGettingProfileInfoInterval(true);

        })
    );


    toggleGettingProfileInfoInterval(flag: boolean)
    {
        if (this.gettingCommonInfoIntervalDescriptor !== null)
        {
            clearInterval(this.gettingCommonInfoIntervalDescriptor);
            this.gettingCommonInfoIntervalDescriptor = null;
        }

        if (flag)
        {
            this.gettingCommonInfoIntervalDescriptor = setInterval(() => {
                this.emitGetUserInfo();
            }, environment.companyCommonInfoInterval);
        }
    }

    emitGetUserInfo()
    {
        this.store.dispatch(new ProfileGetCommonInfoStart());
    }

    private gettingCommonInfoIntervalDescriptor = null;

    constructor(
        private actions: Actions,
        private store: Store<State>,
        private service: CommonInfoService
    ) {}
}