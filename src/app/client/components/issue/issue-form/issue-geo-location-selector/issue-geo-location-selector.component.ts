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

  updateMapState()
  {
    const { location, region, address } = this.issue;
    if (!!location && !!region && !!address)
    {
      // center map with issue location
      this.map.setCenter(location);

      // add issue balloon to the map
      // add complaint confirmation balloons for attached ones

      // request complaints which are nearby and could be attached
    }
    else
    {
      // center on device location
      this.map.setCenter(this.deviceLocation);

      const viewBox = this.map.getViewBox();

      // request complaints which are in the visible box
      this.complaintService.search({
        topLeftLatitude: viewBox.topLeft.latitude,
        topLeftLongitude: viewBox.topLeft.longitude,
        bottomRightLatitude: viewBox.bottomRight.latitude,
        bottomRightLongitude: viewBox.bottomRight.longitude
      }).subscribe((complaints: Array<Complaint>) => {

        //

      });
    }
  }

  setDefaultMapZoom()
  {

  }

  onLocationClickHandler(location: GeoLocation)
  {
    if (this.isSelectingLocation)
    {

    }
  }

  onViewBoxChangeHandler(box: MapViewBox)
  {
    console.log('Box -->');
    console.log(box);


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

        });
    }
    else
    {
      // remove all searched data from map
      this.removeAllComplaintBalloons();
    }


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

  addIssueBalloon(issue: Issue)
  {

  }
}
