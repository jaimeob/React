import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the configuracionCamposEspeciales state domain
 */

const selectConfiguracionCamposEspecialesDomain = state =>
  state.get('configuracionCamposEspeciales', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ConfiguracionCamposEspeciales
 */

const makeSelectConfiguracionCamposEspeciales = () =>
  createSelector(selectConfiguracionCamposEspecialesDomain, substate =>
    substate.toJS(),
  );

export default makeSelectConfiguracionCamposEspeciales;
export { selectConfiguracionCamposEspecialesDomain };
