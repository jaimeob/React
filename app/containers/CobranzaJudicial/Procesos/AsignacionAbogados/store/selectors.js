import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the asignacionAbogados state domain
 */

const selectAsignacionAbogadosDomain = state =>
  state.get('asignacionAbogados', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AsignacionAbogados
 */

const makeSelectAsignacionAbogados = () =>
  createSelector(selectAsignacionAbogadosDomain, substate => substate.toJS());

export default makeSelectAsignacionAbogados;
export { selectAsignacionAbogadosDomain };
