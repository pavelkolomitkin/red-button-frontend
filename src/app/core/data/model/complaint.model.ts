import {ComplaintTag} from './complaint-tag.model';
import {ServiceType} from './service-type.model';
import {Region} from './region.model';
import {ComplaintPicture} from './complaint-picture.model';
import {Video} from './video.model';
import {GeoLocation} from './geo-location.model';
import User from './user.model';
import {LocationInterface} from './location.interface';

export class Complaint implements LocationInterface {

    id ?: number;

    message: string;

    tags: Array<ComplaintTag> = [];

    serviceType ?: ServiceType;

    region ?: Region;

    address ?: any;

    pictures: Array<ComplaintPicture> = [];

    videos: Array<Video> = [];

    location ?: GeoLocation;

    createdAt ?: number;

    updatedAt ?: number;

    client ?: User;

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
}
