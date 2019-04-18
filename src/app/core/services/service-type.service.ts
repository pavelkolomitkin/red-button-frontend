import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ServiceType} from '../data/model/service-type.model';
import {map} from 'rxjs/operators';

@Injectable()
export class ServiceTypeService
{
    constructor(private http: HttpClient) {}

    getAll()
    {
        return this.http.get<{ serviceTypes: Array<ServiceType> }>('/service-type/list')
            .pipe(
                map(result => result.serviceTypes)
            );
    }
}
