import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Observable, of} from 'rxjs';
import {debounceTime, map, mergeMap} from 'rxjs/operators';
import {NgbTypeaheadSelectItemEvent} from '@ng-bootstrap/ng-bootstrap';
import {Region} from '../../../../core/data/model/region.model';
import {Company} from '../../../../core/data/model/company.model';
import {CompanyService} from '../../../../core/services/company.service';

@Component({
  selector: 'app-company-search-field',
  templateUrl: './company-search-field.component.html',
  styleUrls: ['./company-search-field.component.css']
})
export class CompanySearchFieldComponent implements OnInit {

  @Output('onSelect') selectEvent: EventEmitter<Company> = new EventEmitter();

  @Input() region: Region;

  public model: any;

  @ViewChild('inputElement') inputElement: ElementRef;

  constructor(private service: CompanyService) { }

  ngOnInit() {
  }

  search = (text$: Observable<string>) => {

    return text$.pipe(
        debounceTime(200),
        mergeMap((term) => {
          if (term.trim() === '')
          {
            return of([]);
          }

          const params: any = {
            name: term
          };
          if (!!this.region)
          {
            params.regionId = this.region.id;
          }

          return this.service.search(params).pipe(
              map(({companies, total}) => {
                return companies
              })
          );
        })
    );
  };

  onItemSelectHandler(event: NgbTypeaheadSelectItemEvent)
  {

    this.selectEvent.emit(event.item);
  }

  onEnterHandler(event)
  {

  }


  formatter = (x: {title: string}) =>
  {
    return x.title;
  }

}
