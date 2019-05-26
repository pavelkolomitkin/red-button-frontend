import {MapComponent} from '../../../../shared/components/map/map.component';

export abstract class MapViewConfiguratorBase
{
    protected map: MapComponent;

    protected constructor(map: MapComponent)
    {
        this.map = map;
    }

    abstract adjust(): void;
}