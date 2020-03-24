import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the inventarioPlaza state domain
 */

const selectInventarioPlazaDomain = state =>
  state.get('inventarioPlaza', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by InventarioPlaza
 */

const makeSelectInventarioPlaza = () =>
  createSelector(selectInventarioPlazaDomain, substate => substate.toJS());

export default makeSelectInventarioPlaza;
export { selectInventarioPlazaDomain };
