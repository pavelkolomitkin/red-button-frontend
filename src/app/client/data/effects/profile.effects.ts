import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {ProfileService} from '../../services/profile.service';
import {Observable, of} from 'rxjs';
import {
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
import {USER_INITIALIZE_SUCCESS, USER_LOGOUT} from '../../../security/data/actions';

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
            this.store.dispatch(new ProfileGetCommonInfoReset());
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
            USER_INITIALIZE_SUCCESS
        ),
        tap(() => {
            this.store.dispatch(new ProfileGetCommonInfoStart());
        })
    );

    constructor(
        private actions: Actions,
        private store: Store<State>,
        private service: ProfileService
    ) {}
}