import { Action } from '@ngrx/store';
import {Issue} from '../../core/data/model/issue.model';

export const ISSUE_LIST_RESET = 'COMPANY_ISSUE_LIST_RESET';
export const ISSUE_LIST_LOAD_START = 'COMPANY_ISSUE_LIST_LOAD_START';
export const ISSUE_LIST_LOAD_SUCCESS = 'COMPANY_ISSUE_LIST_LOAD_SUCCESS';
export const ISSUE_LIST_LOAD_ERROR = 'COMPANY_ISSUE_LIST_LOAD_ERROR';

export const ISSUE_GEO_SEARCH_RESET = 'COMPANY_ISSUE_GEO_SEARCH_RESET';
export const ISSUE_GEO_SEARCH_START = 'COMPANY_ISSUE_GEO_SEARCH_START';
export const ISSUE_GEO_SEARCH_SUCCESS = 'COMPANY_ISSUE_GEO_SEARCH_SUCCESS';
export const ISSUE_GEO_SEARCH_ERROR = 'COMPANY_ISSUE_GEO_SEARCH_ERROR';

export const ISSUE_GET_RESET = 'COMPANY_ISSUE_GET_RESET';
export const ISSUE_GET_START = 'COMPANY_ISSUE_GET_START';
export const ISSUE_GET_SUCCESS = 'COMPANY_ISSUE_GET_SUCCESS';
export const ISSUE_GET_ERROR = 'COMPANY_ISSUE_GET_ERROR';


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


export class IssueGeoSearchReset implements Action
{
    readonly type = ISSUE_GEO_SEARCH_RESET;
}

export class IssueGeoSearchStart implements Action
{
    readonly type = ISSUE_GEO_SEARCH_START;

    constructor(public params: Object) {}
}

export class IssueGeoSearchSuccess implements Action
{
    readonly type = ISSUE_GEO_SEARCH_SUCCESS;

    constructor(public list: Array<Issue>) {}
}

export class IssueGeoSearchError implements Action
{
    readonly type = ISSUE_GEO_SEARCH_ERROR;

    constructor(public errors: any) {}
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


export type IssueActions = IssueListReset
    | IssueListLoadStart
    | IssueListLoadSuccess
    | IssueListLoadError

    | IssueGeoSearchReset
    | IssueGeoSearchStart
    | IssueGeoSearchSuccess
    | IssueGeoSearchError

    | IssueGetReset
    | IssueGetStart
    | IssueGetSuccess
    | IssueGetError
    ;


