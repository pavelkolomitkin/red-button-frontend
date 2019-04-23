import {Component, Input, OnInit} from '@angular/core';
import {ComplaintTagService} from '../../services/complaint-tag.service';
import {ComplaintTag} from '../../data/model/complaint-tag.model';
import {NgbTypeaheadSelectItemEvent} from '@ng-bootstrap/ng-bootstrap';
import {Observable, of} from 'rxjs';
import {debounceTime, map, mergeMap} from 'rxjs/operators';

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

  search = (text$: Observable<string>) => {
    return text$.pipe(
        debounceTime(200),
        mergeMap((term) => {
          if (term.trim() === '')
          {
            return of([]);
          }

          return this.service.search(term).pipe(
              map(({tags, total}) => {
                return tags;
              })
          );
        })
    );
  }

  onItemSelectHandler(event: NgbTypeaheadSelectItemEvent)
  {
    this.tags.push(event.item);
  }

  onEnterHandler(event)
  {
    const newTag = event.target.value.trim();
    if (newTag === '')
    {
      return;
    }

    if (this.tags.findIndex(tag => tag.title === newTag) !== -1)
    {
      return;
    }

    this.tags.push({ title: newTag });

    event.target.value = '';
  }

  formatter = (x: {title: string}) =>
  {
    return x.title;
  }

  onRemoveTagHandler(tag: ComplaintTag)
  {
    const tagIndex = this.tags.findIndex(item => item.title === tag.title);
    if (tagIndex !== -1)
    {
      this.tags.splice(tagIndex, 1);
    }
  }
}
