import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the porcentajeCumplimiento state domain
 */

const selectPorcentajeCumplimientoDomain = state =>
  state.get('porcentajeCumplimiento', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by PorcentajeCumplimiento
 */

const makeSelectPorcentajeCumplimiento = () =>
  createSelector(selectPorcentajeCumplimientoDomain, substate =>
    substate.toJS(),
  );

export default makeSelectPorcentajeCumplimiento;
export { selectPorcentajeCumplimientoDomain };
