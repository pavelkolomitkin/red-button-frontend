import { Action } from '@ngrx/store';
import {Region} from './model/region.model';

export const REGION_ALL_GET_START = 'REGION_ALL_GET_START';
export const REGION_ALL_GET_SUCCESS = 'REGION_ALL_GET_SUCCESS';
export const REGION_ALL_GET_ERROR = 'REGION_ALL_GET_ERROR';

export class RegionAllGetStart implements Action
{
    readonly type = REGION_ALL_GET_START;
}

export class RegionAllGetSuccess implements Action
{
    readonly type = REGION_ALL_GET_SUCCESS;

    constructor(public list: Array<Region>) {}
}

export class RegionAllGetError implements Action
{
    readonly type = REGION_ALL_GET_ERROR;

    constructor(public errors: any) {}
}


export type RegionActions = RegionAllGetStart
    | RegionAllGetSuccess
    | RegionAllGetError
    ;