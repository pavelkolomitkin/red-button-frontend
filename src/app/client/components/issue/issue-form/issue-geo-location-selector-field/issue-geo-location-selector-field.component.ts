import {Component, Input, OnInit} from '@angular/core';
import {Issue} from '../../../../data/model/issue.model';

@Component({
  selector: 'app-issue-geo-location-selector-field',
  templateUrl: './issue-geo-location-selector-field.component.html',
  styleUrls: ['./issue-geo-location-selector-field.component.css']
})
export class IssueGeoLocationSelectorFieldComponent implements OnInit {

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
    this.issue = updatedIssue;
    this.isSelectorOpen = false;
  }

  onCancelSelectHandler(event)
  {
    this.isSelectorOpen = false;
  }

}
