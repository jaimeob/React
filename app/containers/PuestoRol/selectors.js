import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the puestoRol state domain
 */

const selectPuestoRolDomain = state => state.get('puestoRol', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by PuestoRol
 */

const makeSelectPuestoRol = () =>
  createSelector(selectPuestoRolDomain, substate => substate.toJS());

export default makeSelectPuestoRol;
export { selectPuestoRolDomain };
