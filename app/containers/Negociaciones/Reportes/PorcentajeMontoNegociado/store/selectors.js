import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the porcentajeMontoNegociado state domain
 */

const selectPorcentajeMontoNegociadoDomain = state =>
  state.get('porcentajeMontoNegociado', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by PorcentajeMontoNegociado
 */

const makeSelectPorcentajeMontoNegociado = () =>
  createSelector(selectPorcentajeMontoNegociadoDomain, substate =>
    substate.toJS(),
  );

export default makeSelectPorcentajeMontoNegociado;
export { selectPorcentajeMontoNegociadoDomain };
