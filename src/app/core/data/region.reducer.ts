import * as actions from './region.actions';
import { Region } from './model/region.model';

export interface State {
    list: Array<Region>;
    loadListErrors: Object;
}

const initialState: State = {
    list: [],
    loadListErrors: {}
};

export function reducer(state = initialState, action: actions.RegionActions): State {

    switch (action.type) {

        case actions.REGION_ALL_GET_SUCCESS:

            return {
                ...state,
                list: action.list,
                loadListErrors: {}
            };


        case actions.REGION_ALL_GET_ERROR:

            return {
                ...state,
                list: [],
                loadListErrors: action.errors
            };


        default:

            return state;
    }
}