/*
 *
 * Main reducer
 *
 */

import { fromJS } from 'immutable';
import { Actions as A } from './actions';

const actions = (name = '') => A.get(name).id 

export const initialState = fromJS({
  backend: {
    datasources: {},
    stack: [],
  },
  frontend: {
    drawer: {
      open: false,
    },
    topbar: {
      title: '',
    },
  },
});

function mainReducer(state = initialState, action) {
  switch (action.type) {
    case actions('UI_TOGGLE_OPEN_DRAWER'): {
      const {
        open: drawerOpen,
      } = action;
      const updatePath = [
        'frontend',
        'drawer',
        'open',
      ];
      return state.setIn(
        updatePath,
        drawerOpen
      )
    }
    default:
      return state;
  }
}

export default mainReducer;
