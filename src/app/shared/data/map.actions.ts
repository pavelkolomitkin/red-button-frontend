import { Action } from '@ngrx/store';

export const MAP_PAN_COMPONENT = 'MAP_PAN_COMPONENT';
export const MAP_BALLOON_OPEN = 'MAP_BALLOON_OPEN';

export class MapPanComponent implements Action
{
    readonly type = MAP_PAN_COMPONENT;

    constructor(public domElement: any) {}
}

export class MapBalloonOpen implements Action
{
    readonly type = MAP_BALLOON_OPEN;

    constructor(public component: any) {}
}

export type MapActions = MapPanComponent
    | MapBalloonOpen
    ;