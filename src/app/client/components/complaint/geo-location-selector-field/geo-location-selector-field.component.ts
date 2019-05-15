import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {State} from '../../../../app.state';
import {Store} from '@ngrx/store';
import {Complaint} from '../../../../core/data/model/complaint.model';

@Component({
  selector: 'app-geo-location-selector-field',
  templateUrl: './geo-location-selector-field.component.html',
  styleUrls: ['./geo-location-selector-field.component.css']
})
export class GeoLocationSelectorFieldComponent implements OnInit {

  @Output('onAddressSelect') addressSelected: EventEmitter<void> = new EventEmitter();

  @Input() complaint: Complaint;

  isSelectorOpen: boolean = false;

  constructor(private store: Store<State>) { }

  ngOnInit() {
  }

  onChooseButtonClickHandler(event: Event)
  {
    this.isSelectorOpen = true;
  }

  onCancelHandler(event)
  {
    this.isSelectorOpen = false;
  }

  onAddressSelectHandler(updatedComplaint: Complaint)
  {
    this.complaint.region = updatedComplaint.region;
    this.complaint.address = updatedComplaint.address;
    this.complaint.location = updatedComplaint.location;

    this.isSelectorOpen = false;

    this.addressSelected.emit();
  }
}
