/*
 *
 * ReporteEncuestas reducer
 *
 */

import { fromJS, List } from 'immutable';
import Actions from './actions';
import STATE from './state';

export const initialState = fromJS(STATE);
export const {
  DEFAULT,
  SET_MODAL_BACK,
  SET_DEPARTAMENTOS_PUESTOS,
  ON_CHANGE_COMBO,
  SET_ENCUESTAS,
  SET_ENCUESTA_DETALLE,
  SET_USUARIOS_ASIGNADOS,
  LIMPIAR_ESTADO,
  OPEN_MODAL,
  CLOSE_MODAL,
  SET_USUARIOS,
} = Actions.getConstants();

function reporteEncuestasReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT: {
      return state;
    }
    case SET_MODAL_BACK: {
      return state.setIn([
        'stepper',
      ], 0)
        .setIn([
          'encuestasNuevo',
          'frontend',
          'usuario',
        ], null)
        .setIn([
          'encuestasNuevo',
          'frontend',
          'comentario',
        ], null)
        .setIn([
          'encuestasNuevo',
          'frontend',
          'estatus',
        ], null)

    }
    case SET_DEPARTAMENTOS_PUESTOS: {
      return state.setIn([
        'encuestasNuevo',
        'backend',
        'departamentos',
      ], action.departamentos)
        .setIn([
          'encuestasNuevo',
          'backend',
          'puestos',
        ], action.puestos)
    }
    case ON_CHANGE_COMBO: {
      const {
        index,
        selected,
      } = action;
      
      if(index === 1){
    
        return state.setIn([
          'encuestasNuevo',
          'frontend',
          'usuario',
        ], selected)
          .setIn([
            'show',
          ], true)
      }

      if(index === 2){
    
        return state.setIn([
          'encuestasNuevo',
          'frontend',
          'comentario',
        ], selected)
      }

      return state;
    }
    case SET_ENCUESTAS: {
      return state.setIn([
        'encuestasTabla',
        'backend',
        'data',
      ], List(action.data))
    }
    case SET_ENCUESTA_DETALLE: {
      if(action.data.UsuarioValidado) {
        const usuario = action.data.UsuariosAsignaciones.filter(user => action.data.UsuarioValidado === user.value)
        return state.setIn([
          'encuestasNuevo',
          'backend',
          'reporte',
        ], fromJS(action.data))
          .setIn(['stepper'], 1)
          .setIn([
            'encuestasNuevo',
            'frontend',
            'idAsignacion',
          ], action.idAsignacion)
          .setIn([
            'encuestasNuevo',
            'frontend',
            'usuario',
          ], usuario)
      // eslint-disable-next-line no-else-return
      } else {
        return state.setIn([
          'encuestasNuevo',
          'backend',
          'reporte',
        ], fromJS(action.data))
          .setIn(['stepper'], 1)
          .setIn([
            'encuestasNuevo',
            'frontend',
            'idAsignacion',
          ], action.idAsignacion)
      }

    }
    case SET_USUARIOS_ASIGNADOS: {
      return state.setIn([
        'encuestasNuevo',
        'backend',
        'usuariosAsignados',
      ], action.usuariosAsignados.filter(usuario => usuario.Respondido))
    }
    case LIMPIAR_ESTADO: {
      return state.setIn([
        'encuestasNuevo',
        'frontend',
        'departamentosSeleccionados',
      ], List([]))
        .setIn([
          'encuestasNuevo',
          'frontend',
          'puestosSeleccionados',
        ], List([]))
        .setIn([
          'encuestasNuevo',
          'frontend',
          'usuariosAsignadosSeleccionados',
        ], List([]))    
        .setIn([
          'stepper',
        ], 0)
        .setIn([
          'encuestasNuevo',
          'frontend',
          'usuario',
        ], null)
        .setIn([
          'encuestasNuevo',
          'frontend',
          'comentario',
        ], null)
        .setIn([
          'encuestasNuevo',
          'frontend',
          'estatus',
        ], null)
    }
    case SET_USUARIOS: {
      return state.setIn([
        'encuestasNuevo',
        'backend',
        'usuarios',
      ], action.usuarios)
    }
    case OPEN_MODAL: {
      return state.setIn([
        'modal',
        'open',
      ], true)
        .setIn([
          'encuestasNuevo',
          'frontend',
          'estatus',
        ], action.referencia)
    }
    case CLOSE_MODAL: {
      return state.setIn([
        'modal',
        'open',
      ], false)
    }
    default:
      return state;
  }
}

export default reporteEncuestasReducer;
