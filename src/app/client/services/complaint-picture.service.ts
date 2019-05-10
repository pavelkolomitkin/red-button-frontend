import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {UploadItem} from '../../shared/data/model/upload-item.model';
import {ComplaintPicture} from '../data/model/complaint-picture.model';
import {BaseService} from '../../core/services/base.service';
import {FileUploadService} from '../../core/services/file-upload.service';
import {map} from 'rxjs/operators';

@Injectable()
export class ComplaintPictureService extends BaseService
{
    constructor(http: HttpClient, private uploader: FileUploadService) {
        super(http);
    }

    upload(picture: UploadItem<ComplaintPicture>)
    {
        return this
            .uploader
            .upload('/client/complaint-picture/create', picture.file, 'imageFile')
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

                    return picture;
                })
            );
    }
}
