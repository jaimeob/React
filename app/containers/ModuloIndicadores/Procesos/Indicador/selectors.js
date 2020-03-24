import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the indicador state domain
 */

const selectIndicadorDomain = state =>
  state.get('indicador', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Indicador
 */

const makeSelectIndicador = () =>
  createSelector(selectIndicadorDomain, substate => substate.toJS());

export default makeSelectIndicador;
export { selectIndicadorDomain };
