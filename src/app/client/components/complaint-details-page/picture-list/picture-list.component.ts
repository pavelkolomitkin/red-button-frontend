import {Component, Input, OnInit} from '@angular/core';
import {ComplaintPicture} from '../../../data/model/complaint-picture.model';

@Component({
  selector: 'app-picture-list',
  templateUrl: './picture-list.component.html',
  styleUrls: ['./picture-list.component.css']
})
export class PictureListComponent implements OnInit {

  @Input() list: Array<ComplaintPicture> = [];

  isLightBoxVisible: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onPictureClickHandler(event)
  {
    this.isLightBoxVisible = true;
  }

}
