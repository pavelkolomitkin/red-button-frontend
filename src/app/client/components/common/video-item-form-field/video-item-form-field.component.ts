import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Video} from '../../../../core/data/model/video.model';

@Component({
  selector: 'app-video-item-form-field',
  templateUrl: './video-item-form-field.component.html',
  styleUrls: ['./video-item-form-field.component.css']
})
export class VideoItemFormFieldComponent implements OnInit {

  @Output('onVideoClick') videoClickEvent: EventEmitter<Video> = new EventEmitter();
  @Output('onDelete') deleteVideo: EventEmitter<Video> = new EventEmitter();

  @Input() video: Video;

  constructor() { }

  ngOnInit() {
  }

  onDeleteHandler(event)
  {
    this.deleteVideo.emit(this.video);
  }

  onVideoClickHandler(event)
  {
    this.videoClickEvent.emit(this.video);
  }

}
