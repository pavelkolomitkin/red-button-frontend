import * as actions from './issue.actions';
import {Issue} from '../../core/data/model/issue.model';

export interface State {
    userIssueList: Array<Issue>;
    userIssueTotal: number;
    userIssueListLoadErrors: Object;

    createdIssue: Issue;
    creationIssueErrors: Object;

    updatedIssue: Issue;
    updatingIssueErrors: Object;

    deletingIssue: Issue;
    deletedIssue: Issue;
    deleteIssueErrors: Object;

    issueDetails: Issue;
    issueDetailsErrors: Object;
}

const initialState: State = {
    userIssueList: [],
    userIssueTotal: 0,
    userIssueListLoadErrors: {},

    createdIssue: null,
    creationIssueErrors: {},

    updatedIssue: null,
    updatingIssueErrors: {},

    deletingIssue: null,
    deletedIssue: null,
    deleteIssueErrors: {},

    issueDetails: null,
    issueDetailsErrors: {}
};


export function reducer(state: State = initialState, action: actions.IssueActions) {

    switch (action.type) {

        case actions.ISSUE_USER_LIST_RESET:

            return {
                ...state,
                userIssueList: [],
                userIssueTotal: 0,
                userIssueListLoadErrors: {}
            };

        case actions.ISSUE_USER_LIST_LOAD_SUCCESS:

            return {
                ...state,
                userIssueList: action.list,
                userIssueTotal: action.total,
                userIssueListLoadErrors: {}
            };

        case actions.ISSUE_USER_LIST_LOAD_ERROR:

            return {
                ...state,
                userIssueList: [],
                userIssueTotal: 0,
                userIssueListLoadErrors: action.errors
            };


        case actions.ISSUE_CREATE_RESET:

            return {
                ...state,
                createdIssue: null,
                creationIssueErrors: {}
            };

        case actions.ISSUE_CREATE_SUCCESS:

            return {
                ...state,
                createdIssue: action.issue,
                creationIssueErrors: {}
            };

        case actions.ISSUE_CREATE_ERROR:

            return {
                ...state,
                createdIssue: null,
                creationIssueErrors: action.errors
            };


        case actions.ISSUE_UPDATE_RESET:

            return {
                ...state,
                updatedIssue: null,
                updatingIssueErrors: {}
            };

        case actions.ISSUE_UPDATE_SUCCESS:

            return {
                ...state,
                updatedIssue: action.issue,
                updatingIssueErrors: {}
            };

        case actions.ISSUE_UPDATE_ERROR:

            return {
                ...state,
                updatedIssue: null,
                updatingIssueErrors: action.errors
            };

        case actions.ISSUE_DELETE_RESET:

            return {
                deletingIssue: null,
                deletedIssue: null,
                deleteIssueErrors: {}
            };

        case actions.ISSUE_DELETE_INIT:

            return {
                ...state,
                deletingIssue: action.issue
            };

        case actions.ISSUE_DELETE_SUCCESS:

            return {
                ...state,
                deletingIssue: null,
                deletedIssue: action.issue,
                deleteIssueErrors: {}
            };

        case actions.ISSUE_DELETE_ERROR:

            return {
                ...state,
                deletingIssue: null,
                deletedIssue: null,
                deleteIssueErrors: action.errors
            };


        case actions.ISSUE_GET_RESET:

            return {
                ...state,
                issueDetails: null,
                issueDetailsErrors: {}
            };

        case actions.ISSUE_GET_SUCCESS:

            return {
                ...state,
                issueDetails: action.issue,
                issueDetailsErrors: {}
            };

        case actions.ISSUE_GET_ERROR:

            return {
                ...state,
                issueDetails: null,
                issueDetailsErrors: action.errors
            };

        default:

            return state;
    }

}
