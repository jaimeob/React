import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the listadoFamilias state domain
 */

const selectListadoFamiliasDomain = state =>
  state.get('listadoFamilias', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ListadoFamilias
 */

const makeSelectListadoFamilias = () =>
  createSelector(selectListadoFamiliasDomain, substate => substate.toJS());

export default makeSelectListadoFamilias;
export { selectListadoFamiliasDomain };
