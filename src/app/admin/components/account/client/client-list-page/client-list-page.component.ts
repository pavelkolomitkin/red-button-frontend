import { Component, OnInit } from '@angular/core';
import {CommonListPageComponent} from '../../common-list-page/common-list-page.component';

@Component({
  selector: 'app-client-list-page',
  templateUrl: './client-list-page.component.html',
  styleUrls: ['./client-list-page.component.css']
})
export class ClientListPageComponent extends CommonListPageComponent implements OnInit {

  getSearchParams()
  {
    this.searchParams['type'] = 'client';

    return this.searchParams;
  }

}
