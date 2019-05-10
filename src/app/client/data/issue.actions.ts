import { Action } from '@ngrx/store';
import {Issue} from '../../core/data/model/issue.model';

export const ISSUE_USER_LIST_RESET = 'ISSUE_USER_LIST_RESET';
export const ISSUE_USER_LIST_LOAD_START = 'ISSUE_USER_LIST_LOAD_START';
export const ISSUE_USER_LIST_LOAD_SUCCESS = 'ISSUE_USER_LIST_LOAD_SUCCESS';
export const ISSUE_USER_LIST_LOAD_ERROR = 'ISSUE_USER_LIST_LOAD_ERROR';

export const ISSUE_CREATE_RESET = 'ISSUE_CREATE_RESET';
export const ISSUE_CREATE_START = 'ISSUE_CREATE_START';
export const ISSUE_CREATE_SUCCESS = 'ISSUE_CREATE_SUCCESS';
export const ISSUE_CREATE_ERROR = 'ISSUE_CREATE_ERROR';

export const ISSUE_UPDATE_RESET = 'ISSUE_UPDATE_RESET';
export const ISSUE_UPDATE_START = 'ISSUE_UPDATE_START';
export const ISSUE_UPDATE_SUCCESS = 'ISSUE_UPDATE_SUCCESS';
export const ISSUE_UPDATE_ERROR = 'ISSUE_UPDATE_ERROR';

export const ISSUE_GET_RESET = 'ISSUE_GET_RESET';
export const ISSUE_GET_START = 'ISSUE_GET_START';
export const ISSUE_GET_SUCCESS = 'ISSUE_GET_SUCCESS';
export const ISSUE_GET_ERROR = 'ISSUE_GET_ERROR';

export const ISSUE_DELETE_RESET = 'ISSUE_DELETE_RESET';
export const ISSUE_DELETE_INIT = 'ISSUE_DELETE_INIT';
export const ISSUE_DELETE_START = 'ISSUE_DELETE_START';
export const ISSUE_DELETE_SUCCESS = 'ISSUE_DELETE_SUCCESS';
export const ISSUE_DELETE_ERROR = 'ISSUE_DELETE_ERROR';

export const ISSUE_CHANGE_LIKE_RESET = 'ISSUE_CHANGE_LIKE_RESET';
export const ISSUE_CHANGE_LIKE_START = 'ISSUE_CHANGE_LIKE_START';
export const ISSUE_CHANGE_LIKE_SUCCESS = 'ISSUE_CHANGE_LIKE_SUCCESS';
export const ISSUE_CHANGE_LIKE_ERROR = 'ISSUE_CHANGE_LIKE_ERROR';


export class IssueUserListReset implements Action
{
    readonly type = ISSUE_USER_LIST_RESET;
}

export class IssueUserListLoadStart implements Action
{
    readonly type = ISSUE_USER_LIST_LOAD_START;

    constructor(public page: number = 1, public params: Object = {}) {}
}

export class IssueUserListLoadSuccess implements Action
{
    readonly type = ISSUE_USER_LIST_LOAD_SUCCESS;

    constructor(public list: Array<Issue>, public total: number) {}
}

export class IssueUserListLoadError implements Action
{
    readonly type = ISSUE_USER_LIST_LOAD_ERROR;

    constructor(public errors: Object) {}
}

export class IssueCreateReset implements Action {

    readonly type = ISSUE_CREATE_RESET;
}

export class IssueCreateStart implements Action
{
    readonly type = ISSUE_CREATE_START;

    constructor(public issue: Issue) {}
}

export class IssueCreateSuccess implements Action
{
    readonly type = ISSUE_CREATE_SUCCESS;

    constructor(public issue: Issue) {}
}

export class IssueCreateError implements Action
{
    readonly type = ISSUE_CREATE_ERROR;

    constructor(public errors: Object) {}
}

export class IssueUpdateReset implements Action
{
    readonly type = ISSUE_UPDATE_RESET;
}

export class IssueUpdateStart implements Action
{
    readonly type = ISSUE_UPDATE_START;

    constructor(public issue: Issue) {}
}

export class IssueUpdateSuccess implements Action
{
    readonly type = ISSUE_UPDATE_SUCCESS;

    constructor(public issue: Issue) {}
}

export class IssueUpdateError implements Action
{
    readonly type = ISSUE_UPDATE_ERROR;

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

export class IssueDeleteInit implements Action
{
    readonly type = ISSUE_DELETE_INIT;

    constructor(public issue: Issue) {}
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

export class IssueChangeLikeReset implements Action
{
    readonly type = ISSUE_CHANGE_LIKE_RESET;
}

export class IssueChangeLikeStart implements Action
{
    readonly type = ISSUE_CHANGE_LIKE_START;

    constructor(public issue: Issue, public isUp: boolean = true) {}
}

export class IssueChangeLikeSuccess implements Action
{
    readonly type = ISSUE_CHANGE_LIKE_SUCCESS;

    constructor(public issue: Issue) {}
}

export class IssueChangeLikeError implements Action
{
    readonly type = ISSUE_CHANGE_LIKE_ERROR;

    constructor(public errors: any) {}
}


export type IssueActions =

    | IssueUserListReset
    | IssueUserListLoadStart
    | IssueUserListLoadSuccess
    | IssueUserListLoadError

    | IssueCreateReset
    | IssueCreateStart
    | IssueCreateSuccess
    | IssueCreateError

    | IssueUpdateReset
    | IssueUpdateStart
    | IssueUpdateSuccess
    | IssueUpdateError

    | IssueGetReset
    | IssueGetStart
    | IssueGetSuccess
    | IssueGetError

    | IssueDeleteReset
    | IssueDeleteInit
    | IssueDeleteStart
    | IssueDeleteSuccess
    | IssueDeleteError

    | IssueChangeLikeReset
    | IssueChangeLikeStart
    | IssueChangeLikeSuccess
    | IssueChangeLikeError

    ;
