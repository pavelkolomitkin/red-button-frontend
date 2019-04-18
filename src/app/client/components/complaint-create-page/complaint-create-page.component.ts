import { Component, OnInit } from '@angular/core';
import {Complaint} from '../../data/model/complaint.model';

@Component({
  selector: 'app-complaint-create-page',
  templateUrl: './complaint-create-page.component.html',
  styleUrls: ['./complaint-create-page.component.css']
})
export class ComplaintCreatePageComponent implements OnInit {

  complaint: Complaint = new Complaint();

  errors: Object = {};

  constructor() { }

  ngOnInit() {
  }

}
