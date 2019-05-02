import {Component, Input, OnInit} from '@angular/core';
import {Video} from '../../../data/model/video.model';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.css']
})
export class VideoItemComponent implements OnInit {

  @Input() video: Video;

  /**
   * using values: 'extra-small', 'small', 'medium'
   */
  @Input() size: string = 'small';

  constructor() { }

  ngOnInit() {
  }

}
