import * as actions from './issue-picture.actions';
import {UploadItem} from '../../shared/data/model/upload-item.model';
import {IssuePicture} from '../../core/data/model/issue-picture.model';

export interface State {
    uploadingFileSet: Array<UploadItem<IssuePicture>>;
    lastUploadCompletedItem: UploadItem<IssuePicture>;
    lastUploadErrorItem: UploadItem<IssuePicture>;
}

const initialState: State = {
    uploadingFileSet: [],
    lastUploadCompletedItem: null,
    lastUploadErrorItem: null
};

export function reducer(state: State = initialState, action: actions.IssuePictureActions) {

    switch (action.type) {

        case actions.ISSUE_PICTURE_UPLOAD_RESET:

            return {
                ...state,
                uploadingFileSet: []
            };

        case actions.ISSUE_PICTURE_UPLOAD_SELECT:

            return {
                ...state,
                uploadingFileSet: [...state.uploadingFileSet, action.picture]
            };

        case actions.ISSUE_PICTURE_UPLOAD_COMPLETE:

            const completedFileIndex = state.uploadingFileSet.findIndex(item => item.id === action.picture.id);

            let completedItem = null;
            if (completedFileIndex !== -1)
            {
                completedItem = state.uploadingFileSet[completedFileIndex];
                state.uploadingFileSet.splice(completedFileIndex, 1);
            }

            return {
                ...state,
                uploadingFileSet: [...state.uploadingFileSet],
                lastUploadCompletedItem: completedItem
            };

        case actions.ISSUE_PICTURE_UPLOAD_ERROR:

            const errorFileIndex = state.uploadingFileSet.findIndex(item => item.id === action.picture.id);

            let errorItem = null;
            if (errorFileIndex !== -1)
            {
                errorItem = state.uploadingFileSet[errorFileIndex];
            }

            return {
                ...state,
                lastUploadErrorItem: errorItem
            };

        default:

            return state;
    }
}
