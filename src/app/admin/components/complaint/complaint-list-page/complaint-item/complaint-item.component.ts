import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Complaint} from '../../../../../core/data/model/complaint.model';
import {ActionConfirmation} from '../../../../../core/data/model/action-confirmation.model';
import {ConfirmationActionOption} from '../../../../../core/data/model/confirmation-action-option.model';
import {GlobalConfirmationInit} from '../../../../../core/data/actions';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../../app.state';
import {filter} from 'rxjs/operators';
import {ComplaintDeleteStart} from '../../../../data/complaint.actions';
import {Subscription} from 'rxjs';

@Component({
  selector: '[app-admin-complaint-item]',
  templateUrl: './complaint-item.component.html',
  styleUrls: ['./complaint-item.component.css']
})
export class ComplaintItemComponent implements OnInit, OnDestroy {

  static CONFIRMATION_ID = 'COMPLAINT_REMOVE_CONFIRMATION';

  @Output('onDelete') deleteEvent: EventEmitter<Complaint> = new EventEmitter();

  @Input() complaint: Complaint;

  deleteConfirmationSubscription: Subscription;
  deleteSubscription: Subscription;

  constructor(private store: Store<State>) { }

  ngOnInit() {

    this.deleteConfirmationSubscription = this.store.pipe(
        select(state => state.core.lastRespondedConfirmation),
        filter(result => result !== null),
        filter(result => result.id === ComplaintItemComponent.CONFIRMATION_ID + this.complaint.id))
        .subscribe((confirmation: ActionConfirmation) => {

          if (confirmation.userResponse.id === ConfirmationActionOption.CONFIRM_ID)
          {
            const deletingComplaint:Complaint = confirmation.payload as Complaint;
            this.store.dispatch(new ComplaintDeleteStart(deletingComplaint));
          }
        });

    this.deleteSubscription = this.store.pipe(
        select(state => state.adminComplaint.deletedItem),
        filter(result => !!result),
        filter(item => item.id === this.complaint.id)
    ).subscribe(() => {
      this.deleteEvent.emit(this.complaint);
    });

  }

  ngOnDestroy(): void {
    this.deleteConfirmationSubscription.unsubscribe();
    this.deleteSubscription.unsubscribe();
  }

  onDeleteClickHandler($event)
  {
    const confirmation: ActionConfirmation = new ActionConfirmation(
        ComplaintItemComponent.CONFIRMATION_ID + this.complaint.id,
        'DELETE_COMPLAINT_QUESTION',
        'ARE_YOU_SURE_YOU_WANT_TO_DELETE_IT',
        [
          new ConfirmationActionOption(ConfirmationActionOption.CONFIRM_ID, 'YES', 'danger'),
          new ConfirmationActionOption(ConfirmationActionOption.CANCEL_ID, 'CANCEL')
        ],
        this.complaint
    );

    this.store.dispatch(new GlobalConfirmationInit(confirmation));
  }

}
