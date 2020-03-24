import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the reportes state domain
 */

const selectReportesDomain = state => state.get('reportes', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Reportes
 */

const makeSelectReportes = () =>
  createSelector(selectReportesDomain, substate => substate.toJS());

export default makeSelectReportes;
export { selectReportesDomain };
