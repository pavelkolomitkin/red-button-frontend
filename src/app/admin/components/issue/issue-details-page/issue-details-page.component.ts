import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {ActivatedRoute, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {Issue} from '../../../../core/data/model/issue.model';
import {IssueDeleteReset, IssueDeleteStart, IssueGetReset, IssueGetStart} from '../../../data/issue.actions';
import {Subscription} from 'rxjs';
import {GlobalConfirmationInit, GlobalPageTitle} from '../../../../core/data/actions';
import {ActionConfirmation} from '../../../../core/data/model/action-confirmation.model';
import {ConfirmationActionOption} from '../../../../core/data/model/confirmation-action-option.model';


@Component({
  selector: 'app-issue-details-page',
  templateUrl: './issue-details-page.component.html',
  styleUrls: ['./issue-details-page.component.css']
})
export class IssueDetailsPageComponent implements OnInit, OnDestroy {

  static DELETE_ISSUE_ID = 'ADMIN_DELETE_ISSUE_ID';

  issue: Issue;

  detailsSubscription: Subscription;
  idSubscription: Subscription;
  detailsErrorSubscription: Subscription;
  deleteConfirmationSubscription: Subscription;
  deleteSubscription: Subscription;

  constructor(
      private store: Store<State>,
      private router: Router,
      private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.store.dispatch(new IssueGetReset());
    this.store.dispatch(new IssueDeleteReset());

    this.detailsSubscription = this.store.pipe(
        select(state => state.adminIssue.details),
        filter(result => !!result)
    ).subscribe((issue: Issue) => {
      
      this.issue = issue;

      this.store.dispatch(new GlobalPageTitle('ISSUE', this.issue.client.fullName));

    });

    this.detailsErrorSubscription = this.store.pipe(
        select(state => state.adminIssue.detailsErrors),
        filter(result => !!result),
        filter(result => Object.keys(result).length > 0)
    ).subscribe((result) => {
      this.router.navigateByUrl('/admin/404');
    });


    this.idSubscription = this.route.params.subscribe((params) => {

      this.store.dispatch(new IssueGetStart(+params['id']));

    });

    this.deleteConfirmationSubscription = this.store.pipe(
        select(state => state.core.lastRespondedConfirmation),
        filter(result => result !== null),
        filter(result => result.id === IssueDetailsPageComponent.DELETE_ISSUE_ID + this.issue.id))
        .subscribe((confirmation: ActionConfirmation) => {

          if (confirmation.userResponse.id === ConfirmationActionOption.CONFIRM_ID)
          {
            const deletingIssue:Issue = confirmation.payload as Issue;
            this.store.dispatch(new IssueDeleteStart(deletingIssue));
          }
        });

    this.deleteSubscription = this.store.pipe(
        select(state => state.adminIssue.deletedItem),
        filter(result => result !== null))
        .subscribe((issue: Issue) => {
          this.router.navigateByUrl('/admin/issue/list');
        });
  }

  ngOnDestroy(): void {

    this.detailsSubscription.unsubscribe();
    this.idSubscription.unsubscribe();
    this.detailsErrorSubscription.unsubscribe();
    this.deleteConfirmationSubscription.unsubscribe();
    this.deleteSubscription.unsubscribe();

  }

  onDeleteClickHandler(event)
  {
    const confirmation: ActionConfirmation = new ActionConfirmation(
        IssueDetailsPageComponent.DELETE_ISSUE_ID + this.issue.id,
        'DELETE_ISSUE_QUESTION',
        'ARE_YOU_SURE_YOU_WANT_TO_DELETE_IT',
        [
          new ConfirmationActionOption(ConfirmationActionOption.CONFIRM_ID, 'YES', 'danger'),
          new ConfirmationActionOption(ConfirmationActionOption.CANCEL_ID, 'CANCEL')
        ],
        this.issue
    );

    this.store.dispatch(new GlobalConfirmationInit(confirmation));
  }

}
