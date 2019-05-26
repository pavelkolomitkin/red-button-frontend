import {MapViewConfiguratorBase} from './map-view-configurator-base';
import {MapComponent} from '../../../../shared/components/map/map.component';
import {GeoLocation} from '../../../data/model/geo-location.model';

export class MapViewPointsBoundaryConfigurator extends MapViewConfiguratorBase
{
    private points: Array<GeoLocation>;

    constructor(map: MapComponent, points: Array<GeoLocation>)
    {
        super(map);

        this.points = points;
    }

    adjust(): void {

        let topLeftPosition: GeoLocation = { ...this.points[0] };
        let bottomRightPosition: GeoLocation = { ...this.points[0] };

        this.points.forEach((item: GeoLocation) => {

            if (item.latitude > topLeftPosition.latitude)
            {
                topLeftPosition.latitude = item.latitude;
            }
            if (item.latitude < bottomRightPosition.latitude)
            {
                bottomRightPosition.latitude = item.latitude;
            }

            if (item.longitude < topLeftPosition.longitude)
            {
                topLeftPosition.longitude = item.longitude;
            }
            if (item.longitude > bottomRightPosition.longitude)
            {
                bottomRightPosition.longitude = item.longitude;
            }

        });


        this.map.setViewBoundaries(topLeftPosition, bottomRightPosition, null, true, [50, 50, 50, 50]);
    }

}