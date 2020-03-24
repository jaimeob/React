/*
 *
 * Mantenimientos reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION } from './constants';
// import { array } from 'prop-types';
import Actions from './actions';
import STATE from './state';

export const {
  SET_DATOS_MANTENIMIENTOS,
  SET_DATOS_DETALLE,
  SET_USUARIO,
  SET_SELECCIONADO,
  LIMPIAR_STATE,
} = Actions.getConstants();

export const initialState = fromJS(STATE);

function mantenimientosReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case  LIMPIAR_STATE:
      return initialState;
    case SET_DATOS_MANTENIMIENTOS: {
      return state.updateIn(
        [
          'configuracion',
          'datosMantenimiento',
        ],
        stt => stt.merge({
          datos: fromJS(action.datos),
        })
      )
    }
    case SET_DATOS_DETALLE: {
      return state.setIn(['configuracion','datosDetalle'], action.datos)
    }
    case SET_USUARIO: {
      return state.setIn(['usuarioLogeado'], action.usuarioId)
    }
    case SET_SELECCIONADO: {
      return state.setIn(['configuracion','rowSeleccionado'], action.rowSeleccionado)
        .setIn(['configuracion','habilitarExportar'], action.rowSeleccionado.length>0)
    }
    
    default:
      return state;
  }
}

export default mantenimientosReducer;

