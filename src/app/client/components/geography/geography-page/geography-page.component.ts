import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GeoLocation} from '../../../../core/data/model/geo-location.model';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {environment} from '../../../../../environments/environment';
import {Subscription} from 'rxjs';
import {MapComponent} from '../../../../shared/components/map/map.component';
import {MapViewBox} from '../../../../shared/data/model/map-view-box.model';
import {IssueService} from '../../../services/issue.service';
import {ComplaintService} from '../../../services/complaint.service';
import {Issue} from '../../../../core/data/model/issue.model';
import {Complaint} from '../../../../core/data/model/complaint.model';
import {ComplaintDetailsBalloonComponent} from '../../../../shared/components/complaint-map-view/complaint-details-balloon/complaint-details-balloon.component';
import {IssueBalloonComponent} from './issue-balloon/issue-balloon.component';

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

  issueBalloons: Array<any> = [];
  complaintBalloons: Array<any> = [];

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

  }

  ngOnDestroy()
  {
    this.deviceLocationSubscription.unsubscribe();
  }

  onMapReadyHandler(event)
  {

  }

  updateData()
  {
    const zoom = this.map.getZoom();
    if (zoom < GeographyPageComponent.UPDATING_DATA_MIN_ZOOM)
    {
      this.updateIssueBalloons([]);
      this.updateComplaintBalloons([]);

      return;
    }

    const viewbox: MapViewBox = this.map.getViewBox();

    let searchParams = {
      topLeftLatitude: viewbox.topLeft.latitude,
      topLeftLongitude: viewbox.topLeft.longitude,
      bottomRightLatitude: viewbox.bottomRight.latitude,
      bottomRightLongitude: viewbox.bottomRight.longitude
    };

    this.issueService.geoSearch(searchParams)
        .toPromise()
        .then((issues: Array<Issue>) => {
          this.updateIssueBalloons(issues);
        })
        .catch(() => {
          this.updateIssueBalloons([]);
        });

    if (this.showComplaints)
    {
      this.complaintService.search(searchParams)
          .toPromise()
          .then((complaints: Array<Complaint>) => {
            this.updateComplaintBalloons(complaints);
          })
          .catch(() => {
            this.updateComplaintBalloons([]);
          });
    }
    else
    {
      this.updateComplaintBalloons([]);
    }

  }

  updateIssueBalloons(list: Array<Issue>)
  {
    this.issueBalloons.forEach((item) => {
      this.map.removeBalloon(item);
    });

    list.forEach((item) => {
      const balloon = this.map.addBalloon(IssueBalloonComponent, item.location);
      balloon.instance.issue = item;

      this.issueBalloons.push(balloon);
    });
  }

  updateComplaintBalloons(list: Array<Complaint>)
  {
    this.complaintBalloons.forEach((item) => {
      this.map.removeBalloon(item);
    });

    this.complaintBalloons = [];
    list.forEach((item) => {

      const balloon = this.map.addBalloon(ComplaintDetailsBalloonComponent, item.location);
      balloon.instance.complaint = item;

      this.complaintBalloons.push(balloon);

    });
  }



  onSearchFilterChangeHandler({ period, withComplaints })
  {
    this.showComplaints = withComplaints;

    this.updateData();
  }

  onViewBoxChangeHandler(event)
  {
    this.updateData();
  }

}
