import {
  Component,
  ComponentRef,
  ElementRef,
  EventEmitter,
  HostListener,
  Input, OnDestroy,
  OnInit,
  Output,
  ViewContainerRef,
  ViewRef
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {MapBalloonCentering, MapBalloonOpen} from '../../data/map.actions';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {GeoLocation} from '../../../core/data/model/geo-location.model';

@Component({
  selector: 'app-map-balloon',
  templateUrl: './map-balloon.component.html',
  styleUrls: ['./map-balloon.component.css']
})
export class MapBalloonComponent implements OnInit, OnDestroy {

  /**
   * using bootstrap colors: 'default', 'danger', 'success'
   */
  @Input() colorStyle: string = 'default';
  @Input() color: string;

  @Output('onToggleCollapse') toggleCollapse: EventEmitter<boolean> = new EventEmitter();
  @Output('isCollapsedChange') isCollapsedChange: EventEmitter<boolean> = new EventEmitter();

  @Input() isCollapsed: boolean;
  @Input() location: GeoLocation;
  @Input() populateCollapsing: boolean = true;
  @Input() hasToCenteredOnOpen: boolean = false;

  openBalloonSubscription: Subscription;

  constructor(protected store: Store<State>) { }

  ngOnInit() {

    this.openBalloonSubscription = this.store.pipe(
        select(state => state.map.openedBalloon),
        filter(result => !!result))
        .subscribe((component) => {
          if (component !== this && (this.populateCollapsing))
          {
            this.isCollapsed = true;
          }
        });

    //this.handleOpenedState();
  }

  ngOnDestroy(): void {
    if (!!this.openBalloonSubscription)
    {
      this.openBalloonSubscription.unsubscribe();
    }
  }

  onToggleCollapseHandler(event)
  {
    this.isCollapsed = !this.isCollapsed;

    this.toggleCollapse.emit(this.isCollapsed);
    this.isCollapsedChange.emit(this.isCollapsed);

    this.handleOpenedState();
  }

  handleOpenedState()
  {
    if (!this.isCollapsed)
    {
      this.store.dispatch(new MapBalloonOpen(this));

      if (this.hasToCenteredOnOpen && this.location)
      {
        this.store.dispatch(new MapBalloonCentering(this, this.location))
      }
    }
  }

}
