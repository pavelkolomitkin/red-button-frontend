import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {combineLatest, Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {Complaint} from '../../../../core/data/model/complaint.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ComplaintDeleteReset, ComplaintDeleteStart, ComplaintGetReset, ComplaintGetStart} from '../../../data/complaint.actions';
import {GlobalBreadCrumbs, GlobalConfirmationInit, GlobalPageTitle} from '../../../../core/data/actions';
import {ActionConfirmation} from '../../../../core/data/model/action-confirmation.model';
import {ConfirmationActionOption} from '../../../../core/data/model/confirmation-action-option.model';

@Component({
  selector: 'app-complaint-details-page',
  templateUrl: './complaint-details-page.component.html',
  styleUrls: ['./complaint-details-page.component.css']
})
export class ComplaintDetailsPageComponent implements OnInit, OnDestroy {

  static DELETE_COMPLAINT_CONFIRMATION_ID = 'DELETE_COMPLAINT_CONFIRMATION_ID';

  complaint: Complaint;

  detailsSubscription: Subscription;
  idSubscription: Subscription;
  deleteConfirmationSubscription: Subscription;
  deleteSubscription: Subscription;
  detailsErrorSubscription: Subscription;

  isOwnComplaint: boolean = false;


  constructor(
      private store: Store<State>,
      private router: Router,
      private route: ActivatedRoute
  ) { }

  ngOnInit()
  {
    this.store.dispatch(new ComplaintGetReset());
    this.store.dispatch(new ComplaintDeleteReset());

    this.detailsSubscription = combineLatest(
        this.store.pipe(select(state => state.clientComplaint.complaintDetails), filter(result => !!result)),
        this.store.pipe(select(state => state.security.authorizedUser), filter(result => !!result))
    ).subscribe(([complaint, user]) => {

        this.isOwnComplaint = complaint.client.id === user.id;

        this.complaint = complaint;

        this.store.dispatch(new GlobalPageTitle('Complaint details', this.complaint.client.fullName));
    });

    this.detailsErrorSubscription = this.store.pipe(
        select(state => state.clientComplaint.complaintDetailsErrors),
        filter(result => !!result),
        filter(result => Object.keys(result).length > 0)
    ).subscribe(() => {
        this.router.navigateByUrl('/client/404');
    });

    this.idSubscription = this.route.params.subscribe(
        (params) => {
          this.store.dispatch(new ComplaintGetStart(+params['id']));
        }
    );

    this.deleteConfirmationSubscription = this.store.pipe(
        select(state => state.core.lastRespondedConfirmation),
        filter(result => result !== null),
        filter(result => result.id === ComplaintDetailsPageComponent.DELETE_COMPLAINT_CONFIRMATION_ID + this.complaint.id))
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
          this.router.navigateByUrl('/client/complaint/list');
        });
  }


  ngOnDestroy(): void
  {
    this.detailsSubscription.unsubscribe();
    this.idSubscription.unsubscribe();
    this.deleteConfirmationSubscription.unsubscribe();
    this.deleteSubscription.unsubscribe();
    this.detailsErrorSubscription.unsubscribe();
  }

  onDeleteClickHandler(event)
  {
    const confirmation: ActionConfirmation = new ActionConfirmation(
        ComplaintDetailsPageComponent.DELETE_COMPLAINT_CONFIRMATION_ID + this.complaint.id,
        'Delete Complaint?',
        'Are you sure you want to delete it?',
        [
          new ConfirmationActionOption(ConfirmationActionOption.CONFIRM_ID, 'Yes', 'danger'),
          new ConfirmationActionOption(ConfirmationActionOption.CANCEL_ID, 'Cancel')
        ],
        this.complaint
    );

    this.store.dispatch(new GlobalConfirmationInit(confirmation));
  }
}
