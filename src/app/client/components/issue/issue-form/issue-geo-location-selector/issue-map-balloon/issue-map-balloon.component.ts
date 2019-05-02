import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Issue} from '../../../../../data/model/issue.model';
import {GeoLocationService} from '../../../../../../core/services/geo-location.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-issue-map-balloon',
  templateUrl: './issue-map-balloon.component.html',
  styleUrls: ['./issue-map-balloon.component.css']
})
export class IssueMapBalloonComponent implements OnInit, OnDestroy {

  static STATE_LOADING = 'STATE_LOADING';
  static STATE_LOCATION_DETECTED_SUCCESS = 'STATE_LOCATION_DETECTED_SUCCESS';
  static STATE_LOCATION_DETECTED_ERROR = 'STATE_LOCATION_DETECTED_ERROR';

  @Output('onAddressSelected') addressSelectEvent: EventEmitter<Issue> = new EventEmitter();

  @Input() needPositionReload: boolean = false;

  @Input() issue: Issue;

  currentState: string = IssueMapBalloonComponent.STATE_LOADING;

  geoLocationSubscription: Subscription;

  constructor(private service: GeoLocationService)
  {

  }

  ngOnInit()
  {
    if (this.needPositionReload)
    {
      this.geoLocationSubscription = this.service.getAddressByCoordinates(this.issue.location).subscribe(
          ({region, addition}) => {

            this.issue.region = region;
            this.issue.address = addition;

            this.currentState = IssueMapBalloonComponent.STATE_LOCATION_DETECTED_SUCCESS;

          },
          (errors) => {

            this.currentState = IssueMapBalloonComponent.STATE_LOCATION_DETECTED_ERROR;

          });
    }
  }

  ngOnDestroy(): void {

    if (!this.geoLocationSubscription)
    {
      this.geoLocationSubscription.unsubscribe();
    }
  }

  onConfirmAddressClick(event) {
    this.addressSelectEvent.emit(this.issue);
  }

}
