import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {Observable} from 'rxjs';
import User from '../../../core/data/model/user.model';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  user: Observable<User>;

  constructor(private store: Store<State>)
  {
    this.user = this.store.pipe(select(state => state.security.authorizedUser));
  }

  ngOnInit()
  {

  }

}
