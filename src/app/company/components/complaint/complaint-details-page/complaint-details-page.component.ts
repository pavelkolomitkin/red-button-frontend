import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {ActivatedRoute, Router} from '@angular/router';
import {ComplaintGetReset, ComplaintGetStart} from '../../../data/complaint.actions';
import {Observable, Subscription} from 'rxjs';
import {Complaint} from '../../../../core/data/model/complaint.model';
import {filter} from 'rxjs/operators';
import {GlobalPageTitle} from '../../../../core/data/actions';

@Component({
  selector: 'app-complaint-details-page',
  templateUrl: './complaint-details-page.component.html',
  styleUrls: ['./complaint-details-page.component.css']
})
export class ComplaintDetailsPageComponent implements OnInit, OnDestroy {

  complaint: Complaint;

  idSubscription: Subscription;
  errorSubscription: Subscription;
  detailsSubscription: Subscription;

  constructor(
      private store: Store<State>,
      private router: Router,
      private route: ActivatedRoute
      ) { }

  ngOnInit() {

    this.store.dispatch(new ComplaintGetReset());

    this.detailsSubscription = this.store.pipe(
        select(state => state.companyComplaint.details),
        filter(result => !!result)
    ).subscribe((complaint: Complaint) => {

      this.complaint = complaint;
      this.store.dispatch(new GlobalPageTitle('COMPLAINT', this.complaint.client.fullName));

    });

    this.errorSubscription = this.store.pipe(
        select(state => state.companyComplaint.detailsErrors),
        filter(result => Object.keys(result).length > 0)
    ).subscribe(() => {
      this.router.navigateByUrl('/company/404');
    });

    this.idSubscription = this.route.params.subscribe((params) => {

      this.store.dispatch(new ComplaintGetStart(+params['id']));

    });
  }

  ngOnDestroy(): void {

    this.idSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
    this.detailsSubscription.unsubscribe();
  }

}
