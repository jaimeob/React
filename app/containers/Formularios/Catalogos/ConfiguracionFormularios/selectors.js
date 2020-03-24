import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the formulario state domain
 */

const selectFormularioDomain = state =>
  state.get('formulario', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Formulario
 */

const makeSelectFormulario = () =>
  createSelector(selectFormularioDomain, substate => substate.toJS());

export default makeSelectFormulario;
export { selectFormularioDomain };
