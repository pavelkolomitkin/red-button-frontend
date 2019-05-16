import {Component, Input, OnInit} from '@angular/core';
import {Issue} from '../../../../../core/data/model/issue.model';

@Component({
  selector: 'app-issue-view-balloon',
  templateUrl: './issue-view-balloon.component.html',
  styleUrls: ['./issue-view-balloon.component.css']
})
export class IssueViewBalloonComponent implements OnInit {

  @Input() issue: Issue;

  constructor() { }

  ngOnInit() {
  }

}
