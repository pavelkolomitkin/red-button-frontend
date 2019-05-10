import { Action } from '@ngrx/store';
import {ProfileCommonInfo} from './model/profile-common-info.model';

export const PROFILE_GET_COMMON_INFO_RESET = 'PROFILE_GET_COMMON_INFO_RESET';
export const PROFILE_GET_COMMON_INFO_START = 'PROFILE_GET_COMMON_INFO_START';
export const PROFILE_GET_COMMON_INFO_SUCCESS = 'PROFILE_GET_COMMON_INFO_SUCCESS';
export const PROFILE_GET_COMMON_INFO_ERROR = 'PROFILE_GET_COMMON_INFO_ERROR';
export const CLIENT_MODULE_INITIALIZE = 'CLIENT_MODULE_INITIALIZE';

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

export class ClientModuleInitialize implements Action
{
    readonly type = CLIENT_MODULE_INITIALIZE;
}

export type ProfileActions =
    ProfileGetCommonInfoReset
    | ProfileGetCommonInfoStart
    | ProfileGetCommonInfoSuccess
    | ProfileGetCommonInfoError
    | ClientModuleInitialize
    ;