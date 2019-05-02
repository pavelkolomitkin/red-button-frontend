import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Issue} from '../data/model/issue.model';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class IssueService
{
    constructor(private http: HttpClient) {}

    transformEntity = (issue) => {

        const result = {
            ...issue,
            location: {
                latitude: issue.address.latitude,
                longitude: issue.address.longitude
            }};


        return result;
    };

    create(issue: Issue)
    {
        const body = {
            message: issue.message,
            serviceType: issue.serviceType ? issue.serviceType.id : null,
            latitude: issue.location.latitude,
            longitude: issue.location.longitude,
            pictures: issue.pictures.map(picture => picture.id),
            videos: issue.videos.map(video => video.id),
            complaintConfirmations: issue.complaintConfirmations
        };

        return this.http.post<{ issue: Issue }>('/client/issue', body).pipe(
            map(result => result.issue),
            map(issue => this.transformEntity(issue))
        );
    }

    update(issue: Issue)
    {
        const body = {
            message: issue.message,
            serviceType: issue.serviceType ? issue.serviceType.id : null,
            latitude: issue.location.latitude,
            longitude: issue.location.longitude,
            pictures: issue.pictures.map(picture => picture.id),
            videos: issue.videos.map(video => video.id),
            complaintConfirmations: issue.complaintConfirmations
        };

        return this.http.put<{ issue: Issue }>('/client/issue' + issue.id.toString(), body).pipe(
            map(result => result.issue),
            map(issue => this.transformEntity(issue))
        );
    }


    get(id: number)
    {
        return this.http.get<{ issue: Issue }>('/client/issue/' + id.toString()).pipe(
            map(result => result.issue),
            map(issue => this.transformEntity(issue)),
            catchError((response) => {
                throw {
                    error: 'Not found'
                };
            })
        );
    }

    remove(issue: Issue)
    {
        return this.http.delete('/client/issue/' + issue.id.toString());
    }
}