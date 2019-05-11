import { Action } from '@ngrx/store';
import {UploadItem} from '../../shared/data/model/upload-item.model';
import {ComplaintPicture} from '../../core/data/model/complaint-picture.model';

export const COMPLAINT_PICTURE_UPLOAD_RESET = 'COMPLAINT_PICTURE_UPLOAD_RESET';
export const COMPLAINT_PICTURE_UPLOAD_SELECT = 'COMPLAINT_PICTURE_UPLOAD_SELECT';
export const COMPLAINT_PICTURE_UPLOAD_PROGRESS = 'COMPLAINT_PICTURE_UPLOAD_PROGRESS';
export const COMPLAINT_PICTURE_UPLOAD_COMPLETE = 'COMPLAINT_PICTURE_UPLOAD_COMPLETE';
export const COMPLAINT_PICTURE_UPLOAD_ERROR = 'COMPLAINT_PICTURE_UPLOAD_ERROR';

export class ComplaintPictureUploadReset implements Action
{
    readonly type = COMPLAINT_PICTURE_UPLOAD_RESET;
}

export class ComplaintPictureUploadSelect implements Action
{
    readonly type = COMPLAINT_PICTURE_UPLOAD_SELECT;

    constructor(public picture: UploadItem<ComplaintPicture>) {}
}

export class ComplaintPictureUploadProgress implements Action
{
    readonly type = COMPLAINT_PICTURE_UPLOAD_PROGRESS;

    constructor(public picture: UploadItem<ComplaintPicture>) {}
}

export class ComplaintPictureUploadComplete implements Action
{
    readonly type = COMPLAINT_PICTURE_UPLOAD_COMPLETE;

    constructor(public picture: UploadItem<ComplaintPicture>) {}
}

export class ComplaintPictureUploadError implements Action
{
    readonly type = COMPLAINT_PICTURE_UPLOAD_ERROR;

    constructor(public picture: UploadItem<ComplaintPicture>) {}
}

export type ComplaintPictureActions = ComplaintPictureUploadReset
    | ComplaintPictureUploadSelect
    | ComplaintPictureUploadProgress
    | ComplaintPictureUploadComplete
    | ComplaintPictureUploadError
    ;
