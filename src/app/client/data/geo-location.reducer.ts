import * as actions from './geo-location.actions';
import {GeoLocation} from '../../core/data/model/geo-location.model';

export interface State {
    selectingLocationWindowOpen: Boolean,
    selectedLocation: GeoLocation;
}

const initialState: State = {
    selectingLocationWindowOpen: false,
    selectedLocation: null
};

export function reducer(state: State = initialState, action: actions.GeoLocationActions) {

    switch (action.type) {

        case actions.GEO_LOCATION_SELECTING_WINDOW_STATE_CHANGED:

            return {
                ...state,
                selectingLocationWindowOpen: action.isOpen
            };

        case actions.GEO_LOCATION_SELECTED:

            return {
                ...state
            };

        default:

            return state;
    }
}
