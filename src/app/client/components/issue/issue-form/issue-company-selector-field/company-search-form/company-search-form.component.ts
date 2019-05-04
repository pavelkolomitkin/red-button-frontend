import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Region} from '../../../../../../core/data/model/region.model';
import {Company} from '../../../../../../core/data/model/company.model';
import {NgForm} from '@angular/forms';
import {CompanyService} from '../../../../../../core/services/company.service';
import {Observable, of} from 'rxjs';
import {debounceTime, map, mergeMap} from 'rxjs/operators';
import {NgbTypeaheadSelectItemEvent} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-company-search-form',
  templateUrl: './company-search-form.component.html',
  styleUrls: ['./company-search-form.component.css']
})
export class CompanySearchFormComponent implements OnInit {

  @Output('onCompanySelect') companySelectEvent: EventEmitter<Company> = new EventEmitter();

  @Input() region: Region;

  public model: any;

  @ViewChild('inputElement') inputElement: ElementRef;

  constructor(private service: CompanyService) { }

  ngOnInit() {
  }

  onSubmitHandler(form: NgForm)
  {

  }


  search = (text$: Observable<string>) => {

    return text$.pipe(
        debounceTime(200),
        mergeMap((term) => {
          if (term.trim() === '')
          {
            return of([]);
          }

          return this.service.search({
            regionId: this.region.id,
            name: term
          }).pipe(
              map(({companies, total}) => {
                return companies
              })
          );
        })
    );
  };

  onItemSelectHandler(event: NgbTypeaheadSelectItemEvent)
  {
    // console.log('Company is selected -->');
    // console.log(event.item);

    this.companySelectEvent.emit(event.item);
  }

  onEnterHandler(event)
  {
    // this.addTag(event.target.value);
    //
    // event.target.value = '';
  }


  formatter = (x: {title: string}) =>
  {
    return x.title;
  }

}
