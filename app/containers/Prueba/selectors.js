import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the prueba state domain
 */

const selectPruebaDomain = state => state.get('prueba', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Prueba
 */

const makeSelectPrueba = () =>
  createSelector(selectPruebaDomain, substate => substate.toJS());

export default makeSelectPrueba;
export { selectPruebaDomain };
