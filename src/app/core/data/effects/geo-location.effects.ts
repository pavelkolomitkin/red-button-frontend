import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {GeoLocationService} from '../../services/geo-location.service';
import {Observable, of} from 'rxjs';
import {
    GEO_LOCATION_GET_ADDRESS_START,
    GeoLocationGetAddressError,
    GeoLocationGetAddressStart,
    GeoLocationGetAddressSuccess
} from '../geo-location.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';

@Injectable()
export class GeoLocationEffects
{
    @Effect()
    getAddressStart: Observable<Action> = this.actions.pipe(
        ofType(GEO_LOCATION_GET_ADDRESS_START),
        mergeMap((action: GeoLocationGetAddressStart) => {
            const { location } = action;

            return this.service.getAddressByCoordinates(location).pipe(
                map(({ region, addition }) => {
                    return new GeoLocationGetAddressSuccess(region, addition);
                }),
                catchError((errors) => {
                    return of(new GeoLocationGetAddressError(errors.error.errors));
                })
            );
        })
    );

    constructor(
        private actions: Actions,
        private store: Store<State>,
        private service: GeoLocationService
    ) {}
}
