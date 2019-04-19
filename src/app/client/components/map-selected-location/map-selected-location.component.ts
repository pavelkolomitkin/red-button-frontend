import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {GeoLocation} from '../../../core/data/model/geo-location.model';
import {GeoLocationGetAddressStart} from '../../../core/data/geo-location.actions';
import {filter} from 'rxjs/operators';
import {Region} from '../../../core/data/model/region.model';
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

  currentState = MapSelectedLocationComponent.STATE_LOADING;

  region: Region;
  address: Object;

  addressSubscription: Subscription;
  errorSubscription: Subscription;


  _location: GeoLocation = null;

  constructor(private store:Store<State>) {

    this.addressSubscription = this.store.pipe(select(
        state => state.geoLocation),
        filter(result => (result.targetAddressRegion !== null) && (result.targetAddressAddition !== null))
    ).subscribe(({targetAddressRegion, targetAddressAddition}) => {

      this.currentState = MapSelectedLocationComponent.STATE_LOCATION_DETECTED_SUCCESS;

      this.region = targetAddressRegion;
      this.address = targetAddressAddition;

    });

    this.errorSubscription = this.store.pipe(select(state => state.geoLocation.gettingAddressErrors)).subscribe((error) => {
      if (Object.entries(error).length !== 0)
      {
        this.currentState = MapSelectedLocationComponent.STATE_LOCATION_DETECTED_ERROR;
      }
    });

  }

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
    if (this._location !== null)
    {
      this.store.dispatch(new GeoLocationGetAddressStart(this._location));
    }
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.addressSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
  }

}
