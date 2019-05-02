import {ServiceType} from '../../../core/data/model/service-type.model';
import {Region} from '../../../core/data/model/region.model';
import {Video} from './video.model';
import {GeoLocation} from '../../../core/data/model/geo-location.model';
import User from '../../../core/data/model/user.model';
import {IssuePicture} from './issue-picture.model';
import {Company} from './company.model';
import {ComplaintConfirmation} from './complaint-confirmation.model';

export class Issue
{
    id ?: number;

    message: string;

    complaintConfirmations: Array<ComplaintConfirmation> = [];

    serviceType ?: ServiceType;

    region ?: Region;

    address ?: Object;

    pictures: Array<IssuePicture> = [];

    videos: Array<Video> = [];

    location ?: GeoLocation;

    createdAt ?: number;

    updatedAt ?: number;

    client ?: User;

    company ?: Company;

    likeNumber ?: number;
}