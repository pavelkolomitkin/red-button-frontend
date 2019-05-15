import {Component, Input, OnInit} from '@angular/core';
import {Issue} from '../../../../../core/data/model/issue.model';

@Component({
  selector: 'app-admin-issue-like-widget',
  templateUrl: './like-widget.component.html',
  styleUrls: ['./like-widget.component.css']
})
export class LikeWidgetComponent implements OnInit {

  @Input() issue: Issue;

  constructor() { }

  ngOnInit() {
  }

}
