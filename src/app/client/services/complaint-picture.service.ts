import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {UploadItem} from '../../shared/data/model/upload-item.model';
import {ComplaintPicture} from '../data/model/complaint-picture.model';
import {Observable} from 'rxjs';

@Injectable()
export class ComplaintPictureService
{
    constructor(private http: HttpClient) {}

    upload(picture: UploadItem<ComplaintPicture>)
    {
        return new Observable((observer) => {

            const formData: FormData = new FormData();
            formData.append('imageFile', picture.file);

            const request = new HttpRequest(
                'POST', '/client/complaint-picture/create',
                formData,
                {
                    reportProgress: true,
                    headers: new HttpHeaders({ 'enctype':  'multipart/form-data; boundary=----WebKitFormBoundaryuL67FWkv1CA'})
                }
            );

            this.http.request(request).subscribe(
                (event) => {
                    if (event.type === HttpEventType.UploadProgress)
                    {
                        picture.setProgress(event.loaded, event.total);
                        observer.next(picture);
                    }
                    else if (event instanceof HttpResponse)
                    {
                        // success
                        picture.uploaded = event.body['picture'];
                        observer.next(picture);
                    }
                },
                (errors) => {
                    picture.errors = errors.error.errors;
                    observer.error(picture);
                },
                () => {
                }
            );
        });
    }
}
