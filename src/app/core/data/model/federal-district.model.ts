import {Region} from './region.model';

export class FederalDistrict {
    id ?: number;
    title: string;
    code: string;

    regions: Array<Region> = [];
}
