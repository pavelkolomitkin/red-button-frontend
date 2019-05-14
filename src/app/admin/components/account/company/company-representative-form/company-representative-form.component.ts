import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CompanyRepresentativeUser} from '../../../../../core/data/model/company-representative-user.model';
import {Region} from '../../../../../core/data/model/region.model';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../../app.state';
import {Company} from '../../../../../core/data/model/company.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-company-representative-form',
  templateUrl: './company-representative-form.component.html',
  styleUrls: ['./company-representative-form.component.css']
})
export class CompanyRepresentativeFormComponent implements OnInit {

  @Output('onSubmit') submitEvent: EventEmitter<{
    account: CompanyRepresentativeUser,
    password: string,
    passwordRepeat: string
  }> = new EventEmitter<{
      account: CompanyRepresentativeUser,
      password: string,
      passwordRepeat: string
    }>();

  @Input() account: CompanyRepresentativeUser;

  @Input() errors = {};

  regions: Observable<Array<Region>>;

  selectedRegion: Region;

  constructor(private store: Store<State>) { }

  ngOnInit() {

    this.regions = this.store.pipe(select(state => state.region.list));
  }

  onRegionSelectHandler(region: Region)
  {

  }

  compareEntity(a: any, b: any)
  {
    if (!a || !b)
    {
      return false;
    }

    return a.id === b.id;
  }

  onCompanySelectHandler(company: Company)
  {
    this.account.company = company;
  }

  onSubmitHandler(form: NgForm)
  {
    const { password, passwordRepeat } = form.value;

    this.submitEvent.emit({
      account: this.account,
      password: password,
      passwordRepeat: passwordRepeat
    });
  }

}
