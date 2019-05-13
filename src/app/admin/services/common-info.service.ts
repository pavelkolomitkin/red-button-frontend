import {BaseService} from '../../core/services/base.service';

export class CommonInfoService extends BaseService
{
    getCommonInfo()
    {
        return this.http.get('/admin/common-info');
    }
}