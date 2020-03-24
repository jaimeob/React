import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the movimientosInventario state domain
 */

const selectMovimientosInventarioDomain = state =>
  state.get('movimientosInventario', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by MovimientosInventario
 */

const makeSelectMovimientosInventario = () =>
  createSelector(selectMovimientosInventarioDomain, substate => substate.toJS());

export default makeSelectMovimientosInventario;
export { selectMovimientosInventarioDomain };
