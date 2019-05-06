import {Component, Input, OnInit} from '@angular/core';
import {PictureInterface} from '../../../../../shared/data/model/picture-interface.model';

@Component({
  selector: 'app-picture-item',
  templateUrl: './picture-item.component.html',
  styleUrls: ['./picture-item.component.css']
})
export class PictureItemComponent implements OnInit {

  @Input() picture: PictureInterface;

  @Input() size: string;

  constructor() { }

  ngOnInit() {
  }

}
