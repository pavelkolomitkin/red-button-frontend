import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ComplaintPicture} from '../../../data/model/complaint-picture.model';

@Component({
  selector: 'app-uploaded-complaint-picture-preview',
  templateUrl: './uploaded-complaint-picture-preview.component.html',
  styleUrls: ['./uploaded-complaint-picture-preview.component.css']
})
export class UploadedComplaintPicturePreviewComponent implements OnInit {

  @Output('onDelete') deleteEvent: EventEmitter<ComplaintPicture> = new EventEmitter();

  @Input() picture: ComplaintPicture;

  constructor() { }

  ngOnInit() {

  }

  onRemoveClickHandler()
  {
    this.deleteEvent.emit(this.picture);
  }

}
