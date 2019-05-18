import {MapViewConfiguratorBase} from './map-view-configurator-base';
import {MapComponent} from '../../../shared/components/map/map.component';
import {GeoLocation} from '../../data/model/geo-location.model';

export class MapViewPointsBoundaryConfigurator extends MapViewConfiguratorBase
{
    private points: Array<GeoLocation>;

    constructor(map: MapComponent, points: Array<GeoLocation>)
    {
        super(map);

        this.points = points;
    }

    adjust(): void {

        //this.points.length;
    }

}