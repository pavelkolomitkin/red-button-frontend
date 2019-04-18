import * as actions from './video.actions';
import {Video} from './model/video.model';

export interface State {
    creationLink: string;
    createdVideo: Video;
    creationVideoErrors: Object;
}

const initialState: State = {
    creationLink: null,
    createdVideo: null,
    creationVideoErrors: {}
};

export function reducer(state: State = initialState, action: actions.VideoActions) {

    switch (action.type) {

        case actions.VIDEO_CREATE_START:

            return {
                ...state,
                creationLink: action.link
            };

        case actions.VIDEO_CREATE_SUCCESS:

            return {
                ...state,
                createdVideo: action.video,
                creationVideoErrors: {}
            };

        case actions.VIDEO_CREATE_ERROR:

            return {
                ...state,
                createdVideo: null,
                creationVideoErrors: {}
            };


        default:

            return state;
    }

}
