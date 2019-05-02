import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Complaint} from '../../../../../data/model/complaint.model';

@Component({
  selector: 'app-complaint-map-balloon',
  templateUrl: './complaint-map-balloon.component.html',
  styleUrls: ['./complaint-map-balloon.component.css']
})
export class ComplaintMapBalloonComponent implements OnInit {

  @Output('onChoose') chooseEvent: EventEmitter<Complaint> = new EventEmitter();

  @Input() complaint: Complaint;

  constructor() { }

  ngOnInit() {

  }

  onRequestButtonClickHandler(event)
  {
    this.chooseEvent.emit(this.complaint);
  }

}
