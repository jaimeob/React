import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the configuracionPeriodo state domain
 */

const selectConfiguracionPeriodosDomain = state =>
  state.get('configuracionPeriodos', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ConfiguracionPeriodos
 */

const makeSelectConfiguracionPeriodos = () =>
  createSelector(selectConfiguracionPeriodosDomain, substate => substate.toJS());

export default makeSelectConfiguracionPeriodos;
export { selectConfiguracionPeriodosDomain };
