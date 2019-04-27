import {AfterContentChecked, AfterContentInit, AfterViewInit, Component} from '@angular/core';
import {State} from './app.state';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import User from './core/data/model/user.model';
import {ActivatedRoute, Router} from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentChecked, AfterContentInit, AfterViewInit{

  user: User = null;

  constructor(private store: Store<State>) {
    this.store.pipe(select(store => store.security.authorizedUser)).subscribe((user: User) => {
      this.user = user;
    });
  }

  ngAfterViewInit(): void {
    //console.log('App -> ngAfterViewInit...');
  }
  ngAfterContentInit(): void {
    //console.log('App -> ngAfterContentInit...');
  }

  ngAfterContentChecked(): void {

    // TODO move it out
    //console.log('Fix layout...');
    $('body').layout('fix');
  }
}
