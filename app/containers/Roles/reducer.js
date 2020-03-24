/*
 *
 * Roles reducer
 *
 */

import { fromJS, List, Map } from 'immutable';
import _ from 'lodash';

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
  SET_LISTADO_ACTIVAR,
  SET_LISTADO_DESACTIVAR,
  SET_ACTIVAR_REGISTROS,
  SET_VACIO_NOMBRE_MODULO,
  SET_TEXTFIELDNOMBREROL_TEXT,
  SET_OPENMODULOSALIR,
  SET_MODULOSDISABLE,
  SET_IDMODULO,
  SET_TEXTFIELDDESCRIPCION_TEXT,
  SET_OBJETOSINACTUALIZAR,
  SET_STEPPEROPENMODALADD,
  SET_OPENMODULOSALIRMODAL,
  SET_GETEMPRESAS,
  SET_SELECT_EMPRESAS,
  ON_CHANGE_PARAMETROS,
  ON_CHANGE_PUESTO,
  SET_MODULOS,
  HANDLE_CLICK_LISTA,
  SET_FUNCIONES,
  SET_VISUALIZATABLA,
  SET_STEPPERADDMODULO,
  SET_SELECTED_PERMISOS_NORMALES,
  SET_OPEN_MODAL_PERMISOS_ESPECIALES,
  SET_SELECTED_PERMISOS_ESPECIALES,
  SET_DATOS_GUARDAR,
  SET_ACTUALIZA_PERMISOS,
  SET_ID_ROL_EMPRESA,
  SET_LOADING,
  SET_SOLO_LECTURA_ROL,
  SET_MENSAJE_REMPLAZA_PERMISOS,
  SET_SOLO_LECTURA_EMPRESA,
  SET_ELIMINAR_EMPRESA,
  SET_ACTIVAR_EMPRESA,
} = Actions.getConstants();

