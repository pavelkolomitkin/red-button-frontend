import {Component, OnDestroy, OnInit} from '@angular/core';
import {Complaint} from '../../data/model/complaint.model';
import {Observable, Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {filter} from 'rxjs/operators';
import {ComplaintGetReset, ComplaintGetStart, ComplaintUpdateReset, ComplaintUpdateStart} from '../../data/complaint.actions';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-complaint-edit-page',
  templateUrl: './complaint-edit-page.component.html',
  styleUrls: ['./complaint-edit-page.component.css']
})
export class ComplaintEditPageComponent implements OnInit, OnDestroy {

  complaint: Complaint;
  errors: Observable<Object>;

  detailsSubscription: Subscription;
  detailsErrorSubscription: Subscription;
  idSubscription: Subscription;
  updateSuccessSubscription: Subscription;

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

    this.detailsSubscription = this.store.pipe(
        select(state => state.clientComplaint.complaintDetails),
        filter(result => result !== null)).subscribe(
        (complaint: Complaint) => {

          this.complaint = complaint;

        }
    );

    this.updateSuccessSubscription = this.store.pipe(select(state => state.clientComplaint.updatedComplaint),
        filter(result => result !== null)).subscribe(
        (complaint: Complaint) => {
          this.router.navigateByUrl('/client/complaint/list');
        }
    );

    this.detailsErrorSubscription = this.store.pipe(select(state => state.clientComplaint.complaintDetailsErrors)).subscribe(
        (errors: Object) => {
          if (Object.entries(errors).length > 0)
          {
            this.router.navigateByUrl('/client/complaint/list');
          }
        }
    );

    this.errors = this.store.pipe(select(state => state.clientComplaint.updatingComplaintErrors));
  }

  ngOnDestroy(): void {
    this.detailsSubscription.unsubscribe();
    this.detailsErrorSubscription.unsubscribe();
    this.idSubscription.unsubscribe();
    this.updateSuccessSubscription.unsubscribe();
  }


  onSubmitForm(complaint: Complaint)
  {
    this.store.dispatch(new ComplaintUpdateStart(this.complaint));
  }
}
