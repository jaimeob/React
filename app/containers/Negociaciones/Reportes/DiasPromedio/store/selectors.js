import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the diasPromedio state domain
 */

const selectDiasPromedioDomain = state =>
  state.get('diasPromedio', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by DiasPromedio
 */

const makeSelectDiasPromedio = () =>
  createSelector(selectDiasPromedioDomain, substate => substate.toJS());

export default makeSelectDiasPromedio;
export { selectDiasPromedioDomain };
