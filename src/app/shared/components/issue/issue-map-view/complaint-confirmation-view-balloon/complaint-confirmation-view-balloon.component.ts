import {Component, Input, OnInit} from '@angular/core';
import {ComplaintConfirmation} from '../../../../../core/data/model/complaint-confirmation.model';

@Component({
  selector: 'app-complaint-confirmation-view-balloon',
  templateUrl: './complaint-confirmation-view-balloon.component.html',
  styleUrls: ['./complaint-confirmation-view-balloon.component.css']
})
export class ComplaintConfirmationViewBalloonComponent implements OnInit {

  @Input() confirmation: ComplaintConfirmation;

  constructor() { }

  ngOnInit() {
  }

}
