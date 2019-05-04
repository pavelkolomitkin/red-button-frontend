import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Issue} from '../../../../data/model/issue.model';

@Component({
  selector: 'app-issue-geo-location-selector-field',
  templateUrl: './issue-geo-location-selector-field.component.html',
  styleUrls: ['./issue-geo-location-selector-field.component.css']
})
export class IssueGeoLocationSelectorFieldComponent implements OnInit {

  @Output('onAddressUpdate') addressUpdateEvent: EventEmitter<void> = new EventEmitter();

  @Input() issue: Issue;

  isSelectorOpen: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onChooseButtonClickHandler(event: Event)
  {
    this.isSelectorOpen = true;
  }

  onSelectAddressHandler(updatedIssue: Issue)
  {
    this.issue.location = updatedIssue.location;
    this.issue.region = updatedIssue.region;
    this.issue.address = updatedIssue.address;
    this.isSelectorOpen = false;

    this.addressUpdateEvent.emit();
  }

  onCancelSelectHandler(event)
  {
    this.isSelectorOpen = false;
  }

}
