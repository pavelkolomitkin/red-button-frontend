import {Component, OnDestroy, OnInit} from '@angular/core';
import {Issue} from '../../../../core/data/model/issue.model';
import {Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {IssueDeleteStart, IssueUserListLoadStart, IssueUserListReset} from '../../../data/issue.actions';
import {GlobalConfirmationInit, GlobalConfirmationReset} from '../../../../core/data/actions';
import {filter} from 'rxjs/operators';
import {ActionConfirmation} from '../../../../core/data/model/action-confirmation.model';
import {ConfirmationActionOption} from '../../../../core/data/model/confirmation-action-option.model';

@Component({
  selector: 'app-issue-list-page',
  templateUrl: './issue-list-page.component.html',
  styleUrls: ['./issue-list-page.component.css']
})
export class IssueListPageComponent implements OnInit, OnDestroy {

  static DELETE_ISSUE_CONFIRMATION_ID = 'DELETE_ISSUE_CONFIRMATION_ID';

  list: Array<Issue> = [];
  total: number = null;

  currentPage = 1;
  infinityScrollDisabled: boolean = false;

  listSubscription: Subscription;
  deleteSubscription: Subscription;
  deleteConfirmationSubscription: Subscription;

  constructor(private store: Store<State>)
  {

  }

  ngOnInit()
  {
    this.currentPage = 1;
    this.list = [];

    this.store.dispatch(new IssueUserListReset());
    this.store.dispatch(new GlobalConfirmationReset())

    this.listSubscription = this.store.pipe(select(state => state.clientIssue)).subscribe(
        ({ userIssueList, userIssueTotal }) => {

          //debugger
          if (this.currentPage === 1)
          {
            this.list = [];
          }

          this.list = this.list.concat(userIssueList);

          // this.isEmpty = (this.currentPage === 1) && (userComplaintTotal === 0);
          this.infinityScrollDisabled = this.list.length === 0;
          this.total = userIssueTotal;
        }
    );

    this.deleteConfirmationSubscription = this.store.pipe(
        select(state => state.core.lastRespondedConfirmation),
        filter(result => result !== null),
        filter(result => result.id === IssueListPageComponent.DELETE_ISSUE_CONFIRMATION_ID))
        .subscribe((confirmation: ActionConfirmation) => {

          if (confirmation.userResponse.id === ConfirmationActionOption.CONFIRM_ID)
          {
            const deletingIssue:Issue = confirmation.payload as Issue;
            this.store.dispatch(new IssueDeleteStart(deletingIssue));
          }
        });


    this.deleteSubscription = this.store.pipe(
        select(state => state.clientIssue.deletedIssue),
        filter(result => result !== null))
        .subscribe((issue: Issue) => {

            this.currentPage = 1;
            this.loadList();
        });


    this.loadList();

  }

  ngOnDestroy(): void {
    this.listSubscription.unsubscribe();
    this.deleteSubscription.unsubscribe();
    this.deleteConfirmationSubscription.unsubscribe();
  }


  onScroll = () => {

    this.currentPage++;
    this.loadList();
  };

  loadList = () =>
  {
    this.store.dispatch(new IssueUserListLoadStart(this.currentPage))
  };

  onDeleteHandler(issue: Issue)
  {
    const confirmation: ActionConfirmation = new ActionConfirmation(
        IssueListPageComponent.DELETE_ISSUE_CONFIRMATION_ID,
        'Delete Issue?',
        'Are you sure you want to delete it?',
        [
          new ConfirmationActionOption(ConfirmationActionOption.CONFIRM_ID, 'Yes', 'danger'),
          new ConfirmationActionOption(ConfirmationActionOption.CANCEL_ID, 'Cancel')
        ],
        issue
    );

    this.store.dispatch(new GlobalConfirmationInit(confirmation));
  }
}
