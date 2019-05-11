import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Issue} from '../../../../../core/data/model/issue.model';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../../app.state';
import {ComplaintConfirmationStatus} from '../../../../../core/data/model/complaint-confirmation-status.model';
import {ActionConfirmation} from '../../../../../core/data/model/action-confirmation.model';
import {ConfirmationActionOption} from '../../../../../core/data/model/confirmation-action-option.model';
import {GlobalConfirmationInit} from '../../../../../core/data/actions';
import {filter} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {IssueDeleteStart} from '../../../../data/issue.actions';

@Component({
  selector: '[app-admin-issue-list-item]',
  templateUrl: './issue-item.component.html',
  styleUrls: ['./issue-item.component.css']
})
export class IssueItemComponent implements OnInit, OnDestroy {


  static CONFIRMATION_ID = 'ISSUE_REMOVE_CONFIRMATION';

  @Output('onDelete') deleteEvent: EventEmitter<Issue> = new EventEmitter();

  @Input() issue: Issue;

  deleteConfirmationSubscription: Subscription;
  deleteSubscription: Subscription;

  constructor(private store: Store<State>) { }

  ngOnInit() {

    this.deleteConfirmationSubscription = this.store.pipe(
        select(state => state.core.lastRespondedConfirmation),
        filter(result => result !== null),
        filter(result => result.id === IssueItemComponent.CONFIRMATION_ID + this.issue.id))
        .subscribe((confirmation: ActionConfirmation) => {

          if (confirmation.userResponse.id === ConfirmationActionOption.CONFIRM_ID)
          {
            const deletingIssue:Issue = confirmation.payload as Issue;
            this.store.dispatch(new IssueDeleteStart(deletingIssue));
          }
        });

    this.deleteSubscription = this.store.pipe(
        select(state => state.adminIssue.deletedItem),
        filter(result => !!result),
        filter(item => item.id === this.issue.id)
    ).subscribe(() => {
      this.deleteEvent.emit(this.issue);
    });

  }

  ngOnDestroy(): void {
    this.deleteConfirmationSubscription.unsubscribe();
    this.deleteSubscription.unsubscribe();
  }

  approvedSignatureNumber()
  {
    let result = 0;

    this.issue.complaintConfirmations.forEach((item) => {

      if (item.status.code === ComplaintConfirmationStatus.STATUS_CONFIRMED)
      {
        result++;
      }

    });

    return result;
  }

  onDeleteClickHandler(event)
  {
    const confirmation: ActionConfirmation = new ActionConfirmation(
        IssueItemComponent.CONFIRMATION_ID + this.issue.id,
        'Delete Issue?',
        'Are you sure you want to delete it?',
        [
          new ConfirmationActionOption(ConfirmationActionOption.CONFIRM_ID, 'Yes', 'danger'),
          new ConfirmationActionOption(ConfirmationActionOption.CANCEL_ID, 'Cancel')
        ],
        this.issue
    );

    this.store.dispatch(new GlobalConfirmationInit(confirmation));
  }
}
