import {ComplaintTag} from './complaint-tag.model';

export interface Complaint {
    id ?: number;
    message: string;
    tags: Array<ComplaintTag>;
}
