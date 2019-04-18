import * as actions from './complaint-picture.actions';
import {UploadPicture} from './model/upload-picture.model';
import {ComplaintPicture} from './model/complaint-picture.model';

export interface State {
    uploadingFileSet: Array<UploadPicture<ComplaintPicture>>;
    lastUploadCompletedItem: UploadPicture<ComplaintPicture>;
    lastUploadErrorItem: UploadPicture<ComplaintPicture>;
}

const initialState: State = {
    uploadingFileSet: [],
    lastUploadCompletedItem: null,
    lastUploadErrorItem: null
};

export function reducer(state: State = initialState, action: actions.ComplaintPictureActions) {

    switch (action.type) {

        case actions.COMPLAINT_PICTURE_UPLOAD_RESET:

            return {
                ...state,
                uploadingFileSet: []
            };

        case actions.COMPLAINT_PICTURE_UPLOAD_SELECT:

            return {
                ...state,
                uploadingFileSet: [...state.uploadingFileSet, action.picture]
            };

        case actions.COMPLAINT_PICTURE_UPLOAD_COMPLETE:

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

        case actions.COMPLAINT_PICTURE_UPLOAD_ERROR:

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
