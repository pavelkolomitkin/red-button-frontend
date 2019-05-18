import {Component, Input, OnInit} from '@angular/core';
import {ComplaintConfirmation} from '../../../../../core/data/model/complaint-confirmation.model';

@Component({
  selector: 'app-issue-signature-item',
  templateUrl: './issue-signature-item.component.html',
  styleUrls: ['./issue-signature-item.component.css']
})
export class IssueSignatureItemComponent implements OnInit {

  @Input() confirmation: ComplaintConfirmation;

  constructor() { }

  ngOnInit() {
  }

}
