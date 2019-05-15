import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Complaint} from '../../../../../core/data/model/complaint.model';

@Component({
  selector: 'app-complaint-item',
  templateUrl: './complaint-item.component.html',
  styleUrls: ['./complaint-item.component.css']
})
export class ComplaintItemComponent implements OnInit {

  @Output('onDelete') deleteEvent: EventEmitter<Complaint> = new EventEmitter();

  @Input() complaint: Complaint;

  constructor() { }

  ngOnInit() {
  }

  onDeleteClickHandler(event)
  {
    this.deleteEvent.emit(this.complaint);
  }

}
