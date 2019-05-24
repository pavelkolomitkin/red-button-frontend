import {Component, Input, OnInit} from '@angular/core';
import {Region} from '../../../../../../core/data/model/region.model';
import { REGIONS } from '../../../../../../core/data/map-vector-paths';

@Component({
  selector: '[app-analyst-vector-region-item]',
  templateUrl: './vector-region-item.component.html',
  styleUrls: ['./vector-region-item.component.css']
})
export class VectorRegionItemComponent implements OnInit {

  @Input() region: Region;

  @Input() title: string;

  graphicItems: Array<any> = [];

  constructor() { }

  ngOnInit() {

    this.graphicItems = REGIONS[this.region.code];

  }

}
