import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {ClientLocationService} from '../../services/client-location.service';
import {Observable} from 'rxjs';
import {USER_INITIALIZE_SUCCESS, UserInitializeSuccess} from '../../../security/data/actions';
import {map, mergeMap, tap} from 'rxjs/operators';
import {GLOBAL_DEVICE_GEO_LOCATION_DETECT_START, GlobalDeviceGeoLocationDetectDone, GlobalDeviceGeoLocationDetectStart} from '../actions';
import {GeoLocation} from '../model/geo-location.model';

@Injectable()
export class ClientDeviceEffects
{
    @Effect({ dispatch: false })
    userInitializeSuccess: Observable<Action> = this.actions.pipe(
        ofType(USER_INITIALIZE_SUCCESS),
        tap((action: UserInitializeSuccess) => {
            const roles = action.user.roles;

            if (roles.includes('ROLE_CLIENT_USER'))
            {
                this.store.dispatch(new GlobalDeviceGeoLocationDetectStart());
            }
        })
    );

    @Effect()
    deviceGeoLocationDetectStart: Observable<Action> = this.actions.pipe(
        ofType(GLOBAL_DEVICE_GEO_LOCATION_DETECT_START),
        mergeMap(() => {

            return this.service.getCurrentLocation().pipe(
                map((location: GeoLocation) => {
                    return new GlobalDeviceGeoLocationDetectDone(location);
                }
                )
            )
        })
    );

    constructor(
        private actions: Actions,
        private store: Store<State>,
        private service: ClientLocationService
    ){}
}
