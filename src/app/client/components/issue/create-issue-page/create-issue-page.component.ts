import { Component, OnInit } from '@angular/core';
import {Issue} from '../../../data/model/issue.model';

@Component({
  selector: 'app-create-issue-page',
  templateUrl: './create-issue-page.component.html',
  styleUrls: ['./create-issue-page.component.css']
})
export class CreateIssuePageComponent implements OnInit {

  issue: Issue = new Issue();

  constructor() { }

  ngOnInit() {

  }

}
