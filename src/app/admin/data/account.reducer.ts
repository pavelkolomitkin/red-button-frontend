import * as actions from './account.actions';
import User from '../../core/data/model/user.model';

export interface State
{
    created: User;
    createErrors: Object;

    updated: User;
    updateErrors: Object;

    details: User;
    detailsErrors: Object;

    list: Array<User>;
    listTotal: number;
    listErrors: Object;
}

const initialState: State = {
    created: null,
    createErrors: {},

    updated: null,
    updateErrors: {},

    details: null,
    detailsErrors: {},

    list: [],
    listTotal: null,
    listErrors: {}
};

export function reducer(state: State = initialState, action: actions.AccountActions) {

    switch (action.type) {

        case actions.ACCOUNT_CREATE_RESET:

            return {
                ...state,
                created: null,
                createErrors: {}
            };

        case actions.ACCOUNT_CREATE_SUCCESS:

            return {
                ...state,
                created: action.account,
                createErrors: {}
            };

        case actions.ACCOUNT_CREATE_ERROR:

            return {
                ...state,
                created: null,
                createErrors: action.errors
            };


        case actions.ACCOUNT_UPDATE_RESET:

            return {
                ...state,
                updated: null,
                updateErrors: {}
            };

        case actions.ACCOUNT_UPDATE_SUCCESS:

            return {
                ...state,
                updated: action.account,
                updateErrors: {}
            };

        case actions.ACCOUNT_UPDATE_ERROR:

            return {
                ...state,
                updated: null,
                updateErrors: action.errors
            };


        case actions.ACCOUNT_GET_RESET:

            return {
                ...state,
                details: null,
                detailsErrors: {}
            };

        case actions.ACCOUNT_GET_SUCCESS:

            return {
                ...state,
                details: action.account,
                detailsErrors: {}
            };

        case actions.ACCOUNT_GET_ERROR:

            return {
                ...state,
                details: null,
                detailsErrors: action.errors
            };


        case actions.ACCOUNT_GET_LIST_RESET:

            return {
                ...state,
                list: [],
                listTotal: null,
                listErrors: {}
            };

        case actions.ACCOUNT_GET_LIST_SUCCESS:

            return {
                ...state,
                list: action.list,
                listTotal: action.total,
                listErrors: {}
            };

        case actions.ACCOUNT_GET_LIST_ERROR:

            return {
                ...state,
                list: [],
                listTotal: 0,
                listErrors: action.errors
            };

        default:

            return state;
    }

}