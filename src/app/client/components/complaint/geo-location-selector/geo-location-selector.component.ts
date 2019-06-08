import {
  Component,
  ComponentRef, EventEmitter,
  HostListener, Input,
  OnDestroy,
  OnInit, Output,
  ViewChild,
} from '@angular/core';
import {Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {MapComponent} from '../../../../shared/components/map/map.component';
import {GeoLocation} from '../../../../core/data/model/geo-location.model';
import {MapSelectedLocationComponent} from '../map-selected-location/map-selected-location.component';
import {OSMSearchResult} from '../../../../core/data/model/osm-search-result.model';
import {Complaint} from '../../../../core/data/model/complaint.model';
import {MapBalloonCenteringReset} from '../../../../shared/data/map.actions';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-geo-location-selector',
  templateUrl: './geo-location-selector.component.html',
  styleUrls: ['./geo-location-selector.component.css']
})
export class GeoLocationSelectorComponent implements OnInit, OnDestroy {

  static ADDRESS_VIEW_ZOOM = 15;

  @Output('onSelect') selectEvent: EventEmitter<Complaint> = new EventEmitter();
  @Output('onCancel') cancelEvent: EventEmitter<void> = new EventEmitter();

  @Input() complaint: Complaint;

  internalComplaint: Complaint;

  deviceLocationSubscription:    Subscription;

  complaintBalloon: ComponentRef<MapSelectedLocationComponent> = null;

  deviceLocation: GeoLocation;

  @ViewChild('map') map: MapComponent;


  centerBalloonSubscription: Subscription;

  constructor(private store:Store<State>)
  {
    this.deviceLocationSubscription = this.deviceLocationSubscription = this.store.pipe(select(state => state.core.deviceGeoLocation)).subscribe((location: GeoLocation) => {
      this.deviceLocation = location;
    });

    this.store.dispatch(new MapBalloonCenteringReset());

    this.centerBalloonSubscription = this.store.pipe(
        select(state => state.map.centeringBalloonLocation),
        filter(result => !!result))
        .subscribe((location: GeoLocation) => {

          this.map.setCenter(location, true);

        });
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {

    this.cancelEvent.emit();

  }

  onMapReadyHandler(event)
  {
    if (!!this.internalComplaint.location)
    {
      this.initBalloon();
    }
  }


  ngOnInit() {

    this.internalComplaint = Object.assign(new Complaint(), this.complaint);
  }

  ngOnDestroy(): void {

    this.centerBalloonSubscription.unsubscribe();

    this.deviceLocationSubscription.unsubscribe();

    this.removeBalloon()
  }


  removeBalloon = () => {

    if (this.complaintBalloon !== null)
    {
      this.map.removeBalloon(this.complaintBalloon);
      this.complaintBalloon = null;
    }
  };

  initBalloon = () => {

    this.removeBalloon();

    this.complaintBalloon = this.map.addBalloon(MapSelectedLocationComponent, this.internalComplaint.location);

    const { instance } = this.complaintBalloon;
    instance.addressSelected.subscribe((complaint: Complaint) => {

      this.selectEvent.emit(this.internalComplaint);

    });

    instance.complaint = this.internalComplaint;

    this.map.setCenter(this.internalComplaint.location, true);
  };

  onCloseControlClickHandler(event)
  {
    this.cancelEvent.emit();
  }

  //===================== MAP EVENT HANDLERS ======================
  onLocationClickHandler = (location: GeoLocation) => {

    this.internalComplaint.location = location;
    this.internalComplaint.resetAddress();

    this.initBalloon();

    this.map.setCenter(location, true);
  };

  //===================// MAP EVENT HANDLERS ======================

  onSearchAddressResultHandler(addresses: Array<OSMSearchResult>)
  {
    if (addresses.length > 0)
    {
      const address: OSMSearchResult = addresses[0];

      this.map.setZoom(GeoLocationSelectorComponent.ADDRESS_VIEW_ZOOM);
      this.map.setCenter(address.location, true);
    }
  }
}
