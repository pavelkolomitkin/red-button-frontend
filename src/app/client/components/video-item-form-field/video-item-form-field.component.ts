import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Video} from '../../data/model/video.model';

@Component({
  selector: 'app-video-item-form-field',
  templateUrl: './video-item-form-field.component.html',
  styleUrls: ['./video-item-form-field.component.css']
})
export class VideoItemFormFieldComponent implements OnInit {

  @Output('onDelete') deleteVideo: EventEmitter<Video> = new EventEmitter();

  @Input() video: Video;

  constructor() { }

  ngOnInit() {
  }

  onDeleteHandler()
  {
    this.deleteVideo.emit(this.video);
  }

}
