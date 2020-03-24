import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the reporteAsistencia state domain
 */

const selectReporteAsistenciaDomain = state =>
  state.get('reporteAsistencia', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ReporteAsistencia
 */

const makeSelectReporteAsistencia = () =>
  createSelector(selectReporteAsistenciaDomain, substate => substate.toJS());

export default makeSelectReporteAsistencia;
export { selectReporteAsistenciaDomain };
