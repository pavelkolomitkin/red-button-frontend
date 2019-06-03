import {Injectable, Type} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {LeavePageConfirmationInterface} from '../../data/model/leave-page-confirmation.interface';
import {select, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class ConfirmLeavePageGuardService implements CanDeactivate<any>
{
    static DEFAULT_PROMPT_MESSAGE = 'YOU_WANT_TO_LEAVE_THIS_PAGE';

    needToConfirm: boolean = false;

    constructor(private store: Store<State>, private translator: TranslateService)
    {
        this.store.pipe(select(state => state.core.leavePageConfirmation)).subscribe(
            (value) => {
                this.needToConfirm = value;
            }
        )
    }

    canDeactivate(
        component: any,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {

        if (this.needToConfirm)
        {
            let message = ConfirmLeavePageGuardService.DEFAULT_PROMPT_MESSAGE;
            if (!!(component as LeavePageConfirmationInterface).getPromptMessage && (!!component.getPromptMessage()))
            {
                message = component.getPromptMessage()
            }

            return this.translator.get(message).toPromise().then((message) => {
                return confirm(message + '?');
            });
        }

        return true;
    }

}