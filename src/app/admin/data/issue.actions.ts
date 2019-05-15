import { Action } from '@ngrx/store';
import {Issue} from '../../core/data/model/issue.model';

export const ISSUE_LIST_RESET = 'ADMIN_ISSUE_LIST_RESET';
export const ISSUE_LIST_LOAD_START = 'ADMIN_ISSUE_LIST_LOAD_START';
export const ISSUE_LIST_LOAD_SUCCESS = 'ADMIN_ISSUE_LIST_LOAD_SUCCESS';
export const ISSUE_LIST_LOAD_ERROR = 'ADMIN_ISSUE_LIST_LOAD_ERROR';

export const ISSUE_GET_RESET = 'ADMIN_ISSUE_GET_RESET';
export const ISSUE_GET_START = 'ADMIN_ISSUE_GET_START';
export const ISSUE_GET_SUCCESS = 'ADMIN_ISSUE_GET_SUCCESS';
export const ISSUE_GET_ERROR = 'ADMIN_ISSUE_GET_ERROR';

export const ISSUE_DELETE_RESET = 'ADMIN_ISSUE_DELETE_RESET';
export const ISSUE_DELETE_START = 'ADMIN_ISSUE_DELETE_START';
export const ISSUE_DELETE_SUCCESS = 'ADMIN_ISSUE_DELETE_SUCCESS';
export const ISSUE_DELETE_ERROR = 'ADMIN_ISSUE_DELETE_ERROR';


export class IssueListReset implements Action
{
    readonly type = ISSUE_LIST_RESET;
}

export class IssueListLoadStart implements Action
{
    readonly type = ISSUE_LIST_LOAD_START;

    constructor(public page: number = 1, public params: Object = {}) {}
}

export class IssueListLoadSuccess implements Action
{
    readonly type = ISSUE_LIST_LOAD_SUCCESS;

    constructor(public list: Array<Issue>, public total: number) {}
}

export class IssueListLoadError implements Action
{
    readonly type = ISSUE_LIST_LOAD_ERROR;

    constructor(public errors: Object) {}
}


export class IssueGetReset implements Action
{
    readonly type = ISSUE_GET_RESET;
}

export class IssueGetStart implements Action
{
    readonly type = ISSUE_GET_START;

    constructor(public id: number) {}
}

export class IssueGetSuccess implements Action
{
    readonly type = ISSUE_GET_SUCCESS;

    constructor(public issue: Issue) {}
}

export class IssueGetError implements Action
{
    readonly type = ISSUE_GET_ERROR;

    constructor(public errors: Object) {}
}


export class IssueDeleteReset implements Action
{
    readonly type = ISSUE_DELETE_RESET;
}

export class IssueDeleteStart implements Action
{
    readonly type = ISSUE_DELETE_START;

    constructor(public issue: Issue) {}
}

export class IssueDeleteSuccess implements Action
{
    readonly type = ISSUE_DELETE_SUCCESS;

    constructor(public issue: Issue) {}
}

export class IssueDeleteError implements Action
{
    readonly type = ISSUE_DELETE_ERROR;

    constructor(public issue: Issue, public errors: Object) {}
}

export type IssueActions = IssueListReset
    | IssueListLoadStart
    | IssueListLoadSuccess
    | IssueListLoadError

    | IssueGetReset
    | IssueGetStart
    | IssueGetSuccess
    | IssueGetError

    | IssueDeleteReset
    | IssueDeleteStart
    | IssueDeleteSuccess
    | IssueDeleteError

    ;
