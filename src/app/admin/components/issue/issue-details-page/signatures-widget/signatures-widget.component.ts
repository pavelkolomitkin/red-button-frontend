import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Issue} from '../../../../../core/data/model/issue.model';

@Component({
  selector: 'app-admin-issue-signatures-widget',
  templateUrl: './signatures-widget.component.html',
  styleUrls: ['./signatures-widget.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignaturesWidgetComponent implements OnInit {

  @Input() issue: Issue;


  constructor() { }

  ngOnInit() {
  }
}
