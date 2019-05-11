import {HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Issue} from '../../core/data/model/issue.model';
import {catchError, map} from 'rxjs/operators';
import {BaseService} from '../../core/services/base.service';
import {ComplaintConfirmation} from '../../core/data/model/complaint-confirmation.model';
import {EntityTransformer} from '../../core/services/helper/EntityTransformer';

@Injectable()
export class IssueService extends BaseService
{
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
                        issues: issues.map(item => EntityTransformer.transformIssue(item)),
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
            map(issue => EntityTransformer.transformIssue(issue))
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
            map(issue => EntityTransformer.transformIssue(issue))
        );
    }


    get(id: number)
    {
        return this.http.get<{ issue: Issue, hasLike: boolean }>('/client/issue/' + id.toString()).pipe(
            map(({ issue, hasLike }) => {
                issue.hasUserLike = hasLike;
                return issue;
            }),
            map(issue => EntityTransformer.transformIssue(issue)),
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

    addLike(issue: Issue)
    {
        return this.http.post<{ issue: Issue, hasLike: boolean }>('/client/issue/' + issue.id + '/add-like', {}).pipe(
            map(({ issue, hasLike }) => {
                issue.hasUserLike = hasLike;
                return issue;
            }),
            map(issue => EntityTransformer.transformIssue(issue))
        );
    }

    removeLike(issue: Issue)
    {
        return this.http.post<{ issue: Issue, hasLike: boolean }>('/client/issue/' + issue.id + '/remove-like', {}).pipe(
            map(({ issue, hasLike }) => {
                issue.hasUserLike = hasLike;
                return issue;
            }),
            map(issue => EntityTransformer.transformIssue(issue))
        );
    }
}