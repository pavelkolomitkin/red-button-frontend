import { Action } from '@ngrx/store';
import {FederalDistrict} from './model/federal-district.model';

export const FEDERAL_DISTRICT_GET_LIST_START = 'FEDERAL_DISTRICT_GET_LIST_START';
export const FEDERAL_DISTRICT_GET_LIST_SUCCESS = 'FEDERAL_DISTRICT_GET_LIST_SUCCESS';
export const FEDERAL_DISTRICT_GET_LIST_ERROR = 'FEDERAL_DISTRICT_GET_LIST_ERROR';

export class FederalDistrictGetListStart implements Action
{
    readonly type = FEDERAL_DISTRICT_GET_LIST_START;
}

export class FederalDistrictGetListSuccess implements Action
{
    readonly type = FEDERAL_DISTRICT_GET_LIST_SUCCESS;

    constructor(public list: Array<FederalDistrict>) {}
}

export class FederalDistrictGetListError implements Action
{
    readonly type = FEDERAL_DISTRICT_GET_LIST_ERROR;

    constructor(public errors: any) {}
}

export type FederalDistrictActions = FederalDistrictGetListStart
    | FederalDistrictGetListSuccess
    | FederalDistrictGetListError
    ;