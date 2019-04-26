import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {combineLatest, Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {Complaint} from '../../data/model/complaint.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ComplaintGetReset, ComplaintGetStart} from '../../data/complaint.actions';
import {GlobalBreadCrumbs, GlobalPageTitle} from '../../../core/data/actions';

@Component({
  selector: 'app-complaint-details-page',
  templateUrl: './complaint-details-page.component.html',
  styleUrls: ['./complaint-details-page.component.css']
})
export class ComplaintDetailsPageComponent implements OnInit, OnDestroy {

  complaint: Complaint;

  detailsSubscription: Subscription;
  idSubscription: Subscription;


  constructor(
      private store: Store<State>,
      private router: Router,
      private route: ActivatedRoute
  ) { }

  ngOnInit()
  {
    this.store.dispatch(new ComplaintGetReset());

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

        this.store.dispatch(new GlobalPageTitle('Complaint details', '#' + this.complaint.id.toString()));
        // TODO: add bread crumbs
      }
    });

    this.idSubscription = this.route.params.subscribe(
        (params) => {
          this.store.dispatch(new ComplaintGetStart(+params['id']));
        }
    );
  }


  ngOnDestroy(): void
  {
    this.detailsSubscription.unsubscribe();
    this.idSubscription.unsubscribe();
  }
}
