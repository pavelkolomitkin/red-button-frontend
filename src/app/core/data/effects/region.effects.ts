import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {Observable, of} from 'rxjs';
import {REGION_ALL_GET_START, RegionAllGetError, RegionAllGetStart, RegionAllGetSuccess} from '../region.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {RegionService} from '../../services/region.service';
import {Region} from '../model/region.model';

@Injectable()
export class RegionEffects {

    @Effect()
    getAllStart: Observable<Action> = this.actions.pipe(
        ofType(REGION_ALL_GET_START),
        mergeMap((action: RegionAllGetStart) => {

            return this.service.getAll().pipe(
                map((regions: Array<Region>) => {
                    return new RegionAllGetSuccess(regions);
                }),
                catchError((errors) => {
                    return of(new RegionAllGetError(errors));
                })
            );
        })
    );


    constructor(
        private actions: Actions,
        private store: Store<State>,
        private service: RegionService
    ) {}

}