import {BaseService} from './base.service';
import {map} from 'rxjs/operators';
import {OSMSearchResult} from '../data/model/osm-search-result.model';

export class OSMSearchService extends BaseService
{
    static API_BASE_URL = 'https://nominatim.openstreetmap.org/search.php';

    static transformResult(data: any)
    {
        const result: OSMSearchResult = {
            placeId: data['place_id'],
            licence: data['licence'],
            osmType: data['osm_type'],
            osmId: data['osm_id'],
            boundBox: data['boundingbox'].map((item) => {return +item}),
            location: { latitude: +data['lat'], longitude: +data['lon'] },
            displayName: data['display_name'],
            class: data['class'],
            type: data['type'],
            importance: data['importance']
        };

        return result;
    }

    findByStringAddress(address: string)
    {
        const url = this.getUrl(address);

        return this.http.get(url).pipe(
            map((data) => {
                return (data as Array<any>).map(item => OSMSearchService.transformResult(item));
            })
        );
    }

    private getUrl(query: string)
    {
        return OSMSearchService.API_BASE_URL + '?q=' + query + '&format=json';
    }
}
