import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the notificaciones state domain
 */

const selectNotificacionesDomain = state =>
  state.get('notificaciones', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Notificaciones
 */

const makeSelectNotificaciones = () =>
  createSelector(selectNotificacionesDomain, substate => substate.toJS());

export default makeSelectNotificaciones;
export { selectNotificacionesDomain };
