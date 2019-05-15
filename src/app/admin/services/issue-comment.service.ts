import {BaseService} from '../../core/services/base.service';
import {HttpParams} from '@angular/common/http';
import {Issue} from '../../core/data/model/issue.model';
import {map} from 'rxjs/operators';
import {EntityTransformer} from '../../core/services/helper/entity-transformer.helper';
import {IssueComment} from '../../core/data/model/issue-comment.model';

export class IssueCommentService extends BaseService
{
    getList(params: Object, page: number = 1)
    {
        let parameters: HttpParams = this.getHttpParamsFromObject(Object.assign(params, {
            page: page
        }));

        return this
            .http
            .get<{ comments: Array<IssueComment>, total: number }>('/admin/issue-comment/list', {params: parameters})
            .pipe(
                map(({ comments, total }) => {
                    return {
                        comments: comments.map(item => EntityTransformer.transformIssueComment(item)),
                        total: total
                    };
                })
            )
            ;
    }
}