import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-upload-picture-preview',
  templateUrl: './upload-picture-preview.component.html',
  styleUrls: ['./upload-picture-preview.component.css']
})
export class UploadPicturePreviewComponent implements OnInit {

  isVisible: boolean = false;
  imageUrl: string = null;

  @Input() imageFile: File;

  constructor() { }

  ngOnInit() {
    this.readPreviewUrl();
  }

  readPreviewUrl()
  {
    const reader = new FileReader();

    reader.onload = (event) => {
      this.imageUrl = event.target['result'];
      this.isVisible = true;
    };

    reader.readAsDataURL(this.imageFile);
  }
}
