import { Action } from '@ngrx/store';
import { GeoLocation } from '../../core/data/model/geo-location.model';

export const MAP_BALLOON_OPEN = 'MAP_BALLOON_OPEN';
export const MAP_BALLOON_CENTERING = 'MAP_BALLOON_CENTERING';
export const MAP_BALLOON_CENTERING_RESET = 'MAP_BALLOON_CENTERING_RESET';

export class MapBalloonOpen implements Action
{
    readonly type = MAP_BALLOON_OPEN;

    constructor(public component: any) {}
}

export class MapBalloonCentering implements Action
{
    readonly type = MAP_BALLOON_CENTERING;

    constructor(public component: any, public center: GeoLocation) {}
}

export class MapBalloonCenteringReset implements Action
{
    readonly type = MAP_BALLOON_CENTERING_RESET;
}

export type MapActions = MapBalloonOpen
    | MapBalloonCentering
    | MapBalloonCenteringReset
    ;