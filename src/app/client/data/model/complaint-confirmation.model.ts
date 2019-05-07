import {ComplaintConfirmationStatus} from './complaint-confirmation-status.model';
import {Complaint} from './complaint.model';
import {Issue} from '../../../core/data/model/issue.model';

export interface ComplaintConfirmation {

    id ?: number;

    status: ComplaintConfirmationStatus;

    complaint: Complaint;

    issue ?: Issue

}