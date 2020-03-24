import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the pedidos state domain
 */

const selectPedidosDomain = state => state.get('pedidos', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Pedidos
 */

const makeSelectPedidos = () =>
  createSelector(selectPedidosDomain, substate => substate.toJS());

export default makeSelectPedidos;
export { selectPedidosDomain };
