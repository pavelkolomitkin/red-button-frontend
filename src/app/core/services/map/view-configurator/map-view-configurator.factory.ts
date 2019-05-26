import {MapViewConfiguratorBase} from './map-view-configurator-base';
import {MapComponent} from '../../../../shared/components/map/map.component';
import {MapViewPointsBoundaryConfigurator} from './map-view-points-boundary-configurator';
import {MapViewSinglePointConfigurator} from './map-view-single-point-configurator';
import {MapViewAddressConfigurator} from './map-view-address-configurator';
import {Injectable} from '@angular/core';
import {OSMSearchService} from '../../osm-search.service';
import {GeoLocation} from '../../../data/model/geo-location.model';

@Injectable()
export class MapViewConfiguratorFactory
{
    constructor(private osmService: OSMSearchService)
    {

    }

    createConfiguratorByPoints(map: MapComponent, points: Array<GeoLocation>): MapViewConfiguratorBase
    {
        if (points.length > 1)
        {
            return new MapViewPointsBoundaryConfigurator(map, points);
        }
        else if (points.length === 1)
        {
            return new MapViewSinglePointConfigurator(map, points[0]);
        }
        else
        {
            throw new Error('There no points to construct a map view configurator');
        }
    }

    createConfiguratorBySinglePoint(map: MapComponent, point: GeoLocation)
    {
        return new MapViewSinglePointConfigurator(map, point);
    }

    createConfiguratorByAddress(map: MapComponent, address: string): MapViewConfiguratorBase
    {
        return new MapViewAddressConfigurator(map, this.osmService, address);
    }
}