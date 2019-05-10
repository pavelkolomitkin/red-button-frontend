import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {IssueComment} from '../../../../../../core/data/model/issue-comment.model';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../../../app.state';
import User from '../../../../../../core/data/model/user.model';
import {Observable, Subscription} from 'rxjs';
import {IssueCommentService} from '../../../../../../core/services/issue-comment.service';
import {ActionConfirmation} from '../../../../../../core/data/model/action-confirmation.model';
import {ConfirmationActionOption} from '../../../../../../core/data/model/confirmation-action-option.model';
import {GlobalConfirmationInit} from '../../../../../../core/data/actions';
import {filter} from 'rxjs/operators';
import {Issue} from '../../../../../../core/data/model/issue.model';
import {IssueDeleteStart} from '../../../../../data/issue.actions';

@Component({
  selector: 'app-issue-comment-item',
  templateUrl: './issue-comment-item.component.html',
  styleUrls: ['./issue-comment-item.component.css']
})
export class IssueCommentItemComponent implements OnInit, OnDestroy {

  static DELETE_COMMENT_ID = 'DELETE_COMMENT_ID';

  @Output('onDelete') deleteEvent: EventEmitter<IssueComment> = new EventEmitter();

  @Input() comment: IssueComment;

  user: Observable<User>;

  isEditing: boolean = false;

  editErrors = {};

  deleteSubscription: Subscription;

  constructor(private store: Store<State>, private service: IssueCommentService) {

    this.user = this.store.pipe(select(state => state.security.authorizedUser));
  }

  ngOnInit() {

    this.deleteSubscription = this.store.pipe(
        select(state => state.core.lastRespondedConfirmation),
        filter(result => result !== null),
        filter(result => result.id === IssueCommentItemComponent.DELETE_COMMENT_ID + this.comment.id))
        .subscribe((confirmation: ActionConfirmation) => {

          if (confirmation.userResponse.id === ConfirmationActionOption.CONFIRM_ID)
          {
            this.service.remove(this.comment)
                .toPromise()
                .then(() => {
                  this.deleteEvent.emit(this.comment);
                });
          }
        });
  }

  ngOnDestroy(): void
  {
    this.deleteSubscription.unsubscribe();
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

  onDeleteClickHandler(event)
  {
    const confirmation: ActionConfirmation = new ActionConfirmation(
        IssueCommentItemComponent.DELETE_COMMENT_ID + this.comment.id,
        'Delete Comment?',
        'Are you sure you want to delete it?',
        [
          new ConfirmationActionOption(ConfirmationActionOption.CONFIRM_ID, 'Yes', 'danger'),
          new ConfirmationActionOption(ConfirmationActionOption.CANCEL_ID, 'Cancel')
        ],
        this.comment
    );

    this.store.dispatch(new GlobalConfirmationInit(confirmation));
  }

}
