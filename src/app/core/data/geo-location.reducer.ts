import * as actions from './geo-location.actions';
import {GeoLocation} from './model/geo-location.model';
import {Region} from './model/region.model';

export interface State {
    selectedLocation: GeoLocation;

    targetAddressGeoLocation: GeoLocation;
    targetAddressRegion: Region;
    targetAddressAddition: Object;
    gettingAddressErrors: Object;

}

const initialState: State = {
    selectedLocation: null,

    targetAddressGeoLocation: null,
    targetAddressRegion: null,
    targetAddressAddition: null,
    gettingAddressErrors: {}
};


export function reducer(state = initialState, action: actions.GeoLocationActions): State {

    switch (action.type)
    {

        case actions.GEO_LOCATION_SELECTED:

            return {
                ...state,
                selectedLocation: action.location
            };

        case actions.GEO_LOCATION_GET_ADDRESS_RESET:

            return {
                ...state,
                selectedLocation: null,
                targetAddressRegion: null,
                targetAddressAddition: null,
                gettingAddressErrors: {}
            };

        case actions.GEO_LOCATION_GET_ADDRESS_START:

            return {
                ...state,
                targetAddressGeoLocation: action.location
            };

        case actions.GEO_LOCATION_GET_ADDRESS_SUCCESS:

            return {
                ...state,
                targetAddressRegion: action.region,
                targetAddressAddition: action.address,
                gettingAddressErrors: {}
            };

        case actions.GEO_LOCATION_GET_ADDRESS_ERROR:

            return {
                ...state,
                targetAddressRegion: null,
                targetAddressAddition: null,
                gettingAddressErrors: action.errors
            };


        default:
            return state;

    }

}
