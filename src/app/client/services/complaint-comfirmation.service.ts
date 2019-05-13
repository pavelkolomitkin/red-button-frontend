import {BaseService} from '../../core/services/base.service';
import {ComplaintConfirmation} from '../../core/data/model/complaint-confirmation.model';
import {map} from 'rxjs/operators';
import {Issue} from '../../core/data/model/issue.model';
import {EntityTransformer} from '../../core/services/helper/entity-transformer.helper';

export class ComplaintConfirmationService extends BaseService
{
    changeStatus(data: ComplaintConfirmation, statusCode: string)
    {
        return this.http.put<{ confirmation: ComplaintConfirmation, issue: Issue }>('/client/complaint-confirmation/' + data.id.toString(), {
            status: statusCode
        }).pipe(
            map(({confirmation, issue}) => {
                confirmation.issue = EntityTransformer.transformIssue(issue);
                confirmation.complaint = EntityTransformer.transformComplaint(confirmation.complaint);

                return confirmation;
            })
        );
    }
}