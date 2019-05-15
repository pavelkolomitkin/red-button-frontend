import * as actions from './complaint.actions';
import {Complaint} from '../../core/data/model/complaint.model';

export interface State
{
    list: Array<Complaint>;
    listTotal: number;
    listErrors: Object;

    details: Complaint;
    detailsErrors: Object;

    deletedItem: Complaint;
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
};


export function reducer(state: State = initialState, action: actions.ComplaintActions) {

    switch (action.type) {

        case actions.COMPLAINT_LIST_RESET:

            return {
                ...state,
                list: [],
                listTotal: null,
                listErrors: {}
            };

        case actions.COMPLAINT_LIST_LOAD_SUCCESS:

            return {
                ...state,
                list: action.list,
                listTotal: action.total,
                listErrors: {}
            };

        case actions.COMPLAINT_LIST_LOAD_ERROR:

            return {
                ...state,
                list: [],
                listTotal: 0,
                listErrors: action.errors
            };


        case actions.COMPLAINT_GET_RESET:

            return {
                ...state,
                details: null,
                detailsErrors: {}
            };

        case actions.COMPLAINT_GET_SUCCESS:

            return {
                ...state,
                details: action.complaint,
                detailsErrors: {}
            };

        case actions.COMPLAINT_GET_ERROR:

            return {
                ...state,
                details: null,
                detailsErrors: action.errors
            };


        case actions.COMPLAINT_DELETE_RESET:

            return {
                ...state,
                deletedItem: null,
                deleteErrors: {}
            };

        case actions.COMPLAINT_DELETE_SUCCESS:

            return {
                ...state,
                deletedItem: action.complaint,
                deleteErrors: {}
            };

        case actions.COMPLAINT_DELETE_ERROR:

            return {
                ...state,
                deletedItem: null,
                deleteErrors: action.errors
            };


        default:

            return state;
    }

}