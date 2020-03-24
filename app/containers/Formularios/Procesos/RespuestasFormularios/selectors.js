import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the formulario state domain
 */

const selectRespuestaFormularioDomain = state =>
  state.get('respuestaFormulario', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Formulario
 */

const makeSelectRespuestaFormulario = () =>
  createSelector(selectRespuestaFormularioDomain, substate => substate.toJS());

export default makeSelectRespuestaFormulario;
export { selectRespuestaFormularioDomain };
