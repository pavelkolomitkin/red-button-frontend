import {BaseService} from '../../core/services/base.service';
import {CompanyRepresentativeUser} from '../../core/data/model/company-representative-user.model';
import {map} from 'rxjs/operators';
import User from '../../core/data/model/user.model';
import {HttpParams} from '@angular/common/http';
import {EntityTransformer} from '../../core/services/helper/entity-transformer.helper';

export class AccountService extends BaseService
{
    getList(params: Object, page: number = 1)
    {
        let parameters: HttpParams = this.getHttpParamsFromObject(Object.assign(params, {
            page: page
        }));

        return this.http.get<{ accounts: Array<User>, total: number }>('/admin/account/search', { params: parameters }).pipe(
            map(({ accounts, total }) => {

                return {
                    accounts: accounts.map(item => EntityTransformer.transformUser(item)),
                    total: total
                };
            })
        );
    }

    get(id: number)
    {
        return this.http.get<{ account: User }>('/admin/account/' + id).pipe(
            map(({ account }) => {
                return EntityTransformer.transformUser(account);
            })
        );
    }

    createCompanyRepresentative(
        account: CompanyRepresentativeUser,
        password: string,
        passwordRepeat: string
    )
    {
        const body = {
            company: !!account.company ? account.company.id : null,
            email: account.email,
            fullName: account.fullName,
            isActive: account.isActive,
            plainPassword: {
                password,
                passwordRepeat
            }

        };

        return this.http.post<{ account: CompanyRepresentativeUser }>('/admin/account/company-representative/create', body).pipe(
            map(({ account }) => {
                return EntityTransformer.transformUser(account);
            })
        );
    }

    updateCompanyRepresentativeAccount(
        account: CompanyRepresentativeUser,
    )
    {
        const body = {
            company: !!account.company ? account.company.id : null,
            email: account.email,
            fullName: account.fullName,
            isActive: account.isActive

        };

        return this.http.put<{ account: CompanyRepresentativeUser }>(
            '/admin/account/company-representative/' + account.id,
            body
        ).pipe(
            map(({ account }) => {
                return EntityTransformer.transformUser(account);
            })
        );
    }

    createAnalystAccount(
        account: User,
        password: string,
        passwordRepeat: string,
    )
    {
        const body = {
            email: account.email,
            fullName: account.fullName,
            isActive: account.isActive,
            plainPassword: {
                password,
                passwordRepeat
            }
        };

        return this.http.post<{ account: User }>('/admin/account/analyst/create', body).pipe(
            map(({ account }) => {
                return EntityTransformer.transformUser(account);
            })
        );
    }

    updateAnalystAccount(account: User)
    {
        const body = {
            email: account.email,
            fullName: account.fullName,
            isActive: account.isActive
        };

        return this.http.put<{ account: User }>('/admin/account/analyst/' + account.id, body).pipe(
            map(({ account }) => {
                return EntityTransformer.transformUser(account);
            })
        );
    }

    resetAccountPassword(
        account: User,
        password: string,
        passwordRepeat: string
    )
    {
        const body = {
            plainPassword: {
                password,
                passwordRepeat
            }
        };

        return this.http.put<{ account: User }>('/admin/account/reset-password/' + account.id, body).pipe(
            map(({ account }) => {
                return EntityTransformer.transformUser(account);
            })
        );
    }
}