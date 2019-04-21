import {
  Component,
  ComponentFactoryResolver, ComponentRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {MapComponent} from '../../../shared/components/map/map.component';
import {GeoLocation} from '../../../core/data/model/geo-location.model';
import {GeoLocationSelectingWindowStateChanged} from '../../data/geo-location.actions';
import {MapSelectedLocationComponent} from '../map-selected-location/map-selected-location.component';

@Component({
  selector: 'app-geo-location-selector',
  templateUrl: './geo-location-selector.component.html',
  styleUrls: ['./geo-location-selector.component.css']
})
export class GeoLocationSelectorComponent implements OnInit, OnDestroy {

  isVisible: Boolean;

  windowStateChangeSubscription: Subscription;
  deviceLocationSubscription:    Subscription;

  @ViewChild('mapContainer', { read: ViewContainerRef }) mapContainerRef: ViewContainerRef;
  mapInstance: MapComponent;
  mapCenter:   GeoLocation;

  selectedLocationBalloon: ComponentRef<MapSelectedLocationComponent> = null;

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


    this.mapInstance.defaultCenter = this.mapCenter;



    //========================== INITIALIZE MAP EVENT HANDLERS ===============

    this.mapInstance.locationClick.subscribe(this.onMapLocationClickHandler);

    //========================// INITIALIZE MAP EVENT HANDLERS ===============
  }

  disposeMap()
  {
    //========================== DISPOSE MAP EVENT HANDLERS ==================

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

      console.log("Address confirmed!");
      console.log(location);
      console.log(region);
      console.log(address);

    });
    balloonComponent.location = location;

  }

  //===================== MAP EVENT HANDLERS ======================
  onMapLocationClickHandler = (location: GeoLocation) => {

    this.initBalloon(location);
  }

  //===================// MAP EVENT HANDLERS ======================
}
