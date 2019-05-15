import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {Observable, of} from 'rxjs';
import {
    COMPLAINT_DELETE_START,
    COMPLAINT_GET_START,
    COMPLAINT_LIST_LOAD_START,
    ComplaintDeleteError,
    ComplaintDeleteStart,
    ComplaintDeleteSuccess,
    ComplaintGetError,
    ComplaintGetStart,
    ComplaintGetSuccess,
    ComplaintListLoadError,
    ComplaintListLoadStart,
    ComplaintListLoadSuccess
} from '../complaint.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ComplaintService} from '../../services/complaint.service';
import {Complaint} from '../../../core/data/model/complaint.model';

@Injectable()
export class ComplaintEffects
{
    @Effect()
    listLoadStart: Observable<Action> = this.actions.pipe(
        ofType(COMPLAINT_LIST_LOAD_START),
        mergeMap((action: ComplaintListLoadStart) => {

            const { page, params } = action;

            return this.service.getList(params, page).pipe(
                map(({ complaints, total }) => {
                    return new ComplaintListLoadSuccess(complaints, total);
                }),
                catchError((errors) => {
                    return of(new ComplaintListLoadError(errors));
                })
            );
        })
    );

    @Effect()
    detailsLoadStart: Observable<Action> = this.actions.pipe(
        ofType(COMPLAINT_GET_START),
        mergeMap((action: ComplaintGetStart) => {

            const { id } = action;

            return this.service.get(id).pipe(
                map((complaint: Complaint) => {
                    return new ComplaintGetSuccess(complaint);
                }),
                catchError((errors) => {
                    return of(new ComplaintGetError(errors));
                })
            );
        })
    );

    @Effect()
    deleteStart: Observable<Action> = this.actions.pipe(
        ofType(COMPLAINT_DELETE_START),
        mergeMap((action: ComplaintDeleteStart) => {

            const { complaint } = action;

            return this.service.remove(complaint).pipe(
                map(() => {
                    return new ComplaintDeleteSuccess(complaint);
                }),
                catchError((errors) => {
                    return of(new ComplaintDeleteError(complaint, errors));
                })
            );
        })
    );

    constructor(
        private actions: Actions,
        private store: Store<State>,
        private service: ComplaintService
    ) {}
}