import { Component, OnInit } from '@angular/core';
import {Complaint} from '../../data/model/complaint.model';
import {GeoLocation} from '../../../core/data/model/geo-location.model';

@Component({
  selector: 'app-complaint-create-page',
  templateUrl: './complaint-create-page.component.html',
  styleUrls: ['./complaint-create-page.component.css']
})
export class ComplaintCreatePageComponent implements OnInit {

  complaint: Complaint = new Complaint();

  selectedLocation: GeoLocation = {
    latitude: 48.762144,
    longitude: 44.551344
  };

  errors: Object = {};

  constructor() {

  }

  ngOnInit() {
  }

  onAddressSelectedHandler(value)
  {

  }

}
