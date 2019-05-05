import {BaseService} from '../../core/services/base.service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FileUploadService} from '../../core/services/file-upload.service';
import {UploadItem} from '../../shared/data/model/upload-item.model';
import {map} from 'rxjs/operators';
import {IssuePicture} from '../data/model/issue-picture.model';

@Injectable()
export class IssuePictureService extends BaseService
{
    constructor(http: HttpClient, private uploader: FileUploadService) {
        super(http);
    }

    upload(picture: UploadItem<IssuePicture>)
    {
        return this
            .uploader
            .upload('/client/issue-picture/create', picture.file, 'imageFile')
            .pipe(
                map((state: any) => {
                    if (state.type === FileUploadService.UPLOAD_EVENT_TYPE_PROGRESS)
                    {
                        picture.setProgress(state.loaded, state.total);
                    }
                    else if (state.type === FileUploadService.UPLOAD_EVENT_TYPE_COMPLETE)
                    {
                        picture.uploaded = state.body['picture'];
                    }

                    return picture
                })
            );
    }
}