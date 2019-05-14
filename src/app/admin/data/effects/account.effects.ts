import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {AccountService} from '../../services/account.service';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {
    ACCOUNT_CREATE_START, ACCOUNT_GET_LIST_START,
    ACCOUNT_UPDATE_START,
    AccountCreateError,
    AccountCreateStart,
    AccountCreateSuccess, AccountGetListError, AccountGetListStart, AccountGetListSuccess, AccountGetSuccess, AccountUpdateError,
    AccountUpdateStart, AccountUpdateSuccess
} from '../account.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {CompanyRepresentativeUser} from '../../../core/data/model/company-representative-user.model';
import User from '../../../core/data/model/user.model';

@Injectable()
export class AccountEffects
{
    @Effect()
    getListStart: Observable<Action> = this.actions.pipe(
        ofType(ACCOUNT_GET_LIST_START),
        mergeMap((action: AccountGetListStart) => {
            const { params, page } = action;

            return this.service.getList(params, page).pipe(
                map(({ accounts, total }) => {
                    return new AccountGetListSuccess(accounts, total);
                }),
                catchError((error) => {
                    return of(new AccountGetListError(error));
                })
            );
        })
    );

    @Effect()
    createStart: Observable<Action> = this.actions.pipe(
        ofType(ACCOUNT_CREATE_START),
        mergeMap((action: AccountCreateStart) => {

            const { account, password, passwordRepeat } = action;

            let result: Observable<User>;

            if (account as CompanyRepresentativeUser)
            {
                result = this.service.createCompanyRepresentative(<CompanyRepresentativeUser>account, password, passwordRepeat);
            }
            else
            {
                result = this.service.createAnalystAccount(account, password, passwordRepeat);
            }

            return result.pipe(
                map((account: User) => {
                    return new AccountCreateSuccess(account);
                }),
                catchError((errors) => {
                    return of(new AccountCreateError(errors.error.errors));
                })
            );

        })
    );

    @Effect()
    updateStart: Observable<Action> = this.actions.pipe(
        ofType(ACCOUNT_UPDATE_START),
        mergeMap((action: AccountUpdateStart) => {

            const { account } = action;

            let result: Observable<User>;

            if (account as CompanyRepresentativeUser)
            {
                result = this.service.updateCompanyRepresentativeAccount(<CompanyRepresentativeUser>account);
            }
            else
            {
                result = this.service.updateAnalystAccount(account);
            }

            return result.pipe(
                map((account: User) => {
                    return new AccountUpdateSuccess(account);
                }),
                catchError((errors) => {
                    return of(new AccountUpdateError(errors.error.errors));
                })
            );
        })
    );



    resetPasswordStart: Observable<Action> = this.actions.pipe(

    );

    constructor(
        private actions: Actions,
        private store: Store<State>,
        private service: AccountService
    ) {

    }
}