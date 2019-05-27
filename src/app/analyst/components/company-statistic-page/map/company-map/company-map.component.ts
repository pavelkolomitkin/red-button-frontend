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
import {select, Store} from '@ngrx/store';
import {State} from '../../../../../app.state';
import {IssueService} from '../../../../services/issue.service';
import {MapViewConfiguratorFactory} from '../../../../../core/services/map/view-configurator/map-view-configurator.factory';
import {MapComponent} from '../../../../../shared/components/map/map.component';
import {empty, from, iif, Observable, of, Subject, Subscription} from 'rxjs';
import {ServiceType} from '../../../../../core/data/model/service-type.model';
import {buffer, debounceTime, filter, flatMap, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {Issue} from '../../../../../core/data/model/issue.model';
import {GlobalNotifyWarningMessage} from '../../../../../core/data/actions';
import {NotifyMessage} from '../../../../../core/data/model/notify-message.model';
import {MapBalloonManager} from '../../../../../core/services/map/map-balloon-manager';
import {IssueBalloonComponent} from '../../../common/map/issue-balloon/issue-balloon.component';
import {GeoLocation} from '../../../../../core/data/model/geo-location.model';
import {Company} from '../../../../../core/data/model/company.model';
import {MapViewBox} from '../../../../../shared/data/model/map-view-box.model';
import {environment} from '../../../../../../environments/environment';
import {isArray} from 'util';

@Component({
  selector: 'app-analyst-company-map',
  templateUrl: './company-map.component.html',
  styleUrls: ['./company-map.component.css']
})
export class CompanyMapComponent implements OnInit, OnDestroy, AfterViewInit {

  @Output('onClose') closeEvent: EventEmitter<void> = new EventEmitter();

  @Input() company: Company;
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
  ) { }

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

  ngAfterViewInit(): void {

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

    this.map.setZoom(7);
    this.map.setCenter(environment.defaultGeoPosition);

    this.centeringBalloonSubscription = this.store.pipe(select(state => state.map.centeringBalloonLocation), filter(result => !!result))
        .subscribe((location: GeoLocation) => {
          this.map.setCenter(location, true);
        });


    this.searchByForm = true;
    this.searchSubject.next({
      year: this.year
    });
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
    return this.issueService.searchByCompany(this.company, params);
  }

  onCenterMapButtonClickHandler(event)
  {
    this.searchByForm = true;

    this.selectedServiceType = null;
    const params = {
      year: this.year
    };

    this.searchSubject.next(params);
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
