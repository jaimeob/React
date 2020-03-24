import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the cargaBase state domain
 */

const selectCargaBaseDomain = state => state.get('cargaBase', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by CargaBase
 */

const makeSelectCargaBase = () =>
  createSelector(selectCargaBaseDomain, substate => substate.toJS());

export default makeSelectCargaBase;
export { selectCargaBaseDomain };
