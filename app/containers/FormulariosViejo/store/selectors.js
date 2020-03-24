import { selectMainDomain } from 'containers/Main/store/selectors';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the formularios state domain
 */

const selectFormulariosDomain = state => state.get('formularios', initialState);
// const selectMainDomain = state => state.get('main', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Formularios
 */


const makeSelectFormularios = () =>
  createSelector(
    selectFormulariosDomain,
    selectMainDomain,
    (substate, mainstate) => ({
      ...substate.toJS(),
      main: mainstate.toJS(),
      // tiposComponentes: mainstate.getIn(componentesPath).toJS(),
    }));

const makeSelectOnlyFormularios = () =>
  createSelector(
    selectFormulariosDomain,
    (formularios) => formularios.toJS(),
  )

export default makeSelectFormularios;
export {
  selectFormulariosDomain,
  makeSelectOnlyFormularios,
};
