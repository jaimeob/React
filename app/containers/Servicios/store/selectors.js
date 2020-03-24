import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the servicios state domain
 */

const selectServiciosDomain = state => state.get('servicios', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Servicios
 */

const makeSelectServicios = () =>
  createSelector(selectServiciosDomain, substate => substate.toJS());

export default makeSelectServicios;
export { selectServiciosDomain };
