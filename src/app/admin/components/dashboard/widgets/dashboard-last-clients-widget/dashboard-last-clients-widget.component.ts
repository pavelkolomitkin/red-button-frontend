import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../../../services/account.service';
import {DashboardCommonWidgetComponent} from '../dashboard-common-widget/dashboard-common-widget.component';
import User from '../../../../../core/data/model/user.model';

@Component({
  selector: 'app-dashboard-last-clients-widget',
  templateUrl: './dashboard-last-clients-widget.component.html',
  styleUrls: ['./dashboard-last-clients-widget.component.css']
})
export class DashboardLastClientsWidgetComponent extends DashboardCommonWidgetComponent {

  accounts: Array<User> = [];

  constructor(private service: AccountService) {
    super();
  }

  updateData(): Promise<any> {
    return this.service.getList({type: 'client'})
        .toPromise()
        .then(({ accounts }) => {

          if (accounts.length > 10)
          {
            accounts.splice(10);
          }

          this.accounts = accounts;
        });
  }

}
