import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the cambiarIndicador state domain
 */

const selectCambiarIndicadorDomain = state =>
  state.get('cambiarIndicador', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by CambiarIndicador
 */

const makeSelectCambiarIndicador = () =>
  createSelector(selectCambiarIndicadorDomain, substate => substate.toJS());

export default makeSelectCambiarIndicador;
export { selectCambiarIndicadorDomain };
