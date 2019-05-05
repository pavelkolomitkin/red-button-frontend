import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Issue} from '../../../../data/model/issue.model';
import {MapComponent} from '../../../../../shared/components/map/map.component';
import {IssueViewBalloonComponent} from './issue-view-balloon/issue-view-balloon.component';
import {ComplaintConfirmationViewBalloonComponent} from './complaint-confirmation-view-balloon/complaint-confirmation-view-balloon.component';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../../app.state';
import {filter} from 'rxjs/operators';
import {GeoLocation} from '../../../../../core/data/model/geo-location.model';
import {Subscription} from 'rxjs';
import {MapBalloonCenteringReset} from '../../../../../shared/data/map.actions';

@Component({
  selector: 'app-issue-map-view',
  templateUrl: './issue-map-view.component.html',
  styleUrls: ['./issue-map-view.component.css']
})
export class IssueMapViewComponent implements OnInit, OnDestroy {

  @Input() issue: Issue;

  @ViewChild('map') map: MapComponent;


  balloonSubscription: Subscription;

  constructor(private store: Store<State>) {}

  ngOnInit() {

  }

  ngOnDestroy(): void {

    if (!!this.balloonSubscription)
    {
      this.balloonSubscription.unsubscribe();
    }
  }


  onMapReadyHandler(event)
  {
    this.store.dispatch(new MapBalloonCenteringReset());
    this.balloonSubscription = this.store.pipe(
        select(state => state.map.centeringBalloonLocation),
        filter(result => !!result))
        .subscribe((location: GeoLocation) => {

          this.map.setCenter(location, true);

        });

    // add issue balloon
    const issueComponent = this.map.addBalloon(IssueViewBalloonComponent, this.issue.location);
    issueComponent.instance.issue = this.issue;
    // center map on the issue balloon
    this.map.setCenter(this.issue.location);
    this.map.setZoom(15);


    // add complaint confirmation balloons(consider the confirmation status as well)
    for (let confirmation of this.issue.complaintConfirmations)
    {
      let confirmationComponent = this.map.addBalloon(ComplaintConfirmationViewBalloonComponent, confirmation.complaint.location);
      confirmationComponent.instance.confirmation = confirmation;
    }

  }
}
