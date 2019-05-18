import {Component, Input, OnInit} from '@angular/core';
import {ComplaintConfirmation} from '../../../../../core/data/model/complaint-confirmation.model';

@Component({
  selector: 'app-admin-issue-signature-item',
  templateUrl: './signature-item.component.html',
  styleUrls: ['./signature-item.component.css']
})
export class SignatureItemComponent implements OnInit {

  @Input() confirmation: ComplaintConfirmation;

  constructor() { }

  ngOnInit() {
  }

}
