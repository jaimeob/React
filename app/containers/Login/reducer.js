/*
 *
 * Login reducer
 *
 */

import { fromJS } from 'immutable';
import Actions from './actions';
import STATE from './state';

export const initialState = fromJS(STATE);
export const {
  DEFAULT,
  SET_USUARIO_DOMINIO,
  SET_CONTRASENA,
  SET_LOADING,
  SET_USUARIO_IMAGEN,
} = Actions.getConstants();

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT:
      return state;
    case SET_USUARIO_DOMINIO: {
      return state.setIn(['usuario', 'usuarioDominio'], action.datos)
    }
    case SET_CONTRASENA: {
      return state.setIn(['usuario', 'contrasena'], action.datos)
    }
    case SET_LOADING: {
      return state.setIn(['usuario', 'loading'], action.datos)
    }
    case SET_USUARIO_IMAGEN: {
      return state.setIn(['usuario', 'usuarioImagen'], action.datos)
    }
    default:
      return state;
  }
}

export default loginReducer;
