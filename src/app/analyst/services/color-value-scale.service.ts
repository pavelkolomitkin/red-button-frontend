import {environment} from '../../../environments/environment';
import {Issue} from '../../core/data/model/issue.model';

declare var chroma: any;

export class ColorValueScaleService
{
    private federalDistrictScale;

    private regionScale;

    private issueScale;

    constructor()
    {
        this.federalDistrictScale = chroma.scale(environment.statisticColorValueSchema);
        this.federalDistrictScale.domain([0, environment.statisticsColorFederalDistrictMaxIssueNumber]);

        this.regionScale = chroma.scale(environment.statisticColorValueSchema);
        this.regionScale.domain([0, environment.statisticsColorRegionMaxIssueNumber]);

        this.issueScale = chroma.scale(environment.statisticColorValueSchema);
        this.issueScale.domain([0, environment.statisticsColorIssueMaxPopularityValue]);
    }

    getFederalDistrictColor(issueNumber: number)
    {
        return this.federalDistrictScale(issueNumber);
    }

    getRegionColor(issueNumber: number)
    {
        return this.regionScale(issueNumber);
    }

    getIssueColor(issue: Issue)
    {
        const popularity: number = issue.likeNumber + issue.commentNumber;

        return this.issueScale(popularity);
    }
}