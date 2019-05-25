import {Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MapComponent} from '../../../../../shared/components/map/map.component';
import {Region} from '../../../../../core/data/model/region.model';

@Component({
  selector: 'app-analyst-region-map',
  templateUrl: './region-map.component.html',
  styleUrls: ['./region-map.component.css']
})
export class RegionMapComponent implements OnInit {

  @ViewChild('map') map: MapComponent;

  @Output('onClose') closeEvent: EventEmitter<void> = new EventEmitter();

  @Input() region: Region;

  constructor() { }

  ngOnInit() {

  }

  onMapReadyHandler(event)
  {
    const { osmRegion: { boundingTopLeft, boundingBottomRight } } = this.region;

    this.map.setZoom(7);
    this.map.setViewBoundaries(boundingTopLeft, boundingBottomRight, null, false, [0, 0, 0, 0]);

  }

  adjustMap(withAnimation = false)
  {
    const { osmRegion: { boundingTopLeft, boundingBottomRight } } = this.region;

    this.map.setViewBoundaries(boundingTopLeft, boundingBottomRight, null, withAnimation, [0, 0, 0, 0]);
  }

  onViewBoxChangeHandler(event)
  {

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

}
