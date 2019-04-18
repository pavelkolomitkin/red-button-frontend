import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GeoLocation} from '../data/model/geo-location.model';
import {Region} from '../data/model/region.model';
import {Observable} from 'rxjs';

@Injectable()
export class GeoLocationService
{
    constructor(private http: HttpClient) {}

    getAddressByCoordinates(location: GeoLocation): Observable<{ region: Region, addition: Object }>
    {
        let params = new HttpParams();
        params.append('latitude', location.latitude.toString());
        params.append('longitude', location.longitude.toString());

        return this.http.get<{ region: Region, addition: Object }>('/geo/get', { params });
    }
}
