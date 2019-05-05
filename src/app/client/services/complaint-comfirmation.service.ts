import {BaseService} from '../../core/services/base.service';
import {ComplaintConfirmation} from '../data/model/complaint-confirmation.model';

export class ComplaintConfirmationService extends BaseService
{
    changeStatus(confirmation: ComplaintConfirmation, statusCode: string)
    {
        return this.http.put('/client/complaint-confirmation/' + confirmation.id.toString(), {
            status: statusCode
        });
    }
}