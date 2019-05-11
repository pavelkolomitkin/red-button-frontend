
export class ComplaintConfirmationStatus
{
    static STATUS_PENDING = 'pending';
    static STATUS_CONFIRMED = 'confirmed';
    static STATUS_REJECTED = 'rejected';

    id ?: number;

    code: string;

    title ?: string;

}