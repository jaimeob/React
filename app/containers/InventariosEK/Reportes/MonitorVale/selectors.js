import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the monitorVale state domain
 */

const selectMonitorValeDomain = state =>
  state.get('monitorVale', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by MonitorVale
 */

const makeSelectMonitorVale = () =>
  createSelector(selectMonitorValeDomain, substate => substate.toJS());

export default makeSelectMonitorVale;
export { selectMonitorValeDomain };
