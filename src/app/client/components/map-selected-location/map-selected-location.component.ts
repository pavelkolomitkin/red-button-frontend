import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {GeoLocation} from '../../../core/data/model/geo-location.model';
import {Region} from '../../../core/data/model/region.model';
import {GeoLocationService} from '../../../core/services/geo-location.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-map-selected-location',
  templateUrl: './map-selected-location.component.html',
  styleUrls: ['./map-selected-location.component.css']
})
export class MapSelectedLocationComponent implements OnInit, OnDestroy {

  static STATE_LOADING = 'STATE_LOADING';
  static STATE_LOCATION_DETECTED_SUCCESS = 'STATE_LOCATION_DETECTED_SUCCESS';
  static STATE_LOCATION_DETECTED_ERROR = 'STATE_LOCATION_DETECTED_ERROR';

  @Output('onAddressSuccess') addressSuccess:EventEmitter<{ region: Region, address: Object, location: GeoLocation }> = new EventEmitter();
  @Output('onAddressError') addressError:EventEmitter<{ location: GeoLocation, message: string }> = new EventEmitter();
  @Output('onAddressSelect') addressSelected: EventEmitter<{ region: Region, address: Object, location: GeoLocation }> = new EventEmitter();

  currentState = MapSelectedLocationComponent.STATE_LOADING;

  region: Region;
  address: Object;

  _location: GeoLocation = null;
  addressSubscription: Subscription = null;

  constructor(private locationService: GeoLocationService) { }

  get location() : GeoLocation
  {
    return this._location;
  }

  set location(value: GeoLocation)
  {
    this._location = value;

    this.identifyAddress();
  }

  identifyAddress()
  {
    if (this._location === null)
    {
      return;
    }

    if (this.addressSubscription !== null)
    {
      this.addressSubscription.unsubscribe();
      this.addressSubscription = null;
    }

    this.addressSubscription = this.locationService.getAddressByCoordinates(this._location).subscribe(
        ({region, addition}) => {

          this.region = region;
          this.address = addition;

          this.currentState = MapSelectedLocationComponent.STATE_LOCATION_DETECTED_SUCCESS;

          this.addressSuccess.emit({region: this.region, address: this.address, location: this._location});
        },
        (errors) => {

          this.currentState = MapSelectedLocationComponent.STATE_LOCATION_DETECTED_ERROR;

          //this.addressError.emit(errors.error.errors['location'] ? errors.error.errors['location'] : 'Cannot identify region!');
        }
    );
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {

    if (this.addressSubscription !== null)
    {
      this.addressSubscription.unsubscribe();
      this.addressSubscription = null;
    }
  }

  onConfirmAddressClick(event) {

    this.addressSelected.emit({location: this._location, address: this.address, region: this.region});

  }

}
