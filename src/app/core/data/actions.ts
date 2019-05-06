import { Action } from '@ngrx/store';
import {NotifyMessage} from './model/notify-message.model';
import { BreadCrumb } from './model/bread-crumb.model';
import {GeoLocation} from './model/geo-location.model';
import {ActionConfirmation} from './model/action-confirmation.model';

export const GLOBAL_PROGRESS_SHOW = 'GLOBAL_PROGRESS_SHOW';
export const GLOBAL_PROGRESS_HIDE = 'GLOBAL_PROGRESS_HIDE';

export const GLOBAL_NOTIFY_SUCCESS_MESSAGE = 'GLOBAL_NOTIFY_SUCCESS_MESSAGE';
export const GLOBAL_NOTIFY_ERROR_MESSAGE = 'GLOBAL_NOTIFY_ERROR_MESSAGE';

export const GLOBAL_PAGE_TITLE = 'GLOBAL_PAGE_TITLE';
export const GLOBAL_BREAD_CRUMBS = 'GLOBAL_BREAD_CRUMBS';

export const GLOBAL_DEVICE_GEO_LOCATION_DETECT_START = 'GLOBAL_DEVICE_GEO_LOCATION_DETECT_START';
export const GLOBAL_DEVICE_GEO_LOCATION_DETECT_DONE = 'GLOBAL_DEVICE_GEO_LOCATION_DETECT_DONE';

export const GLOBAL_CONFIRMATION_INIT = 'GLOBAL_CONFIRMATION_INIT';
export const GLOBAL_CONFIRMATION_RESPONSE = 'GLOBAL_CONFIRMATION_RESPONSE';
export const GLOBAL_CONFIRMATION_RESET = 'GLOBAL_CONFIRMATION_RESET';

export const GLOBAL_CONFIRM_LEAVE_PAGE_INIT = 'GLOBAL_CONFIRM_LEAVE_PAGE_INIT';
export const GLOBAL_CONFIRM_LEAVE_PAGE_RESET = 'GLOBAL_CONFIRM_LEAVE_PAGE_RESET';


export class GlobalPageTitle implements Action
{
  readonly type = GLOBAL_PAGE_TITLE;

  constructor(public title: string, public subTitle: string = '') {}
}

export class GlobalBreadCrumbs implements Action
{
  readonly type = GLOBAL_BREAD_CRUMBS;

  constructor(public items: Array<BreadCrumb> = []) {}
}

export class GlobalProgressShow implements Action
{
  readonly type = GLOBAL_PROGRESS_SHOW;
}

export class GlobalProgressHide implements Action
{
  readonly type = GLOBAL_PROGRESS_HIDE;

  constructor(public force: boolean = false) {}
}

export class GlobalNotifySuccessMessage implements Action
{
  readonly type = GLOBAL_NOTIFY_SUCCESS_MESSAGE;

  constructor(public message: NotifyMessage) {}
}

export class GlobalNotifyErrorMessage implements Action
{
  readonly type = GLOBAL_NOTIFY_ERROR_MESSAGE;

  constructor(public message: NotifyMessage) {}
}

export class GlobalDeviceGeoLocationDetectStart implements Action
{
  readonly type = GLOBAL_DEVICE_GEO_LOCATION_DETECT_START;
}

export class GlobalDeviceGeoLocationDetectDone implements Action
{
  readonly type = GLOBAL_DEVICE_GEO_LOCATION_DETECT_DONE;

  constructor(public location: GeoLocation) {}
}


export class GlobalConfirmationInit implements Action
{
  readonly type = GLOBAL_CONFIRMATION_INIT;

  constructor(public confirmation: ActionConfirmation) {}
}

export class GlobalConfirmationResponse implements Action
{
  readonly type = GLOBAL_CONFIRMATION_RESPONSE;

  constructor(public confirmation: ActionConfirmation) {}
}

export class GlobalConfirmationReset implements Action
{
  readonly type = GLOBAL_CONFIRMATION_RESET;
}

export class GlobalConfirmLeavePageInit implements Action
{
  readonly type = GLOBAL_CONFIRM_LEAVE_PAGE_INIT;
}

export class GlobalConfirmLeavePageReset implements Action
{
  readonly type = GLOBAL_CONFIRM_LEAVE_PAGE_RESET;
}

export type CoreActions =
    GlobalProgressShow
    | GlobalProgressHide

    | GlobalNotifySuccessMessage
    | GlobalNotifyErrorMessage

    | GlobalDeviceGeoLocationDetectStart
    | GlobalDeviceGeoLocationDetectDone

    | GlobalPageTitle
    | GlobalBreadCrumbs

    | GlobalConfirmationInit
    | GlobalConfirmationResponse
    | GlobalConfirmationReset

    | GlobalConfirmLeavePageInit
    | GlobalConfirmLeavePageReset
  ;
