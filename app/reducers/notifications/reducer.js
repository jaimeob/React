import { fromJS } from 'immutable';
import INITIAL_STATE from './state';
import {
  ENQUEUE_SNACKBAR,
  REMOVE_SNACKBAR,
} from './constants'

export const initialState = fromJS(INITIAL_STATE);

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case ENQUEUE_SNACKBAR: {
      const {
        notification,
      } = action;

      // const nextState = state.get('notifications').push(notification);
      // console.log('nextState', nextState.toJS());
      return state.updateIn(
        ['notifications'],
        (not) => not.push(notification)
      );
    }
    case REMOVE_SNACKBAR: {
      const {
        key: deleteKey,
      } = action;

      return state.updateIn(
        ['notifications'],
        (not) => {
          const idx = not.findIndex((n) => n.key === deleteKey)
          if (idx >= 0) {
            return not.delete(idx);
          }
          return not;
        }
      );
      
    }
    default:
      return state;
  }
}