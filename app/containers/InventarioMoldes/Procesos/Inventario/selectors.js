import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the inventario state domain
 */

const selectInventarioDomain = state => state.get('inventario', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Inventario
 */

const makeSelectInventario = () =>
  createSelector(selectInventarioDomain, substate => substate.toJS());

export default makeSelectInventario;
export { selectInventarioDomain };
