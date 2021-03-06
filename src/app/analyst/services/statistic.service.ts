import {BaseService} from '../../core/services/base.service';
import {map} from 'rxjs/operators';
import {Region} from '../../core/data/model/region.model';
import {Company} from '../../core/data/model/company.model';
import {EntityTransformer} from '../../core/services/helper/entity-transformer.helper';
import {Issue} from '../../core/data/model/issue.model';

export class StatisticService extends BaseService
{
    getCountryServiceTypeIssueNumbers(year: number)
    {
        return this.http.get<{ statistics: any, year: number }>('/analytics/statistics/country-numbers/' + year).pipe(
            map((data) => {

                data.statistics.byFederalDistricts = data.statistics.byFederalDistricts.map((item) => {

                    item.totalIssues = 0;

                    item.serviceTypes.forEach((serviceType) => {
                        item.totalIssues += serviceType.issueNumber;
                    });

                    return item;

                });


                return data;
            })
        );
    }

    getCountryServiceTypeIssueNumberDynamic(year: number)
    {
        return this.http.get('/analytics/statistics/country-numbers/dynamic/' + year);
    }

    getFederalDistrictServiceTypeIssueNumbers(districtId: number, year: number)
    {
        return this.http.get<{ statistics: any, year: number }>('/analytics/statistics/federal-district-numbers/' + districtId + '/' + year)
            .pipe(
                map((data) => {

                    data.statistics.byRegions = data.statistics.byRegions.map((item) => {

                        item.totalIssues = 0;

                        item.serviceTypes.forEach((serviceType) => {
                            item.totalIssues += serviceType.issueNumber;
                        });

                        return item;
                    })

                    return data;
                })
            );
    }

    getFederalDistrictServiceTypeIssueNumberDynamic(districtId: number, year: number)
    {
        return this.http.get('/analytics/statistics/federal-district-numbers/dynamic/' + districtId + '/' + year);
    }

    getRegionServiceTypeIssueNumbers(region: Region, year: number)
    {
        return this.http.get<{ statistics: any, year: number }>('/analytics/statistics/region/' + region.id + '/' + year);
    }

    getRegionServiceTypeIssueNumberDynamic(region: Region, year: number)
    {
        return this.http.get('/analytics/statistics/region-numbers/dynamic/' + region.id + '/' + year);
    }

    getRegionPopularCompanies(region: Region, year: number)
    {
        return this
            .http
            .get<{ statistics: Array<{ company: Company, issueNumber: number }>, year: number }>(
                '/analytics/statistics/region/' + region.id + '/' + year + '/popular-companies'
            );
    }

    getCompanyServiceTypeIssueNumbers(company: Company, year: number)
    {
        return this.http.get<{ statistics: any, year: number }>('/analytics/statistics/company/' + company.id + '/' + year);
    }

    getCompanyServiceTypeIssueNumberDynamic(company: Company, year: number)
    {
        return this.http.get<{ statistics: any, year: number }>('/analytics/statistics/company-numbers/dynamic/' + company.id + '/' + year);
    }

    getCompanyPopularIssues(company: Company, year: number)
    {
        return this.http.get<{ statistics: Array<Issue>, year: number }>('/analytics/statistics/company/' + company.id + '/' + year + '/popular-issues').pipe(
            map((data) => {

                data.statistics = data.statistics.map(item => EntityTransformer.transformIssue(item));

                return data;
            })
        );
    }

}