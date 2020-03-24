import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the configuracionMolde state domain
 */

const selectConfiguracionMoldeDomain = state =>
  state.get('configuracionMolde', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ConfiguracionMolde
 */

const makeSelectConfiguracionMolde = () =>
  createSelector(selectConfiguracionMoldeDomain, substate => substate.toJS());

export default makeSelectConfiguracionMolde;
export { selectConfiguracionMoldeDomain };
