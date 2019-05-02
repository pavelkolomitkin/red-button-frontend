import {Component, ComponentRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Issue} from '../../../../data/model/issue.model';
import {GeoLocation} from '../../../../../core/data/model/geo-location.model';
import {MapComponent} from '../../../../../shared/components/map/map.component';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../../app.state';
import {Subscription} from 'rxjs';
import {ComplaintService} from '../../../../services/complaint.service';
import {Complaint} from '../../../../data/model/complaint.model';
import {MapViewBox} from '../../../../../shared/data/model/map-view-box.model';
import {ComplaintMapBalloonComponent} from './complaint-map-balloon/complaint-map-balloon.component';
import {IssueMapBalloonComponent} from './issue-map-balloon/issue-map-balloon.component';

@Component({
  selector: 'app-issue-geo-location-selector',
  templateUrl: './issue-geo-location-selector.component.html',
  styleUrls: ['./issue-geo-location-selector.component.css']
})
export class IssueGeoLocationSelectorComponent implements OnInit, OnDestroy {

  static LOADING_DATA_ZOOM = 10;

  @Output('onClose') closeEvent: EventEmitter<void> = new EventEmitter();

  @Input() issue: Issue;

  @ViewChild('map') map: MapComponent;

  internalIssue: Issue;

  issueBalloon: ComponentRef<IssueMapBalloonComponent>;
  complaintBalloons: Array<ComponentRef<ComplaintMapBalloonComponent>> = [];

  isSelectingLocation: boolean = false;

  deviceLocation: GeoLocation;

  deviceLocationSubscription: Subscription;

  constructor(
      private store: Store<State>,
      private complaintService: ComplaintService
      )
  {
    this.deviceLocationSubscription = this.deviceLocationSubscription = this.store.pipe(select(state => state.core.deviceGeoLocation)).subscribe((location: GeoLocation) => {
      this.deviceLocation = location;
    });
  }

  ngOnInit() {
    this.internalIssue = {...this.issue};
  }

  ngOnDestroy(): void {
    this.deviceLocationSubscription.unsubscribe();
  }

  onMapReadyHandler(event)
  {

    // init view
      // init default zoom which allows to load items from server
      // set map center
        // 1. if we have a selected location already
          // take center location as selected location
        // 2. if we haven't a selected location
          // take center location as device location
    const { location, address, region } = this.internalIssue;
    if (!!location && !!address && !!region)
    {
      this.map.setCenter(location);
      this.map.setZoom(IssueGeoLocationSelectorComponent.LOADING_DATA_ZOOM);


    }

    // install the balloon of selected location of certain issue if it we have it
      // 1. if we have a selected location for the issue
        // set balloon of issue on the map
      // 2. if we haven't a selected location for the issue
        // do nothing

    // install balloons of complaint confirmations which have already attached to the certain issue

  }

  onLocationClickHandler(location: GeoLocation)
  {
    if (this.isSelectingLocation)
    {
      this.addIssueBalloon(location);
    }
  }


  addIssueBalloon(location: GeoLocation)
  {
    this.removeAllComplaintBalloons();
    this.removeIssueBalloon();

    this.issueBalloon = this.map.addBalloon(IssueMapBalloonComponent, location);

    const { instance } = this.issueBalloon;

    instance.locationUpdateSuccessEvent.subscribe((issue: Issue) => {

      this.initUnAttachedComplaintAroundIssue();

    });

    instance.locationUpdateErrorEvent.subscribe((issue: Issue) => {
      this.removeAllComplaintBalloons();
    });

    instance.locationCancelEvent.subscribe((issue: Issue) => {

      this.removeIssueBalloon();
      this.updateComplaintsWithViewBox();
    });

    this.internalIssue.location = location;

    instance.issue = this.internalIssue;
    instance.needPositionReload = true;
  }

  initUnAttachedComplaintAroundIssue = () => {

    const box = this.map.getViewBox();

    if (box.zoom >= IssueGeoLocationSelectorComponent.LOADING_DATA_ZOOM)
    {
      this.complaintService.search({
        centerLatitude: this.internalIssue.location.latitude,
        centerLongitude: this.internalIssue.location.longitude
      })
          .toPromise()
          .then((complaints: Array<Complaint>) => {

            this.updateComplaintBalloons(complaints);

          })
          .catch(() => {
            this.removeAllComplaintBalloons();
          })
      ;
    }
    else
    {
      this.removeAllComplaintBalloons();
    }
  };

  removeIssueBalloon()
  {
    if (!!this.issueBalloon)
    {
      this.map.removeBalloon(this.issueBalloon);
      this.issueBalloon = null;
    }
  }

  updateComplaintsWithViewBox = () => {

    const box = this.map.getViewBox();
    console.log('Box -->');
    console.log(box);

    if (!!this.internalIssue.address && !!this.internalIssue.region)
    {
      return;
    }

    if (box.zoom >= IssueGeoLocationSelectorComponent.LOADING_DATA_ZOOM)
    {
      this.complaintService.search({
        topLeftLatitude: box.topLeft.latitude,
        topLeftLongitude: box.topLeft.longitude,
        bottomRightLatitude: box.bottomRight.latitude,
        bottomRightLongitude: box.bottomRight.longitude
      })
          .toPromise()
          .then((complaints) => {

            this.updateComplaintBalloons(complaints);

          })
          .catch(() => {
            this.removeAllComplaintBalloons();
          });
    }
    else
    {
      // remove all searched data from map
      this.removeAllComplaintBalloons();
    }
  };

  onViewBoxChangeHandler(box: MapViewBox)
  {
    this.updateComplaintsWithViewBox();
  }

  updateComplaintBalloons = (updatedItems: Array<Complaint>) =>
  {

    const oldItems: Array<Complaint> = this.complaintBalloons.map(component => component.instance.complaint);

    //const newItems: Array<Complaint> = [];

    updatedItems.forEach((item) => {

      if (oldItems.findIndex(complaint => complaint.id === item.id) === -1)
      {
        // add to new items
        //newItems.push(item);

        this.addComplaintBalloon(item);
      }

    });


    //const removingItems: Array<Complaint> = [];

    oldItems.forEach((oldItem: Complaint) => {

      if (updatedItems.findIndex(item => item.id === oldItem.id) === -1)
      {
        //removingItems.push(oldItem);
        this.removeComplaintBalloon(oldItem);
      }

    });

  };

  addComplaintBalloon = (complaint: Complaint) =>
  {
    const index = this.complaintBalloons.findIndex(item => item.instance.complaint.id === complaint.id);

    if (index === -1)
    {
      const componentRef = this.map.addBalloon(ComplaintMapBalloonComponent, complaint.location);
      componentRef.instance.complaint = complaint;

      this.complaintBalloons.push(componentRef);
    }
  };

  removeComplaintBalloon = (complaint: Complaint) =>
  {
    const index = this.complaintBalloons.findIndex(item => item.instance.complaint.id === complaint.id);
    if (index !== -1)
    {
      const item: ComponentRef<ComplaintMapBalloonComponent> = this.complaintBalloons[index];
      this.map.removeBalloon(item);

      this.complaintBalloons.splice(index, 1);
    }
  };

  removeAllComplaintBalloons = () =>
  {
    this.complaintBalloons.forEach((item) => {
      this.map.removeBalloon(item);
    });

    this.complaintBalloons = [];
  };
}
