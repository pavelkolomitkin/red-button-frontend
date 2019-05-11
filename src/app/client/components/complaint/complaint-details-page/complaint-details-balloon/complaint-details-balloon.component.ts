import {Component, Input, OnInit} from '@angular/core';
import {Complaint} from '../../../../../core/data/model/complaint.model';

@Component({
  selector: 'app-complaint-details-balloon',
  templateUrl: './complaint-details-balloon.component.html',
  styleUrls: ['./complaint-details-balloon.component.css']
})
export class ComplaintDetailsBalloonComponent implements OnInit {

  @Input() complaint: Complaint;

  constructor() { }

  ngOnInit() {
  }

}
