import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the configuracionEbitda state domain
 */

const selectConfiguracionEbitdaDomain = state =>
  state.get('configuracionEbitda', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ConfiguracionEbitda
 */

const makeSelectConfiguracionEbitda = () =>
  createSelector(selectConfiguracionEbitdaDomain, substate => substate.toJS());

export default makeSelectConfiguracionEbitda;
export { selectConfiguracionEbitdaDomain };
