import { Component, OnInit } from '@angular/core';
import {IssueService} from '../../../services/issue.service';
import {Issue} from '../../../../core/data/model/issue.model';

@Component({
  selector: 'app-dashboard-last-issues-widget',
  templateUrl: './dashboard-last-issues-widget.component.html',
  styleUrls: ['./dashboard-last-issues-widget.component.css']
})
export class DashboardLastIssuesWidgetComponent implements OnInit {

  issues: Array<Issue> = [];

  constructor(private service: IssueService) { }

  ngOnInit() {

    this.service.getList({})
        .toPromise()
        .then(({ issues, total }) => {

          if(issues.length > 5)
          {
            issues.splice(5);
          }

          this.issues = issues;

        });

  }

}
