import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {combineLatest, Observable} from 'rxjs';

@Component({
  selector: 'app-analyst-statistic-filter',
  templateUrl: './statistic-filter.component.html',
  styleUrls: ['./statistic-filter.component.css']
})
export class StatisticFilterComponent implements OnInit {

  @Input() routePrefix: string;
  @Input() startYear: number;
  @Input() endYear: number;
  @Input() currentYear: number;

  years: Array<number>;

  queryParams: Observable<any>;

  constructor(private route: ActivatedRoute) {

    this.queryParams = this.route.queryParams;

  }

  ngOnInit() {

    this.years = new Array<number>();
    for(let i = this.endYear; i >= this.startYear; i--)
    {
      this.years.push(i);
    }

  }

}
