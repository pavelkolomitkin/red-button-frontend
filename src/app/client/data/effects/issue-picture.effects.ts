import {Injectable} from '@angular/core';

import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {mergeMap, catchError, map, tap} from 'rxjs/operators';
import {State} from '../../../app.state';
import {
    ISSUE_PICTURE_UPLOAD_SELECT,
    IssuePictureUploadComplete, IssuePictureUploadError,
    IssuePictureUploadProgress,
    IssuePictureUploadSelect
} from '../issue-picture.actions';
import {IssuePictureService} from '../../services/issue-picture.service';
import {IssuePicture} from '../../../core/data/model/issue-picture.model';
import {UploadItem} from '../../../shared/data/model/upload-item.model';


@Injectable()
export class IssuePictureEffects
{
    @Effect()
    issuePictureSelected: Observable<Action> = this.actions.pipe(
        ofType(ISSUE_PICTURE_UPLOAD_SELECT),
        mergeMap((action: IssuePictureUploadSelect) => {

            const { picture } = action;

            return this.service.upload(picture).pipe(
                map((picture: UploadItem<IssuePicture>) => {
                    if (picture.uploaded !== null)
                    {
                        return new IssuePictureUploadComplete(picture);
                    }
                    else
                    {
                        return new IssuePictureUploadProgress(picture);
                    }
                }),
                catchError((picture) => {
                    return of(new IssuePictureUploadError(picture));
                })
            )
        })
    );

    constructor(
        private actions: Actions,
        private store: Store<State>,
        private service: IssuePictureService
    ) {}
}
