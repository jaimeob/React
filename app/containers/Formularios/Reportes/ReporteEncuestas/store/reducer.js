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
  SET_USUARIOS_EVALUADOS,
  SET_USUARIOS_EVALUADORES,
  LIMPIAR_ESTADO,
  SET_USUARIOS_AUTORIZADOS,
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
      
      const arreglo = selected || [];
      const lista = [];

      for (let i = 0; i < arreglo.length; i+=1) {
        lista.push(
          {
            seleccionado: false,
            ...selected[i],
          }
        )
      }

      if(index === 1){
        // Dejar seleccionados los puestos dependiendo del departamento
        const puestosSeleccionados = state.getIn([
          'encuestasNuevo', 
          'frontend', 
          'puestosSeleccionados',
        ]).toJS().filter(el => lista.some(elem => elem.value === el.idDepartamento));
    
        return state.setIn([
          'encuestasNuevo',
          'frontend',
          'departamentosSeleccionados',
        ], List(lista))
          .setIn([
            'encuestasNuevo',
            'frontend',
            'puestosSeleccionados',
          ], List(puestosSeleccionados))
      }
      
      if(index === 2){
        return state.setIn([
          'encuestasNuevo',
          'frontend',
          'puestosSeleccionados',
        ], List(lista))
      }

      if(index === 3){
        return state.setIn([
          'encuestasNuevo',
          'frontend',
          'usuariosEvaluadosSeleccionados',
        ], List(lista))
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
      return state.setIn([
        'encuestasNuevo',
        'backend',
        'asignacion',
      ], fromJS(action.data))
        .setIn(['stepper'], 1)
    }
    case SET_USUARIOS_EVALUADOS: {
      return state.setIn([
        'encuestasNuevo',
        'backend',
        'usuariosEvaluados',
      ], List(action.usuariosEvaluados))
    }
    case SET_USUARIOS_EVALUADORES: {
      return state.setIn([
        'encuestasNuevo',
        'backend',
        'usuariosEvaluadores',
      ], List(action.usuariosEvaluadores))
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
    }
    case SET_USUARIOS_AUTORIZADOS: {
      return state.setIn([
        'encuestasNuevo',
        'backend',
        'usuariosAutorizados',
      ], List(action.usuariosAutorizados))
    }
    default:
      return state;
  }
}

export default reporteEncuestasReducer;
