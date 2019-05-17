import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {ComplaintService} from '../../services/complaint.service';
import {Observable, of} from 'rxjs';
import {COMPLAINT_GET_START, ComplaintGetError, ComplaintGetStart, ComplaintGetSuccess} from '../complaint.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {Complaint} from '../../../core/data/model/complaint.model';

@Injectable()
export class ComplaintEffects
{
    @Effect()
    getDetailsStart: Observable<Action> = this.actions.pipe(
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

    constructor(
        private actions: Actions,
        private store: Store<State>,
        private service: ComplaintService
    ) {}
}