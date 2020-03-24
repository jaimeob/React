import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the capturaInasistencias state domain
 */

const selectCapturaInasistenciasDomain = state =>
  state.get('capturaInasistencias', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by CapturaInasistencias
 */

const makeSelectCapturaInasistencias = () =>
  createSelector(selectCapturaInasistenciasDomain, substate => substate.toJS());

export default makeSelectCapturaInasistencias;
export { selectCapturaInasistenciasDomain };
