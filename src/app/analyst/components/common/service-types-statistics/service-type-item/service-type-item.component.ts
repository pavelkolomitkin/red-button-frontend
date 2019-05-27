import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-service-type-item',
  templateUrl: './service-type-item.component.html',
  styleUrls: ['./service-type-item.component.css']
})
export class ServiceTypeItemComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
