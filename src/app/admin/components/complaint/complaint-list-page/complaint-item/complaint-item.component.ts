import {Component, Input, OnInit} from '@angular/core';
import {Complaint} from '../../../../../core/data/model/complaint.model';

@Component({
  selector: '[app-admin-complaint-item]',
  templateUrl: './complaint-item.component.html',
  styleUrls: ['./complaint-item.component.css']
})
export class ComplaintItemComponent implements OnInit {

  @Input() complaint: Complaint;

  constructor() { }

  ngOnInit() {
  }

  onDeleteClickHandler($event)
  {

  }

}
