import {BaseService} from './base.service';
import {IssueComment} from '../data/model/issue-comment.model';
import {map} from 'rxjs/operators';
import {Issue} from '../data/model/issue.model';
import {Injectable} from '@angular/core';
import {EntityTransformer} from './helper/entity-transformer.helper';

@Injectable()
export class IssueCommentService extends BaseService
{
    getList(issue: Issue, page: number = 1)
    {
        const params = this.getHttpParamsFromObject({page});

        return this.http.get<{ comments: Array<IssueComment>, total: number }>('/issue-comment/' + issue.id + '/list', {
            params: params
        }).pipe(
            map(({comments, total}) => {

                return {
                    comments: comments.map(item => EntityTransformer.transformIssueComment(item)),
                    total: total
                };
            })
        );
    }

    create(comment: IssueComment)
    {
        return this.http.post<{ comment: IssueComment }>('/issue-comment/' + comment.issue.id, {
            message: comment.message
        })
            .pipe(
                map(({ comment }) => {
                    return EntityTransformer.transformIssueComment(comment)
                })
            );
    }

    update(comment: IssueComment)
    {
        return this.http.put<{ comment: IssueComment }>('/issue-comment/' + comment.id, {
            message: comment.message
        })
            .pipe(
                map(({ comment }) => {

                    return EntityTransformer.transformIssueComment(comment);
                })
            );
    }

    remove(comment: IssueComment)
    {
        return this.http.delete('/issue-comment/' + comment.id);
    }
}