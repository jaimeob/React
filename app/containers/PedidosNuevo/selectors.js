import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the pedidosNuevo state domain
 */

const selectPedidosNuevoDomain = state =>
  state.get('pedidosNuevo', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by PedidosNuevo
 */

const makeSelectPedidosNuevo = () =>
  createSelector(selectPedidosNuevoDomain, substate => substate.toJS());

export default makeSelectPedidosNuevo;
export { selectPedidosNuevoDomain };
