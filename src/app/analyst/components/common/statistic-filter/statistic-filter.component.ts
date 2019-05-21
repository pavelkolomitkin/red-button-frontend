import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {combineLatest} from 'rxjs';

@Component({
  selector: 'app-analyst-statistic-filter',
  templateUrl: './statistic-filter.component.html',
  styleUrls: ['./statistic-filter.component.css']
})
export class StatisticFilterComponent implements OnInit {

  @Input() startYear: number;
  @Input() endYear: number;
  @Input() currentYear: number;
  @Input() federalDistrictId: string;

  years: Array<number>;

  constructor() {

  }

  ngOnInit() {

    this.years = new Array<number>();
    for(let i = this.endYear; i >= this.startYear; i--)
    {
      this.years.push(i);
    }

  }

}
