import {Component, Input, OnInit} from '@angular/core';
import {PictureInterface} from '../../data/model/picture-interface.model';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  @Input() pictures: Array<PictureInterface> = [];

  constructor() { }

  ngOnInit() {
  }

}
