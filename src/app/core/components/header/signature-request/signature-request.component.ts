import {Component, Input, OnInit} from '@angular/core';
import {ComplaintConfirmation} from '../../../../client/data/model/complaint-confirmation.model';

@Component({
  selector: 'app-signature-request',
  templateUrl: './signature-request.component.html',
  styleUrls: ['./signature-request.component.css']
})
export class SignatureRequestComponent implements OnInit {

  @Input() confirmation: ComplaintConfirmation;

  constructor() { }

  ngOnInit() {
  }

}
