import {BaseService} from '../../core/services/base.service';
import {HttpParams} from '@angular/common/http';
import {Issue} from '../../core/data/model/issue.model';
import {catchError, map} from 'rxjs/operators';
import {EntityTransformer} from '../../core/services/helper/EntityTransformer';

export class IssueService extends BaseService
{
    getList(params: Object, page: number = 1)
    {
        let parameters: HttpParams = this.getHttpParamsFromObject(Object.assign(params, {
            page: page
        }));

        return this
            .http
            .get<{ issues: Array<Issue>, total: number }>('/admin/issue/list', {params: parameters})
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

    get(id: number)
    {
        return this.http.get<{ issue: Issue }>('/admin/issue/' + id.toString()).pipe(
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
        return this.http.delete('/admin/issue/' + issue.id);
    }
}