import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the movimientoAlmacen state domain
 */

const selectMovimientoAlmacenDomain = state =>
  state.get('movimientoAlmacen', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by MovimientoAlmacen
 */

const makeSelectMovimientoAlmacen = () =>
  createSelector(selectMovimientoAlmacenDomain, substate => substate.toJS());

export default makeSelectMovimientoAlmacen;
export { selectMovimientoAlmacenDomain };
