import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Issue} from '../../../../../core/data/model/issue.model';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../../app.state';
import {filter} from 'rxjs/operators';
import User from '../../../../../core/data/model/user.model';
import {ComplaintConfirmation} from '../../../../../core/data/model/complaint-confirmation.model';
import {Subscription} from 'rxjs';
import {ComplaintConfirmationChangeStatusStart} from '../../../../data/complaint-confirmation.actions';
import {ComplaintConfirmationStatus} from '../../../../../core/data/model/complaint-confirmation-status.model';

@Component({
  selector: 'app-confirmation-control',
  templateUrl: './confirmation-control.component.html',
  styleUrls: ['./confirmation-control.component.css']
})
export class ConfirmationControlComponent implements OnInit, OnDestroy {

  _issue: Issue;

  userSubscription: Subscription;
  updateConfirmationSubscription: Subscription;

  userConfirmation: ComplaintConfirmation;
  isConfirming: boolean = false;

  constructor(private store: Store<State>)
  {
    this.userConfirmation = null;
  }

  @Input()
  set issue(value: Issue)
  {
    if (!this._issue || (this._issue !== value))
    {
      this._issue = value;
      this.updateState();
    }
  }

  updateState()
  {
    this.isConfirming = false;
    this.cleanSubscriptions();

    this.userSubscription = this.store.pipe(
        select(state => state.security.authorizedUser),
        filter(result => !!result)
    ).subscribe((user: User) => {

      this.userConfirmation = this._issue.complaintConfirmations.find(item => item.complaint.client.id === user.id);

    });

  }

  cleanSubscriptions()
  {
    if (!!this.userSubscription)
    {
      this.userSubscription.unsubscribe();
    }
    if (!!this.updateConfirmationSubscription)
    {
      this.updateConfirmationSubscription.unsubscribe();
    }
  }

  ngOnInit()
  {
    //this.updateState();
  }

  ngOnDestroy(): void
  {
    this.cleanSubscriptions();
  }

  onConfirmSignatureClickHandler(event)
  {
    this.isConfirming = true;
    this.store.dispatch(new ComplaintConfirmationChangeStatusStart(this.userConfirmation, ComplaintConfirmationStatus.STATUS_CONFIRMED));
  }

}
