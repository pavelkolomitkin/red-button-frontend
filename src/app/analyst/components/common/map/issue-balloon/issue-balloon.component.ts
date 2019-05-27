import {Component, Input, OnInit} from '@angular/core';
import {Issue} from '../../../../../core/data/model/issue.model';
import {ColorValueScaleService} from '../../../../services/color-value-scale.service';

@Component({
  selector: 'app-analyst-issue-balloon',
  templateUrl: './issue-balloon.component.html',
  styleUrls: ['./issue-balloon.component.css']
})
export class IssueBalloonComponent implements OnInit {

  @Input() issue: Issue;

  color: string;

  constructor(private colorService: ColorValueScaleService) {

  }

  ngOnInit() {

    this.color = this.colorService.getIssueColor(this.issue);
  }

}
