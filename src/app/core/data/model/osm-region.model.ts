import {GeoLocation} from './geo-location.model';

export class OSMRegion
{
    boundingTopLeft: GeoLocation;

    boundingBottomRight: GeoLocation;

    displayName?: string;

    geoJson: any;

    center: GeoLocation;

    id: string;

    type: string;

    placeId: string;
}