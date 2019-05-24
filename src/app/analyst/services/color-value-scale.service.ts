import {environment} from '../../../environments/environment';

declare var chroma: any;

export class ColorValueScaleService
{
    private federalDistrictScale;

    private regionScale;

    constructor()
    {
        this.federalDistrictScale = chroma.scale(environment.statisticColorValueSchema);
        this.federalDistrictScale.domain([0, environment.statisticsColorFederalDistrictMaxIssueNumber]);

        this.regionScale = chroma.scale(environment.statisticColorValueSchema);
        this.regionScale.domain([0, environment.statisticsColorRegionMaxIssueNumber]);
    }

    getFederalDistrictColor(issueNumber: number)
    {
        let result = environment.statisticColorValueSchema[3];

        if (issueNumber < environment.statisticsColorFederalDistrictMaxIssueNumber)
        {
            result = this.federalDistrictScale(issueNumber);
        }

        return result;
    }

    getRegionColor(issueNumber: number)
    {
        let result = environment.statisticColorValueSchema[3];

        if (issueNumber < environment.statisticsColorRegionMaxIssueNumber)
        {
            result = this.regionScale(issueNumber);
        }

        return result;
    }
}