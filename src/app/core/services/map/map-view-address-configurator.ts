import {MapViewConfiguratorBase} from './map-view-configurator-base';
import {MapComponent} from '../../../shared/components/map/map.component';
import {OSMSearchService} from '../osm-search.service';
import {OSMSearchResult} from '../../data/model/osm-search-result.model';

export class MapViewAddressConfigurator extends MapViewConfiguratorBase
{
    private searchService: OSMSearchService;

    private address: string;

    constructor(map: MapComponent, searchService: OSMSearchService, address: string)
    {
        super(map);

        this.searchService = searchService;
        this.address = address;
    }

    adjust(): void {

        this.searchService.findByStringAddress(this.address)
            .toPromise()
            .then((addresses: Array<OSMSearchResult>) => {
                if (addresses.length > 0)
                {
                    this.map.setCenter(addresses[0].location);
                    this.map.setZoom(15);
                }
            });

    }

}