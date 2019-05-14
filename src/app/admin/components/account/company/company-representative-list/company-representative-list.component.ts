import { Component, OnInit } from '@angular/core';
import {CommonListPageComponent} from '../../common-list-page/common-list-page.component';

@Component({
  selector: 'app-company-representative-list',
  templateUrl: './company-representative-list.component.html',
  styleUrls: ['./company-representative-list.component.css']
})
export class CompanyRepresentativeListComponent extends CommonListPageComponent implements OnInit {

  getSearchParams()
  {
    this.searchParams['type'] = 'company';

    return this.searchParams;
  }
}
