import {ServiceType} from './service-type.model';
import {Region} from './region.model';
import {Video} from '../../../client/data/model/video.model';
import {GeoLocation} from './geo-location.model';
import User from './user.model';
import {IssuePicture} from './issue-picture.model';
import {Company} from './company.model';
import {ComplaintConfirmation} from '../../../client/data/model/complaint-confirmation.model';

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