import { Action } from '@ngrx/store';
import {ComplaintConfirmation} from '../../core/data/model/complaint-confirmation.model';

export const COMPLAINT_CONFIRMATION_CHANGE_STATUS_RESET = 'COMPLAINT_CONFIRMATION_CHANGE_STATUS_RESET';
export const COMPLAINT_CONFIRMATION_CHANGE_STATUS_START = 'COMPLAINT_CONFIRMATION_CHANGE_STATUS_START';
export const COMPLAINT_CONFIRMATION_CHANGE_STATUS_SUCCESS = 'COMPLAINT_CONFIRMATION_CHANGE_STATUS_SUCCESS';
export const COMPLAINT_CONFIRMATION_CHANGE_STATUS_ERROR = 'COMPLAINT_CONFIRMATION_CHANGE_STATUS_ERROR';

export class ComplaintConfirmationChangeStatusReset implements Action
{
    readonly type = COMPLAINT_CONFIRMATION_CHANGE_STATUS_RESET;
}

export class ComplaintConfirmationChangeStatusStart implements Action
{
    readonly type = COMPLAINT_CONFIRMATION_CHANGE_STATUS_START;

    constructor(public confirmation: ComplaintConfirmation, public statusCode: string) {}
}

export class ComplaintConfirmationChangeStatusSuccess implements Action
{
    readonly type = COMPLAINT_CONFIRMATION_CHANGE_STATUS_SUCCESS;

    constructor(public confirmation: ComplaintConfirmation) {}
}

export class ComplaintConfirmationChangeStatusError implements Action
{
    readonly type = COMPLAINT_CONFIRMATION_CHANGE_STATUS_ERROR;

    constructor(public errors: any) {}
}


export type ComplaintConfirmationActions = ComplaintConfirmationChangeStatusReset
    | ComplaintConfirmationChangeStatusStart
    | ComplaintConfirmationChangeStatusSuccess
    | ComplaintConfirmationChangeStatusError
    ;