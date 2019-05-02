import {Component, Input, OnInit} from '@angular/core';
import {Issue} from '../../../../data/model/issue.model';

@Component({
  selector: 'app-issue-company-selector-field',
  templateUrl: './issue-company-selector-field.component.html',
  styleUrls: ['./issue-company-selector-field.component.css']
})
export class IssueCompanySelectorFieldComponent implements OnInit {

  @Input() issue: Issue;

  constructor() { }

  ngOnInit() {
  }

}
