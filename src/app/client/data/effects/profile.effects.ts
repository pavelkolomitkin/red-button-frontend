import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {ProfileService} from '../../services/profile.service';
import {Observable, of} from 'rxjs';
import {
    CLIENT_MODULE_INITIALIZE,
    PROFILE_GET_COMMON_INFO_START,
    ProfileGetCommonInfoError, ProfileGetCommonInfoReset,
    ProfileGetCommonInfoStart,
    ProfileGetCommonInfoSuccess
} from '../profile.actions';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {ProfileCommonInfo} from '../model/profile-common-info.model';
import {COMPLAINT_CREATE_SUCCESS, COMPLAINT_DELETE_SUCCESS} from '../complaint.actions';
import {ISSUE_CREATE_SUCCESS, ISSUE_DELETE_SUCCESS} from '../issue.actions';
import {COMPLAINT_CONFIRMATION_CHANGE_STATUS_SUCCESS} from '../complaint-confirmation.actions';
import {USER_INITIALIZE_SUCCESS, USER_LOGOUT, UserInitializeSuccess} from '../../../security/data/actions';
import {environment} from '../../../../environments/environment';

@Injectable()
export class ProfileEffects
{
    @Effect()
    commonInfoGetStart: Observable<Action> = this.actions.pipe(
        ofType(PROFILE_GET_COMMON_INFO_START),
        mergeMap((action: ProfileGetCommonInfoStart) => {

            return this.service.getCommonInfo().pipe(
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
        ofType(USER_INITIALIZE_SUCCESS),
        tap((action: UserInitializeSuccess) => {
            if (action.user.isClient())
            {
                this.emitGetUserInfo();
                this.toggleGettingProfileInfoInterval(true);
            }

        })
    );

    @Effect({ dispatch: false })
    profileNumberDataChange: Observable<Action> = this.actions.pipe(
        ofType(
            COMPLAINT_CREATE_SUCCESS,
            COMPLAINT_DELETE_SUCCESS,
            ISSUE_CREATE_SUCCESS,
            ISSUE_DELETE_SUCCESS,
            COMPLAINT_CONFIRMATION_CHANGE_STATUS_SUCCESS,
            CLIENT_MODULE_INITIALIZE
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
            }, environment.clientCommonInfoInterval);
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
        private service: ProfileService
    ) {}
}