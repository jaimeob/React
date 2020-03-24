/*
 *
 * Main reducer
 *
 */

import { fromJS } from 'immutable';
// import { DEFAULT_ACTION } from '../constants';
// import ActionsService from 'containers/Servicios/store/actions';
import STATE from './state';
export const initialState = fromJS(STATE);


function mainReducer(state = initialState, action) {
  switch (action.type) {
    case 'APP/CONTAINER/CONF_TICKETS/CALANDO_REDUCER':
      return state.setIn(['selected', 'flag'], false);
      
    default:
      return state;
  }
}

export default mainReducer;
