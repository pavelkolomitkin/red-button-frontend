import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {ComplaintTagService} from '../../services/complaint-tag.service';
import {Observable, of} from 'rxjs';
import {
    COMPLAINT_TAG_SEARCH_START,
    ComplaintTagSearchError,
    ComplaintTagSearchStart,
    ComplaintTagSearchSuccess
} from '../complaint-tag.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';

@Injectable()
export class ComplaintTagEffects
{
    @Effect()
    searchStart: Observable<Action> = this.actions.pipe(
        ofType(COMPLAINT_TAG_SEARCH_START),
        mergeMap((action: ComplaintTagSearchStart) => {

            const { name } = action;

            return this.service.search(name).pipe(
                map(({ tags, total }) => {
                    return new ComplaintTagSearchSuccess(tags, total);
                }),
                catchError((errors) => {
                    return of(new ComplaintTagSearchError(errors.error.errors));
                })
            );
        })
    );

    constructor(
        private actions: Actions,
        private store: Store<State>,
        private service: ComplaintTagService
    ) {}
}
