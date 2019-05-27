import {Component, Input, OnInit} from '@angular/core';
import {Issue} from '../../../../core/data/model/issue.model';

@Component({
  selector: 'app-analyst-issue-item',
  templateUrl: './issue-item.component.html',
  styleUrls: ['./issue-item.component.css']
})
export class IssueItemComponent implements OnInit {

  @Input() issue: Issue;

  constructor() { }

  ngOnInit() {
  }

}
