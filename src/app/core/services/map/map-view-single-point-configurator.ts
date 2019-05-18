import {MapViewConfiguratorBase} from './map-view-configurator-base';
import {MapComponent} from '../../../shared/components/map/map.component';
import {GeoLocation} from '../../data/model/geo-location.model';

export class MapViewSinglePointConfigurator extends MapViewConfiguratorBase
{
    private center: GeoLocation;

    constructor(map: MapComponent, center: GeoLocation)
    {
        super(map);

        this.center = center;
    }

    adjust(): void {

        this.map.setCenter(this.center, true);

    }

}