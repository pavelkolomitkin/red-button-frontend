import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Map, View} from 'ol';
import {fromLonLat, toLonLat } from 'ol/proj.js';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {GeoLocation} from '../../../core/data/model/geo-location.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

  map: Map;

  balloonComponents: Array<any> = [];

  // input fields
  @Input() defaultCenter: GeoLocation;

  // output fields
  @Output('onLocationClick') locationClick: EventEmitter<GeoLocation> = new EventEmitter();

  constructor() { }

  ngOnInit() {

    const { latitude, longitude } = this.defaultCenter;

    this.map = new Map({
      target: 'map',
      layers: [
          new TileLayer({
            source: new OSM()
          })
      ],
      view: new View({
        center: fromLonLat([longitude, latitude]),
        zoom: 10
      })
    });


    this.map.on('singleclick', this.onMapClickHandler);
  }

  ngOnDestroy(): void {

    this.map.un('singleclick');

  }

  onMapClickHandler = (event) => {

    const lonLatCoordinate = toLonLat(event.coordinate);

    const location: GeoLocation = {
      latitude: lonLatCoordinate[1],
      longitude: lonLatCoordinate[0]
    };

    this.locationClick.emit(location);
  }

  addBalloon(component: any)
  {
    const componentIndex = this.balloonComponents.indexOf(component);
    if (componentIndex !== -1)
    {

    }
  }

  removeBalloon(component: any)
  {

  }
}
