import {Component, Input, OnInit} from '@angular/core';
import {ComplaintTag} from '../../data/model/complaint-tag.model';

@Component({
  selector: 'app-common-tag-item',
  templateUrl: './common-tag-item.component.html',
  styleUrls: ['./common-tag-item.component.css']
})
export class CommonTagItemComponent implements OnInit {

  @Input() tag: ComplaintTag;

  constructor() { }

  ngOnInit() {
  }

}
