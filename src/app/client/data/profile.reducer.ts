import * as actions from './profile.actions';
import {ProfileCommonInfo} from './model/profile-common-info.model';

export interface State {
    commonInfo: ProfileCommonInfo;
    commonInfoErrors: Object;
}

const initialState: State = {
    commonInfo: {},
    commonInfoErrors: {}
};

export function reducer(state: State = initialState, action: actions.ProfileActions) {

    switch (action.type) {

        case actions.PROFILE_GET_COMMON_INFO_SUCCESS:

            return {
                ...state,
                commonInfoErrors: {},
                commonInfo: action.data
            };

        case actions.PROFILE_GET_COMMON_INFO_ERROR:

            return {
                ...state,
                commonInfoErrors: action.errors,
                commonInfo: {}
            };

        default:

            return state;

    }

}
