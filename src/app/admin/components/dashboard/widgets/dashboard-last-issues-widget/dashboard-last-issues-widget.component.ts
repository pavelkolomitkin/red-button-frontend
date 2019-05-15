import { Component, OnInit } from '@angular/core';
import {IssueService} from '../../../../services/issue.service';
import {Issue} from '../../../../../core/data/model/issue.model';
import {DashboardCommonWidgetComponent} from '../dashboard-common-widget/dashboard-common-widget.component';

@Component({
  selector: 'app-dashboard-last-issues-widget',
  templateUrl: './dashboard-last-issues-widget.component.html',
  styleUrls: ['./dashboard-last-issues-widget.component.css']
})
export class DashboardLastIssuesWidgetComponent extends DashboardCommonWidgetComponent {

  issues: Array<Issue> = [];

  constructor(private service: IssueService) {
      super();
  }


    updateData(): Promise<any> {

        return this.service.getList({})
            .toPromise()
            .then(({ issues, total }) => {

                if(issues.length > 6)
                {
                    issues.splice(6);
                }

                this.issues = issues;

            });
    }

}
