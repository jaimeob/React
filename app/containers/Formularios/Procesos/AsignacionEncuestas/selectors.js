import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the asignacion state domain
 */

const selectAsignacionEncuestasDomain = state =>
  state.get('asignacionEncuestas', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Asignacion
 */

const makeSelectAsignacionEncuestas = () =>
  createSelector(selectAsignacionEncuestasDomain, substate => substate.toJS());

export default makeSelectAsignacionEncuestas;
export { selectAsignacionEncuestasDomain };
