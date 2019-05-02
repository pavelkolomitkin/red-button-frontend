import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ComplaintTag} from '../../../../../../data/model/complaint-tag.model';

@Component({
  selector: 'app-search-tag-item',
  templateUrl: './tag-item.component.html',
  styleUrls: ['./tag-item.component.css']
})
export class SearchTagItemComponent implements OnInit {

  @Output('onSelect') selectEvent: EventEmitter<ComplaintTag> = new EventEmitter();
  @Output('onUnselect') unSelectEvent: EventEmitter<ComplaintTag> = new EventEmitter();

  @Input() tag: ComplaintTag;

  @Input() complaintNumber: number;

  @Input() isSelected: boolean = false;


  constructor() { }

  ngOnInit() {
  }

  onToggleSelectHandler(event)
  {
    if (this.isSelected)
    {
      this.unSelectEvent.emit(this.tag);
    }
    else
    {
      this.selectEvent.emit(this.tag);
    }
  }

}
