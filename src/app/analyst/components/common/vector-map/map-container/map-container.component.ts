import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-analyst-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.css']
})
export class MapContainerComponent implements OnInit {

  @Input() viewBox: string;

  constructor() { }

  ngOnInit() {
  }

}
