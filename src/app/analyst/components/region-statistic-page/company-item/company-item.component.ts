import {Component, Input, OnInit} from '@angular/core';
import {Company} from '../../../../core/data/model/company.model';

@Component({
  selector: 'app-analyst-company-item',
  templateUrl: './company-item.component.html',
  styleUrls: ['./company-item.component.css']
})
export class CompanyItemComponent implements OnInit {

  @Input() company: Company;
  @Input() issueNumber: number;
  @Input() year: number;

  constructor() { }

  ngOnInit() {
  }

}
