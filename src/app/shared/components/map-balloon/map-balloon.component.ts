import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-map-balloon',
  templateUrl: './map-balloon.component.html',
  styleUrls: ['./map-balloon.component.css']
})
export class MapBalloonComponent implements OnInit {

  /**
   * using bootstrap colors: 'default', 'danger', 'success'
   */
  @Input() colorStyle: string = 'default';

  @Output('onToggleCollapse') toggleCollapse: EventEmitter<boolean> = new EventEmitter();

  isCollapsed: boolean = false;

  constructor() { }

  ngOnInit() {
  }


  onCloseClickHandler(event)
  {
    this.isCollapsed = !this.isCollapsed;

    this.toggleCollapse.emit(this.isCollapsed);
  }

}
