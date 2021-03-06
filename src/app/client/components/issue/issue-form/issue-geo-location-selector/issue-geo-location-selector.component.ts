import {Component, ComponentRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Issue} from '../../../../../core/data/model/issue.model';
import {GeoLocation} from '../../../../../core/data/model/geo-location.model';
import {MapComponent} from '../../../../../shared/components/map/map.component';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../../app.state';
import {from, Observable, of, Subject, Subscription} from 'rxjs';
import {ComplaintService} from '../../../../services/complaint.service';
import {Complaint} from '../../../../../core/data/model/complaint.model';
import {MapViewBox} from '../../../../../shared/data/model/map-view-box.model';
import {ComplaintMapBalloonComponent} from './complaint-map-balloon/complaint-map-balloon.component';
import {IssueMapBalloonComponent} from './issue-map-balloon/issue-map-balloon.component';
import {ComplaintConfirmation} from '../../../../../core/data/model/complaint-confirmation.model';
import {ComplaintConfirmationStatus} from '../../../../../core/data/model/complaint-confirmation-status.model';
import {ComplaintConfirmationMapBalloonComponent} from './complaint-confirmation-map-balloon/complaint-confirmation-map-balloon.component';
import {SearchFormComponent} from './search-form/search-form.component';
import {debounceTime, filter, map, tap} from 'rxjs/operators';
import {MapBalloonCenteringReset} from '../../../../../shared/data/map.actions';
import {OSMSearchResult} from '../../../../../core/data/model/osm-search-result.model';

@Component({
  selector: 'app-issue-geo-location-selector',
  templateUrl: './issue-geo-location-selector.component.html',
  styleUrls: ['./issue-geo-location-selector.component.css']
})
export class IssueGeoLocationSelectorComponent implements OnInit, OnDestroy {

  static LOADING_DATA_ZOOM = 10;
  static EXISTING_ISSUE_ZOOM = 15;
  static VIEW_BOX_TIME_INTERVAL_UPDATING = 500;

  @Output('onSelect') selectEvent: EventEmitter<Issue> = new EventEmitter();
  @Output('onCancel') cancelEvent: EventEmitter<void> = new EventEmitter();

  @Input() issue: Issue;

  @ViewChild('map') map: MapComponent;
  @ViewChild('searchForm') searchForm: SearchFormComponent;

  internalIssue: Issue;

  issueBalloon: ComponentRef<IssueMapBalloonComponent>;
  complaintBalloons: Array<ComponentRef<ComplaintMapBalloonComponent>> = [];
  confirmationBalloons : Array<ComponentRef<ComplaintConfirmationMapBalloonComponent>> = [];

  isSelectingLocation: boolean = false;
  deviceLocation: GeoLocation;

  viewBoxDelayDescriptor: number = null;


  deviceLocationSubscription: Subscription;
  balloonSubscription: Subscription;

  constructor(
      private store: Store<State>,
      private complaintService: ComplaintService
      )
  {
    this.deviceLocationSubscription = this.deviceLocationSubscription = this.store.pipe(select(state => state.core.deviceGeoLocation)).subscribe((location: GeoLocation) => {
      this.deviceLocation = location;
    });

    this.store.dispatch(new MapBalloonCenteringReset());
  }

  ngOnInit() {

    this.internalIssue = this.issue.clone();
  }

  ngOnDestroy(): void {
    this.deviceLocationSubscription.unsubscribe();

    if (!!this.balloonSubscription)
    {
      this.balloonSubscription.unsubscribe();
    }
  }

  onMapReadyHandler(event)
  {

    if (this.issue.isAddressInit())
    {
      const { location } = this.internalIssue;

      this.addIssueBalloon(location);
      this.updateConfirmationBalloons();
      this.initUnAttachedComplaintAroundIssue();


      this.map.setCenter(location);
      this.map.setZoom(IssueGeoLocationSelectorComponent.EXISTING_ISSUE_ZOOM);
    }

    this.balloonSubscription = this.store.pipe(
        select(state => state.map.centeringBalloonLocation),
        filter(result => !!result))
        .subscribe((location: GeoLocation) => {

          this.map.setCenter(location, true);

        });
  }

  onConfirmButtonClickHandler(event)
  {
    this.selectEvent.emit(this.internalIssue);
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.cancelEvent.emit();
  }

  onCancelButtonClickHandler(event)
  {
    this.cancelEvent.emit();
  }

  onSearchFormChangeHandler(criteria: Object)
  {
    if (this.internalIssue.isAddressInit())
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
    let result: any = {
      tags: this.searchForm.selectedTags
    };

    if (!!this.searchForm.selectedServiceType)
    {
      result.serviceType = this.searchForm.selectedServiceType.id;
    }

    return result;
  }

