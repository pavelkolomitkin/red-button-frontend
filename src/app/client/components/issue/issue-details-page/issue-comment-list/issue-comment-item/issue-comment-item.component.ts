import {Component, Input, OnInit} from '@angular/core';
import {IssueComment} from '../../../../../../core/data/model/issue-comment.model';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../../../app.state';
import User from '../../../../../../core/data/model/user.model';
import {Observable} from 'rxjs';
import {IssueCommentService} from '../../../../../../core/services/issue-comment.service';

@Component({
  selector: 'app-issue-comment-item',
  templateUrl: './issue-comment-item.component.html',
  styleUrls: ['./issue-comment-item.component.css']
})
export class IssueCommentItemComponent implements OnInit {

  @Input() comment: IssueComment;

  user: Observable<User>;

  isEditing: boolean = false;

  editErrors = {};

  constructor(private store: Store<State>, private service: IssueCommentService) {

    this.user = this.store.pipe(select(state => state.security.authorizedUser));
  }

  ngOnInit() {
  }


  onEditCommentClickHandler(event)
  {
    this.isEditing = true;
  }

  onCommentSubmitHandler(comment: IssueComment)
  {
    this
        .service
        .update(comment)
        .toPromise()
        .then((comment) => {
          this.comment = comment;
          this.isEditing = false;
        })
        .catch((errors) => {
          this.editErrors = errors.error.errors;
        });
  }

  onCancelEditCommentHandler(comment: IssueComment)
  {
    this.isEditing = false;
  }

}
