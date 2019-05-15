import * as actions from './complaint.actions';
import {Complaint} from '../../core/data/model/complaint.model';

export interface State {
    userComplaintList: Array<Complaint>;
    userComplaintTotal: number;
    userComplaintListLoadErrors: Object;

    createdComplaint: Complaint;
    creationComplaintErrors: Object;

    updatedComplaint: Complaint;
    updatingComplaintErrors: Object;

    deletingComplaint: Complaint;
    deletedComplaint: Complaint;
    deleteComplaintErrors: Object;

    complaintDetails: Complaint;
    complaintDetailsErrors: Object;
}

const initialState: State = {
    userComplaintList: [],
    userComplaintTotal: null,
    userComplaintListLoadErrors: {},

    createdComplaint: null,
    creationComplaintErrors: {},

    updatedComplaint: null,
    updatingComplaintErrors: {},

    deletingComplaint: null,
    deletedComplaint: null,
    deleteComplaintErrors: {},

    complaintDetails: null,
    complaintDetailsErrors: {}
};


export function reducer(state: State = initialState, action: actions.ComplaintActions) {

    switch (action.type) {

        case actions.COMPLAINT_USER_LIST_RESET:

            return {
                ...state,
                userComplaintList: [],
                userComplaintTotal: null,
                userComplaintListLoadErrors: {}
            };

        case actions.COMPLAINT_USER_LIST_LOAD_SUCCESS:

            return {
                ...state,
                userComplaintList: action.list,
                userComplaintTotal: action.total,
                userComplaintListLoadErrors: {}
            };

        case actions.COMPLAINT_USER_LIST_LOAD_ERROR:

            return {
                ...state,
                userComplaintList: [],
                userComplaintTotal: 0,
                userComplaintListLoadErrors: action.errors
            };


        case actions.COMPLAINT_CREATE_RESET:

            return {
                ...state,
                createdComplaint: null,
                creationComplaintErrors: {}
            };

        case actions.COMPLAINT_CREATE_SUCCESS:

            return {
                ...state,
                createdComplaint: action.complaint,
                creationComplaintErrors: {}
            };

        case actions.COMPLAINT_CREATE_ERROR:

            return {
                ...state,
                createdComplaint: null,
                creationComplaintErrors: action.errors
            };


        case actions.COMPLAINT_UPDATE_RESET:

            return {
                ...state,
                updatedComplaint: null,
                updatingComplaintErrors: {}
            };

        case actions.COMPLAINT_UPDATE_SUCCESS:

            return {
                ...state,
                updatedComplaint: action.complaint,
                updatingComplaintErrors: {}
            };

        case actions.COMPLAINT_UPDATE_ERROR:

            return {
                ...state,
                updatedComplaint: null,
                updatingComplaintErrors: action.errors
            };

        case actions.COMPLAINT_DELETE_RESET:

            return {
                deletingComplaint: null,
                deletedComplaint: null,
                deleteComplaintErrors: {}
            };

        case actions.COMPLAINT_DELETE_INIT:

            return {
                ...state,
                deletingComplaint: action.complaint
            };

        case actions.COMPLAINT_DELETE_SUCCESS:

            return {
                ...state,
                deletingComplaint: null,
                deletedComplaint: action.complaint,
                deleteComplaintErrors: {}
            };

        case actions.COMPLAINT_DELETE_ERROR:

            return {
                ...state,
                deletingComplaint: null,
                deletedComplaint: null,
                deleteComplaintErrors: action.errors
            };


        case actions.COMPLAINT_GET_RESET:

            return {
                ...state,
                complaintDetails: null,
                complaintDetailsErrors: {}
            };

        case actions.COMPLAINT_GET_SUCCESS:

            return {
                ...state,
                complaintDetails: action.complaint,
                complaintDetailsErrors: {}
            };

        case actions.COMPLAINT_GET_ERROR:

            return {
                ...state,
                complaintDetails: null,
                complaintDetailsErrors: action.errors
            };

        default:

            return state;
    }

}
