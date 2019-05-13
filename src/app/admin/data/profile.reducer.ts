import * as actions from './profile.actions';
import {ProfileCommonInfo} from './model/profile-common-info.model';

export interface State
{
    commonInfo: ProfileCommonInfo;
    commonInfoErrors: Object;
}

const initialState: State = {
    commonInfo: null,
    commonInfoErrors: {}
};

export function reducer(state: State = initialState, action: actions.ProfileActions) {

    switch (action.type) {

        case actions.PROFILE_GET_COMMON_INFO_RESET:

            return {
                ...state,
                commonInfo: null,
                commonInfoErrors: {}
            };

        case actions.PROFILE_GET_COMMON_INFO_SUCCESS:

            return {
                ...state,
                commonInfo: action.data,
                commonInfoErrors: {}
            };

        case actions.PROFILE_GET_COMMON_INFO_ERROR:

            return {
                ...state,
                commonInfo: null,
                commonInfoErrors: action.errors
            };

        default:

            return state;

    }

}