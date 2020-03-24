import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the porcentajeDeImpacto state domain
 */

const selectPorcentajeDeImpactoDomain = state =>
  state.get('porcentajeDeImpacto', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by PorcentajeDeImpacto
 */

const makeSelectPorcentajeDeImpacto = () =>
  createSelector(selectPorcentajeDeImpactoDomain, substate => substate.toJS());

export default makeSelectPorcentajeDeImpacto;
export { selectPorcentajeDeImpactoDomain };
