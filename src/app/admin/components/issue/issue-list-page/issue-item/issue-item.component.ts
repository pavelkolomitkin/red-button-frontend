import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Issue} from '../../../../../core/data/model/issue.model';
import {Store} from '@ngrx/store';
import {State} from '../../../../../app.state';
import {ComplaintConfirmationStatus} from '../../../../../core/data/model/complaint-confirmation-status.model';

@Component({
  selector: '[app-admin-issue-list-item]',
  templateUrl: './issue-item.component.html',
  styleUrls: ['./issue-item.component.css']
})
export class IssueItemComponent implements OnInit {

  @Output('onDelete') deleteEvent: EventEmitter<Issue> = new EventEmitter();

  @Input() issue: Issue;

  constructor(private store: Store<State>) { }

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

  onDeleteClickHandler(event)
  {
    console.log('Delete click...');
  }
}
