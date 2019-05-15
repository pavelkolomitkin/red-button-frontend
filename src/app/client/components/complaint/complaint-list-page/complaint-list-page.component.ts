import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {Complaint} from '../../../../core/data/model/complaint.model';
import {Subscription} from 'rxjs';
import {ComplaintDeleteStart, ComplaintUserListLoadStart, ComplaintUserListReset} from '../../../data/complaint.actions';
import {GlobalConfirmationInit, GlobalConfirmationReset} from '../../../../core/data/actions';
import {ActionConfirmation} from '../../../../core/data/model/action-confirmation.model';
import {ConfirmationActionOption} from '../../../../core/data/model/confirmation-action-option.model';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-complaint-list-page',
  templateUrl: './complaint-list-page.component.html',
  styleUrls: ['./complaint-list-page.component.css']
})
export class ComplaintListPageComponent implements OnInit, OnDestroy {

  static DELETE_COMPLAINT_CONFIRMATION_ID = 'DELETE_COMPLAINT_CONFIRMATION_ID';

  list: Array<Complaint> = [];
  currentPage = 1;
  total: number = null;

  infinityScrollDisabled: boolean = false;

  isEmpty: boolean = false;

  listSubscription: Subscription;
  deleteSubscription: Subscription;
  deleteConfirmationSubscription: Subscription;

  constructor(private store: Store<State>) {
    this.currentPage = 1;
    this.list = [];
  }

  ngOnInit() {

    //debugger
    this.currentPage = 1;
    this.list = [];

    this.store.dispatch(new ComplaintUserListReset());
    this.store.dispatch(new GlobalConfirmationReset());

    this.listSubscription = this.store.pipe(select(state => state.clientComplaint)).subscribe(
        ({ userComplaintList, userComplaintTotal }) => {

          //debugger
          if (this.currentPage === 1)
          {
            this.list = [];
          }

          this.list = this.list.concat(userComplaintList);

          this.isEmpty = (this.currentPage === 1) && (userComplaintTotal === 0);
          this.infinityScrollDisabled = this.list.length === 0;

          this.total = userComplaintTotal;
        }
    );

    this.deleteConfirmationSubscription = this.store.pipe(
        select(state => state.core.lastRespondedConfirmation),
        filter(result => result !== null),
        filter(result => result.id === ComplaintListPageComponent.DELETE_COMPLAINT_CONFIRMATION_ID))
        .subscribe((confirmation: ActionConfirmation) => {

          if (confirmation.userResponse.id === ConfirmationActionOption.CONFIRM_ID)
          {
            const deletingComplaint:Complaint = confirmation.payload as Complaint;
            this.store.dispatch(new ComplaintDeleteStart(deletingComplaint));
          }
        });


    this.deleteSubscription = this.store.pipe(
        select(state => state.clientComplaint.deletedComplaint),
        filter(result => result !== null))
        .subscribe((complaint: Complaint) => {

            this.currentPage = 1;
            this.loadList();
        });

    //debugger
    this.loadList();

  }

  ngOnDestroy(): void {

    //debugger
    this.listSubscription.unsubscribe();
    this.deleteSubscription.unsubscribe();
    this.deleteConfirmationSubscription.unsubscribe();
  }

  onScroll = () => {
    //debugger
    this.currentPage++;
    this.loadList();
  }

  loadList = () =>
  {
    this.store.dispatch(new ComplaintUserListLoadStart(this.currentPage))
  }

  onDeleteHandler(complaint: Complaint)
  {
    const confirmation: ActionConfirmation = new ActionConfirmation(
        ComplaintListPageComponent.DELETE_COMPLAINT_CONFIRMATION_ID,
        'Delete Complaint?',
        'Are you sure you want to delete it?',
        [
            new ConfirmationActionOption(ConfirmationActionOption.CONFIRM_ID, 'Yes', 'danger'),
            new ConfirmationActionOption(ConfirmationActionOption.CANCEL_ID, 'Cancel')
        ],
        complaint
    );

    this.store.dispatch(new GlobalConfirmationInit(confirmation));
  }
}
