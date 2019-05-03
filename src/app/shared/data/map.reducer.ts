import * as actions from './map.actions';
import {GeoLocation} from '../../core/data/model/geo-location.model';

export interface State {
    openedBalloon: any;
    centeringBalloon: any;
    centeringBalloonLocation: GeoLocation;
}

const initialState: State = {
    openedBalloon: null,
    centeringBalloon: null,
    centeringBalloonLocation: null
};

export function reducer(state: State = initialState, action: actions.MapActions) {

    switch (action.type) {

        case actions.MAP_BALLOON_CENTERING:

            return {
                ...state,
                centeringBalloon: action.component,
                centeringBalloonLocation: action.center
            };

        case actions.MAP_BALLOON_CENTERING_RESET:

            return {
                ...state,
                centeringBalloon: null,
                centeringBalloonLocation: null
            };

        case actions.MAP_BALLOON_OPEN:

            return {
                ...state,
                openedBalloon: action.component
            };

        default:

            return state;

    }
}