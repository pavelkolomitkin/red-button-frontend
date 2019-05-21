import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {environment} from '../../../../../../environments/environment';

declare var Chart: any;

@Component({
  selector: 'app-analyst-service-type-shares-chart',
  templateUrl: './service-type-shares-chart.component.html',
  styleUrls: ['./service-type-shares-chart.component.css']
})
export class ServiceTypeSharesChartComponent implements OnInit {

    @Input() title: string;

  @ViewChild('chartArea') chartArea: ElementRef;

  _data: Array<any>;

  total: number = 0;

  @Input()
  set data(value: Array<any>)
  {
    this._data = value;
    this.calculateTotal();

    if (!!this.chartArea)
    {
      this.updateChart();
    }
  }

  constructor() { }

  ngOnInit() {
    this.updateChart();
  }

  calculateTotal()
  {
    this.total = 0;
    this._data.forEach((item) => {
      this.total += item.issueNumber;
    });
  }
  updateChart()
  {
    if (this.isDataEmpty() || !this.chartArea)
    {
      //this.clearChart();
      return;
    }

    const chartData = [];
    const colors = environment.serviceTypeColors;
    this._data.forEach((item) => {

      let label = 'Others';
      let color = colors.others;
      if (!!item.serviceType)
      {
        label = item.serviceType.title;
        color = colors[item.serviceType.code];
      }

      chartData.push({
        value: item.issueNumber,
        color: color,
        highlight: color,
        label: label
      });

    });

    const context = this.chartArea.nativeElement.getContext('2d');

    const chart = new Chart(context);
    chart.Doughnut(chartData, {
      responsive: true,
      maintainAspectRatio: true,
    });
  }

  isDataEmpty()
  {
    return (this.total === 0);
  }

}
