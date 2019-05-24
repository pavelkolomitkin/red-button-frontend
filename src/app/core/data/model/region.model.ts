import {FederalDistrict} from './federal-district.model';

export interface Region {
    id?: number;
    title: string;
    code: string;
    federalDistrict: FederalDistrict;
}
