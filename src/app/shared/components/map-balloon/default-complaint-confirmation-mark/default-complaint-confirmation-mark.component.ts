import {Component, Input, OnInit} from '@angular/core';
import {ComplaintConfirmation} from '../../../../core/data/model/complaint-confirmation.model';

@Component({
  selector: '[app-default-complaint-confirmation-mark]',
  templateUrl: './default-complaint-confirmation-mark.component.html',
  styleUrls: ['./default-complaint-confirmation-mark.component.css']
})
export class DefaultComplaintConfirmationMarkComponent implements OnInit {

  @Input() confirmation: ComplaintConfirmation;

  constructor() { }

  ngOnInit() {
  }

}
