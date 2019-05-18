import {BaseService} from '../../core/services/base.service';
import {HttpParams} from '@angular/common/http';
import {Issue} from '../../core/data/model/issue.model';
import {map} from 'rxjs/operators';
import {EntityTransformer} from '../../core/services/helper/entity-transformer.helper';

export class IssueService extends BaseService
{
    getList(params: Object, page: number = 1)
    {
        let parameters: HttpParams = this.getHttpParamsFromObject(Object.assign(params, {
            page: page
        }));

        return this
            .http
            .get<{ issues: Array<Issue>, total: number }>('/company/issue/list', {params: parameters})
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

    geoSearch(params: Object)
    {
        let parameters: HttpParams = this.getHttpParamsFromObject(params);

        return this.http.get<{ issues: Array<Issue> }>('/company/issue/geo/search', {params: parameters})
            .pipe(
                map(({ issues }) => {
                    return issues.map(item => EntityTransformer.transformIssue(item));
                })
            );
    }

    get(id: number)
    {
        return this.http.get<{ issue: Issue }>('/company/issue/' + id).pipe(
            map(({ issue }) =>
            {
                return EntityTransformer.transformIssue(issue);
            })
        );
    }
}