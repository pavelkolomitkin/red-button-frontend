import * as actions from './complaint-picture.actions';
import {UploadItem} from '../../shared/data/model/upload-item.model';
import {ComplaintPicture} from '../../core/data/model/complaint-picture.model';

export interface State {
    uploadingFileSet: Array<UploadItem<ComplaintPicture>>;
    lastUploadCompletedItem: UploadItem<ComplaintPicture>;
    lastUploadErrorItem: UploadItem<ComplaintPicture>;
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
