import { Action } from '@ngrx/store';
import {Complaint} from './model/complaint.model';

export const COMPLAINT_USER_LIST_RESET = 'COMPLAINT_USER_LIST_RESET';
export const COMPLAINT_USER_LIST_LOAD_START = 'COMPLAINT_USER_LIST_LOAD_START';
export const COMPLAINT_USER_LIST_LOAD_SUCCESS = 'COMPLAINT_USER_LIST_LOAD_SUCCESS';
export const COMPLAINT_USER_LIST_LOAD_ERROR = 'COMPLAINT_USER_LIST_LOAD_ERROR';

export const COMPLAINT_CREATE_RESET = 'COMPLAINT_CREATE_RESET';
export const COMPLAINT_CREATE_START = 'COMPLAINT_CREATE_START';
export const COMPLAINT_CREATE_SUCCESS = 'COMPLAINT_CREATE_SUCCESS';
export const COMPLAINT_CREATE_ERROR = 'COMPLAINT_CREATE_ERROR';

export const COMPLAINT_UPDATE_RESET = 'COMPLAINT_UPDATE_RESET';
export const COMPLAINT_UPDATE_START = 'COMPLAINT_UPDATE_START';
export const COMPLAINT_UPDATE_SUCCESS = 'COMPLAINT_UPDATE_SUCCESS';
export const COMPLAINT_UPDATE_ERROR = 'COMPLAINT_UPDATE_ERROR';

export const COMPLAINT_GET_RESET = 'COMPLAINT_GET_RESET';
export const COMPLAINT_GET_START = 'COMPLAINT_GET_START';
export const COMPLAINT_GET_SUCCESS = 'COMPLAINT_GET_SUCCESS';
export const COMPLAINT_GET_ERROR = 'COMPLAINT_GET_ERROR';

export const COMPLAINT_DELETE_INIT = 'COMPLAINT_DELETE_INIT';
export const COMPLAINT_DELETE_START = 'COMPLAINT_DELETE_START';
export const COMPLAINT_DELETE_SUCCESS = 'COMPLAINT_DELETE_SUCCESS';
export const COMPLAINT_DELETE_ERROR = 'COMPLAINT_DELETE_ERROR';


export class ComplaintUserListReset implements Action
{
    readonly type = COMPLAINT_USER_LIST_RESET;
}

export class ComplaintUserListLoadStart implements Action
{
    readonly type = COMPLAINT_USER_LIST_LOAD_START;

    constructor(public page: number = 1, public params: Object = {}) {}
}

export class ComplaintUserListLoadSuccess implements Action
{
    readonly type = COMPLAINT_USER_LIST_LOAD_SUCCESS;

    constructor(public list: Array<Complaint>, public total: number) {}
}

export class ComplaintUserListLoadError implements Action
{
    readonly type = COMPLAINT_USER_LIST_LOAD_ERROR;

    constructor(public errors: Object) {}
}

export class ComplaintCreateReset implements Action {

    readonly type = COMPLAINT_CREATE_RESET;
}

export class ComplaintCreateStart implements Action
{
    readonly type = COMPLAINT_CREATE_START;

    constructor(public complaint: Complaint) {}
}

export class ComplaintCreateSuccess implements Action
{
    readonly type = COMPLAINT_CREATE_SUCCESS;

    constructor(public complaint: Complaint) {}
}

export class ComplaintCreateError implements Action
{
    readonly type = COMPLAINT_CREATE_ERROR;

    constructor(public errors: Object) {}
}

export class ComplaintUpdateReset implements Action
{
    readonly type = COMPLAINT_UPDATE_RESET;
}

export class ComplaintUpdateStart implements Action
{
    readonly type = COMPLAINT_UPDATE_START;

    constructor(public complaint: Complaint) {}
}

export class ComplaintUpdateSuccess implements Action
{
    readonly type = COMPLAINT_UPDATE_SUCCESS;

    constructor(public complaint: Complaint) {}
}

export class ComplaintUpdateError implements Action
{
    readonly type = COMPLAINT_UPDATE_ERROR;

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


export class ComplaintDeleteInit implements Action
{
    readonly type = COMPLAINT_DELETE_INIT;

    constructor(public complaint: Complaint) {}
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


export type ComplaintActions =

    | ComplaintUserListReset
    | ComplaintUserListLoadStart
    | ComplaintUserListLoadSuccess
    | ComplaintUserListLoadError

    | ComplaintCreateReset
    | ComplaintCreateStart
    | ComplaintCreateSuccess
    | ComplaintCreateError

    | ComplaintUpdateReset
    | ComplaintUpdateStart
    | ComplaintUpdateSuccess
    | ComplaintUpdateError

    | ComplaintGetReset
    | ComplaintGetStart
    | ComplaintGetSuccess
    | ComplaintGetError

    | ComplaintDeleteInit
    | ComplaintDeleteStart
    | ComplaintDeleteSuccess
    | ComplaintDeleteError

    ;
