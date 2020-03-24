/*
 *
 * Spinner reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION } from './constants';
import STATE from './state';
import ActionsSpinner from './actions';
export const initialState = fromJS(STATE);

const {
  CHANGE_SPINNER,
} = ActionsSpinner.getConstants()

function spinnerReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SPINNER: {
      return state
        .setIn([
          'spinner',
        ], action.status)
    }
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default spinnerReducer;
