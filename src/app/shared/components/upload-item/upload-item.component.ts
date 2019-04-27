import {Component, Input, OnInit} from '@angular/core';
import {UploadItem} from '../../data/model/upload-item.model';

@Component({
  selector: 'app-upload-item',
  templateUrl: './upload-item.component.html',
  styleUrls: ['./upload-item.component.css']
})
export class UploadItemComponent implements OnInit {

  @Input() uploadItem: UploadItem<any>;

  constructor() { }

  ngOnInit() {
  }

}
