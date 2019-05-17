import { Action } from '@ngrx/store';
import {Complaint} from '../../core/data/model/complaint.model';

export const COMPLAINT_GET_RESET = 'COMPANY_COMPLAINT_GET_RESET';
export const COMPLAINT_GET_START = 'COMPANY_COMPLAINT_GET_START';
export const COMPLAINT_GET_SUCCESS = 'COMPANY_COMPLAINT_GET_SUCCESS';
export const COMPLAINT_GET_ERROR = 'COMPANY_COMPLAINT_GET_ERROR';

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

    constructor(public errors: any) {}
}

export type ComplaintActions = ComplaintGetReset
    | ComplaintGetStart
    | ComplaintGetSuccess
    | ComplaintGetError
    ;