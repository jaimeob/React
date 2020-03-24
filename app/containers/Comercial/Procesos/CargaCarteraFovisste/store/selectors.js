import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the cargaCarteraFovisste state domain
 */

const selectCargaCarteraFovissteDomain = state =>
  state.get('cargaCarteraFovisste', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by CargaCarteraFovisste
 */

const makeSelectCargaCarteraFovisste = () =>
  createSelector(selectCargaCarteraFovissteDomain, substate => substate.toJS());

export default makeSelectCargaCarteraFovisste;
export { selectCargaCarteraFovissteDomain };
