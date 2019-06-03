import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {GeoLocation} from '../../../../core/data/model/geo-location.model';
import {environment} from '../../../../../environments/environment';
import {MapComponent} from '../../../../shared/components/map/map.component';
import {MapViewConfiguratorFactory} from '../../../../core/services/map/view-configurator/map-view-configurator.factory';
import {IssueGeoSearchReset, IssueGeoSearchStart} from '../../../data/issue.actions';
import {MapViewConfiguratorBase} from '../../../../core/services/map/view-configurator/map-view-configurator-base';
import {Subscription} from 'rxjs';
import {Issue} from '../../../../core/data/model/issue.model';
import {IssueBalloonComponent} from './issue-balloon/issue-balloon.component';
import {GlobalNotifyWarningMessage} from '../../../../core/data/actions';
import {NotifyMessage} from '../../../../core/data/model/notify-message.model';
import {filter, skip} from 'rxjs/operators';

@Component({
  selector: 'app-issue-geography-page',
  templateUrl: './issue-geography-page.component.html',
  styleUrls: ['./issue-geography-page.component.css']
})
export class IssueGeographyPageComponent implements OnInit, OnDestroy {

  @ViewChild('map') map: MapComponent;

  centeringBalloonSubscription: Subscription;
  searchSubscription: Subscription;

  searchParams: any = {};

  defaultGeoPosition: GeoLocation;

  constructor(private store: Store<State>, private mapViewConfiguratorFactory: MapViewConfiguratorFactory) {
    this.defaultGeoPosition = environment.defaultGeoPosition;
  }

  ngOnInit() {

    this.store.dispatch(new IssueGeoSearchReset());

  }

  ngOnDestroy(): void {


    if (!!this.searchSubscription)
    {
      this.searchSubscription.unsubscribe();
    }

    if (!!this.centeringBalloonSubscription)
    {
      this.centeringBalloonSubscription.unsubscribe();
    }

  }

  onMapReadyHandler()
  {
    this.searchSubscription = this.store.pipe(select(state => state.companyIssue.geoList), skip(1)).subscribe((list) => {

      this.updateBalloons(list);

      let mapView: MapViewConfiguratorBase = null;

      if (list.length > 0)
      {
        mapView = this.mapViewConfiguratorFactory.createConfiguratorByPoints(this.map, list.map(item => item.location));
        mapView.adjust();
      }
      else
      {
        this.store.dispatch(new GlobalNotifyWarningMessage(new NotifyMessage('NO_ISSUES')));
      }

    });

    this.centeringBalloonSubscription = this.store.pipe(select(state => state.map.centeringBalloonLocation), filter(result => !!result))
        .subscribe((location: GeoLocation) => {
          this.map.setCenter(location, true);
        });

    this.searchIssues();
  }

  updateBalloons(list: Array<Issue>)
  {
    this.map.removeAllBalloons();

    list.forEach((issue: Issue) => {

      const componentRef = this.map.addBalloon(IssueBalloonComponent, issue.location);
      componentRef.instance.issue = issue;

    });
  }

  searchIssues()
  {
    this.store.dispatch(new IssueGeoSearchStart(this.searchParams));
  }

  onSearchFilterChangeHandler({ period })
  {
    if (period !== null)
    {
      this.searchParams.startDate = period.startDate.toUTCString();
      this.searchParams.endDate = period.endDate.toUTCString();
    }
    else
    {
      delete this.searchParams.startDate;
      delete this.searchParams.endDate;
    }

    this.searchIssues();
  }
}
