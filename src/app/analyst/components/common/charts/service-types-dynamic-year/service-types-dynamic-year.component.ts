import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {isObject} from 'util';


@Component({
  selector: 'app-analyst-service-types-dynamic-year',
  templateUrl: './service-types-dynamic-year.component.html',
  styleUrls: ['./service-types-dynamic-year.component.css']
})
export class ServiceTypesDynamicYearComponent implements OnInit, AfterViewInit {


  @Input() title: string;
  @Input() year: number;

  _data: Array<any> = [];

  @Input()
  set data(value: Array<any>)
  {
    this._data = value;
    this.chartOptions = this.getChartOptions();
  }

  chartOptions: any;

  constructor() { }

  ngOnInit() {

    this.chartOptions = this.getChartOptions();

  }

  getChartOptions()
  {
    const options = {
      // title: {
      //   text: this.title
      // },
      tooltip: {
        trigger: 'axis',
        // position: [10, 10]
      },
      legend: {
        data: this._data.map((item) => {
          return !!item.title ? item.title : 'Others';
        })
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [...environment.monthNames.en]
      },
      yAxis: {
        type: 'value'
      },
      series: []
    };

    this._data.forEach((item) => {

      const data = [];

      for (let i = 0; i < 12; i++)
      {
        if (!!item.years && !!item.years[this.year] && !!item.years[this.year][i])
        {
          data.push(item.years[this.year][i]);
        }
        else
        {
          data.push(0);
        }
      }

      options.series.push({
        name: !!item.title ? item.title : 'Others',
        type: 'line',
        data: data
      });

    });

    return options;
  }

  ngAfterViewInit(): void {


  }


}
