import {ComplaintTag} from './complaint-tag.model';
import {ServiceType} from './service-type.model';
import {Region} from './region.model';
import {ComplaintPicture} from './complaint-picture.model';
import {Video} from './video.model';
import {GeoLocation} from './geo-location.model';
import User from './user.model';

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

    isAddressInit()
    {
        return !!this.address && !!this.region;
    }

    resetAddress()
    {
        this.region = null;
        this.address = null;
    }
}
