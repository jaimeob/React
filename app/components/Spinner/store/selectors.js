import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the spinner state domain
 */

const selectSpinnerDomain = state =>
  state.get('spinner', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by spinner
 */

const makeSelectSpinner = () =>
  createSelector(selectSpinnerDomain, substate =>
    substate.toJS(),
  );

export default makeSelectSpinner;
export { selectSpinnerDomain };
