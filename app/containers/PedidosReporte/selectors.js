import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the pedidosReporte state domain
 */

const selectPedidosReporteDomain = state =>
  state.get('pedidosReporte', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by PedidosReporte
 */

const makeSelectPedidosReporte = () =>
  createSelector(selectPedidosReporteDomain, substate => substate.toJS());

export default makeSelectPedidosReporte;
export { selectPedidosReporteDomain };
