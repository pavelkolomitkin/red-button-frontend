import {Component, ComponentRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GeoLocation} from '../../../../core/data/model/geo-location.model';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {environment} from '../../../../../environments/environment';
import {Subject, Subscription} from 'rxjs';
import {MapComponent} from '../../../../shared/components/map/map.component';
import {MapViewBox} from '../../../../shared/data/model/map-view-box.model';
import {IssueService} from '../../../services/issue.service';
import {ComplaintService} from '../../../services/complaint.service';
import {Issue} from '../../../../core/data/model/issue.model';
import {Complaint} from '../../../../core/data/model/complaint.model';
import {ComplaintDetailsBalloonComponent} from '../../../../shared/components/complaint-map-view/complaint-details-balloon/complaint-details-balloon.component';
import {IssueBalloonComponent} from './issue-balloon/issue-balloon.component';
import {OSMSearchResult} from '../../../../core/data/model/osm-search-result.model';
import {MapBalloonManager} from '../../../../core/services/map/map-balloon-manager';
import {debounceTime, filter, mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-geography-page',
  templateUrl: './geography-page.component.html',
  styleUrls: ['./geography-page.component.css']
})
export class GeographyPageComponent implements OnInit, OnDestroy {

  static UPDATING_DATA_MIN_ZOOM = 10;

  @ViewChild('map') map: MapComponent;

  defaultCenter: GeoLocation;
  deviceLocationSubscription: Subscription;

  searchParams: any = {};
  showComplaints: boolean = false;

  complaintBalloonManager: MapBalloonManager = null;
  issueBalloonManager: MapBalloonManager = null;

  searchDelaySubject = new Subject<any>();
  searchDelaySubscription: Subscription;

  searchFormSubject = new Subject<any>();
  searchFormSubscription: Subscription;

  centeringMapSubscription: Subscription;

  constructor(
      private store: Store<State>,
      private issueService: IssueService,
      private complaintService: ComplaintService
  ) { }

  ngOnInit() {

    this.deviceLocationSubscription = this.store.pipe(select(state => state.core.deviceGeoLocation)).subscribe(
        (location: GeoLocation) => {
          this.defaultCenter = !!location ? location : environment.defaultGeoPosition;
        }
    );

    this.searchDelaySubscription = this.searchDelaySubject.pipe(
        debounceTime(300),
        mergeMap(params => this.requestData(params))
    ).subscribe(this.searchResultHandler);

    this.searchFormSubscription = this.searchFormSubject.pipe(
        mergeMap(params => this.requestData(params))
    ).subscribe(this.searchResultHandler);


  }

  searchResultHandler = ({ issues, complaints }) =>
  {
    this.issueBalloonManager.setItems(issues);
    this.complaintBalloonManager.setItems(complaints);
  }

  ngOnDestroy()
  {
    this.deviceLocationSubscription.unsubscribe();

    if (!!this.complaintBalloonManager)
    {
      this.complaintBalloonManager.release();
      this.complaintBalloonManager = null;
    }

    if (!!this.issueBalloonManager)
    {
      this.issueBalloonManager.release();
      this.issueBalloonManager = null;
    }

    this.searchDelaySubscription.unsubscribe();
    this.searchFormSubscription.unsubscribe();

    if (!!this.centeringMapSubscription)
    {
      this.centeringMapSubscription.unsubscribe();
    }
  }

  onMapReadyHandler(event)
  {
    this.complaintBalloonManager = new MapBalloonManager(
        this.map,
        ComplaintDetailsBalloonComponent,
        item => item.id,
        item => item.location,
        (complaint, component: ComponentRef<ComplaintDetailsBalloonComponent>) => {
          component.instance.complaint = complaint;
        }
    );

    this.issueBalloonManager = new MapBalloonManager(
        this.map,
        IssueBalloonComponent,
        item => item.id,
        item => item.location,
        (issue, component: ComponentRef<IssueBalloonComponent>) => {
          component.instance.issue = issue;
        }
    );

    this.centeringMapSubscription = this.store.pipe(select(state => state.map.centeringBalloonLocation), filter(result => !!result))
        .subscribe((item) => {
          this.map.setCenter(item, true);
        });
  }

  async requestData(params: any)
  {
    const issuesRequest = this.issueService.geoSearch(params).toPromise();

    let complaintsRequest = null;
    if (this.showComplaints)
    {
      complaintsRequest = this.complaintService.search(params).toPromise();
    }

    const issues = await issuesRequest;
    const complaints = (!!complaintsRequest) ? await complaintsRequest : [];

    return {issues: issues, complaints: complaints };
  }

  updateData(searchForm: boolean)
  {
    const zoom = this.map.getZoom();
    if (zoom < GeographyPageComponent.UPDATING_DATA_MIN_ZOOM)
    {
      this.complaintBalloonManager.setItems([]);
      this.issueBalloonManager.setItems([]);

      return;
    }

    const viewbox: MapViewBox = this.map.getViewBox();

    let searchParams = {
      topLeftLatitude: viewbox.topLeft.latitude,
      topLeftLongitude: viewbox.topLeft.longitude,
      bottomRightLatitude: viewbox.bottomRight.latitude,
      bottomRightLongitude: viewbox.bottomRight.longitude
    };


    if (searchForm)
    {
      this.searchFormSubject.next(searchParams);
    }
    else
    {
      this.searchDelaySubject.next(searchParams);
    }

  }

  onSearchFilterChangeHandler({ period, withComplaints })
  {
    this.showComplaints = withComplaints;

    this.updateData(true);
  }

  onViewBoxChangeHandler(event)
  {
    this.updateData(false);
  }

  onSearchAddressResultHandler(addresses: Array<OSMSearchResult>)
  {
    if (addresses.length > 0)
    {
      const address: OSMSearchResult = addresses[0];

      this.map.setZoom(GeographyPageComponent.UPDATING_DATA_MIN_ZOOM);
      this.map.setCenter(address.location, true);
    }
  }

}
