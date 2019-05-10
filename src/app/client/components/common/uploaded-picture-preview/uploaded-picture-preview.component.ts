import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PictureInterface} from '../../../../shared/data/model/picture-interface.model';

@Component({
  selector: 'app-uploaded-picture-preview',
  templateUrl: './uploaded-picture-preview.component.html',
  styleUrls: ['./uploaded-picture-preview.component.css']
})
export class UploadedPicturePreviewComponent implements OnInit {

  @Output('onDelete') deleteEvent: EventEmitter<PictureInterface> = new EventEmitter();

  @Input() picture: PictureInterface;

  constructor() { }

  ngOnInit() {

  }

  onRemoveClickHandler()
  {
    this.deleteEvent.emit(this.picture);
  }

}
