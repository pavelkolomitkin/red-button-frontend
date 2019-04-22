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

  constructor(private modal: NgbModal) { }

  ngOnInit() {
  }

  onVideoDeleteHandler(video: Video)
  {
    console.log('Deleting video...');
    console.log(video);
  }

  onConfirmVideoHandler(video: Video)
  {
    this.addVideoWindow.close();

    this.complaint.videos.push(video);
  }

  onAddVideoClickHandler()
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
