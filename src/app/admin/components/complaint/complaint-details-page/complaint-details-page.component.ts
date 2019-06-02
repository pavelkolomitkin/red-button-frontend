import {Component, OnDestroy, OnInit} from '@angular/core';
import {Complaint} from '../../../../core/data/model/complaint.model';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {ComplaintDeleteReset, ComplaintDeleteStart, ComplaintGetReset, ComplaintGetStart} from '../../../data/complaint.actions';
import {filter} from 'rxjs/operators';
import {GlobalConfirmationInit, GlobalPageTitle} from '../../../../core/data/actions';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ActionConfirmation} from '../../../../core/data/model/action-confirmation.model';
import {ConfirmationActionOption} from '../../../../core/data/model/confirmation-action-option.model';

@Component({
  selector: 'app-complaint-details-page',
  templateUrl: './complaint-details-page.component.html',
  styleUrls: ['./complaint-details-page.component.css']
})
export class ComplaintDetailsPageComponent implements OnInit, OnDestroy {

  static DELETE_COMPLAINT_ID = 'ADMIN_DELETE_COMPLAINT_ID';

  complaint: Complaint;

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

  ngOnInit()
  {

    this.store.dispatch(new ComplaintGetReset());
    this.store.dispatch(new ComplaintDeleteReset());

    this.detailsSubscription = this.store.pipe(
        select(state => state.adminComplaint.details),
        filter(result => !!result)
    ).subscribe((complaint: Complaint) => {

      this.complaint = complaint;
      this.store.dispatch(new GlobalPageTitle('COMPLAINT', this.complaint.client.fullName));

    });

    this.detailsErrorSubscription = this.store.pipe(
        select(state => state.adminComplaint.detailsErrors),
        filter(result => !!result),
        filter(result => Object.keys(result).length > 0)
    ).subscribe(() => {

      this.router.navigateByUrl('/admin/404');

    });

    this.idSubscription = this.route.params.subscribe((params) => {

      this.store.dispatch(new ComplaintGetStart(+params['id']));

    });

    this.deleteConfirmationSubscription = this.store.pipe(
        select(state => state.core.lastRespondedConfirmation),
        filter(result => result !== null),
        filter(result => result.id === ComplaintDetailsPageComponent.DELETE_COMPLAINT_ID + this.complaint.id))
        .subscribe((confirmation: ActionConfirmation) => {

          if (confirmation.userResponse.id === ConfirmationActionOption.CONFIRM_ID)
          {
            const deletingComplaint: Complaint = confirmation.payload as Complaint;
            this.store.dispatch(new ComplaintDeleteStart(deletingComplaint));
          }
        });


    this.deleteSubscription = this.store.pipe(
        select(state => state.adminComplaint.deletedItem),
        filter(result => result !== null))
        .subscribe((complaint: Complaint) => {
          this.router.navigateByUrl('/admin/complaint/list');
        });

  }

  ngOnDestroy(): void
  {
    this.detailsSubscription.unsubscribe();
    this.idSubscription.unsubscribe();
    this.detailsErrorSubscription.unsubscribe();
    this.deleteConfirmationSubscription.unsubscribe();
    this.deleteSubscription.unsubscribe();
  }


  onDeleteClickHandler(event)
  {
    const confirmation: ActionConfirmation = new ActionConfirmation(
        ComplaintDetailsPageComponent.DELETE_COMPLAINT_ID + this.complaint.id,
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
