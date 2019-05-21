import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-analyst-service-type-shares-chart',
  templateUrl: './service-type-shares-chart.component.html',
  styleUrls: ['./service-type-shares-chart.component.css']
})
export class ServiceTypeSharesChartComponent implements OnInit {

  @Input() title: string;

  _data: Array<any>;

  chartOptions: any;

  total: number = 0;

  @Input()
  set data(value: Array<any>)
  {
    this._data = value;

    this.calculateTotal();
    this.chartOptions = this.getChartOption();
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

  getChartOption()
  {
    const result: any = {
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        // type: 'scroll',
        // orient: 'vertical',
        // right: 10,
        // top: 20,
        // bottom: 20,
        // data: this._data.map((item) => {
        //   return !!item.serviceType ? item.serviceType.title : 'Others'
        // }),
        show: false

        // selected: data.selected
      },
      series : [
        {
          // name: '姓名',
          type: 'pie',
          radius : '55%',
          center: ['40%', '50%'],
          data: this._data.map((item) => {
            return {
              name: !!item.serviceType ? item.serviceType.title : 'Others',
              value: item.issueNumber
            };
          }),
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    return result;
  }

  updateChart()
  {

  }

  isDataEmpty()
  {
    return (this.total === 0);
  }

}
