import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Complaint} from '../../../core/data/model/complaint.model';
import {MapComponent} from '../map/map.component';
import {ComplaintDetailsBalloonComponent} from './complaint-details-balloon/complaint-details-balloon.component';
import {select, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {filter} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-complaint-map-view',
  templateUrl: './complaint-map-view.component.html',
  styleUrls: ['./complaint-map-view.component.css']
})
export class ComplaintMapViewComponent implements OnInit {

  @Input() complaint: Complaint;

  @ViewChild('map') map: MapComponent;

  constructor() { }

  ngOnInit() {
  }

  onMapReadyHandler(event)
  {
    const balloon = this.map.addBalloon(ComplaintDetailsBalloonComponent, this.complaint.location);
    balloon.instance.complaint = this.complaint;
  }

}
