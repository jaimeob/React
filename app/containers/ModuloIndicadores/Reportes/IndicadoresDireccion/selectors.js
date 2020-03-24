import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the indicadoresDireccion state domain
 */

const selectIndicadoresDireccionDomain = state =>
  state.get('indicadoresDireccion', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by IndicadoresDireccion
 */

const makeSelectIndicadoresDireccion = () =>
  createSelector(selectIndicadoresDireccionDomain, substate => substate.toJS());

export default makeSelectIndicadoresDireccion;
export { selectIndicadoresDireccionDomain };
