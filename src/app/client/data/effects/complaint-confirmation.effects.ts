import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {ComplaintConfirmationService} from '../../services/complaint-comfirmation.service';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {
    COMPLAINT_CONFIRMATION_CHANGE_STATUS_START, ComplaintConfirmationChangeStatusError,
    ComplaintConfirmationChangeStatusStart,
    ComplaintConfirmationChangeStatusSuccess
} from '../complaint-confirmation.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ComplaintConfirmation} from '../../../core/data/model/complaint-confirmation.model';

@Injectable()
export class ComplaintConfirmationEffects
{
    @Effect()
    statusUpdateStart: Observable<Action> = this.actions.pipe(
        ofType(COMPLAINT_CONFIRMATION_CHANGE_STATUS_START),
        mergeMap((action: ComplaintConfirmationChangeStatusStart) => {

            const { confirmation, statusCode } = action;

            return this.service.changeStatus(confirmation, statusCode).pipe(
                map((confirmation: ComplaintConfirmation) => {
                    return new ComplaintConfirmationChangeStatusSuccess(confirmation);
                }),
                catchError((errors) => {
                    return of(new ComplaintConfirmationChangeStatusError(errors.error.errors));
                })
            );
        })
    );

    constructor(
        private actions: Actions,
        private store: Store<State>,
        private service: ComplaintConfirmationService
    ) {}
}