import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the reporteEncuestas state domain
 */

const selectReporteEncuestasDomain = state =>
  state.get('reporteEncuestas', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ReporteEncuestas
 */

const makeSelectReporteEncuestas = () =>
  createSelector(selectReporteEncuestasDomain, substate => substate.toJS());

export default makeSelectReporteEncuestas;
export { selectReporteEncuestasDomain };
