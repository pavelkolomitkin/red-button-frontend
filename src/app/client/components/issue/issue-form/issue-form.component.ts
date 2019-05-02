import {Component, Input, OnInit} from '@angular/core';
import {Issue} from '../../../data/model/issue.model';

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.css']
})
export class IssueFormComponent implements OnInit {

  @Input() issue: Issue;

  @Input() errors = {};

  constructor() { }

  ngOnInit() {
  }

  onSubmitHandler(event)
  {

  }
}
