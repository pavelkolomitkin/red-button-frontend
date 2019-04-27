import {Component, Input, OnInit} from '@angular/core';
import {ComplaintPicture} from '../../../data/model/complaint-picture.model';

@Component({
  selector: 'app-complaint-picture-item',
  templateUrl: './complaint-picture-item.component.html',
  styleUrls: ['./complaint-picture-item.component.css']
})
export class ComplaintPictureItemComponent implements OnInit {

  @Input() picture: ComplaintPicture;

  @Input() size: string;

  constructor() { }

  ngOnInit() {
  }

}
