import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
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

  @ViewChild('inputElement') inputElement: ElementRef;

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
    this.addTag(event.item.title);
  }

  onEnterHandler(event)
  {
    this.addTag(event.target.value);

    event.target.value = '';
  }

  addTag(tag: string)
  {
    const newTag = tag.trim();

    if (newTag === '')
    {
      return;
    }

    if (this.tags.findIndex(tag => tag.title === newTag) !== -1)
    {
      return;
    }

    this.tags.push({ title: newTag });
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
