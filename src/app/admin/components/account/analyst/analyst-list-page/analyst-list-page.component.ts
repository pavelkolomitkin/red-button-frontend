import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../../app.state';
import {Observable} from 'rxjs';
import User from '../../../../../core/data/model/user.model';
import {AccountGetListReset} from '../../../../data/account.actions';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonListPageComponent} from '../../common-list-page/common-list-page.component';

@Component({
  selector: 'app-analyst-list-page',
  templateUrl: './analyst-list-page.component.html',
  styleUrls: ['./analyst-list-page.component.css']
})
export class AnalystListPageComponent extends CommonListPageComponent implements OnInit {


  getSearchParams()
  {
    this.searchParams['type'] = 'analyst';

    return this.searchParams;
  }

}
