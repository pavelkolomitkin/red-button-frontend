import {Injectable} from '@angular/core';

import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {mergeMap, catchError, map, tap} from 'rxjs/operators';
import {State} from '../../../app.state';
import {
    COMPLAINT_PICTURE_UPLOAD_SELECT,
    ComplaintPictureUploadComplete, ComplaintPictureUploadError,
    ComplaintPictureUploadProgress,
    ComplaintPictureUploadSelect
} from '../complaint-picture.actions';
import {ComplaintPictureService} from '../../services/complaint-picture.service';
import {ComplaintPicture} from '../../../core/data/model/complaint-picture.model';
import {UploadItem} from '../../../shared/data/model/upload-item.model';


@Injectable()
export class ComplaintPictureEffects
{
    @Effect()
    complaintPictureSelected: Observable<Action> = this.actions.pipe(
        ofType(COMPLAINT_PICTURE_UPLOAD_SELECT),
        mergeMap((action: ComplaintPictureUploadSelect) => {

            const { picture } = action;

            return this.service.upload(picture).pipe(
                map((picture: UploadItem<ComplaintPicture>) => {
                    if (picture.uploaded !== null)
                    {
                        return new ComplaintPictureUploadComplete(picture);
                    }
                    else
                    {
                        return new ComplaintPictureUploadProgress(picture);
                    }
                }),
                catchError((picture) => {
                    return of(new ComplaintPictureUploadError(picture));
                })
            )
        })
    );

    constructor(
        private actions: Actions,
        private store: Store<State>,
        private service: ComplaintPictureService
    ) {}
}
