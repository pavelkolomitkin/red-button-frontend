import {ComplaintConfirmation} from './complaint-confirmation.model';

export class ProfileCommonInfo
{
    complaintNumber ?: number;
    issueNumber ?: number;
    confirmationNumber ?: number;
    confirmations: Array<ComplaintConfirmation> = [];
}