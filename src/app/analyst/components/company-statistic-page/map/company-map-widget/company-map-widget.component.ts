import {Component, Input, OnInit} from '@angular/core';
import {Company} from '../../../../../core/data/model/company.model';

@Component({
  selector: 'app-analyst-company-map-widget',
  templateUrl: './company-map-widget.component.html',
  styleUrls: ['./company-map-widget.component.css']
})
export class CompanyMapWidgetComponent implements OnInit {

  _company: Company;

  @Input()
  set company(value: Company)
  {
    this._company = value;
  }

  @Input() year: number;
  @Input() issueNumber;

  isMapVisible: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onButtonClickHandler(event)
  {
    this.isMapVisible = true;
  }

  onMapCloseHandler(event)
  {
    this.isMapVisible = false;
  }

}
