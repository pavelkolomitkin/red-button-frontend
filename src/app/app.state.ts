import * as securityReducer from './security/data/reducer';
import * as coreReducer from './core/data/reducer';
import * as geoLocationReducer from './core/data/geo-location.reducer';
import * as videoReducer from './client/data/video.reducer';
import * as complaintTagReducer from './client/data/complaint-tag.reducer';
import * as complaintPictureReducer from './client/data/complaint-picture.reducer';
import * as serviceTypeReducer from './core/data/service-type.reducer';
import * as complaintReducer from './client/data/complaint.reducer';
import * as clientGeoLocationReducer from './client/data/geo-location.reducer';

export interface State
{
  security: securityReducer.State;
  core: coreReducer.State;
  geoLocation: geoLocationReducer.State;
  clientGeoLocation: clientGeoLocationReducer.State;
  video: videoReducer.State;
  complaintTag: complaintTagReducer.State;
  complaintPicture: complaintPictureReducer.State;
  serviceType: serviceTypeReducer.State;
  complaint: complaintReducer.State;
}
