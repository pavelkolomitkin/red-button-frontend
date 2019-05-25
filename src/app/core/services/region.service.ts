import {BaseService} from './base.service';
import {map} from 'rxjs/operators';
import {Region} from '../data/model/region.model';

export class RegionService extends BaseService
{
    getAll()
    {
        return this.http.get<{ regions: Array<Region> }>('/region/list').pipe(
            map(({ regions }) => {
                return regions;
            })
        );
    }

    get(id)
    {
        return this.http.get<{ region: Region }>('/region/' + id).pipe(
            map(({ region }) => {
                return region
            })
        );
    }
}