import {Component, Input, OnInit} from '@angular/core';
import {Issue} from '../../../core/data/model/issue.model';
import {ComplaintConfirmationStatus} from '../../../core/data/model/complaint-confirmation-status.model';

@Component({
  selector: 'app-issue-signature-progress',
  templateUrl: './issue-signature-progress.component.html',
  styleUrls: ['./issue-signature-progress.component.css']
})
export class IssueSignatureProgressComponent implements OnInit {

  @Input() issue: Issue;

  constructor() { }

  ngOnInit() {
  }

  approvedSignatureNumber()
  {
    let result = 0;

    this.issue.complaintConfirmations.forEach((item) => {

      if (item.status.code === ComplaintConfirmationStatus.STATUS_CONFIRMED)
      {
        result++;
      }

    });

    return result;
  }
}
