import { Component, OnInit } from '@angular/core';
import {State} from '../../../app.state';
import {Store} from '@ngrx/store';
import {GeoLocationSelectingWindowStateChanged} from '../../data/geo-location.actions';

@Component({
  selector: 'app-geo-location-selector-field',
  templateUrl: './geo-location-selector-field.component.html',
  styleUrls: ['./geo-location-selector-field.component.css']
})
export class GeoLocationSelectorFieldComponent implements OnInit {

  constructor(private store: Store<State>) { }

  ngOnInit() {
  }

  onChooseButtonClickHandler(event: Event)
  {
    this.store.dispatch(new GeoLocationSelectingWindowStateChanged(true));
  }
}
