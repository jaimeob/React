import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the transformacion state domain
 */

const selectTransformacionDomain = state =>
  state.get('transformacion', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Transformacion
 */

const makeSelectTransformacion = () =>
  createSelector(selectTransformacionDomain, substate => substate.toJS());

export default makeSelectTransformacion;
export { selectTransformacionDomain };
