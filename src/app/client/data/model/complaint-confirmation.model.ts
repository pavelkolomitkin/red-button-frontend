import {ComplaintConfirmationStatus} from './complaint-confirmation-status.model';
import {Complaint} from './complaint.model';

export interface ComplaintConfirmation {

    id ?: number;

    status: ComplaintConfirmationStatus;

    complaint: Complaint;

}