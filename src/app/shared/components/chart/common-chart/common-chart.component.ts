import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';

declare var $: any;
declare var echarts: any;

@Component({
  selector: 'app-common-chart',
  templateUrl: './common-chart.component.html',
  styleUrls: ['./common-chart.component.css']
})
export class CommonChartComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('chartArea') chartArea: ElementRef;

  chart: any;

  _chartOptions: any;

  @Input()
  set options(value: any)
  {
    this._chartOptions = value;
    this.updateChart();
  }

  constructor() { }

  ngOnInit() {

    $(window).on('resize', this.onWindowResizeHandler);

  }

  ngOnDestroy(): void {

    $(window).off('resize', this.onWindowResizeHandler);

  }

  ngAfterViewInit(): void {

    this.updateChart();

  }

  updateChart()
  {
    if (!!this.chartArea)
    {
      this.chart = echarts.init(this.chartArea.nativeElement);

      this.chart.setOption(this._chartOptions, true);
    }
  }

  onWindowResizeHandler = () => {
    if(!!this.chart) {
      this.chart.resize();
    }
  }

}
