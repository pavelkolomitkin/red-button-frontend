import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Issue} from '../../../../core/data/model/issue.model';
import {IssueCreateStart, IssueGetReset, IssueGetStart, IssueUpdateReset, IssueUpdateStart} from '../../../data/issue.actions';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {GlobalNotifySuccessMessage, GlobalPageTitle} from '../../../../core/data/actions';
import {NotifyMessage} from '../../../../core/data/model/notify-message.model';
import {LeavePageConfirmationInterface} from '../../../../core/data/model/leave-page-confirmation.interface';
import {IssueFormComponent} from '../issue-form/issue-form.component';

@Component({
  selector: 'app-edit-issue-page',
  templateUrl: './edit-issue-page.component.html',
  styleUrls: ['./edit-issue-page.component.css']
})
export class EditIssuePageComponent implements OnInit, OnDestroy, LeavePageConfirmationInterface {

  @ViewChild('form') form: IssueFormComponent;

  issue: Issue;

  errors: Observable<Object>;

  detailsSubscription: Subscription;
  idSubscription: Subscription;
  updateSuccessSubscription: Subscription;
  errorGetDetailsSubscription: Subscription;

  constructor(
      private store: Store<State>,
      private router: Router,
      private route: ActivatedRoute
  ) {
    this.issue = null
  }

  ngOnInit() {

    this.store.dispatch(new IssueUpdateReset());
    this.store.dispatch(new IssueGetReset());

    this.idSubscription = this.route.params.subscribe(
        (params) => {
          this.store.dispatch(new IssueGetStart(+params['id']));
        }
    );

    this.detailsSubscription = combineLatest(
        this.store.pipe(select(state => state.clientIssue.issueDetails), filter(result => result !== null)),
        this.store.pipe(select(state => state.security.authorizedUser), filter(result => result !== null))
    ).subscribe(([issue, user]) => {
      if (issue.client.id !== user.id)
      {
        this.router.navigateByUrl('/404');
      }
      else
      {
        this.issue = issue;

        this.store.dispatch(new GlobalPageTitle('Edit the Issue', '#' + this.issue.id.toString()));
      }
    });

    this.errorGetDetailsSubscription = this.store.pipe(select(state => state.clientIssue.issueDetailsErrors),
        filter(errors => Object.entries(errors).length > 0))
        .subscribe(() => {

          this.router.navigateByUrl('/404');
        });

    this.updateSuccessSubscription = this.store.pipe(select(state => state.clientIssue.updatedIssue),
        filter(result => result !== null)).subscribe(
        (issue: Issue) => {

          this.store.dispatch(new GlobalNotifySuccessMessage(new NotifyMessage('ISSUE_HAS_BEEN_EDITED')));
          this.router.navigateByUrl('/client/issue/' + issue.id.toString());
        }
    );


    this.errors = this.store.pipe(select(state => state.clientIssue.updatingIssueErrors));
  }

  ngOnDestroy(): void
  {
    this.detailsSubscription.unsubscribe();
    this.idSubscription.unsubscribe();
    this.updateSuccessSubscription.unsubscribe();
    this.errorGetDetailsSubscription.unsubscribe();
  }

  onSubmitHandler(issue: Issue)
  {
    this.store.dispatch(new IssueUpdateStart(issue));
  }

  getPromptMessage(): string {
    return null;
  }

}
