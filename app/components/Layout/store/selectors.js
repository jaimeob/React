import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the main state domain
 */

const selectLayoutDomain = state => state.get('layout', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Main
 */

const makeSelectMain = () =>
  createSelector(selectLayoutDomain, substate => substate.toJS());

export default makeSelectMain;
export { selectLayoutDomain };
