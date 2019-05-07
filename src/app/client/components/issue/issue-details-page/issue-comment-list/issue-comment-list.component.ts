import {Component, Input, OnInit} from '@angular/core';
import {Issue} from '../../../../../core/data/model/issue.model';
import {IssueCommentService} from '../../../../../core/services/issue-comment.service';
import {IssueComment} from '../../../../../core/data/model/issue-comment.model';

@Component({
  selector: 'app-issue-comment-list',
  templateUrl: './issue-comment-list.component.html',
  styleUrls: ['./issue-comment-list.component.css']
})
export class IssueCommentListComponent implements OnInit {

  _issue: Issue;

  list: Array<IssueComment> = [];
  currentPage = 1;
  total: number = null;

  newComment: IssueComment;
  newCommentErrors = {};

  constructor(private service: IssueCommentService) { }

  @Input()
  set issue(value: Issue)
  {
    if (!this._issue || (this._issue !== value))
    {
      this._issue = value;

      this.list = [];
      this.currentPage = 1;

      this.loadComments();
    }
  }

  ngOnInit()
  {
    this.newComment = new IssueComment();
  }

  onScroll()
  {
    this.currentPage++;
    this.loadComments();
  }

  loadComments()
  {
    this
        .service
        .getList(this._issue, this.currentPage)
        .toPromise()
        .then(({ comments, total }) => {

          this.list = this.list.concat(comments);
          this.total = total;

        });
  }

  onNewCommentSubmit(comment: IssueComment)
  {
    comment.issue = this._issue;

    this
        .service
        .create(comment)
        .toPromise()
        .then((comment) => {
          this.list.unshift(comment);

          this.newComment = new IssueComment();
          this.newCommentErrors = {};
        })
        .catch((errors) => {
          this.newCommentErrors = errors.error.errors;
        });
  }

  onCommentDeleteHandler(comment: IssueComment)
  {
    const index = this.list.findIndex(item => item.id === comment.id);
    if (index !== -1)
    {
      this.list.splice(index, 1);
    }
  }
}
