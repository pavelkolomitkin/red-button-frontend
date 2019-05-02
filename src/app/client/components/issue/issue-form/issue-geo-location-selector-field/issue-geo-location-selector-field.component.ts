import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Region} from '../../../../../core/data/model/region.model';
import {GeoLocation} from '../../../../../core/data/model/geo-location.model';
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

  onSelectorCloseHandler(event)
  {
    this.isSelectorOpen = false;
  }

}
