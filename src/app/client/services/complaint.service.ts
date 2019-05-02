import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Complaint} from '../data/model/complaint.model';
import {catchError, map} from 'rxjs/operators';
import {BaseService} from '../../core/services/base.service';

@Injectable()
export class ComplaintService extends BaseService {

    transformEntity = (complaint) => {

        const result = {
            ...complaint,
            location: {
                latitude: complaint.address.latitude,
                longitude: complaint.address.longitude
            }};


        return result;
    }

    search(params: Object)
    {
        let parameters: HttpParams = this.getHttpParamsFromObject(params);

        return this
            .http
            .get<{ complaints: Array<Complaint> }>('/client/complaint/geo/search', { params: parameters })
            .pipe(
                map(({ complaints }) => {
                    return complaints.map(item => this.transformEntity(item))
                })
            );
    }

    getUserComplaints(params: Object, page: number = 1)
    {
        let parameters: HttpParams = this.getHttpParamsFromObject(Object.assign(params, {
            page: page
        }));

        return this
            .http
            .get<{ complaints: Array<Complaint>, total: number }>(
                '/client/complaint/my/list',
                { params: parameters }
                )
            .pipe(
                map(({ complaints, total }) => {
                    return {
                        complaints: complaints.map(item => this.transformEntity(item)),
                        total: total
                    };
                })
            );
    }

    create(complaint: Complaint) {

        const body = {
            message: complaint.message,
            serviceType: complaint.serviceType ? complaint.serviceType.id : null,
            latitude: complaint.location.latitude,
            longitude: complaint.location.longitude,
            pictures: complaint.pictures.map(picture => picture.id),
            videos: complaint.videos.map(video => video.id),
            tags: complaint.tags.map(tag => tag.title)
        };

        return this.http.post<{ complaint: Complaint }>('/client/complaint', body).pipe(
            map(result => result.complaint),
            map(complaint => this.transformEntity(complaint))
        );
    }

    update(complaint: Complaint)
    {
        const body = {
            message: complaint.message,
            serviceType: complaint.serviceType ? complaint.serviceType.id : null,
            latitude: complaint.location.latitude,
            longitude: complaint.location.longitude,
            pictures: complaint.pictures.map(picture => picture.id),
            videos: complaint.videos.map(video => video.id),
            tags: complaint.tags.map(tag => tag.title)
        };

        return this.http.put<{ complaint: Complaint }>('/client/complaint/' + complaint.id, body).pipe(
            map(result => result.complaint),
            map(complaint => this.transformEntity(complaint))
        );
    }

    get(id: number)
    {
        return this.http.get<{ complaint: Complaint }>('/client/complaint/' + id).pipe(
            map(result => result.complaint),
            map(complaint => this.transformEntity(complaint)),
            catchError((response) => {
                throw {
                    error: 'Not found'
                };
            })
        );
    }

    remove(complaint: Complaint)
    {
        return this.http.delete('/client/complaint/' + complaint.id);
    }
}
