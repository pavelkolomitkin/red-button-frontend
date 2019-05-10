import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {IssueService} from '../../services/issue.service';
import {Observable, of} from 'rxjs';
import {
    ISSUE_CHANGE_LIKE_START,
    ISSUE_CREATE_START,
    ISSUE_DELETE_START, ISSUE_GET_START,
    ISSUE_UPDATE_START, ISSUE_USER_LIST_LOAD_START, IssueChangeLikeError, IssueChangeLikeStart, IssueChangeLikeSuccess,
    IssueCreateError,
    IssueCreateStart,
    IssueCreateSuccess,
    IssueDeleteError,
    IssueDeleteStart,
    IssueDeleteSuccess, IssueGetError, IssueGetStart, IssueGetSuccess,
    IssueUpdateError,
    IssueUpdateStart,
    IssueUpdateSuccess, IssueUserListLoadError, IssueUserListLoadStart, IssueUserListLoadSuccess
} from '../issue.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {Issue} from '../../../core/data/model/issue.model';

@Injectable()
export class IssueEffects
{
    @Effect()
    userIssuesLoadStart: Observable<Action> = this.actions.pipe(
        ofType(ISSUE_USER_LIST_LOAD_START),
        mergeMap((action: IssueUserListLoadStart) => {

            const { params, page } = action;

            return this.service.getUserIssues(params, page).pipe(
                map(({ issues, total }) => {
                    return new IssueUserListLoadSuccess(issues, total);
                }),
                catchError((errors) => {
                    return of(new IssueUserListLoadError(errors.error.errors));
                })
            );
        })
    );

    @Effect()
    issueGetStart: Observable<Action> = this.actions.pipe(
        ofType(ISSUE_GET_START),
        mergeMap((action: IssueGetStart) => {

            const { id } = action;

            return this.service.get(id).pipe(
                map((issue: Issue) => {
                    return new IssueGetSuccess(issue);
                }),
                catchError((errors) => {
                    return of(new IssueGetError(errors.error));
                })
            );
        })
    );

    @Effect()
    issueCreateStart: Observable<Action> = this.actions.pipe(
        ofType(ISSUE_CREATE_START),
        mergeMap((action: IssueCreateStart) => {

            const { issue } = action;

            return this.service.create(issue).pipe(
                map((newIssue: Issue) => {
                    return new IssueCreateSuccess(newIssue);
                }),
                catchError((errors) => {
                    return of(new IssueCreateError(errors.error.errors));
                })
            );
        })
    );

    @Effect()
    issueUpdateStart: Observable<Action> = this.actions.pipe(
        ofType(ISSUE_UPDATE_START),
        mergeMap((action: IssueUpdateStart) => {

            const { issue } = action;

            return this.service.update(issue).pipe(
                map((updatedIssue: Issue) => {
                    return new IssueUpdateSuccess(updatedIssue);
                }),
                catchError((errors) => {
                    return of(new IssueUpdateError(errors.error.errors));
                })
            );
        })
    );

    @Effect()
    issueDeleteStart: Observable<Action> = this.actions.pipe(
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

    @Effect()
    issueChangeLikeStart: Observable<Action> = this.actions.pipe(
        ofType(ISSUE_CHANGE_LIKE_START),
        mergeMap((action: IssueChangeLikeStart) => {

            const { issue, isUp } = action;

            let result:Observable<any> = null;

            if (isUp)
            {
                result = this.service.addLike(issue);
            }
            else
            {
                result = this.service.removeLike(issue);
            }

            return result.pipe(
                map((issue: Issue) => {
                    return new IssueChangeLikeSuccess(issue);
                }),
                catchError((errors) => {
                    return of(new IssueChangeLikeError(errors.error.errors))
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
