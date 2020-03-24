import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the catalogoIndicadores state domain
 */

const selectCatalogoIndicadoresDomain = state =>
  state.get('catalogoIndicadores', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by CatalogoIndicadores
 */

const makeSelectCatalogoIndicadores = () =>
  createSelector(selectCatalogoIndicadoresDomain, substate => substate.toJS());

export default makeSelectCatalogoIndicadores;
export { selectCatalogoIndicadoresDomain };
