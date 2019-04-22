import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Complaint} from '../../data/model/complaint.model';
import {Video} from '../../data/model/video.model';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-complaint-video-list-field',
  templateUrl: './complaint-video-list-field.component.html',
  styleUrls: ['./complaint-video-list-field.component.css']
})
export class ComplaintVideoListFieldComponent implements OnInit {

  @Input() complaint: Complaint;

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

              const videoIndex = this.complaint.videos.findIndex(item => item.id === video.id);
              if (videoIndex !== -1)
              {
                this.complaint.videos.splice(videoIndex, 1);
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

    this.complaint.videos.push(video);
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
