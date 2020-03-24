import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the prestamo state domain
 */

const selectPrestamoDomain = state =>
  state.get('prestamo', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Prestamo
 */

const makeSelectPrestamo = () =>
  createSelector(selectPrestamoDomain, substate => substate.toJS());

export default makeSelectPrestamo;
export { selectPrestamoDomain };
