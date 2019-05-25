import {FederalDistrict} from './federal-district.model';
import {OSMRegion} from './osm-region.model';

export interface Region {
    id?: number;
    title: string;
    code: string;
    federalDistrict: FederalDistrict;

    osmRegion?: OSMRegion;
}
