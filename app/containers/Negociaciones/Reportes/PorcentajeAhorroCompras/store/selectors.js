import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the porcentajeAhorroCompras state domain
 */

const selectPorcentajeAhorroComprasDomain = state =>
  state.get('porcentajeAhorroCompras', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by PorcentajeAhorroCompras
 */

const makeSelectPorcentajeAhorroCompras = () =>
  createSelector(selectPorcentajeAhorroComprasDomain, substate =>
    substate.toJS(),
  );

export default makeSelectPorcentajeAhorroCompras;
export { selectPorcentajeAhorroComprasDomain };
