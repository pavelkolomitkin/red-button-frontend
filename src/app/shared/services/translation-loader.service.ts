import { TranslateLoader } from '@ngx-translate/core';
import {Observable, of} from 'rxjs';

import ruLang from '../../../assets/i18n/ru.json';

export class TranslationLoaderService implements TranslateLoader
{
    getTranslation(lang: string): Observable<any> {

        switch (lang) {

            case 'ru':
                return of(ruLang);
        }
    }

}