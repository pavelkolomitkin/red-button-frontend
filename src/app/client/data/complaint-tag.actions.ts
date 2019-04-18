import { Action } from '@ngrx/store';
import {ComplaintTag} from './model/complaint-tag.model';

export const COMPLAINT_TAG_SEARCH_START = 'COMPLAINT_TAG_SEARCH_START';
export const COMPLAINT_TAG_SEARCH_SUCCESS = 'COMPLAINT_TAG_SEARCH_SUCCESS';
export const COMPLAINT_TAG_SEARCH_ERROR = 'COMPLAINT_TAG_SEARCH_ERROR';

export class ComplaintTagSearchStart implements Action
{
    readonly type = COMPLAINT_TAG_SEARCH_START;

    constructor(public name: string) {}
}

export class ComplaintTagSearchSuccess implements Action
{
    readonly type = COMPLAINT_TAG_SEARCH_SUCCESS;

    constructor(public tags: Array<ComplaintTag>, public total: number) {}
}

export class ComplaintTagSearchError implements Action
{
    readonly type = COMPLAINT_TAG_SEARCH_ERROR;

    constructor(public errors: Object) {}
}

export type ComplaintTagActions = ComplaintTagSearchStart
    | ComplaintTagSearchSuccess
    | ComplaintTagSearchError
    ;
