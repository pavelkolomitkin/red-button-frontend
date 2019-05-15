import { Component, OnInit } from '@angular/core';
import {ComplaintService} from '../../../../services/complaint.service';
import {Complaint} from '../../../../../core/data/model/complaint.model';
import {DashboardCommonWidgetComponent} from '../dashboard-common-widget/dashboard-common-widget.component';

@Component({
  selector: 'app-dashboard-last-complaints-widget',
  templateUrl: './dashboard-last-complaints-widget.component.html',
  styleUrls: ['./dashboard-last-complaints-widget.component.css']
})
export class DashboardLastComplaintsWidgetComponent extends DashboardCommonWidgetComponent{

  complaints: Array<Complaint> = [];

  constructor(private service: ComplaintService) {
      super();
  }

  updateData(): Promise<any> {
      return this.service.getList({})
          .toPromise()
          .then(({ complaints }) => {

              if (complaints.length > 5)
              {
                  complaints.splice(5);
              }

              this.complaints = complaints;

          });
  }

}
