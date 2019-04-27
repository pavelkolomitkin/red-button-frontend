import {
  Component,
  ComponentFactoryResolver, ComponentRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output, Type,
  ViewChild,
  ViewContainerRef, ViewRef
} from '@angular/core';
import {Map, View} from 'ol';
import Overlay from 'ol/Overlay';
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

  // output fields
  @Output('onLocationClick') locationClick: EventEmitter<GeoLocation> = new EventEmitter();
  @Output('onReady') ready: EventEmitter<any> = new EventEmitter();

  // input fields
  @Input() defaultCenter: GeoLocation;
  @Input() defaultZoom: number = 10;

  @ViewChild('mapContainer', { read: ViewContainerRef }) mapContainerRef: ViewContainerRef;

  constructor(private componentResolver: ComponentFactoryResolver) { }

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
        zoom: this.defaultZoom
      })
    });


    this.map.on('singleclick', this.onMapClickHandler);

    this.ready.emit();
  }

  ngOnDestroy(): void {

    this.map.un('singleclick');

  }

  //======================= VIEW APP =============================

  setCenter(location: GeoLocation)
  {
    this.map.getView().setCenter(fromLonLat([location.longitude, location.latitude]));
  }

  setZoom(value: number)
  {
    this.map.getView().setZoom(value);
  }

  //=====================// VIEW APP =============================


  onMapClickHandler = (event) => {

    const lonLatCoordinate = toLonLat(event.coordinate);

    const location: GeoLocation = {
      latitude: lonLatCoordinate[1],
      longitude: lonLatCoordinate[0]
    };

    this.locationClick.emit(location);
  }

  addBalloon<C>(component: Type<C>, location: GeoLocation): ComponentRef<C>
  {
    const factory = this.componentResolver.resolveComponentFactory(component);
    const result = this.mapContainerRef.createComponent(factory);

    const position = fromLonLat([location.longitude, location.latitude]);

    const overlay: Overlay = this.createOverlay(result);
    overlay.setPosition(position);
    this.map.addOverlay(overlay);

    return result;
  }

  removeBalloon<C>(component: ComponentRef<C>)
  {
    let result = false;

    const componentIndex = this.mapContainerRef.indexOf(component.hostView);
    if (componentIndex !== -1)
    {
      this.mapContainerRef.remove(componentIndex);
      result = true;
    }

    return result;
  }

  createOverlay<C>(component: ComponentRef<C>): Overlay
  {
    const result = new Overlay({
      element: component.location.nativeElement,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });

    return result;
  }
}
