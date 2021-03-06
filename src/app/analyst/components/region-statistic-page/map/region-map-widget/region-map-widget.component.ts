import {Component, Input, OnInit} from '@angular/core';
import {Region} from '../../../../../core/data/model/region.model';

@Component({
  selector: 'app-analyst-region-map-widget',
  templateUrl: './region-map-widget.component.html',
  styleUrls: ['./region-map-widget.component.css']
})
export class RegionMapWidgetComponent implements OnInit {

  _region: Region;

  @Input()
  set region(value: Region)
  {
    this._region = value;
  }

  @Input() year: number;
  @Input() issueNumber: number;

  isMapVisible: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onButtonClickHandler(event)
  {
    this.isMapVisible = true;
  }

  onMapCloseHandler(event)
  {
    this.isMapVisible = false;
  }

}
