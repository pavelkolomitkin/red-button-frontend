import { Action } from '@ngrx/store';
import {ServiceType} from './model/service-type.model';

export const SERVICE_TYPE_LIST_LOAD_START = 'SERVICE_TYPE_LIST_LOAD_START';
export const SERVICE_TYPE_LIST_LOAD_SUCCESS = 'SERVICE_TYPE_LIST_LOAD_SUCCESS';
export const SERVICE_TYPE_LIST_LOAD_ERROR = 'SERVICE_TYPE_LIST_LOAD_ERROR';

export class ServiceTypeListLoadStart implements Action
{
    readonly type = SERVICE_TYPE_LIST_LOAD_START;
}

export class ServiceTypeListLoadSuccess implements Action
{
    readonly type = SERVICE_TYPE_LIST_LOAD_SUCCESS;

    constructor(public list: Array<ServiceType>) {}
}

export class ServiceTypeListLoadError implements Action
{
    readonly type = SERVICE_TYPE_LIST_LOAD_ERROR;

    constructor(public errors: Object) {}
}

export type ServiceTypeActions = ServiceTypeListLoadStart
    | ServiceTypeListLoadSuccess
    | ServiceTypeListLoadError
    ;
