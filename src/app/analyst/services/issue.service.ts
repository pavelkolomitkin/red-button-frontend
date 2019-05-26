import {BaseService} from '../../core/services/base.service';
import {Region} from '../../core/data/model/region.model';
import {HttpParams} from '@angular/common/http';
import {Issue} from '../../core/data/model/issue.model';
import {map} from 'rxjs/operators';
import {EntityTransformer} from '../../core/services/helper/entity-transformer.helper';

export class IssueService extends BaseService
{
    searchByRegion(region: Region, params: Object)
    {
        const parameters: HttpParams = this.getHttpParamsFromObject(params);

        return this.http.get<{ issues: Array<Issue> }>('/analytics/issue/region/' + region.id + '/geo/search', { params: parameters }).pipe(
            map(({ issues }) => {
                return issues.map(item => EntityTransformer.transformIssue(item));
            })
        );
    }
}