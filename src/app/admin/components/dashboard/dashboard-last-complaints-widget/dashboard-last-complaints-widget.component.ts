import { Component, OnInit } from '@angular/core';
import {ComplaintService} from '../../../services/complaint.service';
import {Complaint} from '../../../../core/data/model/complaint.model';
import {Store} from '@ngrx/store';
import {State} from '../../../../app.state';

@Component({
  selector: 'app-dashboard-last-complaints-widget',
  templateUrl: './dashboard-last-complaints-widget.component.html',
  styleUrls: ['./dashboard-last-complaints-widget.component.css']
})
export class DashboardLastComplaintsWidgetComponent implements OnInit {

  complaints: Array<Complaint> = [];

  constructor(private service: ComplaintService, private store: Store<State>) { }

  ngOnInit() {

    this.service.getList({})
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
