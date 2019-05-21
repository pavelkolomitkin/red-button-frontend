import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {Observable} from 'rxjs';
import User from '../../data/model/user.model';
import {ProfileCommonInfo} from '../../../client/data/model/profile-common-info.model';
import {ProfileCommonInfo as AdminCommonInfo} from '../../../admin/data/model/profile-common-info.model';
import { ProfileCommonInfo as CompanyCommonInfo } from '../../../company/data/model/profile-common-info.model';
import {filter} from 'rxjs/operators';
import {FederalDistrict} from '../../data/model/federal-district.model';

declare var $: any;

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit, AfterViewInit {

  user: Observable<User>;
  @ViewChild('treeMenu') menuContainer: ElementRef;


  clientCommonInfo: Observable<ProfileCommonInfo>;
  adminCommonInfo: Observable<AdminCommonInfo>;
  companyCommonInfo: Observable<CompanyCommonInfo>;

  federalDistricts: Observable<Array<FederalDistrict>>;
  currentDate: Date = new Date();

  constructor(private store:Store<State>)
  {
    this.user = this.store.pipe(select(state => state.security.authorizedUser));


    this.clientCommonInfo = this.store.pipe(
        select(state => state.clientProfile),
        filter(result => !!result),
        select(result => result.commonInfo)
    );

    this.adminCommonInfo = this.store.pipe(
        select(state => state.adminProfile),
        filter(result => !!result),
        select(result => result.commonInfo)
    );

    this.companyCommonInfo = this.store.pipe(
        select(state => state.companyProfile),
        filter(result => !!result),
        select(result => result.commonInfo)
    );

    this.federalDistricts = this.store.pipe(
        select(state => state.federalDistrict.list)
    );

  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {

    $(this.menuContainer.nativeElement).tree();
  }

}
