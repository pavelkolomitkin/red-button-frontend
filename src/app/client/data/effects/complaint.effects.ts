import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {ComplaintService} from '../../services/complaint.service';
import {Observable, of} from 'rxjs';
import {
    COMPLAINT_CREATE_START,
    COMPLAINT_DELETE_START, COMPLAINT_GET_START,
    COMPLAINT_UPDATE_START, COMPLAINT_USER_LIST_LOAD_START,
    ComplaintCreateError,
    ComplaintCreateStart,
    ComplaintCreateSuccess,
    ComplaintDeleteError,
    ComplaintDeleteStart,
    ComplaintDeleteSuccess, ComplaintGetError, ComplaintGetStart, ComplaintGetSuccess,
    ComplaintUpdateError,
    ComplaintUpdateStart,
    ComplaintUpdateSuccess, ComplaintUserListLoadError, ComplaintUserListLoadStart, ComplaintUserListLoadSuccess
} from '../complaint.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {Complaint} from '../../../core/data/model/complaint.model';

@Injectable()
export class ComplaintEffects
{
    @Effect()
    userComplaintsLoadStart: Observable<Action> = this.actions.pipe(
        ofType(COMPLAINT_USER_LIST_LOAD_START),
        mergeMap((action: ComplaintUserListLoadStart) => {

            const { params, page } = action;

            return this.service.getUserComplaints(params, page).pipe(
                map(({ complaints, total }) => {
                    return new ComplaintUserListLoadSuccess(complaints, total);
                }),
                catchError((errors) => {
                    return of(new ComplaintUserListLoadError(errors.error.errors));
                })
            );
        })
    );

    @Effect()
    complaintGetStart: Observable<Action> = this.actions.pipe(
        ofType(COMPLAINT_GET_START),
        mergeMap((action: ComplaintGetStart) => {

            const { id } = action;

            return this.service.get(id).pipe(
                map((complaint: Complaint) => {
                    return new ComplaintGetSuccess(complaint);
                }),
                catchError((errors) => {
                    return of(new ComplaintGetError({ message: 'Not found' }));
                })
            );
        })
    );

    @Effect()
    complaintCreateStart: Observable<Action> = this.actions.pipe(
        ofType(COMPLAINT_CREATE_START),
        mergeMap((action: ComplaintCreateStart) => {

            const { complaint } = action;

            return this.service.create(complaint).pipe(
                map((newComplaint: Complaint) => {
                    return new ComplaintCreateSuccess(newComplaint);
                }),
                catchError((errors) => {
                    return of(new ComplaintCreateError(errors.error.errors));
                })
            );
        })
    );

    @Effect()
    complaintUpdateStart: Observable<Action> = this.actions.pipe(
        ofType(COMPLAINT_UPDATE_START),
        mergeMap((action: ComplaintUpdateStart) => {

            const { complaint } = action;

            return this.service.update(complaint).pipe(
                map((updatedComplaint: Complaint) => {
                    return new ComplaintUpdateSuccess(updatedComplaint);
                }),
                catchError((errors) => {
                    return of(new ComplaintUpdateError(errors.error.errors));
                })
            );
        })
    );

    @Effect()
    complaintDeleteStart: Observable<Action> = this.actions.pipe(
        ofType(COMPLAINT_DELETE_START),
        mergeMap((action: ComplaintDeleteStart) => {

            const { complaint } = action;

            return this.service.remove(complaint).pipe(
                map(() => {
                    return new ComplaintDeleteSuccess(complaint);
                }),
                catchError((errors) => {
                    return of(new ComplaintDeleteError(complaint, errors.error.errors));
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
