import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the mantenimientos state domain
 */

const selectMantenimientosDomain = state =>
  state.get('mantenimientos', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Mantenimientos
 */

const makeSelectMantenimientos = () =>
  createSelector(selectMantenimientosDomain, substate => substate.toJS());

export default makeSelectMantenimientos;
export { selectMantenimientosDomain };
