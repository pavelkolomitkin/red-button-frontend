import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Complaint} from '../../data/model/complaint.model';
import {Observable} from 'rxjs';
import {ServiceType} from '../../../core/data/model/service-type.model';
import {select, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {ServiceTypeListLoadStart} from '../../../core/data/service-type.actions';

@Component({
  selector: 'app-complaint-form',
  templateUrl: './complaint-form.component.html',
  styleUrls: ['./complaint-form.component.css']
})
export class ComplaintFormComponent implements OnInit {

  @Input() complaint: Complaint;

  @Input() errors;

  @Output('onSubmit') submitForm: EventEmitter<Complaint> = new EventEmitter();

  @ViewChild('form') form: NgForm;

  serviceTypes: Observable<Array<ServiceType>>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.serviceTypes = this.store.pipe(select(state => state.serviceType.list));

    this.store.dispatch(new ServiceTypeListLoadStart());
  }

  compareServiceTypes(a: ServiceType, b: ServiceType)
  {
    if (!a || !b)
    {
      return false;
    }

    return a.id === b.id;
  }


  onSubmitHandler(form: NgForm)
  {
    this.submitForm.emit(this.complaint);
  }

  onAddressSelectHandler({ region, address, location })
  {
    this.complaint.region = region;
    this.complaint.address = address;
    this.complaint.location = location;
  }

  isValid(): boolean
  {
    return this.form.valid && !!this.complaint.region;
  }
}
