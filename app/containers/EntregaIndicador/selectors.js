import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the entregaIndicador state domain
 */

const selectEntregaIndicadorDomain = state =>
  state.get('entregaIndicador', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by EntregaIndicador
 */

const makeSelectEntregaIndicador = () =>
  createSelector(selectEntregaIndicadorDomain, substate => substate.toJS());

export default makeSelectEntregaIndicador;
export { selectEntregaIndicadorDomain };
