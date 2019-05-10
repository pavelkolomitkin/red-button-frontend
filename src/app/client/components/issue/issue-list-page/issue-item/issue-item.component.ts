import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Issue} from '../../../../../core/data/model/issue.model';

@Component({
  selector: 'app-issue-item',
  templateUrl: './issue-item.component.html',
  styleUrls: ['./issue-item.component.css']
})
export class IssueItemComponent implements OnInit {

  @Output('onDelete') deleteEvent: EventEmitter<Issue> = new EventEmitter();

  @Input() issue: Issue;

  constructor()
  {

  }

  ngOnInit() {
  }

  onDeleteClickHandler($event)
  {
    this.deleteEvent.emit(this.issue);
  }

}
