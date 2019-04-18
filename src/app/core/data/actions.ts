import { Action } from '@ngrx/store';
import {NotifyMessage} from './model/notify-message.model';
import BreadCrumb from './model/bread-crumb.model';

export const GLOBAL_PROGRESS_SHOW = 'GLOBAL_PROGRESS_SHOW';
export const GLOBAL_PROGRESS_HIDE = 'GLOBAL_PROGRESS_HIDE';

export const GLOBAL_NOTIFY_SUCCESS_MESSAGE = 'GLOBAL_NOTIFY_SUCCESS_MESSAGE';
export const GLOBAL_NOTIFY_ERROR_MESSAGE = 'GLOBAL_NOTIFY_ERROR_MESSAGE';

export const GLOBAL_SET_BREAD_CRUMBS = 'GLOBAL_SET_BREAD_CRUMBS';
export const GLOBAL_SET_PAGE_TITLE = 'GLOBAL_SET_PAGE_TITLE';

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

export class GlobalSetPageTitle implements Action
{
  readonly type = GLOBAL_SET_PAGE_TITLE;

  constructor(public title: string, public subTitle: string = '') {}
}

export class GlobalSetBreadCrumbs implements Action
{
  readonly type = GLOBAL_SET_BREAD_CRUMBS;

  constructor(public items: Array<BreadCrumb>) {}
}


export type CoreActions =
    GlobalProgressShow
    | GlobalProgressHide

    | GlobalNotifySuccessMessage
    | GlobalNotifyErrorMessage

    | GlobalSetPageTitle
    | GlobalSetBreadCrumbs
  ;
