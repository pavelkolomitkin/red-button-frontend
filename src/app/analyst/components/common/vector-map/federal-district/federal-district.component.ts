import {Component, Input, OnInit} from '@angular/core';
import {FederalDistrict} from '../../../../../core/data/model/federal-district.model';
import { FEDERAL_DISTRICTS } from '../../../../../core/data/map-vector-paths';

@Component({
  selector: '[app-analyst-federal-district]',
  templateUrl: './federal-district.component.html',
  styleUrls: ['./federal-district.component.css']
})
export class FederalDistrictComponent implements OnInit {

  @Input() data: FederalDistrict;

  graphicData: Array<any>;

  constructor() {

  }

  ngOnInit() {

    this.graphicData = FEDERAL_DISTRICTS[this.data.code];

  }

}
