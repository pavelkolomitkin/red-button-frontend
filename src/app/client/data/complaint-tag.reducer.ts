import * as actions from './complaint-tag.actions';
import {ComplaintTag} from './model/complaint-tag.model';

export interface State {

    searchName: string;
    foundTags: Array<ComplaintTag>;
    foundTagsTotal: number;
    searchTagErrors: Object;
}

const initialState: State = {

    searchName: '',
    foundTags: [],
    foundTagsTotal: 0,
    searchTagErrors: {}

};

export function reducer(state: State = initialState, action: actions.ComplaintTagActions) {

    switch (action.type) {

        case actions.COMPLAINT_TAG_SEARCH_START:

            return {
                ...state,
                searchName: action.name
            };

        case actions.COMPLAINT_TAG_SEARCH_SUCCESS:

            return {
                ...state,
                foundTags: action.tags,
                foundTagsTotal: action.total,
                searchTagErrors: {}
            };

        case actions.COMPLAINT_TAG_SEARCH_ERROR:

            return {
                ...state,
                foundTags: [],
                foundTagsTotal: 0,
                searchTagErrors: action.errors
            };

        default:

            return state;
    }

}
