import {Component, Input, OnInit} from '@angular/core';
import {Issue} from '../../../../../core/data/model/issue.model';

@Component({
  selector: 'app-admin-issue-signature-list',
  templateUrl: './signature-list.component.html',
  styleUrls: ['./signature-list.component.css']
})
export class SignatureListComponent implements OnInit {

  @Input() issue: Issue;

  constructor() { }

  ngOnInit() {
  }

}
