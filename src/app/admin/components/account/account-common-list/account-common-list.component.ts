import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import User from '../../../../core/data/model/user.model';

@Component({
  selector: 'app-admin-account-common-list',
  templateUrl: './account-common-list.component.html',
  styleUrls: ['./account-common-list.component.css']
})
export class AccountCommonListComponent implements OnInit {

  static ACCOUNT_CLIENT_TYPE = 'client';
  static ACCOUNT_COMPANY_TYPE = 'company-representative';
  static ACCOUNT_ANALYST_TYPE = 'analyst';


  @Input() list: Array<User> = [];
  @Input() accountType: string = AccountCommonListComponent.ACCOUNT_CLIENT_TYPE;

  constructor() { }

  ngOnInit() {
  }


}
