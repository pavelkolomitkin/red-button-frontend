import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Issue} from '../../../data/model/issue.model';
import {ServiceType} from '../../../../core/data/model/service-type.model';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {ServiceTypeListLoadStart} from '../../../../core/data/service-type.actions';

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.css']
})
export class IssueFormComponent implements OnInit {

  @Output('onSubmit') submitEvent: EventEmitter<Issue> = new EventEmitter();

  @Input() issue: Issue;

  @Input() errors;

  serviceTypes: Observable<Array<ServiceType>>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.serviceTypes = this.store.pipe(select(state => state.serviceType.list));

    this.store.dispatch(new ServiceTypeListLoadStart());
  }

  onSubmitHandler(event)
  {
    this.submitEvent.emit(this.issue);
  }

  onAddressUpdateHandler(event)
  {

  }

  compareServiceTypes(a: ServiceType, b: ServiceType)
  {
    if (!a || !b)
    {
      return false;
    }

    return a.id === b.id;
  }
}
