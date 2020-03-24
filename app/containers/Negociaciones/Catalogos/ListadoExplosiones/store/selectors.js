import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the negociaciones state domain
 */

const selectNegociacionesDomain = state =>
  state.get('negociaciones', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Negociaciones
 */

const makeSelectNegociaciones = () =>
  createSelector(selectNegociacionesDomain, substate => substate.toJS());

export default makeSelectNegociaciones;
export { selectNegociacionesDomain };
