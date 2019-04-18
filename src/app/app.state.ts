import * as securityReducer from './security/data/reducer';
import * as coreReducer from './core/data/reducer';
import * as geoLocationReducer from './core/data/geo-location.reducer';
import * as videoReducer from './client/data/video.reducer';
import * as complaintTagReducer from './client/data/complaint-tag.reducer';
import * as complaintPictureReducer from './client/data/complaint-picture.reducer';

export interface State
{
  security: securityReducer.State;
  core: coreReducer.State;
  geoLocation: geoLocationReducer.State;
  video: videoReducer.State;
  complaintTag: complaintTagReducer.State;
  complaintPicture: complaintPictureReducer.State;
}
