import * as actions from './issue.actions';
import {Issue} from '../../core/data/model/issue.model';

export interface State
{
    list: Array<Issue>;
    listTotal: number;
    listErrors: Object;

    details: Issue;
    detailsErrors: Object;

    deletedItem: Issue;
    deleteErrors: Object;
}

const initialState: State = {
    list: [],
    listTotal: null,
    listErrors: {},

    details: null,
    detailsErrors: {},

    deletedItem: null,
    deleteErrors: {}
}

export function reducer(state: State = initialState, action: actions.IssueActions) {

    switch (action.type) {

        case actions.ISSUE_LIST_RESET:

            return {
                ...state,
                list: [],
                listTotal: null,
                listErrors: {}
            };


        case actions.ISSUE_LIST_LOAD_SUCCESS:

            return {
                ...state,
                list: action.list,
                listTotal: action.total,
                listErrors: {}
            };

        case actions.ISSUE_LIST_LOAD_ERROR:

            return {
                ...state,
                list: [],
                listTotal: 0,
                listErrors: action.errors
            };


        case actions.ISSUE_GET_RESET:

            return {
                ...state,
                details: null,
                detailsErrors: {}
            };

        case actions.ISSUE_GET_SUCCESS:

            return {
                ...state,
                details: action.issue,
                detailsErrors: {}
            };

        case actions.ISSUE_GET_ERROR:

            return {
                ...state,
                details: null,
                detailsErrors: action.errors
            };


        case actions.ISSUE_DELETE_RESET:

            return {
                ...state,
                deletedItem: null,
                deleteErrors: {}
            };

        case actions.ISSUE_DELETE_SUCCESS:

            return {
                ...state,
                deletedItem: action.issue,
                deleteErrors: {}
            };

        case actions.ISSUE_DELETE_ERROR:

            return {
                ...state,
                deletedItem: null,
                deleteErrors: action.errors
            };

        default:

            return state;
    }

}