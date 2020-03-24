/*
 *
 * BandejaDifusiones reducer
 *
 */

import { fromJS, List } from 'immutable';

import { DEFAULT_ACTION } from './constants';
import Actions from './actions';
import STATE from './state';

const ACTION = (name = '') => Actions.get(name).id;

export const initialState = fromJS(STATE);

// eslint-disable-next-line consistent-return
function bandejaDifusionesReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case ACTION('HANDLE_CHANGE_TAB_DIFUSIONES'): {
      return state.setIn([
        'bandejaDifusiones',
        'tabSelected',
      ], action.value)
    }
    case ACTION('SELECTED_TAB'): {
      // debugger;
      return state.merge({
        selected: {
          leidos: action.id ? 0 : 1,
        },
      });
    }
    case ACTION('HANDLE_CHANGE_COMENTARIOS'): {
      return state.setIn(['mensaje', 'comentarios'], action.mensaje);
    }

    // eslint-disable-next-line no-fallthrough
    case 'APP/CONTAINER/BANDEJADIFUSIONES/CHANGE_ASUNTO': {
      return state.setIn(['mensaje', 'asunto'], action.data);
    }

    case 'APP/CONTAINER/BANDEJADIFUSIONES/POST_INSERT_DIFUSIONS_SUCCESS': 
    { 
      return state.set('mensaje', initialState.get('mensaje'));
    }

    case 'APP/CONTAINER/BANDEJADIFUSIONES/GUARDAR_IMG_ACTION': {
      
      return state.setIn(['mensaje', 'dataBlop'], action.data)
      
    }

    case 'APP/CONTAINER/BANDEJADIFUSIONES/REQUEST_DEPARTAMENTOS_SUCCESS': {
      return state.setIn([ 'bandejaDifusiones', 'departamentos'], List(action.departamentos.data)).set('mensaje', initialState.get('mensaje'));
      
    }

    case 'APP/CONTAINER/BANDEJADIFUSIONES/SHOW_FORM_SUCCESS': {
      return state.setIn([ 'bandejaDifusiones', 'mostrarForm'], true).setIn(['bandejaDifusiones', 'mostrarDifusionSeleccionada'],false)
    }

    case 'APP/CONTAINER/BANDEJADIFUSIONES/HIDE_FORM': {
      return state.setIn([ 'bandejaDifusiones', 'mostrarForm'], false).set('mensaje', initialState.get('mensaje'));
    }

    case 'APP/CONTAINER/BANDEJADIFUSIONES/REQUEST_DEPARTAMENTOS_FAILED': {
      return state;
    }

    case 'APP/CONTAINER/BANDEJADIFUSIONES/GET_DIFUSIONES_SUCCESS': {
      return state.set('mensaje', initialState.get('mensaje')).setIn([ 'bandejaDifusiones', 'difusiones'], List(action.difusiones.data))

    }
    
    case 'APP/CONTAINER/BANDEJADIFUSIONES/GET_DIFUSIONES_FAILED': {
      return state;
    }

    case 'APP/CONTAINER/BANDEJADIFUSIONES/RELOAD_DIFUSION_SUCCESS': {
      return state.setIn([ 'bandejaDifusiones', 'mostrarForm'], false)
        .setIn(['mensaje', 'comentarios'],action.difusionSeleccionada.data[0].mensaje)
        .setIn(['mensaje', 'asunto'],action.difusionSeleccionada.data[0].asunto)
        .setIn(['bandejaDifusiones', 'mostrarDifusionSeleccionada'],true)
        .setIn(['bandejaDifusiones', 'difusion'],action.difusionSeleccionada.data[0])
    }

    case 'APP/CONTAINER/BANDEJADIFUSIONES/HANDLE_CHANGE_COMPONENT': {
      state.getIn([ 'bandejaDifusiones', 'departamentos'], List(action.data))
        
      return state
        .setIn([
          'mensaje',
          'arregloDepartamentos',
        ], action.data)
    }

    case 'APP/CONTAINER/BANDEJADIFUSIONES/HANDLE_CHANGE_DEPARTAMENTOS':{
      return state.setIn(['mensaje','arregloDepartamentos'], action.event)
    }


    case 'APP/CONTAINER/BANDEJADIFUSIONES/POST_EMIT_SOCKETS' : {
      return state.setIn(['bandejaDifusiones','totalDifusiones'], action.params)
    }

    case 'APP/CONTAINER/BANDEJADIFUSIONES/SELECT_ALL_DEPARTAMENTS' : {
      
      if (action.data) {
        return state.setIn(['mensaje','arregloDepartamentos'], List()).setIn(['mensaje','checked'], action.data).setIn(['mensaje','arregloDepartamentos'],["Todos"]);  
      }
      return state.setIn(['mensaje','arregloDepartamentos'], List())
        .setIn(['mensaje','checked'], action.data)  
    }
    
    default:
      return state;
  }
}

export default bandejaDifusionesReducer;
