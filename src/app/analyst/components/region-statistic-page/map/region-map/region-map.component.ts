import {
  AfterViewInit,
  Component,
  ComponentRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {MapComponent} from '../../../../../shared/components/map/map.component';
import {Region} from '../../../../../core/data/model/region.model';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../../app.state';
import {Observable, of, Subject, Subscription} from 'rxjs';
import {ServiceType} from '../../../../../core/data/model/service-type.model';
import {IssueService} from '../../../../services/issue.service';
import {MapViewBox} from '../../../../../shared/data/model/map-view-box.model';
import {debounceTime, distinctUntilChanged, filter, mergeMap, take} from 'rxjs/operators';
import {Issue} from '../../../../../core/data/model/issue.model';
import {IssueBalloonComponent} from '../../../common/map/issue-balloon/issue-balloon.component';
import {MapViewConfiguratorFactory} from '../../../../../core/services/map/view-configurator/map-view-configurator.factory';
import {GlobalNotifyWarningMessage} from '../../../../../core/data/actions';
import {NotifyMessage} from '../../../../../core/data/model/notify-message.model';
import {GeoLocation} from '../../../../../core/data/model/geo-location.model';
import {MapBalloonManager} from '../../../../../core/services/map/map-balloon-manager';

@Component({
  selector: 'app-analyst-region-map',
  templateUrl: './region-map.component.html',
  styleUrls: ['./region-map.component.css']
})
export class RegionMapComponent implements OnInit, OnDestroy, AfterViewInit {

  @Output('onClose') closeEvent: EventEmitter<void> = new EventEmitter();

  @Input() region: Region;
  @Input() year: number;

  @ViewChild('map') map: MapComponent;

  serviceTypes: Observable<Array<ServiceType>>;
  selectedServiceType: ServiceType = null;
  searchByForm: boolean = false;

  searchSubject = new Subject<any>();
  searchSubscription: Subscription;
  centeringBalloonSubscription: Subscription;

  balloonManager: MapBalloonManager = null;

  constructor(
      private store: Store<State>,
      private issueService: IssueService,
      private mapViewConfiguratorFactory: MapViewConfiguratorFactory
  ) {

  }

  ngOnInit() {

    this.searchSubscription = this
        .searchSubject.pipe(
            debounceTime(300),
            mergeMap((params) => this.searchIssues(params))
        )
        .subscribe((issues: Array<Issue>) => {

          this.balloonManager.setItems(issues);

          if (this.searchByForm)
          {
            if (issues.length > 0)
            {
              const mapConfigurator = this.mapViewConfiguratorFactory.createConfiguratorByPoints(this.map, issues.map(item => item.location));
              mapConfigurator.adjust();
            }
            else
            {
              this.store.dispatch(new GlobalNotifyWarningMessage(new NotifyMessage('No Issues')));
            }
          }

          this.searchByForm = false;

        });
    ;

    this.serviceTypes = this.store.pipe(select(state => state.serviceType.list));
  }

  onMapRenderHandler(event)
  {
    const { osmRegion: { boundingTopLeft, boundingBottomRight } } = this.region;

    this.map.setViewBoundaries(boundingTopLeft, boundingBottomRight, null, false, [0, 0, 0, 0]);
  }

  ngOnDestroy(): void {

    this.searchSubscription.unsubscribe();

    if (!!this.centeringBalloonSubscription)
    {
      this.centeringBalloonSubscription.unsubscribe();
    }

    if (this.balloonManager)
    {
      this.balloonManager.release();
      this.balloonManager = null;
    }
  }

  onMapReadyHandler(event)
  {

    this.balloonManager = new MapBalloonManager(
        this.map,
        IssueBalloonComponent,
        issue => issue.id,
        issue => issue.location,
        (issue, balloon: ComponentRef<IssueBalloonComponent>) => {
          balloon.instance.issue = issue;
        }
        );

    const { osmRegion: { boundingTopLeft, boundingBottomRight } } = this.region;

    this.map.setZoom(7);
    this.map.setViewBoundaries(boundingTopLeft, boundingBottomRight, null, false, [0, 0, 0, 0]);

    // this.searchIssues({
    //   year: this.year
    // });

    this.centeringBalloonSubscription = this.store.pipe(select(state => state.map.centeringBalloonLocation), filter(result => !!result))
        .subscribe((location: GeoLocation) => {
          this.map.setCenter(location, true);
        });
  }

  ngAfterViewInit(): void {

    const { osmRegion: { boundingTopLeft, boundingBottomRight } } = this.region;

    this.map.setViewBoundaries(boundingTopLeft, boundingBottomRight, null, false, [0, 0, 0, 0]);
  }

  adjustMap(withAnimation = false)
  {
    const { osmRegion: { boundingTopLeft, boundingBottomRight } } = this.region;

    this.map.setViewBoundaries(boundingTopLeft, boundingBottomRight, null, withAnimation, [0, 0, 0, 0]);
  }

  onViewBoxChangeHandler(event)
  {
    if (this.searchByForm)
    {
      return;
    }

    const viewBox: MapViewBox = this.map.getViewBox();

    const params = {
      year: this.year,
      serviceType: !!this.selectedServiceType ? this.selectedServiceType.id : null,
      topLeftLatitude: viewBox.topLeft.latitude,
      topLeftLongitude: viewBox.topLeft.longitude,
      bottomRightLatitude: viewBox.bottomRight.latitude,
      bottomRightLongitude: viewBox.bottomRight.longitude
    };

    this.searchSubject.next(params);
  }

  onServiceTypeChangeHandler(event)
  {
    this.searchByForm = true;

    const params = {
      year: this.year,
      serviceType: !!this.selectedServiceType ? this.selectedServiceType.id : null
    };

    this.searchSubject.next(params);
  }

  searchIssues(params)
  {
    return this.issueService.searchByRegion(this.region, params);
  }

  onCenterMapButtonClickHandler(event)
  {
    this.adjustMap(true);
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent)
  {
    this.closeEvent.emit();
  }

  onCloseButtonClickHandler(event)
  {
    this.closeEvent.emit();
  }

  compareServiceTypes(a: ServiceType, b: ServiceType)
  {
    if (!a || !b)
    {
      return false;
    }

    return a.id === b.id;
  }

}
