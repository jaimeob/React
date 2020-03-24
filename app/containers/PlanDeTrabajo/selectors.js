import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the planDeTrabajo state domain
 */

const selectPlanDeTrabajoDomain = state =>
  state.get('planDeTrabajo', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by PlanDeTrabajo
 */

const makeSelectPlanDeTrabajo = () =>
  createSelector(selectPlanDeTrabajoDomain, substate => substate.toJS());

export default makeSelectPlanDeTrabajo;
export { selectPlanDeTrabajoDomain };
