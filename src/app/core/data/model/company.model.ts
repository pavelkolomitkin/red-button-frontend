import {AdministrativeUnit} from './administrative-unit.model';

export class Company
{
    id: number;

    title: string;

    fullName: string;

    legalFormText: string;

    legalAddress: string;

    actualAddress: string;

    postalAddress: string;

    phoneNumbers: string;

    officeHours: string;

    email: string;

    site: string;

    INN?: string;

    OGRN?: string;

    headName?: string;

    buildingNumber?: number;

    surface?: number;

    administrativeUnits?: Array<AdministrativeUnit> = [];

}