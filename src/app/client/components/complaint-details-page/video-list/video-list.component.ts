import {Component, Input, OnInit} from '@angular/core';
import {Video} from '../../../data/model/video.model';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {

  @Input() list: Array<Video> = [];

  constructor() { }

  ngOnInit() {
  }

}
