import * as actions from './filter.actions';

export interface State
{
    filter: any;
}

const initialState: State = {
    filter: {}
};

export function reducer(state: State = initialState, action: actions.FilterActions) {

    switch (action.type) {

        case actions.ANALYTICS_FILTER:

            return {
                ...state,
                filter: { ...action.filter }
            };
            
        default:

            return state;
    }

}