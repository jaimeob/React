import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the appRoot state domain
 */

const selectAppRootDomain = state => state.get('global', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AppRoot
 */

const makeSelectAppRoot = () =>
  createSelector(selectAppRootDomain, substate => substate.toJS());

export default makeSelectAppRoot;
export { selectAppRootDomain };
