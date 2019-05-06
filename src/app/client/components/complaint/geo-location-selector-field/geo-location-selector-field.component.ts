import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {State} from '../../../../app.state';
import {Store} from '@ngrx/store';
import {GeoLocationSelectingWindowStateChanged} from '../../../data/geo-location.actions';
import {Region} from '../../../../core/data/model/region.model';
import {GeoLocation} from '../../../../core/data/model/geo-location.model';

@Component({
  selector: 'app-geo-location-selector-field',
  templateUrl: './geo-location-selector-field.component.html',
  styleUrls: ['./geo-location-selector-field.component.css']
})
export class GeoLocationSelectorFieldComponent implements OnInit {

  @Output('onAddressSelect') addressSelected: EventEmitter<{ region: Region, address: Object, location: GeoLocation }> = new EventEmitter();

  @Input() region: Region = null;
  @Input() address: Object = null;
  @Input() location: GeoLocation = null;

  constructor(private store: Store<State>) { }

  ngOnInit() {
  }

  onChooseButtonClickHandler(event: Event)
  {
    this.store.dispatch(new GeoLocationSelectingWindowStateChanged(true));
  }

  onAddressSelectHandler({ region, address, location })
  {
    this.region = region;
    this.address = address;
    this.location = location;

    this.addressSelected.emit({ region, address, location });

    this.store.dispatch(new GeoLocationSelectingWindowStateChanged(false));
  }
}
