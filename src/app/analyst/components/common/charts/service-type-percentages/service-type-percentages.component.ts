import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-analyst-service-type-percentages',
  templateUrl: './service-type-percentages.component.html',
  styleUrls: ['./service-type-percentages.component.css']
})
export class ServiceTypePercentagesComponent implements OnInit {

  @Input() title: string;

  @Input() data: Array<any>;

  constructor() { }

  ngOnInit() {
  }

}
