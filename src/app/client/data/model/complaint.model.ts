import {ComplaintTag} from './complaint-tag.model';
import {ServiceType} from '../../../core/data/model/service-type.model';
import {Region} from '../../../core/data/model/region.model';
import {ComplaintPicture} from './complaint-picture.model';
import {Video} from './video.model';

export interface Complaint {

    id ?: number;

    message: string;

    tags: Array<ComplaintTag>;

    serviceType ?: ServiceType;

    region ?: Region;

    picture: Array<ComplaintPicture>;

    videos: Array<Video>;

    // TODO: its name should be corrected
    latitude ?: number;

    // TODO: its name should be corrected
    longitude ?: number;
}
