import {
  Component,
  ComponentFactoryResolver,
  EventEmitter, HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Region} from '../../../core/data/model/region.model';
import {select, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {MapComponent} from '../../../shared/components/map/map.component';
import {GeoLocation} from '../../../core/data/model/geo-location.model';
import {GeoLocationSelectingWindowStateChanged} from '../../data/geo-location.actions';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-geo-location-selector',
  templateUrl: './geo-location-selector.component.html',
  styleUrls: ['./geo-location-selector.component.css']
})
export class GeoLocationSelectorComponent implements OnInit, OnDestroy {

  isVisible: Boolean;

  windowStateChangeSubscription: Subscription;

  @ViewChild('mapContainer', { read: ViewContainerRef }) mapContainerRef: ViewContainerRef;
  mapInstance: MapComponent;

  @Input() selectedLocation: GeoLocation = null;
  @Output('onAddressSelected') addressSelected: EventEmitter<{ region: Region, addition: Object }> = new EventEmitter();

  mapCenter: GeoLocation;
  deviceLocationSubscription: Subscription;

  constructor(
      private store:Store<State>,
      private componentResolver: ComponentFactoryResolver
  )
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
    this.mapInstance.locationClick.subscribe(this.onMapLocationClickHandler);
  }

  disposeMap()
  {
    this.mapInstance.locationClick.unsubscribe();

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
  }

  onMapLocationClickHandler = (location: GeoLocation) => {
    console.log('Map Location Selected');
    console.log(location);
  }
}
