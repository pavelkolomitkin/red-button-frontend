import {GeoLocation} from './geo-location.model';

export class OSMSearchResult
{
    public placeId: number;

    public licence: string;

    public osmType: string;

    public osmId: number;

    public boundBox: Array<number> = [];

    public location: GeoLocation;

    public displayName: string;

    public class: string;

    public type: string;

    public importance: number;
}