import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Region} from '../../../core/data/model/region.model';
import {Company} from '../../../core/data/model/company.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-company-search-form',
  templateUrl: './company-search-form.component.html',
  styleUrls: ['./company-search-form.component.css']
})
export class CompanySearchFormComponent implements OnInit {

  @Output('onCompanySelect') companySelectEvent: EventEmitter<Company> = new EventEmitter();

  @Input() region: Region;

  constructor() { }

  ngOnInit() {
  }

  onSubmitHandler(form: NgForm)
  {

  }

  onItemSelectHandler(company: Company)
  {

    this.companySelectEvent.emit(company);
  }

}
