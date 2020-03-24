import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the catalogoEtapas state domain
 */

const selectCatalogoEtapasDomain = state =>
  state.get('catalogoEtapas', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by CatalogoEtapas
 */

const makeSelectCatalogoEtapas = () =>
  createSelector(selectCatalogoEtapasDomain, substate => substate.toJS());

export default makeSelectCatalogoEtapas;
export { selectCatalogoEtapasDomain };
