import { createSelector } from 'reselect';
import initialState from 'reducers/notifications/reducer';

const selectNotificationsDomain = state => state.get('notifier', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Formularios
 */

const makeSelectNotifications = () =>
  createSelector(selectNotificationsDomain, substate => substate.toJS());

export default makeSelectNotifications;
export { selectNotificationsDomain };
