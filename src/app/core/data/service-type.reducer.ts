import * as actions from './service-type.actions';
import {ServiceType} from './model/service-type.model';

export interface State {
    list: Array<ServiceType>;
    loadListErrors: Object;

}

const initialState: State = {
    list: [],
    loadListErrors: {}
};

export function reducer(state = initialState, action: actions.ServiceTypeActions): State {

    switch (action.type) {

        case actions.SERVICE_TYPE_LIST_LOAD_SUCCESS:

            return {
                ...state,
                list: action.list,
                loadListErrors: {}
            };

        case actions.SERVICE_TYPE_LIST_LOAD_ERROR:

            return {
                ...state,
                list: [],
                loadListErrors: action.errors
            };

        default:

            return state;
    }
}
