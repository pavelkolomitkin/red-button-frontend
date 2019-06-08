import {Component, Input, OnInit} from '@angular/core';
import {Complaint} from '../../../../core/data/model/complaint.model';

@Component({
  selector: '[app-default-complaint-mark]',
  templateUrl: './default-complaint-mark.component.html',
  styleUrls: ['./default-complaint-mark.component.css']
})
export class DefaultComplaintMarkComponent implements OnInit {

  @Input() complaint: Complaint;

  constructor() { }

  ngOnInit() {
  }

}
