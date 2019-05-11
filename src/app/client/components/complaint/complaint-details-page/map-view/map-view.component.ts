import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Complaint} from '../../../../../core/data/model/complaint.model';
import {MapComponent} from '../../../../../shared/components/map/map.component';
import {ComplaintDetailsBalloonComponent} from '../complaint-details-balloon/complaint-details-balloon.component';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {

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
