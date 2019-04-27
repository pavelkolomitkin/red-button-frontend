import { Action } from '@ngrx/store';
import {GeoLocation} from '../../core/data/model/geo-location.model';

// show a window with the map
export const GEO_LOCATION_SELECTING_WINDOW_STATE_CHANGED = 'GEO_LOCATION_SELECTING_WINDOW_STATE_CHANGED';

// user selected a certain location and confirmed it
export const GEO_LOCATION_SELECTED = 'GEO_LOCATION_SELECTED';


export class GeoLocationSelectingWindowStateChanged implements Action
{
    readonly type = GEO_LOCATION_SELECTING_WINDOW_STATE_CHANGED;

    constructor(public isOpen: Boolean) {}
}

export class GeoLocationSelected implements Action
{
    readonly type = GEO_LOCATION_SELECTED;

    constructor(public location: GeoLocation) {}
}


export type GeoLocationActions = GeoLocationSelectingWindowStateChanged
    | GeoLocationSelected
    ;
