import {Component, Input, OnInit} from '@angular/core';
import {Lightbox} from 'ngx-lightbox';
import {PictureInterface} from '../../../../shared/data/model/picture-interface.model';

@Component({
  selector: 'app-picture-list',
  templateUrl: './picture-list.component.html',
  styleUrls: ['./picture-list.component.css']
})
export class PictureListComponent implements OnInit {

  @Input() list: Array<PictureInterface> = [];

  lightBoxItems: Array<{ src: string, caption: string, thumb: string }>;

  constructor(private lightBox: Lightbox) {

  }

  ngOnInit() {

    this.lightBoxItems = this.list.map((item) => {
      return {
        src: item.sources['previewNormal'] as string,
        caption: '',
        thumb: item.sources['previewMiddle'] as string
      }
    });
  }

  onPictureClickHandler(event, index)
  {
    this.lightBox.open(this.lightBoxItems, index);
  }

}
