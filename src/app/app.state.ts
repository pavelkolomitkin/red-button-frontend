import * as securityReducer from './security/data/reducer';
import * as coreReducer from './core/data/reducer';
import * as geoLocationReducer from './core/data/geo-location.reducer';
import * as videoReducer from './client/data/video.reducer';
import * as complaintTagReducer from './client/data/complaint-tag.reducer';
import * as complaintPictureReducer from './client/data/complaint-picture.reducer';
import * as clientIssuePictureReducer from './client/data/issue-picture.reducer';
import * as serviceTypeReducer from './core/data/service-type.reducer';
import * as complaintReducer from './client/data/complaint.reducer';
import * as issueReducer from './client/data/issue.reducer';
import * as clientGeoLocationReducer from './client/data/geo-location.reducer';
import * as mapReducer from './shared/data/map.reducer';

export interface State
{
  security: securityReducer.State;
  core: coreReducer.State;
  geoLocation: geoLocationReducer.State;
  clientGeoLocation: clientGeoLocationReducer.State;
  clientVideo: videoReducer.State;
  clientComplaintTag: complaintTagReducer.State;
  clientComplaintPicture: complaintPictureReducer.State;
  clientIssuePicture: clientIssuePictureReducer.State;
  serviceType: serviceTypeReducer.State;
  clientComplaint: complaintReducer.State;
  clientIssue: issueReducer.State;
  map: mapReducer.State;
}
