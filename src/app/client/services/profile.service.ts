import {BaseService} from '../../core/services/base.service';

export class ProfileService extends BaseService
{
    getCommonInfo()
    {
        return this.http.get('/client/common-info');
    }
}