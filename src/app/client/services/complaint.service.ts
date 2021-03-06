import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Complaint} from '../../core/data/model/complaint.model';
import {catchError, map} from 'rxjs/operators';
import {BaseService} from '../../core/services/base.service';
import {EntityTransformer} from '../../core/services/helper/entity-transformer.helper';

@Injectable()
export class ComplaintService extends BaseService {

    tagSearch(params: Object)
    {
        let parameters: HttpParams = this.getHttpParamsFromObject(params);

        return this
            .http
            .get<{ tags: Array<{}> }>('/client/complaint/geo-tag/search', { params: parameters })
            .pipe(
                map(result => result.tags)
            )
            ;
    }

    search(params: any)
    {

        let criteria = Object.assign(params, {
            tags: !!params.tags ? params.tags.map(item => item.id) : []
        });

        let parameters: HttpParams = this.getHttpParamsFromObject(criteria);

        return this
            .http
            .get<{ complaints: Array<Complaint> }>('/client/complaint/geo/search', { params: parameters })
            .pipe(
                map(({ complaints }) => {
                    return complaints.map(item => EntityTransformer.transformComplaint(item))
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
                        complaints: complaints.map(item => EntityTransformer.transformComplaint(item)),
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
            map(complaint => EntityTransformer.transformComplaint(complaint))
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
            map(complaint => EntityTransformer.transformComplaint(complaint))
        );
    }

    get(id: number)
    {
        return this.http.get<{ complaint: Complaint }>('/client/complaint/' + id).pipe(
            map(result => result.complaint),
            map(complaint => EntityTransformer.transformComplaint(complaint))
        );
    }

    remove(complaint: Complaint)
    {
        return this.http.delete('/client/complaint/' + complaint.id);
    }
}
