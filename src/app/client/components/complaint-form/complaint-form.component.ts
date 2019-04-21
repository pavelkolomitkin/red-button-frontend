import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Complaint} from '../../data/model/complaint.model';

@Component({
  selector: 'app-complaint-form',
  templateUrl: './complaint-form.component.html',
  styleUrls: ['./complaint-form.component.css']
})
export class ComplaintFormComponent implements OnInit {

  @Input() complaint: Complaint;

  @Input() errors;

  constructor() { }

  ngOnInit() {
  }


  onSubmitHandler(form: NgForm)
  {

  }

  onAddressSelectHandler({ region, address, location })
  {
    this.complaint.region = region;
    this.complaint.address = address;
    this.complaint.location = location;
  }
}
