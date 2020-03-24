import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the usuariosAlmacenes state domain
 */

const selectUsuariosAlmacenesDomain = state => state.get('usuariosAlmacenes', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ListadoUsuariosAlmacenes
 */

const makeSelectUsuariosAlmacenes = () =>
  createSelector(selectUsuariosAlmacenesDomain, substate => substate.toJS());

export default makeSelectUsuariosAlmacenes;
export { selectUsuariosAlmacenesDomain };
