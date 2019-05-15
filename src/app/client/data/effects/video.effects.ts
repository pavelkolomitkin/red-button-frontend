import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {VideoService} from '../../services/video.service';
import {Observable, of} from 'rxjs';
import {VIDEO_CREATE_START, VideoCreateError, VideoCreateStart, VideoCreateSuccess} from '../video.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {Video} from '../../../core/data/model/video.model';

@Injectable()
export class VideoEffects
{
    @Effect()
    creationStart: Observable<Action> = this.actions.pipe(
        ofType(VIDEO_CREATE_START),
        mergeMap((action: VideoCreateStart) => {
            const { link } = action;

            return this.service.create(link).pipe(
                map((video: Video) => {
                    return new VideoCreateSuccess(video);
                }),
                catchError((errors) => {
                    return of(new VideoCreateError(errors.error.errors));
                })
            );
        })
    );

    constructor(
        private actions: Actions,
        private store: Store<State>,
        private service: VideoService
    ) {}
}
