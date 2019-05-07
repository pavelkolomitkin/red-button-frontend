import {
  Component,
  ComponentFactoryResolver, ComponentRef, EventEmitter,
  HostListener, Input,
  OnDestroy,
  OnInit, Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {MapComponent} from '../../../../shared/components/map/map.component';
import {GeoLocation} from '../../../../core/data/model/geo-location.model';
import {GeoLocationSelectingWindowStateChanged} from '../../../data/geo-location.actions';
import {MapSelectedLocationComponent} from '../map-selected-location/map-selected-location.component';
import {Region} from '../../../../core/data/model/region.model';
import {OSMSearchResult} from '../../../../core/data/model/osm-search-result.model';

@Component({
  selector: 'app-geo-location-selector',
  templateUrl: './geo-location-selector.component.html',
  styleUrls: ['./geo-location-selector.component.css']
})
export class GeoLocationSelectorComponent implements OnInit, OnDestroy {

  static ADDRESS_VIEW_ZOOM = 15;

  @Output('onAddressSelect') addressSelected: EventEmitter<{ region: Region, address: Object, location: GeoLocation }> = new EventEmitter();

  @Input() defaultLocation: GeoLocation = null;

  isVisible: Boolean;

  windowStateChangeSubscription: Subscription;

  deviceLocationSubscription:    Subscription;

  selectedLocationBalloon: ComponentRef<MapSelectedLocationComponent> = null;

  @ViewChild('mapContainer', { read: ViewContainerRef }) mapContainerRef: ViewContainerRef;
  mapInstance: MapComponent;
  mapCenter:   GeoLocation;

  constructor(private store:Store<State>, private componentResolver: ComponentFactoryResolver)
  {
      this.deviceLocationSubscription = this.store.pipe(select(state => state.core.deviceGeoLocation)).subscribe((location: GeoLocation) => {
        this.mapCenter = location;
      });
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (this.isVisible)
    {
      this.disposeMap();
    }
  }

  initMap()
  {
    this.mapContainerRef.clear();

    const factory = this.componentResolver.resolveComponentFactory(MapComponent);
    const mapComponent = this.mapContainerRef.createComponent(factory);
    this.mapInstance = mapComponent.instance;


    this.mapInstance.defaultCenter = !!this.defaultLocation ? this.defaultLocation : this.mapCenter;

    //========================== INITIALIZE MAP EVENT HANDLERS ===============

    this.mapInstance.locationClick.subscribe(this.onMapLocationClickHandler);
    this.mapInstance.ready.subscribe(() => {
      if (!!this.defaultLocation)
      {
        this.initBalloon(this.defaultLocation);
      }
    });

    //========================// INITIALIZE MAP EVENT HANDLERS ===============
  }

  disposeMap()
  {
    //========================== DISPOSE MAP EVENT HANDLERS ==================

    this.mapInstance.ready.unsubscribe();
    this.mapInstance.locationClick.unsubscribe();

    //========================// DISPOSE MAP EVENT HANDLERS ==================



    this.store.dispatch(new GeoLocationSelectingWindowStateChanged(false));
    this.mapContainerRef.clear();
  }

  ngOnInit() {

    this.windowStateChangeSubscription = this.store.pipe(select(state => state.clientGeoLocation.selectingLocationWindowOpen))
        .subscribe((isWindowOpen) => {
          if (isWindowOpen && !this.isVisible)
          {
            this.initMap();
          }
          else if (this.isVisible)
          {
            this.disposeMap();
          }

          this.isVisible = isWindowOpen;
        });
  }

  ngOnDestroy(): void {
    this.windowStateChangeSubscription.unsubscribe();
    this.deviceLocationSubscription.unsubscribe();

    this.removeBalloon()
  }


  removeBalloon = () => {

    if (this.selectedLocationBalloon !== null)
    {
      const { instance } = this.selectedLocationBalloon;

      instance.addressSelected.unsubscribe();

      this.mapInstance.removeBalloon(this.selectedLocationBalloon);
    }
  }

  initBalloon = (location: GeoLocation) => {

    this.removeBalloon();

    this.selectedLocationBalloon = this.mapInstance.addBalloon(MapSelectedLocationComponent, location);

    const balloonComponent: MapSelectedLocationComponent = this.selectedLocationBalloon.instance;
    balloonComponent.addressSelected.subscribe(({ location, region, address }) => {

      this.addressSelected.emit({region, address, location});

    });
    balloonComponent.location = location;

  }

  onCloseControlClickHandler(event)
  {
    this.disposeMap();
  }

  //===================== MAP EVENT HANDLERS ======================
  onMapLocationClickHandler = (location: GeoLocation) => {

    this.initBalloon(location);
  }

  //===================// MAP EVENT HANDLERS ======================

  onSearchAddressResultHandler(addresses: Array<OSMSearchResult>)
  {
    if (addresses.length > 0)
    {
      const address: OSMSearchResult = addresses[0];

      this.mapInstance.setZoom(GeoLocationSelectorComponent.ADDRESS_VIEW_ZOOM);
      this.mapInstance.setCenter(address.location, true);
    }
  }
}
