import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the configuracionJerarquia state domain
 */

const selectConfiguracionJerarquiaDomain = state =>
  state.get('configuracionJerarquia', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ConfiguracionJerarquia
 */

const makeSelectConfiguracionJerarquia = () =>
  createSelector(selectConfiguracionJerarquiaDomain, substate =>
    substate.toJS(),
  );

export default makeSelectConfiguracionJerarquia;
export { selectConfiguracionJerarquiaDomain };
