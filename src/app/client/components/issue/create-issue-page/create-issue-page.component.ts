import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Issue} from '../../../../core/data/model/issue.model';
import {Observable, Subscription} from 'rxjs';
import {State} from '../../../../app.state';
import {select, Store} from '@ngrx/store';
import {IssueCreateReset, IssueCreateStart} from '../../../data/issue.actions';
import {filter} from 'rxjs/operators';
import {GlobalNotifySuccessMessage} from '../../../../core/data/actions';
import {NotifyMessage} from '../../../../core/data/model/notify-message.model';
import {ActivatedRoute, Router} from '@angular/router';
import {LeavePageConfirmationInterface} from '../../../../core/data/model/leave-page-confirmation.interface';
import {IssueFormComponent} from '../issue-form/issue-form.component';

@Component({
  selector: 'app-create-issue-page',
  templateUrl: './create-issue-page.component.html',
  styleUrls: ['./create-issue-page.component.css']
})
export class CreateIssuePageComponent implements OnInit, OnDestroy, LeavePageConfirmationInterface {

  @ViewChild('form') form: IssueFormComponent;

  issue: Issue = new Issue();

  errors: Observable<Object>;

  createSubscription: Subscription;

  constructor(
      private store: Store<State>,
      private router: Router) {

    this.store.dispatch(new IssueCreateReset());

    this.createSubscription = this.store.pipe(
        select(state => state.clientIssue.createdIssue),
        filter(result => result !== null))
        .subscribe((issue: Issue) => {

          this.store.dispatch(new GlobalNotifySuccessMessage(new NotifyMessage('NEW_ISSUE_IS_CREATED')));
          this.router.navigateByUrl('/client/issue/' + issue.id.toString());

        });

    this.errors = this.store.pipe(select(state => state.clientIssue.creationIssueErrors));

  }

  ngOnInit() {

  }

  ngOnDestroy(): void {

    this.createSubscription.unsubscribe();

  }

  onSubmitHandler(issue: Issue)
  {
    this.store.dispatch(new IssueCreateStart(issue));
  }

  getPromptMessage(): string {
    return null;
  }
}
