import * as actions from './complaint.actions';
import {Complaint} from '../../core/data/model/complaint.model';

export interface State
{
    details: Complaint;
    detailsErrors: Object;
}

const initialState: State = {

    details: null,
    detailsErrors: {}

};

export function reducer(state: State = initialState, action: actions.ComplaintActions) {

    switch (action.type) {

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

        default:

            return state;
    }

}