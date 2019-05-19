import * as actions from './federal-district.actions';
import {FederalDistrict} from './model/federal-district.model';

export interface State {

    list: Array<FederalDistrict>;
    listErrors: Object;

}

const initialState: State = {

    list: [],
    listErrors: {}

};

export function reducer(state = initialState, action: actions.FederalDistrictActions): State {

    switch (action.type) {

        case actions.FEDERAL_DISTRICT_GET_LIST_SUCCESS:

            return {
                ...state,
                list: action.list,
                listErrors: {}
            };

        case actions.FEDERAL_DISTRICT_GET_LIST_ERROR:
            
            return {
                ...state,
                list: [],
                listErrors: action.errors
            };

        default:

            return state;
    }

}