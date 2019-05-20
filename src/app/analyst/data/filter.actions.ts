import { Action } from '@ngrx/store';

export const ANALYTICS_FILTER = 'ANALYTICS_FILTER';

export class AnalyticsFilter implements Action
{
    readonly type = ANALYTICS_FILTER;

    constructor(public filter: any) {}
}

export type FilterActions = AnalyticsFilter;