import {BaseService} from './base.service';
import {Company} from '../data/model/company.model';

export class CompanyService extends BaseService
{
    search(params: Object)
    {
        const filter = this.getHttpParamsFromObject(params);
        return this.http.get<{ companies: Array<Company>, total: number }>('/company/search', { params: filter });
    }
}