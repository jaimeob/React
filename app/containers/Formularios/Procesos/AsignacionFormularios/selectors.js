import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the asignacion state domain
 */

const selectAsignacionFormularioDomain = state =>
  state.get('asignacionFormulario', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Asignacion
 */

const makeSelectAsignacionFormulario = () =>
  createSelector(selectAsignacionFormularioDomain, substate => substate.toJS());

export default makeSelectAsignacionFormulario;
export { selectAsignacionFormularioDomain };
