import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map-balloon-group',
  templateUrl: './map-balloon-group.component.html',
  styleUrls: ['./map-balloon-group.component.css']
})
export class MapBalloonGroupComponent implements OnInit {

  isCollapsed: boolean = false;

  internalBalloonList: Array<any> = [];

  constructor() { }

  ngOnInit() {
  }

}
