import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ComplaintTag} from '../../../../../core/data/model/complaint-tag.model';

@Component({
  selector: 'app-tag-item',
  templateUrl: './tag-item.component.html',
  styleUrls: ['./tag-item.component.css']
})
export class TagItemComponent implements OnInit {

  @Output('onRemove') remove: EventEmitter<ComplaintTag> = new EventEmitter();

  @Input() tag: ComplaintTag;

  constructor() { }

  ngOnInit() {
  }

  onRemoveClickHandler(event)
  {
    this.remove.emit(this.tag);
  }
}
