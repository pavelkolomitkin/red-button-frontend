import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {CommonInfoService} from '../../services/common-info.service';
import {
    ADMIN_MODULE_INITIALIZED,
    PROFILE_GET_COMMON_INFO_START, ProfileGetCommonInfoError, ProfileGetCommonInfoReset,
    ProfileGetCommonInfoStart,
    ProfileGetCommonInfoSuccess
} from '../profile.actions';
import {environment} from '../../../../environments/environment';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {USER_INITIALIZE_SUCCESS, USER_LOGOUT, UserInitializeSuccess} from '../../../security/data/actions';
import {ProfileCommonInfo} from '../model/profile-common-info.model';
import {ISSUE_DELETE_SUCCESS} from '../issue.actions';
import {COMPLAINT_DELETE_SUCCESS} from '../complaint.actions';
import {ACCOUNT_CREATE_SUCCESS} from '../account.actions';

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
            if (action.user.isAdmin())
            {
                this.emitGetUserInfo();
                this.toggleGettingProfileInfoInterval(true);
            }

        })
    );

    @Effect({ dispatch: false })
    profileNumberDataChange: Observable<Action> = this.actions.pipe(
        ofType(
            ADMIN_MODULE_INITIALIZED,
            ISSUE_DELETE_SUCCESS,
            COMPLAINT_DELETE_SUCCESS,
            ACCOUNT_CREATE_SUCCESS
        ),
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
            }, environment.adminCommonInfoInterval);
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