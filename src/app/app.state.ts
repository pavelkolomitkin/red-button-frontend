import * as securityReducer from './security/data/reducer';
import * as coreReducer from './core/data/reducer';
import * as geoLocationReducer from './core/data/geo-location.reducer';

export interface State
{
  security: securityReducer.State;
  core: coreReducer.State;
  geoLocation: geoLocationReducer.State
}
