import {BaseService} from '../../core/services/base.service';

export class StatisticService extends BaseService
{
    getCountryServiceTypeIssueNumbers(year: number)
    {
        return this.http.get<{ statistics: any, year: number }>('/analytics/statistics/country-numbers/' + year);
    }

    getCountryServiceTypeIssueNumberDynamic(year: number)
    {
        return this.http.get('/analytics/statistics/country-numbers/dynamic/' + year);
    }

    getFederalDistrictServiceTypeIssueNumbers(districtId: number, year: number)
    {
        return this.http.get<{ statistics: any, year: number }>('/analytics/statistics/federal-district-numbers/' + districtId + '/' + year);
    }

    getFederalDistrictServiceTypeIssueNumberDynamic(districtId: number, year: number)
    {
        return this.http.get('/analytics/statistics/federal-district-numbers/dynamic/' + districtId + '/' + year);
    }
}