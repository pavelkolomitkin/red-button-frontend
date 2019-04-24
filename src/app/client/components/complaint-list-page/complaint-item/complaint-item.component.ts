import {Component, Input, OnInit} from '@angular/core';
import {Complaint} from '../../../data/model/complaint.model';

@Component({
  selector: 'app-complaint-item',
  templateUrl: './complaint-item.component.html',
  styleUrls: ['./complaint-item.component.css']
})
export class ComplaintItemComponent implements OnInit {

  @Input() complaint: Complaint;

  constructor() { }

  ngOnInit() {
  }

}
