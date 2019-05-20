import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-analyst-service-types-statistics',
  templateUrl: './service-types-statistics.component.html',
  styleUrls: ['./service-types-statistics.component.css']
})
export class ServiceTypesStatisticsComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
