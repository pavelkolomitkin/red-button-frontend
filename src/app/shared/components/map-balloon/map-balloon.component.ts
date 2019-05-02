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
import {MapBalloonOpen, MapPanComponent} from '../../data/map.actions';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

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

  @Output('onToggleCollapse') toggleCollapse: EventEmitter<boolean> = new EventEmitter();

  @Input() isCollapsed: boolean;
  @Input() populateCollapsing: boolean = true;

  openBalloonSubscription: Subscription;

  constructor(private store: Store<State>, private elementRef: ElementRef) { }

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
  }

  ngOnDestroy(): void {
    this.openBalloonSubscription.unsubscribe();
  }

  onCloseClickHandler(event)
  {
    this.isCollapsed = !this.isCollapsed;

    this.toggleCollapse.emit(this.isCollapsed);

    if (!this.isCollapsed)
    {
      this.store.dispatch(new MapBalloonOpen(this));
    }
  }

}
