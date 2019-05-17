import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DatePeriod} from '../../../../../shared/data/model/date-period.model';

@Component({
  selector: 'app-company-issue-search-filter',
  templateUrl: './issue-search-filter.component.html',
  styleUrls: ['./issue-search-filter.component.css']
})
export class IssueSearchFilterComponent implements OnInit {

  @Output('onPeriodChange') periodChangeEvent: EventEmitter<DatePeriod> = new EventEmitter();
  @Output('onPopularChange') popularChangeEvent: EventEmitter<boolean> = new EventEmitter();
  @Output('onChange') changeEvent: EventEmitter<{ period: DatePeriod, popular: boolean}> = new EventEmitter();

  selectedPeriod: DatePeriod = null;
  selectedPopular: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onDatePeriodChangeHandler(period: DatePeriod)
  {
    this.selectedPeriod = period;
    this.periodChangeEvent.emit(this.selectedPeriod);
  }

  onPopularChangeHandler($event)
  {
    this.popularChangeEvent.emit(this.selectedPopular);
  }

  onChangeHandler(event)
  {
    this.changeEvent.emit({
      period: this.selectedPeriod,
      popular: this.selectedPopular
    });
  }

}
