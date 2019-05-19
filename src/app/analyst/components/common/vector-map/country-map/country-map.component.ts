import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../../app.state';
import {Observable} from 'rxjs';
import {FederalDistrict} from '../../../../../core/data/model/federal-district.model';

@Component({
  selector: 'app-analyst-country-map',
  templateUrl: './country-map.component.html',
  styleUrls: ['./country-map.component.css']
})
export class CountryMapComponent implements OnInit {

  federalDistricts: Observable<Array<FederalDistrict>>;

  constructor(private store: Store<State>) { }

  ngOnInit() {

    this.federalDistricts = this.store.pipe(select(state => state.federalDistrict.list));

  }

}
