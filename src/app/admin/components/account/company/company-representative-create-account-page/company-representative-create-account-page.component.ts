import { Component, OnInit } from '@angular/core';
import {CompanyRepresentativeUser} from '../../../../../core/data/model/company-representative-user.model';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../../app.state';

@Component({
  selector: 'app-company-representative-create-account-page',
  templateUrl: './company-representative-create-account-page.component.html',
  styleUrls: ['./company-representative-create-account-page.component.css']
})
export class CompanyRepresentativeCreateAccountPageComponent implements OnInit {

  account: CompanyRepresentativeUser = new CompanyRepresentativeUser();

  errors: Observable<Object>;

  constructor(private store: Store<State>) { }

  ngOnInit() {

    this.errors = this.store.pipe(select(state => state.adminAccount.createErrors));



  }

}
