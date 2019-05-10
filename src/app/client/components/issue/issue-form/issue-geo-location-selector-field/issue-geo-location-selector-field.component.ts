import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Issue} from '../../../../../core/data/model/issue.model';

@Component({
  selector: 'app-issue-geo-location-selector-field',
  templateUrl: './issue-geo-location-selector-field.component.html',
  styleUrls: ['./issue-geo-location-selector-field.component.css']
})
export class IssueGeoLocationSelectorFieldComponent implements OnInit {

  @Output('onAddressUpdate') addressUpdateEvent: EventEmitter<Issue> = new EventEmitter();

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
    this.issue = updatedIssue.clone();

    this.isSelectorOpen = false;

    this.addressUpdateEvent.emit(this.issue);
  }

  onCancelSelectHandler(event)
  {
    this.isSelectorOpen = false;
  }

}
