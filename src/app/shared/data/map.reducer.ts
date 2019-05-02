import * as actions from './map.actions';

export interface State {
    domElement: any;
    openedBalloon: any;
}

const initialState: State = {
    domElement: null,
    openedBalloon: null
};

export function reducer(state: State = initialState, action: actions.MapActions) {

    switch (action.type) {

        case actions.MAP_PAN_COMPONENT:

            return {
                ...state,
                domElement: action.domElement
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