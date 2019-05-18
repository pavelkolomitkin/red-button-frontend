import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {GeoLocation} from '../../../../core/data/model/geo-location.model';
import {environment} from '../../../../../environments/environment';
import {MapComponent} from '../../../../shared/components/map/map.component';
import {MapViewConfiguratorFactory} from '../../../../core/services/map/map-view-configurator.factory';
import {IssueGeoSearchReset, IssueGeoSearchStart} from '../../../data/issue.actions';
import {MapViewConfiguratorBase} from '../../../../core/services/map/map-view-configurator-base';
import {combineLatest, Subscription} from 'rxjs';
import {Issue} from '../../../../core/data/model/issue.model';
import {IssueBalloonComponent} from './issue-balloon/issue-balloon.component';

@Component({
  selector: 'app-issue-geography-page',
  templateUrl: './issue-geography-page.component.html',
  styleUrls: ['./issue-geography-page.component.css']
})
export class IssueGeographyPageComponent implements OnInit, OnDestroy {

  @ViewChild('map') map: MapComponent;

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

  }

  onMapReadyHandler()
  {
    this.searchSubscription = combineLatest(
        this.store.pipe(select(state => state.companyIssue.geoList)),
        this.store.pipe(select(state => state.security.authorizedUser))
    ).subscribe(([list, user]) => {

      this.updateBalloons(list);


      let mapView: MapViewConfiguratorBase = null;

      if (list.length > 0)
      {
        mapView = this.mapViewConfiguratorFactory.createConfiguratorByPoints(this.map, list.map(item => item.location));
      }
      else
      {
        mapView = this.mapViewConfiguratorFactory.createConfiguratorBySinglePoint(this.map, this.defaultGeoPosition);
      }

      mapView.adjust();

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
