import {Directive, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {State} from '../../app.state';
import {isArray} from 'util';
import {GlobalBreadCrumbs, GlobalPageTitle} from '../data/actions';

@Directive({
  selector: '[appPageHeader]'
})
export class PageHeaderDirective implements OnInit{

  constructor(
      private store:Store<State>,
      private route: ActivatedRoute
  ) {

  }


  ngOnInit(): void {

    this.route.data.subscribe((data) => {

      const { pageTitle, pageSubTitle, breadCrumbs } = data;

      if (!!pageTitle)
      {
        this.store.dispatch(new GlobalPageTitle(pageTitle, pageSubTitle));
      }
      else
      {
        this.store.dispatch(new GlobalPageTitle(''));
      }

      if (isArray(breadCrumbs))
      {
        this.store.dispatch(new GlobalBreadCrumbs(breadCrumbs));
      }
      else
      {
        this.store.dispatch(new GlobalBreadCrumbs([]));
      }

    });
  }
}
