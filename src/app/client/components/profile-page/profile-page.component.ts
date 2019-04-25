import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {GlobalPageTitle} from '../../../core/data/actions';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  constructor(private store: Store<State>) {
  }

  ngOnInit() {
    this.store.dispatch(new GlobalPageTitle('Profile Page', 'hello'));
  }

}
