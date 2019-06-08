import {Component, Input, OnInit} from '@angular/core';
import {Issue} from '../../../../core/data/model/issue.model';

@Component({
  selector: '[app-default-issue-mark]',
  templateUrl: './default-issue-mark.component.html',
  styleUrls: ['./default-issue-mark.component.css']
})
export class DefaultIssueMarkComponent implements OnInit {

  @Input() issue: Issue;

  @Input() color: string;

  constructor() { }

  ngOnInit() {
  }

}
