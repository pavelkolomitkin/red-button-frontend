import { Action } from '@ngrx/store';
import {ProfileCommonInfo} from './model/profile-common-info.model';

export const PROFILE_GET_COMMON_INFO_START = 'PROFILE_GET_COMMON_INFO_START';
export const PROFILE_GET_COMMON_INFO_SUCCESS = 'PROFILE_GET_COMMON_INFO_SUCCESS';
export const PROFILE_GET_COMMON_INFO_ERROR = 'PROFILE_GET_COMMON_INFO_ERROR';


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

export type ProfileActions =
    ProfileGetCommonInfoStart
    | ProfileGetCommonInfoSuccess
    | ProfileGetCommonInfoError
    ;