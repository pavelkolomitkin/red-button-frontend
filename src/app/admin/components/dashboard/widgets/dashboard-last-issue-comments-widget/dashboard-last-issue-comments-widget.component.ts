import { Component, OnInit } from '@angular/core';
import {DashboardCommonWidgetComponent} from '../dashboard-common-widget/dashboard-common-widget.component';
import {IssueCommentService} from '../../../../services/issue-comment.service';
import {IssueComment} from '../../../../../core/data/model/issue-comment.model';

@Component({
  selector: 'app-dashboard-last-issue-comments-widget',
  templateUrl: './dashboard-last-issue-comments-widget.component.html',
  styleUrls: ['./dashboard-last-issue-comments-widget.component.css']
})
export class DashboardLastIssueCommentsWidgetComponent extends DashboardCommonWidgetComponent implements OnInit {

  comments: Array<IssueComment> = [];

  constructor(private service: IssueCommentService) {
    super();
  }

  updateData(): Promise<any> {

    return this.service.getList({})
        .toPromise()
        .then(({ comments }) => {
          if (comments.length > 10)
          {
            comments.splice(10);
          }

          this.comments = comments;
        });
  }

}
