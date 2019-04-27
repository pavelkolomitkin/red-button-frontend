import { Action } from '@ngrx/store';
import {GeoLocation} from './model/geo-location.model';
import {Region} from './model/region.model';

export const GEO_LOCATION_SELECTED = 'GEO_LOCATION_SELECTED';

export const GEO_LOCATION_GET_ADDRESS_RESET = 'GEO_LOCATION_GET_ADDRESS_RESET';
export const GEO_LOCATION_GET_ADDRESS_START = 'GEO_LOCATION_GET_ADDRESS_START';
export const GEO_LOCATION_GET_ADDRESS_SUCCESS = 'GEO_LOCATION_GET_ADDRESS_SUCCESS';
export const GEO_LOCATION_GET_ADDRESS_ERROR = 'GEO_LOCATION_GET_ADDRESS_ERROR';

export class GeoLocationSelected implements Action
{
    readonly type = GEO_LOCATION_SELECTED;

    constructor(public location: GeoLocation ) {}
}

export class GeoLocationGetAddressReset implements Action
{
    readonly type = GEO_LOCATION_GET_ADDRESS_RESET;
}

export class GeoLocationGetAddressStart implements Action
{
    readonly type = GEO_LOCATION_GET_ADDRESS_START;

    constructor(public location: GeoLocation) {}
}

export class GeoLocationGetAddressSuccess implements Action
{
    readonly type = GEO_LOCATION_GET_ADDRESS_SUCCESS;

    constructor(public region: Region, public address: Object) {}
}

export class GeoLocationGetAddressError implements Action
{
    readonly type = GEO_LOCATION_GET_ADDRESS_ERROR;

    constructor(public errors: Object) {}
}

export type GeoLocationActions =
    GeoLocationSelected
    | GeoLocationGetAddressReset
    | GeoLocationGetAddressStart
    | GeoLocationGetAddressSuccess
    | GeoLocationGetAddressError

    ;
