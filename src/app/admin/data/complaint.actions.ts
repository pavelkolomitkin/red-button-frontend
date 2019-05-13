import { Action } from '@ngrx/store';
import {Complaint} from '../../core/data/model/complaint.model';

export const COMPLAINT_LIST_RESET = 'ADMIN_COMPLAINT_LIST_RESET';
export const COMPLAINT_LIST_LOAD_START = 'ADMIN_COMPLAINT_LIST_LOAD_START';
export const COMPLAINT_LIST_LOAD_SUCCESS = 'ADMIN_COMPLAINT_LIST_LOAD_SUCCESS';
export const COMPLAINT_LIST_LOAD_ERROR = 'ADMIN_COMPLAINT_LIST_LOAD_ERROR';

export const COMPLAINT_GET_RESET = 'ADMIN_COMPLAINT_GET_RESET';
export const COMPLAINT_GET_START = 'ADMIN_COMPLAINT_GET_START';
export const COMPLAINT_GET_SUCCESS = 'ADMIN_COMPLAINT_GET_SUCCESS';
export const COMPLAINT_GET_ERROR = 'ADMIN_COMPLAINT_GET_ERROR';

export const COMPLAINT_DELETE_RESET = 'ADMIN_COMPLAINT_DELETE_RESET';
export const COMPLAINT_DELETE_START = 'ADMIN_COMPLAINT_DELETE_START';
export const COMPLAINT_DELETE_SUCCESS = 'ADMIN_COMPLAINT_DELETE_SUCCESS';
export const COMPLAINT_DELETE_ERROR = 'ADMIN_COMPLAINT_DELETE_ERROR';


export class ComplaintListReset implements Action
{
    readonly type = COMPLAINT_LIST_RESET;
}

export class ComplaintListLoadStart implements Action
{
    readonly type = COMPLAINT_LIST_LOAD_START;

    constructor(public page: number = 1, public params: Object = {}) {}
}

export class ComplaintListLoadSuccess implements Action
{
    readonly type = COMPLAINT_LIST_LOAD_SUCCESS;

    constructor(public list: Array<Complaint>, public total: number) {}
}

export class ComplaintListLoadError implements Action
{
    readonly type = COMPLAINT_LIST_LOAD_ERROR;

    constructor(public errors: Object) {}
}


export class ComplaintGetReset implements Action
{
    readonly type = COMPLAINT_GET_RESET;
}

export class ComplaintGetStart implements Action
{
    readonly type = COMPLAINT_GET_START;

    constructor(public id: number) {}
}

export class ComplaintGetSuccess implements Action
{
    readonly type = COMPLAINT_GET_SUCCESS;

    constructor(public complaint: Complaint) {}
}

export class ComplaintGetError implements Action
{
    readonly type = COMPLAINT_GET_ERROR;

    constructor(public errors: Object) {}
}


export class ComplaintDeleteReset implements Action
{
    readonly type = COMPLAINT_DELETE_RESET;
}

export class ComplaintDeleteStart implements Action
{
    readonly type = COMPLAINT_DELETE_START;

    constructor(public complaint: Complaint) {}
}

export class ComplaintDeleteSuccess implements Action
{
    readonly type = COMPLAINT_DELETE_SUCCESS;

    constructor(public complaint: Complaint) {}
}

export class ComplaintDeleteError implements Action
{
    readonly type = COMPLAINT_DELETE_ERROR;

    constructor(public complaint: Complaint, public errors: Object) {}
}

export type ComplaintActions = ComplaintListReset
    | ComplaintListLoadStart
    | ComplaintListLoadSuccess
    | ComplaintListLoadError

    | ComplaintGetReset
    | ComplaintGetStart
    | ComplaintGetSuccess
    | ComplaintGetError

    | ComplaintDeleteReset
    | ComplaintDeleteStart
    | ComplaintDeleteSuccess
    | ComplaintDeleteError

    ;
