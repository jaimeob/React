import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the formulariosUsuarios state domain
 */

const selectFormulariosUsuariosDomain = state =>
  state.get('formulariosUsuarios', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by FormulariosUsuarios
 */

const makeSelectFormulariosUsuarios = () =>
  createSelector(selectFormulariosUsuariosDomain, substate => substate.toJS());

export default makeSelectFormulariosUsuarios;
export { selectFormulariosUsuariosDomain };
