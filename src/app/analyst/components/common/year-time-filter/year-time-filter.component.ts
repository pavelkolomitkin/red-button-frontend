import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-analyst-year-time-filter',
  templateUrl: './year-time-filter.component.html',
  styleUrls: ['./year-time-filter.component.css']
})
export class YearTimeFilterComponent implements OnInit {

  @Output('onChange') changeEvent: EventEmitter<number> = new EventEmitter();

  @Input() startYear: number;
  @Input() currentYear: number;

  constructor() { }

  ngOnInit() {
  }


  onSelectYearHandler(selectedYear: number)
  {
    if (this.currentYear !== selectedYear)
    {
      this.currentYear = selectedYear;

      this.changeEvent.emit(this.currentYear);
    }
  }
}
