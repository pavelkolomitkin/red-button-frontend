import {BaseService} from '../../core/services/base.service';
import {Complaint} from '../../core/data/model/complaint.model';
import {map} from 'rxjs/operators';
import {EntityTransformer} from '../../core/services/helper/entity-transformer.helper';

export class ComplaintService extends BaseService
{
    get(id: number)
    {
        return this.http.get<{ complaint: Complaint }>('/company/complaint/' + id)
            .pipe(
                map(({ complaint }) => EntityTransformer.transformComplaint(complaint))
            );
    }
}