import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the asignacion state domain
 */

const selectAsignacionEvaluacionesDomain = state =>
  state.get('asignacionEvaluaciones', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Asignacion
 */

const makeSelectAsignacionEvaluaciones = () =>
  createSelector(selectAsignacionEvaluacionesDomain, substate => substate.toJS());

export default makeSelectAsignacionEvaluaciones;
export { selectAsignacionEvaluacionesDomain };
