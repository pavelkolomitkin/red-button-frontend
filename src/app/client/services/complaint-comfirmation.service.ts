import {BaseService} from '../../core/services/base.service';
import {ComplaintConfirmation} from '../data/model/complaint-confirmation.model';
import {map} from 'rxjs/operators';
import {IssueService} from './issue.service';
import {ComplaintService} from './complaint.service';

export class ComplaintConfirmationService extends BaseService
{
    changeStatus(data: ComplaintConfirmation, statusCode: string)
    {
        return this.http.put<{ confirmation: ComplaintConfirmation }>('/client/complaint-confirmation/' + data.id.toString(), {
            status: statusCode
        }).pipe(
            map(({confirmation}) => {
                confirmation.issue = IssueService.transformEntity(confirmation.issue);
                confirmation.complaint = ComplaintService.transformEntity(confirmation.complaint);

                return confirmation;
            })
        );
    }
}