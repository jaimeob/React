import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the indicadores state domain
 */

const selectIndicadoresDomain = state => state.get('indicadores', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Indicadores
 */

const makeSelectIndicadores = () =>
  createSelector(selectIndicadoresDomain, substate => substate.toJS());

export default makeSelectIndicadores;
export { selectIndicadoresDomain };
