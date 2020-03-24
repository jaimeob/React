import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the modulos state domain
 */

const selectModulosDomain = state => state.get('modulos', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Modulos
 */

const makeSelectModulos = () =>
  createSelector(selectModulosDomain, substate => substate.toJS());

export default makeSelectModulos;
export { selectModulosDomain };
