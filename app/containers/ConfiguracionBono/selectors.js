import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the configuracionBono state domain
 */

const selectConfiguracionBonoDomain = state =>
  state.get('configuracionBono', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ConfiguracionBono
 */

const makeSelectConfiguracionBono = () =>
  createSelector(selectConfiguracionBonoDomain, substate => substate.toJS());

export default makeSelectConfiguracionBono;
export { selectConfiguracionBonoDomain };
