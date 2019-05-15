import {Component, Input, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard-common-widget',
  templateUrl: './dashboard-common-widget.component.html',
  styleUrls: ['./dashboard-common-widget.component.css']
})
export class DashboardCommonWidgetComponent implements OnInit, OnDestroy {

  static STATE_READY = 'STATE_READY';
  static STATE_LOADING = 'STATE_LOADING';

  static DEFAULT_UPDATING_INTERVAL = 10000;

  @Input() intervalUpdating: number = DashboardCommonWidgetComponent.DEFAULT_UPDATING_INTERVAL;


  protected currentState = DashboardCommonWidgetComponent.STATE_READY;
  private updatingIntervalDescriptor = null;

  constructor() { }

  ngOnInit() {

    this.update();
    this.updatingIntervalDescriptor = setInterval(this.update, this.intervalUpdating);
  }

  update = () => {

    this.currentState = DashboardCommonWidgetComponent.STATE_LOADING;
    this.updateData().finally(() => {
      this.currentState = DashboardCommonWidgetComponent.STATE_READY;
    });

  }

  ngOnDestroy(): void {

    clearInterval(this.updatingIntervalDescriptor);
    this.updatingIntervalDescriptor = null;
  }

  updateData(): Promise<any>
  {
    throw new Error('You should override this method in the subclass!');
  }
}
