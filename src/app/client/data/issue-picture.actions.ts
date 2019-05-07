import { Action } from '@ngrx/store';
import {UploadItem} from '../../shared/data/model/upload-item.model';
import {IssuePicture} from '../../core/data/model/issue-picture.model';

export const ISSUE_PICTURE_UPLOAD_RESET = 'ISSUE_PICTURE_UPLOAD_RESET';
export const ISSUE_PICTURE_UPLOAD_SELECT = 'ISSUE_PICTURE_UPLOAD_SELECT';
export const ISSUE_PICTURE_UPLOAD_PROGRESS = 'ISSUE_PICTURE_UPLOAD_PROGRESS';
export const ISSUE_PICTURE_UPLOAD_COMPLETE = 'ISSUE_PICTURE_UPLOAD_COMPLETE';
export const ISSUE_PICTURE_UPLOAD_ERROR = 'ISSUE_PICTURE_UPLOAD_ERROR';

export class IssuePictureUploadReset implements Action
{
    readonly type = ISSUE_PICTURE_UPLOAD_RESET;
}

export class IssuePictureUploadSelect implements Action
{
    readonly type = ISSUE_PICTURE_UPLOAD_SELECT;

    constructor(public picture: UploadItem<IssuePicture>) {}
}

export class IssuePictureUploadProgress implements Action
{
    readonly type = ISSUE_PICTURE_UPLOAD_PROGRESS;

    constructor(public picture: UploadItem<IssuePicture>) {}
}

export class IssuePictureUploadComplete implements Action
{
    readonly type = ISSUE_PICTURE_UPLOAD_COMPLETE;

    constructor(public picture: UploadItem<IssuePicture>) {}
}

export class IssuePictureUploadError implements Action
{
    readonly type = ISSUE_PICTURE_UPLOAD_ERROR;

    constructor(public picture: UploadItem<IssuePicture>) {}
}

export type IssuePictureActions = IssuePictureUploadReset
    | IssuePictureUploadSelect
    | IssuePictureUploadProgress
    | IssuePictureUploadComplete
    | IssuePictureUploadError
    ;
