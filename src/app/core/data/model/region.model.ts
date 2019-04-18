import {FederalDistrict} from './federal-district.model';

export interface Region {
    id?: number;
    title: string;
    federalDistrict: FederalDistrict;
}
