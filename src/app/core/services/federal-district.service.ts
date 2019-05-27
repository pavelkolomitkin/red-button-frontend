import {BaseService} from './base.service';
import {FederalDistrict} from '../data/model/federal-district.model';
import {map} from 'rxjs/operators';

export class FederalDistrictService extends BaseService
{
    getAll()
    {
        return this.http.get<{ list: Array<FederalDistrict> }>('/federal-district/list').pipe(
            map(({ list }) => {
                return list;
            })
        );
    }
}