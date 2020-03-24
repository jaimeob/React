import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the configuracionIndicadores state domain
 */

const selectConfiguracionIndicadoresDomain = state =>
  state.get('configuracionIndicadores', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ConfiguracionIndicadores
 */

const makeSelectConfiguracionIndicadores = () =>
  createSelector(selectConfiguracionIndicadoresDomain, substate =>
    substate.toJS(),
  );

export default makeSelectConfiguracionIndicadores;
export { selectConfiguracionIndicadoresDomain };
