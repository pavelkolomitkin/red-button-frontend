import User from './user.model';
import {Company} from './company.model';

export class CompanyRepresentativeUser extends User
{
    public company: Company;

    static createFromRawData(data: any)
    {
        let result: CompanyRepresentativeUser = Object.assign(new CompanyRepresentativeUser(), data);

        return result;
    }
}