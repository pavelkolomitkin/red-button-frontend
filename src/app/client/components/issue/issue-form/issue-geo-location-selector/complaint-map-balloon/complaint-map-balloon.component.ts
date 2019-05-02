import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Complaint} from '../../../../../data/model/complaint.model';

@Component({
  selector: 'app-complaint-map-balloon',
  templateUrl: './complaint-map-balloon.component.html',
  styleUrls: ['./complaint-map-balloon.component.css']
})
export class ComplaintMapBalloonComponent implements OnInit {
  
  @Output('onRequestSignature') requestSignatureEvent: EventEmitter<Complaint> = new EventEmitter();

  @Input() complaint: Complaint;

  @Input() canRequestSignature: boolean = false;

  constructor() { }

  ngOnInit() {

  }

  onRequestButtonClickHandler(event)
  {
    this.requestSignatureEvent.emit(this.complaint);
  }

}
