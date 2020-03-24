/*
 *
 * PedidosReporte reducer
 *
 */

import { fromJS, List} from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import Actions from './actions';
import STATE from './state';

export const {
  SET_REPORTE_COORPORATIVO,
  SET_REPORTE_PEDIDOS,
  SET_PLAZAS,
  SET_MOUNTED,
  SET_AGRUPADORES,
  CHANGE_PLAZA,
  CHANGE_AGRUPADOR,
  CHANGE_FECHA_AUTORIZACION,
  CHANGE_FECHA_INICIO,
  ON_CLICK_LIMPIAR_FILTROS,
  ON_FECHA_INPUT,
  LIMPIAR_FILTROS,
  LIMPIAR_STATE,
} = Actions.getConstants();
export const initialState = fromJS(STATE);

function pedidosReporteReducer(state = initialState, action) {
  switch (action.type) {
    case SET_REPORTE_COORPORATIVO:{
      return state.updateIn(['coorporativo'], stt => stt.merge({
        datos: action.datos.datos[0],
        cabeceras: action.datos.cabeceras,
      })); 
    }

    case LOCATION_CHANGE: {
      return initialState;
    }

    case LIMPIAR_FILTROS: {
      return state.setIn(['reporte', 'parametros'], 
        initialState.getIn(['reporte', 'parametros']))
    }

    case SET_REPORTE_PEDIDOS: {
      return state.updateIn(['reporte'], stt => stt.merge({
        reporteDatos: action.datos.datos,
        reporteCabeceras: action.datos.cabeceras,
        hayDatos: action.datos.hayDatos,
      })).set('limpiar', false)
    }

    case SET_MOUNTED: {
      return state.set('mounted', true)
    }

    case LIMPIAR_STATE: {
      return initialState;
    }

    case SET_PLAZAS: {
      return state.set('plazas', fromJS(action.datos))
    }
    
    case CHANGE_PLAZA: {
      const plazas = state.get('plazas').toJS();
      const indices = [];
      for (let i = 0; i < action.value.length; i+=1) {
        for (let j = 0; j < plazas.length; j+=1) {
          if(plazas[j].IdPlaza === action.value[i])
            indices.push(j+1);
        }
      }
      if(!action.band){
        return state.set('plazaSeleccionada', List(action.value))
          .set('indicesPlazas', List(indices))
      }
      return state.setIn(['reporte', 'parametros', 'plazaSeleccionada'], List(action.value))
        .setIn(['reporte', 'parametros', 'indicesPlazasReporte'], List(indices))
      
    }

    case CHANGE_AGRUPADOR: {
      const agrupadores = JSON.parse(JSON.stringify(state.get('agrupadores')));
      const indices = [];
      for (let i = 0; i < action.value.length; i+=1) {
        for (let j = 0; j < agrupadores.length; j+=1) {
          if(agrupadores[j].IdAgrupador === action.value[i])
            indices.push(j+1);
        }
      }
      if(!action.band){
        return state.set('agrupadorSeleccionado', fromJS(action.value))
          .set('indicesAgrupadores', indices)
      }
      return state.setIn(['reporte', 'parametros', 'agrupadorSeleccionado'], fromJS(action.value))
        .setIn(['reporte', 'parametros', 'indicesAgrupadorReporte'], fromJS(indices))
    }

    case CHANGE_FECHA_AUTORIZACION: {
      return state.updateIn(['reporte', 'parametros'], stt => stt.merge({
        fecAutorizacionInicio : action.fechaIni,
        fecAutorizacionFin : action.fechaFin,
      }))
    }

    case CHANGE_FECHA_INICIO: {
      return state.updateIn(['reporte', 'parametros'], stt => stt.merge({
        fecSolicitudInicio : action.fechaIni,
        fecSolicitudFin : action.fechaFin,
      }))
    }

    case SET_AGRUPADORES: {
      return state.set('agrupadores', fromJS(action.datos))
    }

    case ON_CLICK_LIMPIAR_FILTROS: {
      return state.merge({
        agrupadorSeleccionado: [],
        plazaSeleccionada: [],
        indicesAgrupadores: [],
        indicesPlazas: [],
        limpio: true,
      })
      // return state.set('agrupadorSeleccionado', []).set('plazaSeleccionada', [])
      //   .set('indicesAgrupadores', []).set('indicesPlazas', [])
    }

    case ON_FECHA_INPUT: {
      if(action.id)
        return state.setIn(
          [
            'reporte',  
            'parametros',
            'fechaAutorizacionInput',
          ],
          action.event
        );
      return state.setIn(
        [
          'reporte', 
          'parametros',
          'fechaSolicitudInput',
        ],
        action.event
      );
    }
    default:
      return state;
  }
}

export default pedidosReporteReducer;
