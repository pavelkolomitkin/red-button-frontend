import {
  Component,
  ComponentFactoryResolver, ComponentRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output, Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Map, View} from 'ol';
import {fromLonLat, toLonLat, transformExtent } from 'ol/proj.js';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {GeoLocation} from '../../../core/data/model/geo-location.model';
import {MapViewBox} from '../../data/model/map-view-box.model';
import {MapEntityLayout} from '../../../core/services/map/map-entity-layout';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

  static DEFAULT_ANIMATION_DURATION = 500;

  map: Map;

  // output fields
  @Output('onLocationClick') locationClick: EventEmitter<GeoLocation> = new EventEmitter();
  @Output('onReady') ready: EventEmitter<any> = new EventEmitter();
  @Output('onViewBoxChange') viewBoxChangeEvent: EventEmitter<MapViewBox> = new EventEmitter();
  @Output('onRender') postRenderEvent: EventEmitter<void> = new EventEmitter();

  // input fields
  @Input() defaultCenter: GeoLocation;
  @Input() defaultZoom: number = null;

  @ViewChild('mapContainer', { read: ViewContainerRef }) mapContainerRef: ViewContainerRef;

  entityLayout: MapEntityLayout;


  constructor(private componentResolver: ComponentFactoryResolver) {

  }

  ngOnInit() {

    this.map = new Map({
      target: 'map',
      layers: [
          new TileLayer({
            source: new OSM()
          })
      ],
      overlays: [],
      view: new View()
    });

    if (!!this.defaultCenter)
    {
      this.setCenter(this.defaultCenter);
    }

    if (!!this.defaultZoom)
    {
      this.setZoom(this.defaultZoom);
    }

    this.map.on('singleclick', this.onMapClickHandler);
    this.map.on('moveend', this.onManMoveEndHandler);
    this.map.once('postrender', () => {
      this.postRenderEvent.emit();
    });

    this.entityLayout = new MapEntityLayout(this, this.componentResolver);

    this.ready.emit();
  }

  ngOnDestroy(): void {

    this.map.un('singleclick');
    this.map.un('moveend');
  }

  //======================= VIEW APP =============================

  setCenter(location: GeoLocation, withAnimation: boolean = false)
  {

    const center = fromLonLat([location.longitude, location.latitude]);

    if (!withAnimation)
    {
      this.map.getView().setCenter(center);
    }
    else
    {
      this.map.getView().animate({
        center: center,
        duration: MapComponent.DEFAULT_ANIMATION_DURATION
      });
    }
  }

  setZoom(value: number)
  {
    this.map.getView().setZoom(value);
  }

  getZoom()
  {
    return this.map.getView().getZoom();
  }

  getViewBox(): MapViewBox
  {
    let extent = this.map.getView().calculateExtent(this.map.getSize());

    extent = transformExtent(extent,'EPSG:3857', 'EPSG:4326');

    const result = {
      topLeft: {
        latitude: extent[3],
        longitude: extent[0]
      },
      bottomRight: {
        latitude: extent[1],
        longitude: extent[2]
      },
      zoom: this.getZoom()
    };

    return result;
  }

  setViewBoundaries(
      topLeft: GeoLocation,
      bottomRight: GeoLocation,
      callBack: Function = null,
      withAnimation: boolean = true,
      padding = [20, 20, 20, 20]
  )
  {
    const extent = transformExtent([
      topLeft.longitude,
      bottomRight.latitude,
      bottomRight.longitude,
      topLeft.latitude
    ], 'EPSG:4326', 'EPSG:3857');

    this.map.getView().fit(extent, {
      padding: padding,
      duration: withAnimation ? MapComponent.DEFAULT_ANIMATION_DURATION : 0,
      callback: callBack
    });
  }

  //=====================// VIEW APP =============================


  onMapClickHandler = (event) => {

    const lonLatCoordinate = toLonLat(event.coordinate);

    const location: GeoLocation = {
      latitude: lonLatCoordinate[1],
      longitude: lonLatCoordinate[0]
    };

    this.locationClick.emit(location);
  };

  onManMoveEndHandler = (event) => {

    const box = this.getViewBox();

    this.viewBoxChangeEvent.emit(box);
  };

  addBalloon<C>(component: Type<C>, location: GeoLocation): ComponentRef<C>
  {
    return this.entityLayout.addEntity(component, location);
  }

  removeBalloon<C>(component: ComponentRef<C>)
  {
    return this.entityLayout.removeEntity(component);
  }

  removeAllBalloons()
  {
    // while there are only balloons we can approach this way
    this.entityLayout.removeAllEntities();
  }
}
