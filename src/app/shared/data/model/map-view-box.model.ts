import {GeoLocation} from '../../../core/data/model/geo-location.model';

export interface MapViewBox
{
    topLeft: GeoLocation;

    bottomRight: GeoLocation;

    zoom: number;
}