import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {OSMSearchResult} from '../../../../core/data/model/osm-search-result.model';
import {NgForm} from '@angular/forms';
import {OSMSearchService} from '../../../../core/services/OSMSearchService';

@Component({
  selector: 'app-search-address-form',
  templateUrl: './search-address-form.component.html',
  styleUrls: ['./search-address-form.component.css']
})
export class SearchAddressFormComponent implements OnInit {

  @Output('onSearch') searchEvent: EventEmitter<Array<OSMSearchResult>> = new EventEmitter();

  isSearching: boolean = false;
  isSearchingError: boolean = false;

  searchString: string = '';

  constructor(private service: OSMSearchService) { }

  ngOnInit() {
  }

  onSubmitHandler(form: NgForm)
  {
    if (!form.valid || this.isSearching)
    {
      return;
    }

    this.isSearching = true;
    this.isSearchingError = false;

    this.service.findByStringAddress(this.searchString)
        .toPromise()
        .then((items: Array<OSMSearchResult>) => {

          this.isSearching = false;
          this.isSearchingError = items.length === 0;

          this.searchEvent.emit(items);

        })
        .catch(() => {
          this.isSearching = false;
          this.isSearchingError = true;

        });

  }

}
