import * as actions from './actions';
import {NotifyMessage} from "./model/notify-message.model";
import BreadCrumb from './model/bread-crumb.model';
import {GeoLocation} from './model/geo-location.model';
import {ActionConfirmation} from './model/action-confirmation.model';

export interface State {
  globalProgressLoaders: number;

  lastSuccessMessage: NotifyMessage;
  lastErrorMessage: NotifyMessage;

  currentPageTitle: string;
  currentPageSubtitle: string;
  breadCrumbs: Array<BreadCrumb>;

  deviceGeoLocation: GeoLocation;

  lastInitConfirmation: ActionConfirmation;
  lastRespondedConfirmation: ActionConfirmation;

}

const initialState: State = {
  globalProgressLoaders: 0,

  lastSuccessMessage: null,
  lastErrorMessage: null,
  currentPageTitle: '',
  currentPageSubtitle: '',
  breadCrumbs: [],
  deviceGeoLocation: null,
  lastInitConfirmation: null,
  lastRespondedConfirmation: null
};

export function reducer(state = initialState, action: actions.CoreActions): State {

  switch (action.type) {

    case actions.GLOBAL_PROGRESS_SHOW:

      return {
        ...state,
        globalProgressLoaders: state.globalProgressLoaders + 1
      };

    case actions.GLOBAL_PROGRESS_HIDE:

      let value: number;

      if (action.force || (state.globalProgressLoaders <= 1))
      {
        value = 0;
      }
      else
      {
        value = state.globalProgressLoaders - 1;
      }

      return {
        ...state,
        globalProgressLoaders: value
      };

    case actions.GLOBAL_NOTIFY_SUCCESS_MESSAGE:

      return {
        ...state,
        lastSuccessMessage: action.message
      };

    case actions.GLOBAL_NOTIFY_ERROR_MESSAGE:

      return {
        ...state,
        lastErrorMessage: action.message
      };

    case actions.GLOBAL_SET_PAGE_TITLE:

      return {
        ...state,
        currentPageTitle: action.title,
        currentPageSubtitle: action.subTitle
      };

    case actions.GLOBAL_SET_BREAD_CRUMBS:

      return {
        ...state,
        breadCrumbs: action.items
      };

    case actions.GLOBAL_DEVICE_GEO_LOCATION_DETECT_DONE:

      return {
        ...state,
        deviceGeoLocation: action.location
      };

    case actions.GLOBAL_CONFIRMATION_INIT:

      return {
        ...state,
        lastInitConfirmation: action.confirmation
      };

    case actions.GLOBAL_CONFIRMATION_RESPONSE:

      return {
        ...state,
        lastRespondedConfirmation: action.confirmation
      };

    case actions.GLOBAL_CONFIRMATION_RESET:

      return {
        ...state,
        lastInitConfirmation: null,
        lastRespondedConfirmation: null
      };

    default:

      return state;

  }

}
