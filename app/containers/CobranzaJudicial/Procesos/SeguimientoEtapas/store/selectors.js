import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the seguimientoEtapas state domain
 */

const selectSeguimientoEtapasDomain = state =>
  state.get('seguimientoEtapas', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by SeguimientoEtapas
 */

const makeSelectSeguimientoEtapas = () =>
  createSelector(selectSeguimientoEtapasDomain, substate => substate.toJS());

export default makeSelectSeguimientoEtapas;
export { selectSeguimientoEtapasDomain };
