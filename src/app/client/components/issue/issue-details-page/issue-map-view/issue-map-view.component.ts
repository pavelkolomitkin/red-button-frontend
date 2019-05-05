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

  _issue: Issue;

  @ViewChild('map') map: MapComponent;

  balloonSubscription: Subscription;
  isMapInitialized: boolean = false;

  constructor(private store: Store<State>) {}

  ngOnInit() {

  }

  ngOnDestroy(): void {

    if (!!this.balloonSubscription)
    {
      this.balloonSubscription.unsubscribe();
    }
  }

  @Input()
  set issue(value: Issue)
  {
    if ((!this._issue) || (this._issue.id != value.id))
    {
      this._issue = value;
      if (this.isMapInitialized)
      {
        this.initializeBalloons();
      }
    }
  }

  private initializeBalloons()
  {
    this.clearMap();
    this.store.dispatch(new MapBalloonCenteringReset());

    // add issue balloon
    const issueComponent = this.map.addBalloon(IssueViewBalloonComponent, this._issue.location);
    issueComponent.instance.issue = this._issue;
    // center map on the issue balloon
    this.map.setCenter(this._issue.location);
    this.map.setZoom(15);


    // add complaint confirmation balloons(consider the confirmation status as well)
    for (let confirmation of this._issue.complaintConfirmations)
    {
      let confirmationComponent = this.map.addBalloon(ComplaintConfirmationViewBalloonComponent, confirmation.complaint.location);
      confirmationComponent.instance.confirmation = confirmation;
    }
  }

  private clearMap()
  {
    this.map.removeAllBalloons();
  }


  onMapReadyHandler(event)
  {
    this.isMapInitialized = true;

    this.initializeBalloons();

    this.balloonSubscription = this.store.pipe(
        select(state => state.map.centeringBalloonLocation),
        filter(result => !!result))
        .subscribe((location: GeoLocation) => {

          this.map.setCenter(location, true);

        });
  }
}
