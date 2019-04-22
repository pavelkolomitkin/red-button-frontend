import {Component, Input, OnInit} from '@angular/core';
import {ComplaintTagService} from '../../services/complaint-tag.service';
import {ComplaintTag} from '../../data/model/complaint-tag.model';
import {NgbTypeaheadSelectItemEvent} from '@ng-bootstrap/ng-bootstrap';
import {Observable, of} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';

@Component({
  selector: 'app-tag-list-field',
  templateUrl: './tag-list-field.component.html',
  styleUrls: ['./tag-list-field.component.css']
})
export class TagListFieldComponent implements OnInit {

  public model: any;

  @Input() tags: Array<ComplaintTag> = [];

  constructor(private service: ComplaintTagService) { }

  ngOnInit() {

  }

  searchHandler(text$: Observable<string>)
  {
    //debugger
    // text$.pipe(
    //     debounceTime(200),
    //     map((term) =>
    //     {
    //       debugger
    //       if (term.trim() === '')
    //       {
    //         return [];
    //       }
    //
    //       return this.service.search(term).pipe(
    //           map(({tags, total}) => {
    //             return tags;
    //           })
    //       );
    //     })
    // );

  }

  onItemSelectHandler(event: NgbTypeaheadSelectItemEvent)
  {
    this.tags.push(event.item);
  }

  onEnterHandler(event)
  {
    // check that is not empty
    // TODO: create a new tag with a new title and push to the array
  }

  searchItemResultFormatter(item)
  {
    return item.title;
  }

  onRemoveTagHandler(tag: ComplaintTag)
  {
    const tagIndex = this.tags.findIndex(item => item.id === tag.id);
    if (tagIndex !== -1)
    {
      this.tags.splice(tagIndex, 1);
    }
  }
}
