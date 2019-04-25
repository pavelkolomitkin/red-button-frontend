import {Directive, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {State} from '../../app.state';
import {isArray} from 'util';
import {GlobalBreadCrumbs, GlobalPageTitle} from '../../core/data/actions';

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

      this.store.dispatch(new GlobalPageTitle(''));
      this.store.dispatch(new GlobalBreadCrumbs([]));


      const { pageTitle, pageSubTitle, breadCrumbs } = data;

      if (!!pageTitle)
      {
        this.store.dispatch(new GlobalPageTitle(pageTitle, pageSubTitle));
      }

      if (isArray(breadCrumbs))
      {
        this.store.dispatch(new GlobalBreadCrumbs(breadCrumbs));
      }

    });
  }
}
