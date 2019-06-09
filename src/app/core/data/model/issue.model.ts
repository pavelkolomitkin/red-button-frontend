import {ServiceType} from './service-type.model';
import {Region} from './region.model';
import {Video} from './video.model';
import {GeoLocation} from './geo-location.model';
import User from './user.model';
import {IssuePicture} from './issue-picture.model';
import {Company} from './company.model';
import {ComplaintConfirmation} from './complaint-confirmation.model';
import {CloneInterface} from './clone.interface';
import {ComplaintConfirmationStatus} from './complaint-confirmation-status.model';
import {LocationInterface} from './location.interface';

export class Issue implements CloneInterface<Issue>, LocationInterface
{
    id ?: number;

    message: string;

    complaintConfirmations: Array<ComplaintConfirmation> = [];

    serviceType ?: ServiceType;

    region ?: Region;

    address ?: any;

    pictures: Array<IssuePicture> = [];

    videos: Array<Video> = [];

    location ?: GeoLocation;

    createdAt ?: number;

    updatedAt ?: number;

    client ?: User;

    company ?: Company;

    likeNumber ?: number;

    commentNumber ?: number;

    hasUserLike: boolean = false;

    getLocation(): GeoLocation {
        return this.location;
    }

    isAddressInit()
    {
        return !!this.address && !!this.region;
    }

    resetAddress()
    {
        this.region = null;
        this.address = null;
    }

    clone(): Issue {

        const result: Issue = Object.assign(new Issue(), this, {

            region: !!this.region ? { ...this.region } : null,
            serviceType: !!this.serviceType ? { ...this.serviceType } : null,
            address: !!this.address ? { ...this.address } : null,
            pictures: [...this.pictures],
            videos: [...this.videos],
            location: !!this.location ? {...this.location} : null,
            client: !!this.client ? { ...this.client } : null,
            company: !!this.company ? { ...this.company } : null,

            complaintConfirmations: [...this.complaintConfirmations]

        });


        return result;

    }

    getApprovedConfirmations()
    {
        return this.complaintConfirmations.filter(item => item.status.code === ComplaintConfirmationStatus.STATUS_CONFIRMED);
    }

    getApprovedPercent()
    {
        let result = 0;

        if (this.complaintConfirmations.length !== 0)
        {
            const approvedNumber = this.getApprovedConfirmations().length;
            if (approvedNumber === this.complaintConfirmations.length)
            {
                result = 100;
            }
            else
            {
                result = (approvedNumber / this.complaintConfirmations.length) * 100;
            }
        }

        return result;
    }
}