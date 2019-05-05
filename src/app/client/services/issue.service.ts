import {HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Issue} from '../data/model/issue.model';
import {catchError, map} from 'rxjs/operators';
import {BaseService} from '../../core/services/base.service';
import {ComplaintConfirmation} from '../data/model/complaint-confirmation.model';
import {ComplaintService} from './complaint.service';

@Injectable()
export class IssueService extends BaseService
{
    static transformEntity = (issue) => {

        issue.complaintConfirmations = issue.complaintConfirmations.map((confirmation) => {
            if (!confirmation)
            {
                return null;
            }
            confirmation.complaint = ComplaintService.transformEntity(confirmation.complaint);

            return confirmation;
        });

        const result = {
            ...issue,
            location: {
                latitude: issue.address.latitude,
                longitude: issue.address.longitude
            }};


        return result;
    };

    getUserIssues(params: Object, page: number = 1)
    {
        let parameters: HttpParams = this.getHttpParamsFromObject(Object.assign(params, {
            page: page
        }));

        return this
            .http
            .get<{ issues: Array<Issue>, total: number }>('/client/issue/my/list', {params: parameters})
            .pipe(
                map(({ issues, total }) => {
                    return {
                        issues: issues.map(item => IssueService.transformEntity(item)),
                        total: total
                    };
                })
            )
            ;
    }

    create(issue: Issue)
    {
        const body = {
            message: issue.message,
            serviceType: issue.serviceType ? issue.serviceType.id : null,
            latitude: issue.location.latitude,
            longitude: issue.location.longitude,
            pictures: issue.pictures.map(picture => picture.id),
            videos: issue.videos.map(video => video.id),
            complaintConfirmations: issue.complaintConfirmations.map((complaintConfirmation: ComplaintConfirmation) => {
                return {
                    complaint: complaintConfirmation.complaint.id,
                };

            }),
            company: !!issue.company ? issue.company.id : null
        };

        return this.http.post<{ issue: Issue }>('/client/issue', body).pipe(
            map(result => result.issue),
            map(issue => IssueService.transformEntity(issue))
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
            complaintConfirmations: issue.complaintConfirmations.map((complaintConfirmation: ComplaintConfirmation) => {
                let result = {
                    complaint: complaintConfirmation.complaint.id,
                };
                if (typeof complaintConfirmation.id !== 'undefined')
                {
                    result = Object.assign(result, {id: complaintConfirmation.id});
                }

                return result;
            }),
            company: !!issue.company ? issue.company.id : null
        };

        return this.http.put<{ issue: Issue }>('/client/issue/' + issue.id.toString(), body).pipe(
            map(result => result.issue),
            map(issue => IssueService.transformEntity(issue))
        );
    }


    get(id: number)
    {
        return this.http.get<{ issue: Issue }>('/client/issue/' + id.toString()).pipe(
            map(result => result.issue),
            map(issue => IssueService.transformEntity(issue)),
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