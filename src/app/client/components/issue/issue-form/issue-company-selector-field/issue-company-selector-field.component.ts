import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {Issue} from '../../../../../core/data/model/issue.model';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Company} from '../../../../../core/data/model/company.model';

@Component({
  selector: 'app-issue-company-selector-field',
  templateUrl: './issue-company-selector-field.component.html',
  styleUrls: ['./issue-company-selector-field.component.css']
})
export class IssueCompanySelectorFieldComponent implements OnInit {

  @Output('onSelect') selectEvent: EventEmitter<Company> = new EventEmitter<Company>();

  _issue: Issue;

  @Input()
  set issue(value: Issue)
  {
    this._issue = value;
  }

  @ViewChild('searchCompanyModal') searchCompanyWindowTemplate: TemplateRef<any>;
  searchCompanyWindow: NgbModalRef = null;

  constructor(private modal: NgbModal) { }

  ngOnInit() {
  }

  onChooseButtonClickHandler(event)
  {
    this.searchCompanyWindow = this.modal.open(this.searchCompanyWindowTemplate, {centered: true});
    this.searchCompanyWindow.result
        .then((result) => {
          this.searchCompanyWindow = null;
        }, () => {
          this.searchCompanyWindow = null;
        });
  }

  onCompanySelectHandler(company: Company)
  {
    this.selectEvent.emit(company);
    this.searchCompanyWindow.close();
  }

}
