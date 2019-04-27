import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Video} from '../data/model/video.model';
import {map} from 'rxjs/operators';

@Injectable()
export class VideoService
{
    constructor(private http: HttpClient) {}

    create(link: string)
    {
        return this.http.post<{ video: Video }>('/client/video-material/create', {
            url: link
        }).pipe(map(result => result.video));
    }
}

