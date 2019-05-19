import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {FederalDistrictService} from '../../services/federal-district.service';
import {Observable, of} from 'rxjs';
import {
    FEDERAL_DISTRICT_GET_LIST_START,
    FederalDistrictGetListError,
    FederalDistrictGetListStart,
    FederalDistrictGetListSuccess
} from '../federal-district.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {FederalDistrict} from '../model/federal-district.model';

@Injectable()
export class FederalDistrictEffects
{
    @Effect()
    getAllStart: Observable<Action> = this.actions.pipe(
        ofType(FEDERAL_DISTRICT_GET_LIST_START),
        mergeMap((action: FederalDistrictGetListStart) => {

            return this.service.getAll().pipe(
                map((list: Array<FederalDistrict>) => {
                    return new FederalDistrictGetListSuccess(list);
                }),
                catchError((errors) => {
                    return of(new FederalDistrictGetListError(errors));
                })
            );
        })
    );

    constructor(
        private actions: Actions,
        private store: Store<State>,
        private service: FederalDistrictService
    ) {}
}