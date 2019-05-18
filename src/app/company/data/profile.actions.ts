import { Action } from '@ngrx/store';
import {ProfileCommonInfo} from './model/profile-common-info.model';

export const PROFILE_GET_COMMON_INFO_RESET = 'COMPANY_PROFILE_GET_COMMON_INFO_RESET';
export const PROFILE_GET_COMMON_INFO_START = 'COMPANY_PROFILE_GET_COMMON_INFO_START';
export const PROFILE_GET_COMMON_INFO_SUCCESS = 'COMPANY_PROFILE_GET_COMMON_INFO_SUCCESS';
export const PROFILE_GET_COMMON_INFO_ERROR = 'COMPANY_PROFILE_GET_COMMON_INFO_ERROR';
export const COMPANY_MODULE_INITIALIZED = 'COMPANY_MODULE_INITIALIZED';


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

export class CompanyModuleInitialized implements Action
{
    readonly type = COMPANY_MODULE_INITIALIZED;
}

export type ProfileActions = ProfileGetCommonInfoReset
    | ProfileGetCommonInfoStart
    | ProfileGetCommonInfoSuccess
    | ProfileGetCommonInfoError

    | CompanyModuleInitialized
    ;
