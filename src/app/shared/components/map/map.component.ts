import {
  Component,
  ComponentFactoryResolver, ComponentRef, ElementRef,
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
import {fromLonLat, toLonLat, transformExtent } from 'ol/proj.js';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {GeoLocation} from '../../../core/data/model/geo-location.model';
import {MapViewBox} from '../../data/model/map-view-box.model';
import {select, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {filter} from 'rxjs/operators';
import {Subscription} from 'rxjs';

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
  @Output('onViewBoxChange') viewBoxChangeEvent: EventEmitter<MapViewBox> = new EventEmitter();

  // input fields
  @Input() defaultCenter: GeoLocation;
  @Input() defaultZoom: number = 10;

  @ViewChild('mapContainer', { read: ViewContainerRef }) mapContainerRef: ViewContainerRef;

  panElementSubscription: Subscription;

  constructor(private componentResolver: ComponentFactoryResolver, private store: Store<State>) {


  }

  ngOnInit() {

    const { latitude, longitude } = this.defaultCenter;

    this.map = new Map({
      target: 'map',
      layers: [
          new TileLayer({
            source: new OSM()
          })
      ],
      overlays: [],
      view: new View({
        center: fromLonLat([longitude, latitude]),
        zoom: this.defaultZoom
      })
    });


    this.map.on('singleclick', this.onMapClickHandler);
    this.map.on('moveend', this.onManMoveEndHandler);

    this.panElementSubscription = this.store.pipe(select(state => state.map.domElement), filter(result => !!result))
        .subscribe((element: any) => {
          this.panToBalloon(element);
        });

    this.ready.emit();
  }

  ngOnDestroy(): void {

    this.map.un('singleclick');
    this.map.un('moveend');

    this.panElementSubscription.unsubscribe();

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

  panToBalloon = (element: any) => {

    const overlays:Array<any> = this.map.getOverlays().getArray();

    for (let index in overlays)
    {
      let overlay = overlays[index];

      if (overlay.options.element === element)
      {
        overlay.setPosition([...overlay.values_.position]);
        break;
      }
    }
  };

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
