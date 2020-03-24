import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the cargaCarteraFovisste state domain
 */

// const selectCargaCarteraFovissteDomain = state =>
//   state.get('cargaCarteraFovisste', initialState);

const selectCargaGeneralDomain = state =>
  state.get('cargaGeneral', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by CargaCarteraFovisste
 */

// const makeSelectCargaCarteraFovisste = () =>
//   createSelector(selectCargaCarteraFovissteDomain, substate => substate.toJS());
const makeSelectCargaGeneral = () =>
  createSelector(selectCargaGeneralDomain, substate => substate.toJS());

export {
  // makeSelectCargaCarteraFovisste,
  makeSelectCargaGeneral,
};
export {
  // selectCargaCarteraFovissteDomain,
  selectCargaGeneralDomain,
};
