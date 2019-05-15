import { Action } from '@ngrx/store';
import {Video} from '../../core/data/model/video.model';

export const VIDEO_CREATE_START = 'VIDEO_CREATE_START';
export const VIDEO_CREATE_SUCCESS = 'VIDEO_CREATE_SUCCESS';
export const VIDEO_CREATE_ERROR = 'VIDEO_CREATE_ERROR';

export class VideoCreateStart implements Action
{
    readonly type = VIDEO_CREATE_START;

    constructor(public link: string) {}
}

export class VideoCreateSuccess implements Action
{
    readonly type = VIDEO_CREATE_SUCCESS;

    constructor(public video: Video) {}
}

export class VideoCreateError implements Action
{
    readonly type = VIDEO_CREATE_ERROR;

    constructor(public errors: Object) {}
}

export type VideoActions = VideoCreateStart
    | VideoCreateSuccess
    | VideoCreateError
    ;
