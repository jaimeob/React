import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the configuracionTransformacion state domain
 */

const selectConfiguracionTransformacionDomain = state =>
  state.get('configuracionTransformacion', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ConfiguracionTransformacion
 */

const makeSelectConfiguracionTransformacion = () =>
  createSelector(selectConfiguracionTransformacionDomain, substate =>
    substate.toJS(),
  );

export default makeSelectConfiguracionTransformacion;
export { selectConfiguracionTransformacionDomain };
