import {ComplaintTag} from './complaint-tag.model';
import {ServiceType} from '../../../core/data/model/service-type.model';
import {Region} from '../../../core/data/model/region.model';
import {ComplaintPicture} from './complaint-picture.model';
import {Video} from './video.model';
import {GeoLocation} from '../../../core/data/model/geo-location.model';
import User from '../../../core/data/model/user.model';

export class Complaint {

    id ?: number;

    message: string;

    tags: Array<ComplaintTag> = [];

    serviceType ?: ServiceType;

    region ?: Region;

    address ?: Object;

    pictures: Array<ComplaintPicture> = [];

    videos: Array<Video> = [];

    location ?: GeoLocation;

    createdAt ?: number;

    updatedAt ?: number;

    client ?: User;
}
