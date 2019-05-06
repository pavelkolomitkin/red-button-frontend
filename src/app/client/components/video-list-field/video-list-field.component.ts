import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {Video} from '../../data/model/video.model';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {GlobalConfirmLeavePageInit} from '../../../core/data/actions';

@Component({
  selector: 'app-video-list-field',
  templateUrl: './video-list-field.component.html',
  styleUrls: ['./video-list-field.component.css']
})
export class VideoListFieldComponent implements OnInit {

  @Output('onChange') changeEvent: EventEmitter<Array<Video>> = new EventEmitter();

  @Input() list: Array<Video> = [];

  @ViewChild('addVideoModal') addVideoWindowTemplate: TemplateRef<any>;
  addVideoWindow: NgbModalRef = null;

  @ViewChild('removeAlertModal') removeVideoModalWindowTemplate: TemplateRef<any>;
  removeVideoModalWindow: NgbModalRef = null;

  constructor(private modal: NgbModal) { }

  ngOnInit() {
  }

  onVideoDeleteHandler(video: Video)
  {
    this.removeVideoModalWindow = this.modal.open(this.removeVideoModalWindowTemplate, {centered: true});
    this.removeVideoModalWindow.result
        .then(
            (result) => {

              const videoIndex = this.list.findIndex(item => item.id === video.id);
              if (videoIndex !== -1)
              {
                this.list.splice(videoIndex, 1);
                this.changeEvent.emit(this.list);
              }

              this.removeVideoModalWindow = null;
            },
            () => {
              this.removeVideoModalWindow = null;
            }
            );
  }

  onConfirmVideoHandler(video: Video)
  {
    this.addVideoWindow.close();

    if(this.list.findIndex(item => item.id === video.id) === -1)
    {
        this.list.push(video);
        this.changeEvent.emit(this.list);
    }
  }

  onAddVideoClickHandler(event)
  {
    this.addVideoWindow = this.modal.open(this.addVideoWindowTemplate, {centered: true});
    this.addVideoWindow.result
        .then((result) => {
          this.addVideoWindow = null;
        }, () => {
          this.addVideoWindow = null;
        });
  }
}
