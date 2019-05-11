import {Component, OnDestroy, OnInit} from '@angular/core';
import {Complaint} from '../../../../core/data/model/complaint.model';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {filter} from 'rxjs/operators';
import {ComplaintGetReset, ComplaintGetStart, ComplaintUpdateReset, ComplaintUpdateStart} from '../../../data/complaint.actions';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalNotifySuccessMessage} from '../../../../core/data/actions';
import {NotifyMessage} from '../../../../core/data/model/notify-message.model';

@Component({
  selector: 'app-complaint-edit-page',
  templateUrl: './complaint-edit-page.component.html',
  styleUrls: ['./complaint-edit-page.component.css']
})
export class ComplaintEditPageComponent implements OnInit, OnDestroy {

  complaint: Complaint;
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
    this.complaint = null;
  }

  ngOnInit() {

    this.store.dispatch(new ComplaintGetReset());
    this.store.dispatch(new ComplaintUpdateReset());

    this.idSubscription = this.route.params.subscribe(
        (params) => {
          this.store.dispatch(new ComplaintGetStart(+params['id']));
        }
    );

    this.detailsSubscription = combineLatest(
        this.store.pipe(select(state => state.clientComplaint.complaintDetails), filter(result => result !== null)),
        this.store.pipe(select(state => state.security.authorizedUser), filter(result => result !== null))
    ).subscribe(([complaint, user]) => {
        if (complaint.client.id !== user.id)
        {
            this.router.navigateByUrl('/404');
        }
        else
        {
            this.complaint = complaint;
        }
    });

    this.errorGetDetailsSubscription = this.store.pipe(select(state => state.clientComplaint.complaintDetailsErrors),
        filter(errors => Object.entries(errors).length > 0))
        .subscribe(() => {

            this.router.navigateByUrl('/404');
        });

    this.updateSuccessSubscription = this.store.pipe(select(state => state.clientComplaint.updatedComplaint),
        filter(result => result !== null)).subscribe(
        (complaint: Complaint) => {

            this.store.dispatch(new GlobalNotifySuccessMessage(new NotifyMessage('The complaint has edited')));
          this.router.navigateByUrl('/client/complaint/' + complaint.id.toString());
        }
    );


    this.errors = this.store.pipe(select(state => state.clientComplaint.updatingComplaintErrors));
  }

  ngOnDestroy(): void {
    this.detailsSubscription.unsubscribe();
    this.idSubscription.unsubscribe();
    this.updateSuccessSubscription.unsubscribe();
    this.errorGetDetailsSubscription.unsubscribe();
  }

  onSubmitForm(complaint: Complaint)
  {
    this.store.dispatch(new ComplaintUpdateStart(this.complaint));
  }
}
