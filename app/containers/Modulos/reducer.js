/*
 *
 * Modulos reducer
 *
 */

import { fromJS, List } from 'immutable';
import Actions from './actions';
import STATE from './state';

export const initialState = fromJS(STATE);
export const {
  DEFAULT,
  SET_LISTADO,
  SET_LISTADO_FILTER,
  SET_SELECTED,
  SET_OPEN_SEARCH,
  SET_SEARCH_TEXT,
  SET_OPEN_FILTER,
  SET_OPEN_MENU_CONTEXTUAL,
  SET_OPEN_MODAL,
  SET_ORDER,
  SET_ORDER_BY,
  SET_PAGE,
  SET_ROWS_PER_PAGE,
  SET_STEPPER,
  SET_STEPPERADDMODULO,
  SET_LISTADO_ACTIVAR,
  SET_LISTADO_DESACTIVAR,
  SET_ACTIVAR_REGISTROS,
  SET_TEXTO_MODAL,
  SET_TEXTFIELDMODULO_TEXT,
  SET_TEXTFIELDDESCRIPCION_TEXT,
  SET_TEXTFIELDNOMBREFUNCION_TEXT,
  SET_TIPOAGRUPADORES_TEXT,
  SET_TIPOAGRUPADORES,
  SET_URLFUNCION_SELECT,
  SET_URLFUNCION,
  SET_ERROR,
  SET_VACIO_NOMBRE_MODULO,
  SET_OPENMODULOSALIR,
  SET_OPENMODULOSALIRFUNCION,
  SET_VISUALIZATABLA,
  SET_DATOSGUARDAR,
  SET_ACTUALIZAFUNCION,
  SET_SELECTTIPOAGRUPADOR,
  SET_SELECTURLFUNCION,
  SET_IDMODULO,
  SET_MODALFUNCIONESDISABLE,
  SET_MODULOSDISABLE,
  SET_NOMBREMODULOSINACTUALIZAR,
  SET_ELIMINAR_EMPRESA,
  SET_ACTIVAR_EMPRESA,
} = Actions.getConstants();

function modulosReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT:
      return state;
    case SET_LISTADO: {
      return state.setIn(['modulosTabla', 'data'], List(action.datos))
    }
    case SET_LISTADO_FILTER: {
      return state.setIn(['modulosTabla', 'filterData'], List(action.datos))
    }
    case SET_SELECTED: {
      return state.setIn(['modulosTabla', 'selected'], List(action.datos))
    }
    case SET_DATOSGUARDAR: {
      return state.setIn(['nuevoModulo', 'datosGuardar'], List(action.datos))
    }
    case SET_OPEN_SEARCH: {
      return state.setIn(['modulosTabla', 'openSearch'], action.datos)
    }
    case SET_SEARCH_TEXT: {
      return state.setIn(['modulosTabla', 'searchText'], action.datos)
    }
    case SET_OPEN_FILTER: {
      return state.setIn(['modulosTabla', 'open'], action.datos)
    }
    case SET_OPEN_MENU_CONTEXTUAL: {
      return state.setIn(['modulosTabla', 'openMenuContextual'], action.datos)
    }
    case SET_OPEN_MODAL: {
      return state.setIn(['modulosTabla', 'openModal'], action.datos)
    }
    case SET_ORDER: {
      return state.setIn(['modulosTabla', 'order'], action.datos)
    }
    case SET_ORDER_BY: {
      return state.setIn(['modulosTabla', 'orderBy'], action.datos)
    }
    case SET_PAGE: {
      return state.setIn(['modulosTabla', 'page'], action.datos)
    }
    case SET_ROWS_PER_PAGE: {
      return state.setIn(['modulosTabla', 'rowsPerPage'], action.datos)
    }
    case SET_STEPPER: {
      return state.setIn(['modulosTabla', 'stepper'], action.datos)
    }
    case SET_STEPPERADDMODULO: {
      return state.setIn(['nuevoModulo', 'openM'], action.datos)
    }
    case SET_ACTIVAR_REGISTROS: {
      return state.setIn(['modulosTabla', 'activarRegistros'], action.datos)
    }
    case SET_TEXTO_MODAL: {
      return state.setIn(['modulosTabla', 'textoModal'], action.datos)
    }
    case SET_TEXTFIELDMODULO_TEXT:{
      return state.setIn(['nuevoModulo', 'textFieldModulo'], action.datos)
    }
    case SET_TEXTFIELDDESCRIPCION_TEXT:{
      return state.setIn(['nuevoModulo', 'textFieldDescripcion'], action.datos)
    }
    case SET_TEXTFIELDNOMBREFUNCION_TEXT:{
      return state.setIn(['nuevoModulo', 'textFieldNombreFuncion'], action.datos)
    }
    case SET_TIPOAGRUPADORES_TEXT:{
      return state.setIn(['nuevoModulo', 'tipoAgrupador'], List(action.datos))
    }
    case SET_TIPOAGRUPADORES:{
      console.log('action.tipoAgrupador',action.tipoAgrupador);
      return state.setIn(['nuevoModulo', 'tipoAgrupadorSlc'], action.tipoAgrupador.key)
        .setIn(['nuevoModulo', 'idtipoagrupador'], action.tipoAgrupador.key)
    }
    case SET_SELECTTIPOAGRUPADOR:{
      return state.setIn(['nuevoModulo', 'tipoAgrupadorSlc'], action.datos)
    }
    case SET_URLFUNCION_SELECT:{
      return state.setIn(['nuevoModulo', 'urlFuncion'], List(action.datos))
    }
    case SET_URLFUNCION:{
      return state.setIn(['nuevoModulo', 'urlFuncionSlc'], action.urlFuncion.key)
        .setIn(['nuevoModulo', 'URLFuncionId'], action.urlFuncion.key)
    }
    case SET_SELECTURLFUNCION:{
      return state.setIn(['nuevoModulo', 'urlFuncionSlc'], action.datos)
    }
    case SET_VACIO_NOMBRE_MODULO:{
      let nombreLabelModulo ='';
      if(action.datos===true && action.nombreModulo.length === 0){
        nombreLabelModulo='Favor de capturar Nombre módulo';
      } else if (action.datos===true && action.nombreModulo.length > 0) {
        nombreLabelModulo=`El modulo ${action.nombreModulo} ya existe.`;
      } else if(action.datos===false){
        nombreLabelModulo='Requerido*';
      }
      return state.setIn(['nuevoModulo', 'vacioNombreModulo'], action.datos)
        .setIn(['nuevoModulo', 'mensajeLabel'], nombreLabelModulo)
    }
    case SET_OPENMODULOSALIR:{
      return state.setIn(['nuevoModulo', 'openModalAddModulo'], action.datos)
    }
    case SET_OPENMODULOSALIRFUNCION:{
      return state.setIn(['nuevoModulo', 'openMensajeSalirFuncion'], action.datos)
    }
    case SET_VISUALIZATABLA:{
      return state.setIn(['nuevoModulo', 'visualizaTabla'], action.datos)
    }
    case SET_ACTUALIZAFUNCION:{
      return state.setIn(['nuevoModulo', 'actualizaFuncion'], action.datos)
    }
    case SET_IDMODULO:{
      return state.setIn(['nuevoModulo', 'IdModulo'], action.datos)
    }
    case SET_MODALFUNCIONESDISABLE:{
      return state.setIn(['nuevoModulo', 'modalFuncionesDisable'], action.datos)
    }
    case SET_MODULOSDISABLE:{
      return state.setIn(['nuevoModulo', 'moduloSoloLectura'], action.datos)
    }
    case SET_NOMBREMODULOSINACTUALIZAR:{
      return state.setIn(['nuevoModulo', 'nombreModuloSinActualizar'], action.datos)
    }
    case SET_ELIMINAR_EMPRESA: {
      const data = state.getIn(['modulosTabla', 'data']).toJS();
      const datosGuardar = state.getIn(['nuevoModulo', 'datosGuardar']).toJS();
      const datosGuardarEliminados = state.getIn(['nuevoModulo', 'datosGuardarEliminados']).toJS();
      console.log('action.datos',action);
      console.log('data',data);
      console.log('datosGuardar',datosGuardar);

      action.datos.forEach(index => {
        data.forEach((ele) => {
          if(index === ele.FuncionId){
            ele.Activo = false;
          }
        })
      })

      action.datos.forEach(index => {
        datosGuardar.forEach((ele, indexEle) => {
          if(index === ele.FuncionId){
            datosGuardarEliminados.push(ele);
            datosGuardar.splice(indexEle, 1);
          }
        })
      })

      return state.setIn(['modulosTabla', 'data'], List([...data]))
        .setIn(['modulosTabla', 'filterData'], List(data.filter(ele => ele.Activo)))
        .setIn(['nuevoModulo', 'datosGuardar'], List(datosGuardar))
        .setIn(['nuevoModulo', 'datosGuardarEliminados'], List(datosGuardarEliminados));
    }
    case SET_ACTIVAR_EMPRESA: {

      const data = state.getIn(['modulosTabla', 'data']).toJS();
      const datosGuardar = state.getIn(['nuevoModulo', 'datosGuardar']).toJS();
      const datosGuardarEliminados = state.getIn(['nuevoModulo', 'datosGuardarEliminados']).toJS();
      const filterData = state.getIn(['modulosTabla', 'filterData']).toJS();
      
      console.log('data',data);
      console.log('datosGuardar',datosGuardar);
      console.log('datosGuardarEliminados',datosGuardarEliminados);
      console.log('filterData',filterData);

      action.datos.forEach(index => {
        datosGuardarEliminados.forEach((ele, indexEle) => {
          if(index === ele.FuncionId){
            ele.Activo = true;
            datosGuardar.push(ele);
            datosGuardarEliminados.splice(indexEle, 1);
            data.forEach((dat) => {
              if(index === dat.FuncionId){
                dat.Activo = true;
              }
            })
            filterData.forEach((filt) => {
              if(filt.FuncionId===ele.FuncionId){
                filt.Activo = true;
              }
            })
          }
        })
      })

      console.log('data 2',data);
      console.log('datosGuardar 2',datosGuardar);
      console.log('datosGuardarEliminados 2',datosGuardarEliminados);
      console.log('filterData 2',filterData);
      
      return state.setIn(['modulosTabla', 'data'], List([...data]))
        .setIn(['nuevoModulo', 'datosGuardar'], List(datosGuardar))
        .setIn(['modulosTabla', 'filterData'], List( data.length>0? data.filter(ele => ele.Activo) : filterData.filter(ele => ele.Activo)));
    }
    default:
      return state;
  }
}

export default modulosReducer;