function rolesReducer(state = initialState, action) {
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
    case SET_ACTIVAR_REGISTROS: {
      return state.setIn(['modulosTabla', 'activarRegistros'], action.datos)
    }
    case SET_VACIO_NOMBRE_MODULO:{
      let nombreLabelRol ='';
      if(action.datos===true && action.nombreRol.length === 0){
        nombreLabelRol='Favor de capturar Nombre rol';
      } else if (action.datos===true && action.nombreRol.length > 0) {
        nombreLabelRol=`El rol ${action.nombreRol} ya existe.`;
      } else if(action.datos===false){
        nombreLabelRol='Requerido*';
      }
      return state.setIn(['nuevoModulo', 'vacioNombreModulo'], action.datos)
        .setIn(['nuevoModulo', 'mensajeLabel'], nombreLabelRol)
    }
    case SET_TEXTFIELDNOMBREROL_TEXT:{
      return state.setIn(['nuevoModulo', 'textFieldModulo'], action.datos)
    }
    case SET_OPENMODULOSALIR:{
      return state.setIn(['nuevoModulo', 'openModalAddModulo'], action.datos)
    }
    case SET_MODULOSDISABLE:{
      return state.setIn(['nuevoModulo', 'moduloSoloLectura'], action.datos)
    }
    case SET_IDMODULO:{
      return state.setIn(['nuevoModulo', 'IdRol'], action.datos)
    }
    case SET_TEXTFIELDDESCRIPCION_TEXT:{
      return state.setIn(['nuevoModulo', 'textFieldDescripcion'], action.datos)
    }
    case SET_OBJETOSINACTUALIZAR:{
      return state.setIn(['nuevoModulo', 'nombreModuloSinActualizar'], action.datos)
    }
    case SET_STEPPEROPENMODALADD: {
      return state.setIn(['nuevoModulo', 'openM'], action.datos)
    }
    case SET_OPENMODULOSALIRMODAL:{
      return state.setIn(['nuevoModulo', 'openMensajeSalirFuncion'], action.datos)
    }
    case SET_GETEMPRESAS:{
      return state.setIn(['nuevoModulo', 'getEmpresas'], List(action.datos))
    }
    case SET_SELECT_EMPRESAS:{
      return state.setIn(['nuevoModulo', 'selectEmpresa'], List(action.datos))
    }
    case ON_CHANGE_PARAMETROS: {
    
      const stateLista = state.getIn(['nuevoModulo', 'lista']).toJS();  
      
      const arreglo = action.valor || [];
      if(action.campo === 2){
        const lista = [];
        for (let i = 0; i < arreglo.length; i+=1) {
          lista.push(
            {
              seleccionado: false,
              ...action.valor[i],
            }
          )
        }

        // validacion para que cuando se agregue un módulo más no borre las opciones
        if( stateLista.length > 0 ){
          lista.forEach((item, index) => {
            stateLista.forEach( (itemState, indexState) => {
              if(index === indexState){
                item.opciones = [
                  ...itemState.opciones,
                ]
              }
            } )
          })
        }
        
        return state.setIn(
          ['nuevoModulo', 'selectModulos'],
          fromJS(arreglo),
        ).setIn(['nuevoModulo', 'lista'], fromJS(lista));
      } 
      return state.setIn(
        ['nuevoModulo', 'selectEmpresa'],
        fromJS(arreglo),
      );
    }
    case HANDLE_CLICK_LISTA: {
      return state.setIn(
        ['nuevoModulo', 'lista', action.id, 'seleccionado'],
        !state.getIn(
          ['nuevoModulo', 'lista', action.id, 'seleccionado']
        )
      )
    }
    case SET_MODULOS:{
      return state.setIn(['nuevoModulo', 'getModulos'], List(action.datos))
    }
    case SET_FUNCIONES:{
      const modulosSeleccionados = state.getIn(['nuevoModulo', 'lista']).toJS();
      const indexModulo =  _.findIndex(modulosSeleccionados, (modulo) => ( modulo.value === action.datos.params.idModulo ));
  
      // Validar si ya se abrió el módulo para no volver a consultar
      if(Object.prototype.hasOwnProperty.call(modulosSeleccionados[indexModulo], 'opciones')){
        if(modulosSeleccionados[indexModulo].opciones.length > 0){
          return state;
        }
      }

      return state.setIn(['nuevoModulo', 'lista', indexModulo, 'opciones'], List(action.datos.permisos));
    }
    case SET_SELECTED_PERMISOS_NORMALES: {
      const modulosSeleccionados = state.getIn(['nuevoModulo', 'lista']).toJS();
      const indexModulo =  _.findIndex(modulosSeleccionados, (modulo) => ( modulo.value === action.datos.value ));

      modulosSeleccionados[indexModulo].opciones[action.datos.indexOpcion].permisosNormalesSeleccionados = [
        ...action.datos.newSelected,
      ];
      
      return state.setIn(['nuevoModulo', 'lista', indexModulo], fromJS(modulosSeleccionados[indexModulo]));

    }
    case SET_SELECTED_PERMISOS_ESPECIALES: {
      const modulosSeleccionados = state.getIn(['nuevoModulo', 'lista']).toJS();
      const indexModulo =  _.findIndex(modulosSeleccionados, (modulo) => ( modulo.value === action.datos.value ));

      modulosSeleccionados[indexModulo].opciones[action.datos.indexOpcion].permisosEspecialesSeleccionados = [
        ...action.datos.newSelected,
      ];
      
      return state.setIn(['nuevoModulo', 'lista', indexModulo], fromJS(modulosSeleccionados[indexModulo]));
    }

    case SET_OPEN_MODAL_PERMISOS_ESPECIALES: {
      const modulosSeleccionados = state.getIn(['nuevoModulo', 'lista']).toJS();
      const indexModulo =  _.findIndex(modulosSeleccionados, (modulo) => ( modulo.value === action.datos.value ));
      const opcion =  modulosSeleccionados[indexModulo].opciones[action.datos.indexOpcion]
      const nuevaOpcion = {
        ...opcion,
        abrirModalPermisosEspeciales: !opcion.abrirModalPermisosEspeciales,
      }

      return state.setIn(['nuevoModulo', 'lista', indexModulo, 'opciones', action.datos.indexOpcion], fromJS(nuevaOpcion));
    }
    case SET_VISUALIZATABLA:{
      return state.setIn(['nuevoModulo', 'visualizaTabla'], action.datos)
    }
    case SET_STEPPERADDMODULO: {
      return state.setIn(['nuevoModulo', 'openM'], action.datos)
    }
    case SET_DATOS_GUARDAR: {
      return state.setIn(['nuevoModulo', 'datosGuardar'], fromJS(action.datos));
    }
    case SET_ACTUALIZA_PERMISOS: {
      return state.setIn(['nuevoModulo', 'actualizaPermisos'], action.datos);
    }
    case SET_ID_ROL_EMPRESA: {
      return state.setIn(['nuevoModulo', 'IdRolEmpresa'], action.datos);
    }
    case SET_LOADING: {
      return state.setIn(['nuevoModulo', 'loading'], action.datos);
    }
    case SET_SOLO_LECTURA_ROL: {
      return state.setIn(['nuevoModulo', 'moduloSoloLecturaRol'], action.datos);
    }
    case SET_SOLO_LECTURA_EMPRESA: {
      return state.setIn(['nuevoModulo', 'moduloSoloLecturaEmpresa'], action.datos);
    }
    case SET_ELIMINAR_EMPRESA: {
      const data = state.getIn(['modulosTabla', 'data']).toJS();
      
      action.datos.forEach(index => {
        data.forEach((ele) => {
          if(index === ele.IdRolEmpresa){
            ele.Activo = false;
          }
        })
      })

      return state.setIn(['modulosTabla', 'data'], List([...data]))
        .setIn(['modulosTabla', 'filterData'], List(data.filter(ele => ele.Activo)))
        .setIn(['modulosTabla', 'selected'], List([]));
    }
    case SET_ACTIVAR_EMPRESA: {
      const data = state.getIn(['modulosTabla', 'data']).toJS();
      
      action.datos.forEach(index => {
        data.forEach((ele) => {
          if(index === ele.IdRolEmpresa){
            ele.Activo = true;
          }
        })
      })

      return state.setIn(['modulosTabla', 'data'], List([...data]))
        .setIn(['modulosTabla', 'filterData'], List(data.filter(ele => ele.Activo)))
        .setIn(['modulosTabla', 'selected'], List([]));
    }
    default:
      return state;
  }
}

export default rolesReducer;
