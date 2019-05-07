import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Issue} from '../../../../../../core/data/model/issue.model';
import {GeoLocationService} from '../../../../../../core/services/geo-location.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-issue-map-balloon',
  templateUrl: './issue-map-balloon.component.html',
  styleUrls: ['./issue-map-balloon.component.css']
})
export class IssueMapBalloonComponent implements OnInit {

  static STATE_LOADING = 'STATE_LOADING';
  static STATE_LOCATION_DETECTED_SUCCESS = 'STATE_LOCATION_DETECTED_SUCCESS';
  static STATE_LOCATION_DETECTED_ERROR = 'STATE_LOCATION_DETECTED_ERROR';

  @Output('onLocationUpdateSuccess') locationUpdateSuccessEvent: EventEmitter<Issue> = new EventEmitter();
  @Output('onLocationUpdateError') locationUpdateErrorEvent: EventEmitter<Issue> = new EventEmitter();
  @Output('onLocationCancel') locationCancelEvent: EventEmitter<Issue> = new EventEmitter();

  @Input() needPositionReload: boolean = false;

  @Input() issue: Issue;

  currentState: string = IssueMapBalloonComponent.STATE_LOADING;

  constructor(private service: GeoLocationService)
  {

  }

  ngOnInit()
  {
    if (this.needPositionReload)
    {
      this.service.getAddressByCoordinates(this.issue.location)
          .toPromise()
          .then(
          ({region, addition}) => {

            this.issue.region = region;
            this.issue.address = addition;

            this.currentState = IssueMapBalloonComponent.STATE_LOCATION_DETECTED_SUCCESS;

            this.locationUpdateSuccessEvent.emit(this.issue);

          })
          .catch((errors) => {

            this.currentState = IssueMapBalloonComponent.STATE_LOCATION_DETECTED_ERROR;

            this.issue.region = null;
            this.issue.address = null;

            this.locationUpdateErrorEvent.emit(this.issue);

          });
    }
    else
    {
      this.currentState = IssueMapBalloonComponent.STATE_LOCATION_DETECTED_SUCCESS;
    }
  }

  onCancelClickHandler = () => {
    this.issue.region = null;
    this.issue.address = null;
    this.locationCancelEvent.emit(this.issue);
  }
}
