import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Video} from '../../../../data/model/video.model';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {

  @Input() list: Array<Video> = [];

  @ViewChild('modalWindow') modalWindowTemplate: TemplateRef<any>;
  modalWindow: NgbModalRef = null;

  selectedVideo: Video;

  constructor(private modal: NgbModal) { }

  ngOnInit() {
  }

  onItemClickHandler(video: Video)
  {
    this.selectedVideo = video;

    this.modalWindow = this.modal.open(this.modalWindowTemplate, {centered: true});
    this.modalWindow.result
        .then((result) => {

          this.modalWindow = null;
        }, () => {
          this.modalWindow = null;
        });
  }

}
