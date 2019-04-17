import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {Observable} from 'rxjs';
import User from '../../data/model/user.model';
import {UserLogout} from '../../../security/data/actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: Observable<User>;

  constructor(private store:Store<State>) {
    this.user = this.store.pipe(select(state => state.security.authorizedUser));
  }

  ngOnInit() {
  }

  onLogoutClickHandler()
  {
    this.store.dispatch(new UserLogout());
  }

}
