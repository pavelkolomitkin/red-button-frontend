import {BaseService} from '../../core/services/base.service';
import {HttpParams} from '@angular/common/http';
import {Complaint} from '../../core/data/model/complaint.model';
import {map} from 'rxjs/operators';
import {EntityTransformer} from '../../core/services/helper/entity-transformer.helper';

export class ComplaintService extends BaseService
{
    getList(params: Object, page: number = 1)
    {
        let parameters: HttpParams = this.getHttpParamsFromObject(Object.assign(params, {
            page: page
        }));

        return this.http.get<{ complaints: Array<Complaint>, total: number }>(
            '/admin/complaint/list',
            {params: parameters}
            ).pipe(
                map(({complaints, total}) => {
                    return {
                        complaints: complaints.map(item => EntityTransformer.transformComplaint(item)),
                        total: total
                    };
                })
        );
    }

    get(id: number)
    {
        return this.http.get<{ complaint: Complaint }>('/admin/complaint/' + id).pipe(
            map(({ complaint }) => {
                return EntityTransformer.transformComplaint(complaint);
            })
        );
    }

    remove(complaint: Complaint)
    {
        return this.http.delete('/admin/complaint/' + complaint.id);
    }
}