import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {GeoLocation} from '../../../../core/data/model/geo-location.model';
import {Region} from '../../../../core/data/model/region.model';
import {GeoLocationService} from '../../../../core/services/geo-location.service';
import {Subscription} from 'rxjs';
import {Complaint} from '../../../data/model/complaint.model';

@Component({
  selector: 'app-map-selected-location',
  templateUrl: './map-selected-location.component.html',
  styleUrls: ['./map-selected-location.component.css']
})
export class MapSelectedLocationComponent implements OnInit, OnDestroy {

  static STATE_LOADING = 'STATE_LOADING';
  static STATE_LOCATION_DETECTED_SUCCESS = 'STATE_LOCATION_DETECTED_SUCCESS';
  static STATE_LOCATION_DETECTED_ERROR = 'STATE_LOCATION_DETECTED_ERROR';

  @Output('onAddressSelect') addressSelected: EventEmitter<Complaint> = new EventEmitter();

  @Input() complaint: Complaint;

  currentState = MapSelectedLocationComponent.STATE_LOADING;

  constructor(private locationService: GeoLocationService) { }

  ngOnInit()
  {
    console.log('Init complaint balloon...');

    if (!this.complaint.isAddressInit())
    {
      this.locationService.getAddressByCoordinates(this.complaint.location)
          .toPromise()
          .then(({region, addition}) => {


            this.currentState = MapSelectedLocationComponent.STATE_LOCATION_DETECTED_SUCCESS;

            this.complaint.region = region;
            this.complaint.address = addition;

          })
          .catch((errors) => {

            this.currentState = MapSelectedLocationComponent.STATE_LOCATION_DETECTED_ERROR;
          });
    }
    else
    {
      this.currentState = MapSelectedLocationComponent.STATE_LOCATION_DETECTED_SUCCESS;
    }
  }

  ngOnDestroy(): void
  {

  }

  onConfirmAddressClick(event) {

    this.addressSelected.emit(this.complaint);

  }

}
