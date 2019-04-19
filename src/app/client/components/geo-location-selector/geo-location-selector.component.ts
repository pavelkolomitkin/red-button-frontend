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
import {EventListener} from '@angular/core/src/debug/debug_node';
import {GeoLocationSelectingWindowStateChanged} from '../../data/geo-location.actions';

@Component({
  selector: 'app-geo-location-selector',
  templateUrl: './geo-location-selector.component.html',
  styleUrls: ['./geo-location-selector.component.css']
})
export class GeoLocationSelectorComponent implements OnInit, OnDestroy {

  isVisible: Boolean;

  windowStateChangeSubscription: Subscription;

  @ViewChild('mapContainer', { read: ViewContainerRef }) mapContainerRef: ViewContainerRef;

  @Input() selectedLocation: GeoLocation = null;

  @Output('onAddressSelected') addressSelected: EventEmitter<{ region: Region, addition: Object }> = new EventEmitter();

  constructor(
      private store:Store<State>,
      private componentResolver: ComponentFactoryResolver
  )
  {

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

  }

  disposeMap()
  {
    this.store.dispatch(new GeoLocationSelectingWindowStateChanged(false));
    this.mapContainerRef.clear();
  }

  ngOnInit() {

    this.windowStateChangeSubscription = this.store.pipe(select(state => state.clientGeoLocation.selectingLocationWindowOpen))
        .subscribe((isWindowOpen) => {
          if (isWindowOpen)
          {
            this.initMap();
          }
          else
          {
            this.disposeMap();
          }

          this.isVisible = isWindowOpen;
        });
  }

  ngOnDestroy(): void {
    this.windowStateChangeSubscription.unsubscribe();
  }
}
