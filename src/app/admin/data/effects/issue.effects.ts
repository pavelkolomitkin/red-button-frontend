import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {IssueService} from '../../services/issue.service';
import {Observable, of} from 'rxjs';
import {
    ISSUE_DELETE_START,
    ISSUE_GET_START,
    ISSUE_LIST_LOAD_START, IssueDeleteError, IssueDeleteStart, IssueDeleteSuccess, IssueGetError,
    IssueGetStart, IssueGetSuccess,
    IssueListLoadError,
    IssueListLoadStart,
    IssueListLoadSuccess
} from '../issue.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {Issue} from '../../../core/data/model/issue.model';


@Injectable()
export class IssueEffects
{
    @Effect()
    listLoadStart: Observable<Action> = this.actions.pipe(
        ofType(ISSUE_LIST_LOAD_START),
        mergeMap((action: IssueListLoadStart) => {

            const { params, page } = action;

            return this.service.getList(params, page).pipe(
                map(({ issues, total }) => {
                    return new IssueListLoadSuccess(issues, total);
                }),
                catchError((errors) => {
                    return of(new IssueListLoadError(errors));
                })
            );

        })
    );

    @Effect()
    detailsLoadStart: Observable<Action> = this.actions.pipe(
        ofType(ISSUE_GET_START),
        mergeMap((action: IssueGetStart) => {
            const { id } = action;

            return this.service.get(id).pipe(
                map((issue: Issue) => {
                    return new IssueGetSuccess(issue);
                }),
                catchError((errors) => {
                    return of(new IssueGetError(errors))
                })
            );
        })
    );

    @Effect()
    deleteStart: Observable<Action> = this.actions.pipe(
        ofType(ISSUE_DELETE_START),
        mergeMap((action: IssueDeleteStart) => {

            const { issue } = action;

            return this.service.remove(issue).pipe(
                map(() => {
                    return new IssueDeleteSuccess(issue);
                }),
                catchError((errors) => {
                    return of(new IssueDeleteError(issue, errors.error.errors));
                })
            );
        })
    );

    constructor(
        private actions: Actions,
        private store: Store<State>,
        private service: IssueService
    ) {}
}