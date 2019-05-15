import * as actions from './complaint-confirmation.actions';
import {ComplaintConfirmation} from '../../core/data/model/complaint-confirmation.model';

export interface State
{
    updatedConfirmation: ComplaintConfirmation;
    updateConfirmationErrors: Object;
}

const initialState: State = {
    updatedConfirmation: null,
    updateConfirmationErrors: {}
};

export function reducer(state: State = initialState, action: actions.ComplaintConfirmationActions) {

    switch (action.type) {

        case actions.COMPLAINT_CONFIRMATION_CHANGE_STATUS_RESET:

            return {
                ...state,
                updatedConfirmation: null,
                updateConfirmationErrors: {}
            };

        case actions.COMPLAINT_CONFIRMATION_CHANGE_STATUS_SUCCESS:

            return {
                ...state,
                updatedConfirmation: action.confirmation,
                updateConfirmationErrors: {}
            };


        case actions.COMPLAINT_CONFIRMATION_CHANGE_STATUS_ERROR:

            return {
                ...state,
                updatedConfirmation: null,
                updateConfirmationErrors: action.errors
            };


        default:

            return state;

    }

}