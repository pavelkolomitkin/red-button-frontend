import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ComplaintTag} from '../../core/data/model/complaint-tag.model';
import {Observable} from 'rxjs';

@Injectable()
export class ComplaintTagService
{
    constructor(private http: HttpClient) {}

    search(name: string): Observable<{ tags: Array<ComplaintTag>, total: number }>
    {
        let params: HttpParams = new HttpParams().set('search', name);

        return this.http.get<{ tags: Array<ComplaintTag>, total: number }>('/client/complaint-tag/list', { params });
    }
}
