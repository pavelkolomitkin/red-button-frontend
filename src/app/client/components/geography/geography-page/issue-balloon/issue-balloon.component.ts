import {Component, Input, OnInit} from '@angular/core';
import {Issue} from '../../../../../core/data/model/issue.model';

@Component({
  selector: 'app-client-issue-balloon',
  templateUrl: './issue-balloon.component.html',
  styleUrls: ['./issue-balloon.component.css']
})
export class IssueBalloonComponent implements OnInit {

  @Input() issue: Issue;

  constructor() { }

  ngOnInit() {
  }

}
