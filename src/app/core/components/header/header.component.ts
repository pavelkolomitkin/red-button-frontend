import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {Observable} from 'rxjs';
import User from '../../data/model/user.model';
import {UserLogout} from '../../../security/data/actions';
import {filter} from 'rxjs/operators';
import {ProfileCommonInfo} from '../../../client/data/model/profile-common-info.model';
import { ProfileCommonInfo as CompanyCommonInfo } from '../../../company/data/model/profile-common-info.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: Observable<User>;

  clientCommonInfo: Observable<ProfileCommonInfo>;
  companyCommonInfo: Observable<CompanyCommonInfo>;

  constructor(private store:Store<State>) {
    this.user = this.store.pipe(select(state => state.security.authorizedUser));

    this.clientCommonInfo = this.store.pipe(
        select(state => state.clientProfile),
        filter(result => !!result),
        select(result => result.commonInfo)
    );

    this.companyCommonInfo = this.store.pipe(
        select(state => state.companyProfile),
        filter(result => !!result),
        select(result => result.commonInfo)
    );
  }

  ngOnInit() {
  }

  onLogoutClickHandler()
  {
    this.store.dispatch(new UserLogout());
  }

}
