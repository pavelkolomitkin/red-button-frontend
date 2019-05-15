import { Action } from '@ngrx/store';
import User from '../../core/data/model/user.model';

export const ACCOUNT_CREATE_RESET = 'ACCOUNT_CREATE_RESET';
export const ACCOUNT_CREATE_START = 'ACCOUNT_CREATE_START';
export const ACCOUNT_CREATE_SUCCESS = 'ACCOUNT_CREATE_SUCCESS';
export const ACCOUNT_CREATE_ERROR = 'ACCOUNT_CREATE_ERROR';

export const ACCOUNT_GET_RESET = 'ACCOUNT_GET_RESET';
export const ACCOUNT_GET_START = 'ACCOUNT_GET_START';
export const ACCOUNT_GET_SUCCESS = 'ACCOUNT_GET_SUCCESS';
export const ACCOUNT_GET_ERROR = 'ACCOUNT_GET_ERROR';

export const ACCOUNT_GET_LIST_RESET = 'ACCOUNT_GET_LIST_RESET';
export const ACCOUNT_GET_LIST_START = 'ACCOUNT_GET_LIST_START';
export const ACCOUNT_GET_LIST_SUCCESS = 'ACCOUNT_GET_LIST_SUCCESS';
export const ACCOUNT_GET_LIST_ERROR = 'ACCOUNT_GET_LIST_ERROR';

export const ACCOUNT_UPDATE_RESET = 'ACCOUNT_UPDATE_RESET';
export const ACCOUNT_UPDATE_START = 'ACCOUNT_UPDATE_START';
export const ACCOUNT_UPDATE_SUCCESS = 'ACCOUNT_UPDATE_SUCCESS';
export const ACCOUNT_UPDATE_ERROR = 'ACCOUNT_UPDATE_ERROR';


export class AccountCreateReset implements Action
{
    readonly type = ACCOUNT_CREATE_RESET;
}

export class AccountCreateStart implements Action
{
    readonly type = ACCOUNT_CREATE_START;

    constructor(public account: User, public password: string, public passwordRepeat: string) {}
}

export class AccountCreateSuccess implements Action
{
    readonly type = ACCOUNT_CREATE_SUCCESS;

    constructor(public account: User) {}
}

export class AccountCreateError implements Action
{
    readonly type = ACCOUNT_CREATE_ERROR;

    constructor(public errors: Object) {}
}


export class AccountGetReset implements Action
{
    readonly type = ACCOUNT_GET_RESET;
}

export class AccountGetStart implements Action
{
    readonly type = ACCOUNT_GET_START;

    constructor(public id: number) {}
}

export class AccountGetSuccess implements Action
{
    readonly type = ACCOUNT_GET_SUCCESS;

    constructor(public account: User) {}
}

export class AccountGetError implements Action
{
    readonly type = ACCOUNT_GET_ERROR;

    constructor(public errors: any) {}
}


export class AccountGetListReset implements Action
{
    readonly type = ACCOUNT_GET_LIST_RESET;
}

export class AccountGetListStart implements Action
{
    readonly type = ACCOUNT_GET_LIST_START;

    constructor(public params: Object, public page: number = 1) {}
}

export class AccountGetListSuccess implements Action
{
    readonly type = ACCOUNT_GET_LIST_SUCCESS;

    constructor(public list: Array<User>, public total: number) {}
}

export class AccountGetListError implements Action
{
    readonly type = ACCOUNT_GET_LIST_ERROR;

    constructor(public errors: any) {}
}


export class AccountUpdateReset implements Action
{
    readonly type = ACCOUNT_UPDATE_RESET;
}

export class AccountUpdateStart implements Action
{
    readonly type = ACCOUNT_UPDATE_START;

    constructor(public account: User) {}
}

export class AccountUpdateSuccess implements Action
{
    readonly type = ACCOUNT_UPDATE_SUCCESS;

    constructor(public account: User) {}
}

export class AccountUpdateError implements Action
{
    readonly type = ACCOUNT_UPDATE_ERROR;

    constructor(public errors: Object) {}
}


export type AccountActions = AccountCreateReset
    | AccountCreateStart
    | AccountCreateSuccess
    | AccountCreateError

    | AccountGetReset
    | AccountGetStart
    | AccountGetSuccess
    | AccountGetError

    | AccountGetListReset
    | AccountGetListStart
    | AccountGetListSuccess
    | AccountGetListError

    | AccountUpdateReset
    | AccountUpdateStart
    | AccountUpdateSuccess
    | AccountUpdateError

    ;