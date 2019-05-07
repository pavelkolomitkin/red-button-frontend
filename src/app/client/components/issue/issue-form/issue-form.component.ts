import {Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {Issue} from '../../../../core/data/model/issue.model';
import {ServiceType} from '../../../../core/data/model/service-type.model';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {ServiceTypeListLoadStart} from '../../../../core/data/service-type.actions';
import {NgForm} from '@angular/forms';
import {GlobalConfirmLeavePageInit, GlobalConfirmLeavePageReset} from '../../../../core/data/actions';
import {Company} from '../../../../core/data/model/company.model';

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.css']
})
export class IssueFormComponent implements OnInit {

  @Output('onSubmit') submitEvent: EventEmitter<Issue> = new EventEmitter();

  @Input() issue: Issue;

  @Input() errors;

  @ViewChild('form') form: NgForm;

  serviceTypes: Observable<Array<ServiceType>>;

  constructor(private store: Store<State>) { }

  ngOnInit() {

    this.store.dispatch(new GlobalConfirmLeavePageReset());

    this.serviceTypes = this.store.pipe(select(state => state.serviceType.list));

    this.store.dispatch(new ServiceTypeListLoadStart());
  }

  onSubmitHandler(event)
  {
    this.store.dispatch(new GlobalConfirmLeavePageReset());
    this.submitEvent.emit(this.issue);
  }

  compareServiceTypes(a: ServiceType, b: ServiceType)
  {
    if (!a || !b)
    {
      return false;
    }

    return a.id === b.id;
  }

  onCompanySelectHandler(company: Company)
  {
    this.issue.company = company;
  }

  onFormFieldChangeHandler(event)
  {
    this.store.dispatch(new GlobalConfirmLeavePageInit());
  }
}
