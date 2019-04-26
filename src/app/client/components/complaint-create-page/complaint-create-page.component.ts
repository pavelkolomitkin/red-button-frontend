import {Component, OnDestroy, OnInit} from '@angular/core';
import {Complaint} from '../../data/model/complaint.model';
import {select, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {ComplaintCreateReset, ComplaintCreateStart} from '../../data/complaint.actions';
import {filter} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {GlobalNotifySuccessMessage} from '../../../core/data/actions';
import {NotifyMessage} from '../../../core/data/model/notify-message.model';

@Component({
  selector: 'app-complaint-create-page',
  templateUrl: './complaint-create-page.component.html',
  styleUrls: ['./complaint-create-page.component.css']
})
export class ComplaintCreatePageComponent implements OnInit, OnDestroy {

  complaint: Complaint = new Complaint();

  errors: Observable<Object>;

  createSubscription: Subscription;

  constructor(private store: Store<State>, private router: Router) {

    this.store.dispatch(new ComplaintCreateReset());

    this.createSubscription = this.store.pipe(
        select(state => state.clientComplaint.createdComplaint),
        filter(result => result !== null)
    ).subscribe((complaint: Complaint) => {

      this.store.dispatch(new GlobalNotifySuccessMessage(new NotifyMessage('A new complaint has created')));
      this.router.navigateByUrl('/client/complaint/' + complaint.id.toString());

    });

    this.errors = this.store.pipe(select(state => state.clientComplaint.creationComplaintErrors));
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {

    this.createSubscription.unsubscribe();

  }

  onSubmitForm(complaint: Complaint)
  {
    this.store.dispatch(new ComplaintCreateStart(complaint));
  }

}
