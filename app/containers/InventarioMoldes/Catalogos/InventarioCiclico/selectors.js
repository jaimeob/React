import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the inventarioCiclico state domain
 */

const selectInventarioCiclicoDomain = state =>
  state.get('inventarioCiclico', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by InventarioCiclico
 */

const makeSelectInventarioCiclico = () =>
  createSelector(selectInventarioCiclicoDomain, substate => substate.toJS());

export default makeSelectInventarioCiclico;
export { selectInventarioCiclicoDomain };
