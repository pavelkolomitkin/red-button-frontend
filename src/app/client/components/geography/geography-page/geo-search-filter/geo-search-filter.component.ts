import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DatePeriod} from '../../../../../shared/data/model/date-period.model';

@Component({
  selector: 'app-client-geo-search-filter',
  templateUrl: './geo-search-filter.component.html',
  styleUrls: ['./geo-search-filter.component.css']
})
export class GeoSearchFilterComponent implements OnInit {

  @Output('onComplaintFlagChange') complaintFlagChangeEvent: EventEmitter<boolean> = new EventEmitter();
  @Output('onChange') changeEvent: EventEmitter<{ withComplaints: boolean }> = new EventEmitter();

  withComplaints: boolean = false;

  constructor() { }

  ngOnInit() {

  }

  onWithComplaintsFlagChangeHandler(event)
  {
    this.complaintFlagChangeEvent.emit(this.withComplaints);
  }

  onChangeHandler(event)
  {
    this.changeEvent.emit({
      withComplaints: this.withComplaints
    });
  }
}
