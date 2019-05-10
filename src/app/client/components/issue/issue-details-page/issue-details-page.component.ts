import {Component, OnDestroy, OnInit} from '@angular/core';
import {Issue} from '../../../../core/data/model/issue.model';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {ActivatedRoute, Router} from '@angular/router';
import {IssueChangeLikeReset, IssueDeleteReset, IssueDeleteStart, IssueGetReset, IssueGetStart} from '../../../data/issue.actions';
import {combineLatest, Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {GlobalConfirmationInit, GlobalPageTitle} from '../../../../core/data/actions';
import {ActionConfirmation} from '../../../../core/data/model/action-confirmation.model';
import {ConfirmationActionOption} from '../../../../core/data/model/confirmation-action-option.model';
import {ComplaintConfirmation} from '../../../data/model/complaint-confirmation.model';
import {ComplaintConfirmationChangeStatusReset} from '../../../data/complaint-confirmation.actions';

@Component({
  selector: 'app-issue-details-page',
  templateUrl: './issue-details-page.component.html',
  styleUrls: ['./issue-details-page.component.css']
})
export class IssueDetailsPageComponent implements OnInit, OnDestroy {

  static DELETE_ISSUE_ID = 'DELETE_ISSUE_ID';

  issue: Issue;

  detailsSubscription: Subscription;
  idSubscription: Subscription;
  deleteConfirmationSubscription: Subscription;
  deleteSubscription: Subscription;
  likeSubscription: Subscription;

  isOwnIssue: boolean = false;

  constructor(
      private store: Store<State>,
      private router: Router,
      private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.store.dispatch(new IssueGetReset());
    this.store.dispatch(new IssueDeleteReset());
    this.store.dispatch(new ComplaintConfirmationChangeStatusReset());
    this.store.dispatch(new IssueChangeLikeReset());

    this.likeSubscription = this.store.pipe(
        select(state => state.clientIssue.lastLiked),
        filter(result => !!result)
    ).subscribe((issue) => {
        this.issue = issue
    });

    this.detailsSubscription = combineLatest(
        this.store.pipe(select(state => state.clientIssue.issueDetails), filter(result => !!result)),
        this.store.pipe(select(state => state.security.authorizedUser), filter(result => !!result))
    ).subscribe(([issue, user]) => {

      this.isOwnIssue = issue.client.id === user.id;

      this.issue = issue;

      this.store.dispatch(new GlobalPageTitle('Issue details', this.issue.client.fullName));
    });


    this.store.pipe(
      select(state => state.clientConfirmation.updatedConfirmation),
      filter(result => !!result)
    ).subscribe((confirmation: ComplaintConfirmation) => {

    const index = this.issue.complaintConfirmations.findIndex(item => item.id === confirmation.id);
    if (index !== -1)
    {
        this.issue.complaintConfirmations[index] = confirmation;
        this.issue = Object.assign(new Issue(), this.issue);
    }
    });

    this.idSubscription = this.route.params.subscribe(
        (params) => {
          this.store.dispatch(new IssueGetStart(+params['id']));
        }
    );

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
        select(state => state.clientIssue.deletedIssue),
        filter(result => result !== null))
        .subscribe((issue: Issue) => {
          this.router.navigateByUrl('/client/issue/list');
        });

  }

  ngOnDestroy(): void {
    this.detailsSubscription.unsubscribe();
    this.idSubscription.unsubscribe();
    this.deleteConfirmationSubscription.unsubscribe();
    this.deleteSubscription.unsubscribe();
    this.likeSubscription.unsubscribe();
  }

  onDeleteClickHandler(event)
  {
    const confirmation: ActionConfirmation = new ActionConfirmation(
        IssueDetailsPageComponent.DELETE_ISSUE_ID + this.issue.id,
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