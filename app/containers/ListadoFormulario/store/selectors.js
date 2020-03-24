import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the listadoFormulario state domain
 */

const selectListadoFormularioDomain = state =>
  state.get('listadoFormulario', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ListadoFormulario
 */

const makeSelectListadoFormulario = () =>
  createSelector(selectListadoFormularioDomain, substate => substate.toJS());

export default makeSelectListadoFormulario;
export { selectListadoFormularioDomain };
