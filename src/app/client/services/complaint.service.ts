import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Complaint} from '../data/model/complaint.model';
import {map} from 'rxjs/operators';

@Injectable()
export class ComplaintService {

    constructor(private http: HttpClient) {}

    getUserComplaints(params: Object, page: number = 1)
    {
        let parameters: HttpParams = new HttpParams().set('page', page.toString());
        
        for (let [name, value] of Object.entries(params))
        {
            parameters.append(name, value.toString());
        }

        return this.http.get<{ complaints: Array<Complaint>, total: number }>('/client/complaint/my/list', { params: parameters });
    }

    create(complaint: Complaint) {

        const body = {
            message: complaint.message,
            serviceType: complaint.serviceType,
            latitude: complaint.latitude,
            longitude: complaint.longitude,
            pictures: complaint.picture.map(picture => picture.id),
            video: complaint.videos.map(video => video.id),
            tags: complaint.tags.map(tag => tag.title)
        };

        return this.http.post<{ complaint: Complaint }>('/client/complaint', body).pipe(
            map(result => result.complaint)
        );
    }

    update(complaint: Complaint)
    {
        const body = {
            message: complaint.message,
            serviceType: complaint.serviceType,
            latitude: complaint.latitude,
            longitude: complaint.longitude,
            pictures: complaint.picture.map(picture => picture.id),
            video: complaint.videos.map(video => video.id),
            tags: complaint.tags.map(tag => tag.title)
        };

        return this.http.put<{ complaint: Complaint }>('/client/complaint/' + complaint.id, body).pipe(
            map(result => result.complaint)
        );
    }

    get(id: number)
    {
        return this.http.get<{ complaint: Complaint }>('/client/complaint/' + id).pipe(
            map(result => result.complaint)
        );
    }

    remove(complaint: Complaint)
    {
        return this.http.delete('/client/complaint/' + complaint.id);
    }
}
