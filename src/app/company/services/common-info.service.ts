import {BaseService} from '../../core/services/base.service';

export class CommonInfoService extends BaseService
{
    getInfo()
    {
        return this.http.get('/company/common-info');
    }
}