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
import {ComplaintConfirmation} from '../../../../data/model/complaint-confirmation.model';
import {ComplaintConfirmationStatus} from '../../../../data/model/complaint-confirmation-status.model';
import {ComplaintConfirmationMapBalloonComponent} from './complaint-confirmation-map-balloon/complaint-confirmation-map-balloon.component';

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
  confirmationBalloons : Array<ComponentRef<ComplaintConfirmationMapBalloonComponent>> = [];

  isSelectingLocation: boolean = false;
  deviceLocation: GeoLocation;

  searchCriteria: any = null;

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

  isSearchAround()
  {
    return !!this.internalIssue.address && !!this.internalIssue.region;
  }

  onSearchFormChangeHandler(criteria: Object)
  {
    this.searchCriteria = criteria;

    if (this.isSearchAround())
    {
      this.initUnAttachedComplaintAroundIssue();
    }
    else
    {
      this.updateComplaintsWithViewBox();
    }
  }

  getSearchFormParameters()
  {
    let result: any = {};
    // debugger
    if (!!this.searchCriteria)
    {
      result = {
        tags: this.searchCriteria.tags
      };

      if (!!this.searchCriteria.serviceType)
      {
        result.serviceTypeId = this.searchCriteria.serviceType.id;
      }
    }

    return result;
  }

  onLocationClickHandler(location: GeoLocation)
  {
    if (this.isSelectingLocation)
    {
      this.addIssueBalloon(location);
      this.isSelectingLocation = false;
    }
  }

  onRequestSignatureHandler = (complaint: Complaint) => {
    // console.log('Request the signature -->');
    // console.log(complaint);

    const confirmation: ComplaintConfirmation = {
      complaint: complaint,
      status: {
        code: ComplaintConfirmationStatus.STATUS_PENDING
      },
    };

    this.internalIssue.complaintConfirmations.push(confirmation);

    this.updateConfirmationBalloons();
  };

  deleteConfirmationHandler = (confirmation: ComplaintConfirmation) => {

    this.removeConfirmationBalloon(confirmation);
    this.initUnAttachedComplaintAroundIssue();

  };

  updateConfirmationBalloons = () => {

    this.internalIssue.complaintConfirmations.forEach((confirmation: ComplaintConfirmation) => {

      this.addConfirmationBalloon(confirmation);

    });

  };

  addConfirmationBalloon = (confirmation: ComplaintConfirmation) => {

    const index = this.confirmationBalloons.findIndex(component => component.instance.confirmation.complaint.id === confirmation.complaint.id);

    if (index === -1)
    {
      const componentRef = this.map.addBalloon(ComplaintConfirmationMapBalloonComponent, confirmation.complaint.location);

      const { instance } = componentRef;
      instance.confirmation = confirmation;

      instance.deleteEvent.subscribe(this.deleteConfirmationHandler);

      this.confirmationBalloons.push(componentRef);

      this.removeComplaintBalloon(confirmation.complaint);
    }

  };

  removeConfirmationBalloon = (confirmation: ComplaintConfirmation) => {

    const index = this.confirmationBalloons.findIndex(component => component.instance.confirmation.complaint.id === confirmation.complaint.id);
    if (index !== -1)
    {
      const componentRef = this.confirmationBalloons[index];

      componentRef.instance.deleteEvent.unsubscribe();

      this.map.removeBalloon(componentRef);
      this.confirmationBalloons.splice(index, 1);
    }
  };

  removeAllConfirmationBalloons = () => {

    this.confirmationBalloons.forEach((componentRef: ComponentRef<ComplaintConfirmationMapBalloonComponent>) => {

      this.map.removeBalloon(componentRef);

    });

    this.internalIssue.complaintConfirmations = [];
    this.confirmationBalloons = [];

  };


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
      this.removeAllComplaintBalloons();
      this.updateComplaintsWithViewBox();
    });

    this.internalIssue.location = location;

    instance.issue = this.internalIssue;
    instance.needPositionReload = true;
  }

  removeIssueBalloon()
  {
    if (!!this.issueBalloon)
    {
      this.map.removeBalloon(this.issueBalloon);
      this.removeAllConfirmationBalloons();
      this.issueBalloon = null;
    }
  }

  initUnAttachedComplaintAroundIssue = () => {

    const box = this.map.getViewBox();

    if (box.zoom >= IssueGeoLocationSelectorComponent.LOADING_DATA_ZOOM)
    {
      let searchParams = this.getSearchFormParameters();
      searchParams = Object.assign(searchParams, {
        centerLatitude: this.internalIssue.location.latitude,
        centerLongitude: this.internalIssue.location.longitude
      });

      this.complaintService.search(searchParams)
          .toPromise()
          .then((complaints: Array<Complaint>) => {

            this.removeAllComplaintBalloons();
            this.updateComplaintBalloons(complaints, true);

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

  updateComplaintsWithViewBox = () => {

    const box = this.map.getViewBox();

    if (!!this.internalIssue.address && !!this.internalIssue.region)
    {
      return;
    }

    if (box.zoom >= IssueGeoLocationSelectorComponent.LOADING_DATA_ZOOM)
    {
      let searchParams = this.getSearchFormParameters();
      searchParams = Object.assign(searchParams, {
        topLeftLatitude: box.topLeft.latitude,
        topLeftLongitude: box.topLeft.longitude,
        bottomRightLatitude: box.bottomRight.latitude,
        bottomRightLongitude: box.bottomRight.longitude
      });

      this.complaintService.search(searchParams)
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

  updateComplaintBalloons = (updatedItems: Array<Complaint>, canRequestSignature: boolean = false) =>
  {
    const oldItems: Array<Complaint> = this.complaintBalloons.map(component => component.instance.complaint);

    updatedItems.forEach((item) => {

      if (oldItems.findIndex(complaint => complaint.id === item.id) === -1)
      {
        this.addComplaintBalloon(item, canRequestSignature);
      }

    });

    oldItems.forEach((oldItem: Complaint) => {

      if (updatedItems.findIndex(item => item.id === oldItem.id) === -1)
      {
        this.removeComplaintBalloon(oldItem);
      }

    });

  };

  addComplaintBalloon = (complaint: Complaint, canRequestSignature: boolean = false) =>
  {
    const confirmationIndex = this.confirmationBalloons.findIndex(item => item.instance.confirmation.complaint.id === complaint.id);
    if (confirmationIndex !== -1)
    {
      return;
    }

    const index = this.complaintBalloons.findIndex(item => item.instance.complaint.id === complaint.id);

    if (index === -1)
    {
      const componentRef = this.map.addBalloon(ComplaintMapBalloonComponent, complaint.location);

      const { instance } = componentRef;

      instance.complaint = complaint;

      instance.canRequestSignature = canRequestSignature;
      if (canRequestSignature)
      {
        instance.requestSignatureEvent.subscribe(this.onRequestSignatureHandler);
      }

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

      if (item.instance.canRequestSignature)
      {
        item.instance.requestSignatureEvent.unsubscribe();
      }

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
