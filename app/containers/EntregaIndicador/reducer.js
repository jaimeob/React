/*
 *
 * EntregaIndicador reducer
 *
 */

import { fromJS, List } from 'immutable';
import { DEFAULT_ACTION } from './constants';
import STATE from './state';
import ACTIONS from './actions';
import { Satellite } from '@material-ui/icons';

export const initialState = fromJS(STATE);

const {
  SET_PERMISOS,
  SET_ENTREGA_INDICADOR,
  SET_SELECTED,
  SET_VALORES_ETIQUETAS,
  SET_SELECTED_DIRECCION,
  SET_COMBOS_FILTROS,
  ON_CHANGE_PARAMETROS,
} = ACTIONS.getConstants()

function entregaIndicadorReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_PERMISOS: {
      return state.setIn([
        'permisos',
      ], fromJS(action.payload));
    }
    case SET_ENTREGA_INDICADOR: {
      return state.setIn([
        'listadoEntregaIndicador','backend','data',
      ], List(action.datos));
    }
    case SET_SELECTED :{
      return state.setIn(['selected'],action.datos)
    }
    case SET_VALORES_ETIQUETAS :{
      return state.setIn(['totalEvaluados'],action.totalEvaluados)
        .setIn(['aplicaBono'],action.aplicaBono)
        .setIn(['pendienteEntrega'],action.pendienteEntrega)
    }
    case SET_SELECTED_DIRECCION:{
      return state.setIn(['selectDireccion'], fromJS(action.datos))
    }
    case SET_COMBOS_FILTROS:{
      return state.setIn(['Direccion'], List(action.datos.direccion[0]))
        .setIn(['Plaza'], List(action.datos.plaza[0]))
        .setIn(['Departamento'], List(action.datos.departamento[0]))
        .setIn(['Puesto'], List(action.datos.puesto[0]))
    }
    case ON_CHANGE_PARAMETROS:{
  
      let arreglo = action.valor || [];
      let filtros = [];
      if(action.campo===1){
        filtros = arreglo.map(el=> el.label);
        return state.setIn(['selectDireccion'], arreglo ).setIn(['filtroDireccion'], filtros)
      } 
      if(action.campo===2){
        filtros = arreglo.map(el=> el.label);
        return state.setIn(['selectPlaza'], arreglo).setIn(['filtroPlaza'], filtros)
      } 
      if(action.campo===3){
        filtros = arreglo.map(el=> el.label);
        return state.setIn(['selectDepartamento'], arreglo).setIn(['filtroDepartamento'], filtros)
      } 
      if(action.campo===4){
        filtros = arreglo.map(el=> el.label);
        return state.setIn(['selectPuesto'], arreglo).setIn(['filtroPuesto'], filtros)
      }
      if(action.campo===5){
        arreglo = []
        filtros = []
        return state.setIn(['selectDireccion'], arreglo ).setIn(['filtroDireccion'], filtros)
          .setIn(['selectPlaza'], arreglo).setIn(['filtroPlaza'], filtros)
          .setIn(['selectDepartamento'], arreglo).setIn(['filtroDepartamento'], filtros)
          .setIn(['selectPuesto'], arreglo).setIn(['filtroPuesto'], filtros)
          .setIn(['selectEstatus'], arreglo).setIn(['filtroEstatus'], filtros)
      }
      if(action.campo===6){
        arreglo=[action.valor.target.value]
        return state.setIn(['selectEstatus'], arreglo).setIn(['filtroEstatus'], arreglo)
      }
      return state;
    }
    default:
      return state;
  }
}

export default entregaIndicadorReducer;
