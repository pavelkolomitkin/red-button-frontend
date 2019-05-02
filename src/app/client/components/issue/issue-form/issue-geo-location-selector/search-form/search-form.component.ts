import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ServiceTypeService} from '../../../../../../core/services/service-type.service';
import {Observable} from 'rxjs';
import {ServiceType} from '../../../../../../core/data/model/service-type.model';
import {Tag} from '@angular/compiler/src/i18n/serializers/xml_helper';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  @Output('onChange') changeEvent: EventEmitter<{ serviceType ?: ServiceType, tags:Array<Tag> }> = new EventEmitter();

  serviceTypes: Observable<ServiceType[]>;

  selectedServiceType: ServiceType;
  selectedTags: Array<Tag> = [];

  constructor(private serviceTypeService: ServiceTypeService) {

    this.serviceTypes = this.serviceTypeService.getAll();

  }

  ngOnInit() {

  }

  compareServiceTypes(a: ServiceType, b: ServiceType)
  {
    if (!a || !b)
    {
      return false;
    }

    return a.id === b.id;
  }

  onServiceTypeChangeHandler(serviceType: any)
  {
    this.selectedServiceType = serviceType === '' ?  null : serviceType;

    this.changeEvent.emit(
        {
          serviceType: this.selectedServiceType,
          tags: this.selectedTags
        }
    );
  }

}
