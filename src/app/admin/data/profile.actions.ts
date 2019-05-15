import { Action } from '@ngrx/store';
import {ProfileCommonInfo} from './model/profile-common-info.model';


export const PROFILE_GET_COMMON_INFO_RESET = 'ADMIN_PROFILE_GET_COMMON_INFO_RESET';
export const PROFILE_GET_COMMON_INFO_START = 'ADMIN_PROFILE_GET_COMMON_INFO_START';
export const PROFILE_GET_COMMON_INFO_SUCCESS = 'ADMIN_PROFILE_GET_COMMON_INFO_SUCCESS';
export const PROFILE_GET_COMMON_INFO_ERROR = 'ADMIN_PROFILE_GET_COMMON_INFO_ERROR';
export const ADMIN_MODULE_INITIALIZED = 'ADMIN_MODULE_INITIALIZED';


export class ProfileGetCommonInfoReset implements Action
{
    readonly type = PROFILE_GET_COMMON_INFO_RESET;
}

export class ProfileGetCommonInfoStart implements Action
{
    readonly type = PROFILE_GET_COMMON_INFO_START;
}

export class ProfileGetCommonInfoSuccess implements Action
{
    readonly type = PROFILE_GET_COMMON_INFO_SUCCESS;

    constructor(public data: ProfileCommonInfo) {}
}

export class ProfileGetCommonInfoError implements Action
{
    readonly type = PROFILE_GET_COMMON_INFO_ERROR;

    constructor(public errors: any) {}
}

export class AdminModuleInitialized implements Action
{
    readonly type = ADMIN_MODULE_INITIALIZED;
}


export type ProfileActions = ProfileGetCommonInfoReset
    | ProfileGetCommonInfoStart
    | ProfileGetCommonInfoSuccess
    | ProfileGetCommonInfoError
    | AdminModuleInitialized