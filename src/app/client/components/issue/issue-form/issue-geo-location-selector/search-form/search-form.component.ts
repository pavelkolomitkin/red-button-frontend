import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ServiceTypeService} from '../../../../../../core/services/service-type.service';
import {Observable} from 'rxjs';
import {ServiceType} from '../../../../../../core/data/model/service-type.model';
import {ComplaintService} from '../../../../../services/complaint.service';
import {ComplaintTag} from '../../../../../data/model/complaint-tag.model';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  @Output('onChange') changeEvent: EventEmitter<{ serviceType ?: ServiceType, tags:Array<ComplaintTag> }> = new EventEmitter();

  serviceTypes: Observable<ServiceType[]>;
  tagItems: Array<any>;

  selectedServiceType: ServiceType;
  selectedTags: Array<ComplaintTag> = [];

  constructor(
      private serviceTypeService: ServiceTypeService,
      private complaintService: ComplaintService
  ) {


  }

  ngOnInit() {
    this.serviceTypes = this.serviceTypeService.getAll();
  }

  compareServiceTypes(a: ServiceType, b: ServiceType)
  {
    if (!a || !b)
    {
      return false;
    }

    return a.id === b.id;
  }

  emitChanges()
  {
    this.changeEvent.emit(
        {
          serviceType: this.selectedServiceType,
          tags: this.selectedTags
        }
    );
  }

  onServiceTypeChangeHandler(serviceType: any)
  {
    this.selectedServiceType = serviceType === '' ?  null : serviceType;
    this.emitChanges();
  }

  setGeoParameters(criteria: any)
  {
    const params = Object.assign(criteria, {});
    if (!!this.selectedServiceType)
    {
      params.serviceTypeId = this.selectedServiceType.id;
    }

    this.complaintService.tagSearch(params).toPromise().then(
        (items: Array<any>) => {

          const newSelectedItems: Array<ComplaintTag> = [];

          this.selectedTags.forEach((selectedItem, index) => {

            const found = items.find(newItem => newItem.tag.id === selectedItem.id);
            if (!!found)
            {
              newSelectedItems.push(found.tag);
            }

          });

          this.selectedTags = newSelectedItems;

          this.tagItems = items;
        }
    );
  }

  isTagSelected = (tag: ComplaintTag) => {
    return (this.selectedTags.findIndex(item => item.id === tag.id) !== -1);
  };


  onTagSelectHandler(tag: ComplaintTag)
  {
    console.log('Tag selected -->');
    console.log(tag);
    const index = this.selectedTags.findIndex(item => item.id === tag.id);

    if (index === -1)
    {
      this.selectedTags.push(tag);
      this.emitChanges();
    }
  }

  onTagUnSelectHandler(tag: ComplaintTag)
  {
    console.log('Tag unSelected -->');
    console.log(tag);

    const index = this.selectedTags.findIndex(item => item.id === tag.id);
    if (index !== -1)
    {
      this.selectedTags.splice(index, 1);
      this.emitChanges();
    }
  }
}
