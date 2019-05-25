import {BaseService} from './base.service';
import {map} from 'rxjs/operators';
import {Region} from '../data/model/region.model';
import {EntityTransformer} from './helper/entity-transformer.helper';

export class RegionService extends BaseService
{
    getAll()
    {
        return this.http.get<{ regions: Array<Region> }>('/region/list').pipe(
            map(({ regions }) => {
                return regions.map(item => EntityTransformer.transformRegion(item));
            })
        );
    }

    get(id)
    {
        return this.http.get<{ region: Region }>('/region/' + id).pipe(
            map(({ region }) => {
                return EntityTransformer.transformRegion(region)
            })
        );
    }
}