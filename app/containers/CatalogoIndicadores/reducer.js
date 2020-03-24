/*
 *
 * CatalogoIndicadores reducer
 *
 */

import { fromJS, List } from 'immutable';
import { DEFAULT_ACTION } from './constants';
import STATE from './state';
import ACTIONS from './actions';

export const initialState = fromJS(STATE);

const {
  SET_LISTADO_FILTER,
  SET_ROWS_PER_PAGE,
  SET_OPEN_SEARCH,
  SET_SEARCH_TEXT,
  SET_STEPPER,
  SET_OPEN_FILTER,
  SET_MENSAJE_LABEL,
  SET_OPENMODULOSALIR,
  SET_TEXTFIELD_NOMBRE,
  SET_TEXTFIELD_DESCRIPCION,
  SET_SELECTED,
  SET_LISTADO,
  SET_PAGE,
  SET_ACTUALIZA,
  SET_ID,
  SET_ACTIVAR_REGISTROS,
  SET_OPEN_MODAL,
  SET_OPEN_MENU_CONTEXTUAL,
  SET_NOMBRE_SIN_ACTUALIZAR,
  SET_VACIO_NOMBRE,
  SET_PERMISOS,
  SET_MODO_LECTURA,
} = ACTIONS.getConstants()

function catalogoIndicadoresReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_OPEN_SEARCH: {
      return state.setIn(['modulosTabla', 'openSearch'], action.datos)
    }
    case SET_SEARCH_TEXT: {
      return state.setIn(['modulosTabla', 'searchText'], action.datos)
    }
    case SET_LISTADO_FILTER: {
      return state.setIn(['modulosTabla', 'filterData'], List(action.datos))
    }
    case SET_OPEN_FILTER: {
      return state.setIn(['modulosTabla', 'open'], action.datos)
    }
    case SET_ROWS_PER_PAGE: {
      return state.setIn(['modulosTabla', 'rowsPerPage'], action.datos)
    }
    case SET_STEPPER: {
      return state.setIn(['modulosTabla', 'stepper'], action.datos)
    }
    case SET_MENSAJE_LABEL:{
      let mensajeLabelGrupo =''
      let mensajeLabelDias =''
      
      if(action.campo==='indicador'){
        if(action.datos===true && action.valor.length === 0){
          mensajeLabelGrupo='Favor de capturar el nombre del grupo.'
        } else if (action.datos===true && action.valor.length > 0) {
          mensajeLabelGrupo=`El grupo ${action.valor} ya existe.`
        } else if(action.datos===false){
          mensajeLabelGrupo='Requerido*'
        }
      } else if( action.campo === 'dias') {
        if(action.datos===true && action.valor.length === 0){
          mensajeLabelDias='Favor de capturar la cantidad de dias para el bono.'
        } else if(action.datos===false){
          mensajeLabelDias='Requerido*'
        }
      }
      
      return action.campo==='indicador' ? state.setIn(['nuevoModulo', 'vacioGrupo'], action.datos)
        .setIn(['nuevoModulo', 'mensajeLabelGrupo'], mensajeLabelGrupo) : state.setIn(['nuevoModulo', 'vacioDias'], action.datos)
        .setIn(['nuevoModulo', 'mensajeLabelDias'], mensajeLabelDias)
    }
    case SET_OPENMODULOSALIR:{
      return state.setIn(['nuevoModulo', 'openModalAddModulo'], action.datos)
    }
    case SET_TEXTFIELD_NOMBRE:{
      return state.setIn(['nuevoModulo', 'textFieldNombre'], action.datos)
    }
    case SET_TEXTFIELD_DESCRIPCION:{
      return state.setIn(['nuevoModulo', 'textFieldDescripcion'], action.datos)
    }
    case SET_SELECTED: {
      return state.setIn(['modulosTabla', 'selected'], List(action.datos))
    }
    case SET_LISTADO: {
      return state.setIn(['modulosTabla', 'data'], List(action.datos))
    }
    case SET_PAGE: {
      return state.setIn(['modulosTabla', 'page'], action.datos)
    }
    case SET_ACTUALIZA:{
      return state.setIn(['nuevoModulo', 'actualizaFuncion'], action.datos)
    }
    case SET_ID:{
      return state.setIn(['nuevoModulo', 'idIndicador'], action.datos)
    }
    case SET_ACTIVAR_REGISTROS: {
      return state.setIn(['modulosTabla', 'activarRegistros'], action.datos)
    }
    case SET_OPEN_MODAL: {
      return state.setIn(['modulosTabla', 'openModal'], action.datos)
    }
    case SET_OPEN_MENU_CONTEXTUAL: {
      return state.setIn(['modulosTabla', 'openMenuContextual'], action.datos)
    }
    case SET_NOMBRE_SIN_ACTUALIZAR:{
      return state.setIn(['nuevoModulo', 'nombreSinActualizar'], action.datos)
    }
    case SET_VACIO_NOMBRE:{
      let nombreLabel ='';
      if(action.datos===true && action.nombre.length === 0){
        nombreLabel='Favor de capturar Nombre indicador';
      } else if (action.datos===true && action.nombre.length > 0) {
        nombreLabel=`El indicador ${action.nombre} ya existe.`;
      } else if(action.datos===false){
        nombreLabel='Requerido*';
      }
      return state.setIn(['nuevoModulo', 'vacioGrupo'], action.datos)
        .setIn(['nuevoModulo', 'mensajeLabelGrupo'], nombreLabel)
    }
    case SET_PERMISOS: {
      return state.setIn([
        'permisos',
      ], fromJS(action.payload));
    }
    case SET_MODO_LECTURA:{
      if(action.datos===true){
        action.datos=false;
      } else if(action.datos===false) {
        action.datos=true;
      }
      
      return state.setIn(['nuevoModulo', 'moduloSoloLectura'], action.datos)
    }
    default:
      return state;
  }
}


export default catalogoIndicadoresReducer;
