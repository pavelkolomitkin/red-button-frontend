import {BaseService} from '../../core/services/base.service';
import {Company} from '../../core/data/model/company.model';
import {map} from 'rxjs/operators';

export class CompanyService extends BaseService
{
    get(id: number)
    {
        return this.http.get<{ company: Company }>('/analytics/company/' + id).pipe(
            map(({ company }) => {
                return company;
            })
        );
    }
}