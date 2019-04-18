import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {ServiceTypeService} from '../../services/service-type.service';
import {Observable, of} from 'rxjs';
import {
    SERVICE_TYPE_LIST_LOAD_START,
    ServiceTypeListLoadError,
    ServiceTypeListLoadStart,
    ServiceTypeListLoadSuccess
} from '../service-type.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ServiceType} from '../model/service-type.model';

@Injectable()
export class ServiceTypeEffects
{
    @Effect()
    listLoadStart: Observable<Action> = this.actions.pipe(
        ofType(SERVICE_TYPE_LIST_LOAD_START),
        mergeMap((action: ServiceTypeListLoadStart) => {

            return this.service.getAll().pipe(
                map((list: Array<ServiceType>) => {
                    return new ServiceTypeListLoadSuccess(list);
                }),
                catchError((errors) => {
                    return of(new ServiceTypeListLoadError(errors.error.errors));
                })
            );
        })
    );

    constructor(
        private actions: Actions,
        private store: Store<State>,
        private service: ServiceTypeService
    ) {}
}
