import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Issue} from '../../../../core/data/model/issue.model';
import {ComplaintConfirmationStatus} from '../../../../core/data/model/complaint-confirmation-status.model';

@Component({
  selector: 'app-issue-signature-progress',
  templateUrl: './issue-signature-progress.component.html',
  styleUrls: ['./issue-signature-progress.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IssueSignatureProgressComponent implements OnInit {

  @Input() issue: Issue;

  @Input() noneMessage = null;

  constructor() { }

  ngOnInit() {
  }
}
