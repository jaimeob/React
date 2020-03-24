import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the necesidadPorMes state domain
 */

const selectNecesidadPorMesDomain = state =>
  state.get('necesidadPorMes', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by NecesidadPorMes
 */

const makeSelectNecesidadPorMes = () =>
  createSelector(selectNecesidadPorMesDomain, substate => substate.toJS());

export default makeSelectNecesidadPorMes;
export { selectNecesidadPorMesDomain };
