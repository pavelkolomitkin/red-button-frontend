import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DatePeriod} from '../../../../../shared/data/model/date-period.model';

@Component({
  selector: 'app-company-issue-geo-search-filter',
  templateUrl: './issue-geo-search-filter.component.html',
  styleUrls: ['./issue-geo-search-filter.component.css']
})
export class IssueGeoSearchFilterComponent implements OnInit {

  @Output('onPeriodChange') periodChangeEvent: EventEmitter<DatePeriod> = new EventEmitter();
  @Output('onChange') changeEvent: EventEmitter<{ period: DatePeriod }> = new EventEmitter();
  @Output('onSubmit') submitEvent: EventEmitter<{ period: DatePeriod }> = new EventEmitter();

  selectedPeriod: DatePeriod = null;

  constructor() { }

  ngOnInit() {

  }

  onDatePeriodChangeHandler(period: DatePeriod)
  {
    this.selectedPeriod = period;
    this.periodChangeEvent.emit(this.selectedPeriod);
  }

  onChangeHandler(event)
  {
    this.changeEvent.emit({
      period: this.selectedPeriod
    });
  }
}