  onLocationClickHandler(location: GeoLocation)
  {
    if (this.isSelectingLocation)
    {
      this.internalIssue.resetAddress();

      this.selectIssueLocation(location);
      this.map.setCenter(location, true);
    }
  }

  selectIssueLocation(location: GeoLocation)
  {
    this.addIssueBalloon(location);
    this.isSelectingLocation = false;
  }

  onRequestSignatureHandler = (complaint: Complaint) => {

    const index = this.internalIssue.complaintConfirmations.findIndex(item => item.complaint.id === complaint.id);
    if (index === -1)
    {
      const confirmation: ComplaintConfirmation = {
        complaint: complaint,
        status: {
          code: ComplaintConfirmationStatus.STATUS_PENDING
        },
      };

      this.internalIssue.complaintConfirmations.push(confirmation);
      this.addConfirmationBalloon(confirmation);
    }
  };

  deleteConfirmationHandler = (confirmation: ComplaintConfirmation) => {

    const index = this.internalIssue.complaintConfirmations.findIndex(item => item.complaint.id === confirmation.complaint.id);
    if (index !== -1)
    {
      this.internalIssue.complaintConfirmations.splice(index, 1);

      this.removeConfirmationBalloon(confirmation);
      this.initUnAttachedComplaintAroundIssue();
    }

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

      const geoParams = {
        centerLatitude: this.internalIssue.location.latitude,
        centerLongitude: this.internalIssue.location.longitude
      };


      let searchParams = this.getSearchFormParameters();
      searchParams = Object.assign(searchParams, geoParams);

      this.searchForm.setGeoParameters(geoParams);
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
      this.searchForm.setTags([]);
      this.searchForm.resetSelectedTags();
    }
  };

  updateComplaintsWithViewBox = () => {

      const box = this.map.getViewBox();
      if (box.zoom >= IssueGeoLocationSelectorComponent.LOADING_DATA_ZOOM)
      {
        const geoParams = {
          topLeftLatitude: box.topLeft.latitude,
          topLeftLongitude: box.topLeft.longitude,
          bottomRightLatitude: box.bottomRight.latitude,
          bottomRightLongitude: box.bottomRight.longitude
        };

        let searchParams = this.getSearchFormParameters();
        searchParams = Object.assign(searchParams, geoParams);

        this.searchForm.setGeoParameters(geoParams);
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
        this.removeAllComplaintBalloons();
        this.searchForm.setTags([]);
        this.searchForm.resetSelectedTags();
      }
  };

  onViewBoxChangeHandler(box: MapViewBox)
  {
    if (this.internalIssue.isAddressInit() || !!this.internalIssue.location)
    {
      return;
    }

    if (!!this.viewBoxDelayDescriptor)
    {
      clearTimeout(this.viewBoxDelayDescriptor);
      this.viewBoxDelayDescriptor = null;
    }
    this.viewBoxDelayDescriptor = setTimeout(() => {
      this.updateComplaintsWithViewBox();
    }, IssueGeoLocationSelectorComponent.VIEW_BOX_TIME_INTERVAL_UPDATING);
  }

  updateComplaintBalloons = (updatedItems: Array<Complaint>, withRequestSignatureControl: boolean = false) =>
  {
    const oldItems: Array<Complaint> = this.complaintBalloons.map(component => component.instance.complaint);

    updatedItems.forEach((item) => {

      if (oldItems.findIndex(complaint => complaint.id === item.id) === -1)
      {
        this.addComplaintBalloon(item, withRequestSignatureControl);
      }

    });

    oldItems.forEach((oldItem: Complaint) => {

      if (updatedItems.findIndex(item => item.id === oldItem.id) === -1)
      {
        this.removeComplaintBalloon(oldItem);
      }

    });

  };

  isSignatureCanBeRequested = (complaint: Complaint) => {

    return (this.internalIssue.complaintConfirmations.findIndex(item => item.complaint.client.id === complaint.client.id) === -1);

  }

  addComplaintBalloon = (complaint: Complaint, withRequestSignatureControl: boolean = false) =>
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
      instance.withRequestSignatureControl = withRequestSignatureControl;
      instance.isRequestingSignatureAvailable = this.isSignatureCanBeRequested;

      if (withRequestSignatureControl)
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

      item.instance.isRequestingSignatureAvailable = null;
      if (item.instance.withRequestSignatureControl)
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


  onSearchAddressResultHandler(addresses: Array<OSMSearchResult>)
  {
    if (addresses.length > 0)
    {
      const address: OSMSearchResult = addresses[0];

      this.map.setZoom(15);
      this.map.setCenter(address.location, true);
    }
  }
}
