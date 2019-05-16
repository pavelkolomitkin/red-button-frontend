import * as actions from './issue.actions';
import {Issue} from '../../core/data/model/issue.model';

export interface State
{
    list: Array<Issue>;
    total: number;
    listErrors: Object;

    geoList: Array<Issue>;
    geoListErrors: Object;

    details: Issue;
    detailsErrors: Object;
}

const initialState: State = {
    list: [],
    total: null,
    listErrors: {},

    geoList: [],
    geoListErrors: {},

    details: null,
    detailsErrors: {}
};

export function reducer(state: State = initialState, action: actions.IssueActions) {

    switch (action.type) {

        case actions.ISSUE_LIST_RESET:

            return {
                ...state,
                list: [],
                total: null,
                listErrors: {}
            };

        case actions.ISSUE_LIST_LOAD_SUCCESS:

            return {
                ...state,
                list: action.list,
                total: action.total,
                listErrors: {}
            };

        case actions.ISSUE_LIST_LOAD_ERROR:

            return {
                ...state,
                list: [],
                total: null,
                listErrors: action.errors
            };

        case actions.ISSUE_GEO_SEARCH_RESET:

            return {
                ...state,
                geoList: [],
                geoListErrors: {}
            };

        case actions.ISSUE_GEO_SEARCH_SUCCESS:

            return {
                ...state,
                geoList: action.list,
                geoListErrors: {}
            };

        case actions.ISSUE_GEO_SEARCH_ERROR:

            return {
                ...state,
                geoList: [],
                geoListErrors: {}
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

        default:

            return state;
    }

}