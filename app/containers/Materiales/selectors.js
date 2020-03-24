import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the materiales state domain
 */

const selectMaterialesDomain = state => state.get('materiales', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ListadoMateriales
 */

const makeSelectMateriales = () =>
  createSelector(selectMaterialesDomain, substate => substate.toJS());

export default makeSelectMateriales;
export { selectMaterialesDomain };
