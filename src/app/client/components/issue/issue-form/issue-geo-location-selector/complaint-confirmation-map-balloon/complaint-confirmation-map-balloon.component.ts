import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ComplaintConfirmation} from '../../../../../../core/data/model/complaint-confirmation.model';

@Component({
  selector: 'app-complaint-confirmation-map-balloon',
  templateUrl: './complaint-confirmation-map-balloon.component.html',
  styleUrls: ['./complaint-confirmation-map-balloon.component.css']
})
export class ComplaintConfirmationMapBalloonComponent implements OnInit {

  @Output('onDelete') deleteEvent: EventEmitter<ComplaintConfirmation> = new EventEmitter();

  @Input() confirmation: ComplaintConfirmation;

  constructor() { }

  ngOnInit() {

  }

  onDeleteButtonClickHandler(event)
  {
    this.deleteEvent.emit(this.confirmation);
  }

}
