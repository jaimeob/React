/*
 *
 * ConfiguracionBono reducer
 *
 */

import { fromJS, List } from 'immutable';
import { DEFAULT_ACTION } from './constants';
import STATE from './state';
import ACTIONS from './actions';

export const initialState = fromJS(STATE);

const {
  SET_CONFIGURACION_BONO,
  SET_LISTADO_FILTER,
  SET_ROWS_PER_PAGE,
  SET_OPEN_SEARCH,
  SET_SEARCH_TEXT,
  SET_STEPPER,
  SET_OPEN_FILTER,
  SET_TEXTFIELD_GRUPO,
  SET_TEXTFIELD_DIAS,
  SET_MENSAJE_LABEL,
  SET_OPENMODULOSALIR,
  SET_PUESTOS,
  SET_PUESTOS_ASIGNADOS,
  SET_PUESTOS_DRAG,
  SET_PERMISOS,
  SET_SELECTED,
  SET_OPEN_MENU_CONTEXTUAL,
  SET_ID,
  SET_ACTIVAR_REGISTROS,
  SET_OPEN_MODAL,
  SET_VACIO_NOMBRE,
  SET_LISTADO,
  SET_NOMBRE_SIN_ACTUALIZAR,
  SET_PAGE,
  SET_MODULOSDISABLE,
} = ACTIONS.getConstants()

function configuracionBonoReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
      
    case SET_CONFIGURACION_BONO:
      
      return state.setIn(['modulosTabla','data'], List(action.datos))
    case SET_LISTADO_FILTER: {
      return state.setIn(['modulosTabla', 'filterData'], List(action.datos))
    }
    case SET_ROWS_PER_PAGE: {
      return state.setIn(['modulosTabla', 'rowsPerPage'], action.datos)
    }
    case SET_OPEN_SEARCH: {
      return state.setIn(['modulosTabla', 'openSearch'], action.datos)
    }
    case SET_SEARCH_TEXT: {
      return state.setIn(['modulosTabla', 'searchText'], action.datos)
    }
    case SET_STEPPER: {
      return state.setIn(['modulosTabla', 'stepper'], action.datos)
    }
    case SET_OPEN_FILTER: {
      return state.setIn(['modulosTabla', 'open'], action.datos)
    }
    case SET_TEXTFIELD_GRUPO:{
      return state.setIn(['nuevoModulo', 'textFieldGrupo'], action.datos)
    }
    case SET_TEXTFIELD_DIAS:{
      return state.setIn(['nuevoModulo', 'textFieldDias'], action.datos)
    }
    case SET_MENSAJE_LABEL:{
      let mensajeLabelGrupo =''
      let mensajeLabelDias =''
      
      if(action.campo==='nombreGrupo'){
        if(action.datos===true && action.valor.length === 0){
          mensajeLabelGrupo='Favor de capturar el nombre del grupo.'
        } else if (action.datos===true && action.valor.length > 0) {
          mensajeLabelGrupo=`El nombre del grupo ${action.valor} ya se encuentra registrado.`
        } else if(action.datos===false){
          mensajeLabelGrupo='Requerido*'
        }
      } else if( action.campo === 'dias') {
        if(action.datos===true && action.valor.length === 0){
          mensajeLabelDias='Indique la cantidad de días para el bono'
        } else if(action.datos===false){
          mensajeLabelDias='Requerido*'
        }
      }
      
      return action.campo==='nombreGrupo' ? state.setIn(['nuevoModulo', 'vacioGrupo'], action.datos)
        .setIn(['nuevoModulo', 'mensajeLabelGrupo'], mensajeLabelGrupo) : state.setIn(['nuevoModulo', 'vacioDias'], action.datos)
        .setIn(['nuevoModulo', 'mensajeLabelDias'], mensajeLabelDias)
    }
    case SET_OPENMODULOSALIR:{
      return state.setIn(['nuevoModulo', 'openModalAddModulo'], action.datos)
    }
    case SET_PUESTOS:{
      return state.setIn(['nuevoModulo', 'puestos'], List(action.datos))
    }
    case SET_PUESTOS_DRAG:{
      return state.setIn(['nuevoModulo', 'puestosIds'], List(action.datos))
    }
    case SET_PUESTOS_ASIGNADOS:{
      return state.setIn(['nuevoModulo', 'puestosAsigandos'], List(action.datos))
    }
    case SET_PERMISOS: {
      return state.setIn([
        'permisos',
      ], fromJS(action.payload));
    }
    case SET_SELECTED: {
      return state.setIn(['modulosTabla', 'selected'], List(action.datos))
    }
    case SET_OPEN_MENU_CONTEXTUAL: {
      return state.setIn(['modulosTabla', 'openMenuContextual'], action.datos)
    }
    case SET_ID:{
      return state.setIn(['nuevoModulo', 'idConfiguracionBono'], action.datos)
    }
    case SET_ACTIVAR_REGISTROS: {
      return state.setIn(['modulosTabla', 'activarRegistros'], action.datos)
    }
    case SET_OPEN_MODAL: {
      return state.setIn(['modulosTabla', 'openModal'], action.datos)
    }
    case SET_VACIO_NOMBRE:{
      let mensajeLabelGrupo =''
      let mensajeLabelDias =''
      // console.log('action',action);
      if(action.control==='nombreGrupo'){
        if(action.datos===true && action.nombre.length === 0){
          mensajeLabelGrupo='Favor de capturar el nombre del grupo.'
        } else if (action.datos===true && action.nombre.length > 0) {
          mensajeLabelGrupo=`El nombre del grupo ${action.nombre} ya se encuentra registrado.`
        } else if(action.datos===false){
          mensajeLabelGrupo='Requerido*'
        }
      } else if( action.control === 'dias') {
        if(action.datos===true && action.nombre.length === 0){
          mensajeLabelDias='Indique la cantidad de días para el bono'
        } else if(action.datos===false){
          mensajeLabelDias='Requerido*'
        }
      }
      
      return action.control==='nombreGrupo' ? state.setIn(['nuevoModulo', 'vacioGrupo'], action.datos)
        .setIn(['nuevoModulo', 'mensajeLabelGrupo'], mensajeLabelGrupo) : state.setIn(['nuevoModulo', 'vacioDias'], action.datos)
        .setIn(['nuevoModulo', 'mensajeLabelDias'], mensajeLabelDias)
    }
    case SET_LISTADO: {
      return state.setIn(['modulosTabla', 'data'], List(action.datos))
    }
    case SET_NOMBRE_SIN_ACTUALIZAR:{
      return state.setIn(['nuevoModulo', 'nombreSinActualizar'], action.datos)
    }
    case SET_PAGE: {
      return state.setIn(['modulosTabla', 'page'], action.datos)
    }
    case SET_MODULOSDISABLE:{
      return state.setIn(['nuevoModulo', 'moduloSoloLectura'], action.datos)
    }
    default:
      return state;
  }
}



export default configuracionBonoReducer;
