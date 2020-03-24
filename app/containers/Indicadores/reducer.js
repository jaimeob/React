/* eslint-disable no-plusplus */
/*
 *
 * Indicadores reducer
 *
 */

import { fromJS, List } from 'immutable';
import moment from 'moment';
import { upperCase } from 'lodash';

// import 'moment/min/moment-with-locales'
import 'moment/src/locale/es';
import { DEFAULT_ACTION } from './constants';
import STATE from './state';

export const initialState = fromJS(STATE);

function indicadoresReducer(state = initialState, action) {
  switch (action.type) {

    case 'APP/CONTAINER/INDICADORES/SET_PLAZAS_ACTION':{

      const {
        data,
        idPlan,
      } = action;

     
      for(let k = 0; k < data.length; k++){
        if(data[k].Nombre === 'CORPORATIVO'){
          data.splice(k,1)
        }
      }
      

      return state
        .setIn(['plazaSeleccionada'],'')
        .setIn(['anioCorte'],'')
        .setIn(['aCorteDe'],'')
        .setIn(['periodoCorte'],'')
        .setIn(['arrPlazas'],List(data))
        .setIn(['tipoTicket'],idPlan)
    }

    case 'APP/CONTAINER/INDICADORES/ONCHANGE_VALUE_ACTION':{
      const {
        nombre,
        valor,
      } = action;
      
      let i = 1;
      let x = 0;
      let semanas =  53;
      let nuevoEstado;

      if(nombre === 'anioCorte'){
        
        const fechaActual = new Date();
        const añoActual = fechaActual.getFullYear();

        if(valor === añoActual){
          const dd = fechaActual.getDate();
          const mm = fechaActual.getMonth()+1;
          const fechaReal = `${añoActual}-${mm}-${dd}`;
          const semanaActual = moment(fechaReal).week();
          semanas = semanaActual;
          
          const semanasCorte = [];
          const mesesCorte = [];

          while (i <= semanas) {
            semanasCorte.push(i);
            i++;
          }

          while (x < mm) {
            const mes = moment().month(x).format("MMM");
            mesesCorte.push(upperCase(mes));
            x++;
          }

          nuevoEstado = state.setIn(['arrSemanas'],List(semanasCorte)).setIn(['arrMeses'],mesesCorte);
        }else{
          const semanasCorte = [];
          const mesesCorte = [];
          // const mm = fechaActual.getMonth()+1;
          while (i <= semanas) {
            semanasCorte.push(i);
            i++;
          }

          while (x < 12) {
            const mes = moment().month(x).format("MMM");
            mesesCorte.push(upperCase(mes));
            x++;
          }
          nuevoEstado = state.setIn(['arrSemanas'],List(semanasCorte)).setIn(['arrMeses'],mesesCorte);
        }
        return nuevoEstado
          .setIn([nombre],valor);
      }
      
      return state
        .setIn([nombre],valor);
    }

    case 'APP/CONTAINER/INDICADORES/ONCLICK_MOSTRAR_GRAFICA_DESEMPEÑO_ACTION': {
      return state
        .setIn(['mostrarGrafica'], !action.mostrarGrafica)
    }

    case 'APP/CONTAINER/INDICADORES/SET_DATOS_REPORTES_OCKyOE_ACTION':{
      const {
        dataRepos,
      } = action;
      
      return state
        .setIn(['datosReportesOCKyOEProceso'], dataRepos[0])
        .setIn(['datosReportesOCKyOEPuesto'], dataRepos[1])
    }

    case 'APP/CONTAINER/INDICADORES/SET_DATOS_GRAFICA_PUESTO_ACTION':{
      const {
        cargando,
        dataTablaPuesto,
        arrSemanaRetailProceso,
        arrCumplimientoProceso,
        arrGrafPuesto,
        arrGrafBarrasPuesto,
        datosReportesOCKyOEProceso ,
        datosReportesOCKyOEPuesto ,
        datosReportesOCKyOEPuestoTotales,
      } = action;
      
      return state
        .merge({
          cargando,
          dataTablaPuesto,
          arrSemanaRetailProceso,
          arrCumplimientoProceso,
          arrGrafPuesto,
          arrGrafBarrasPuesto,
          datosReportesOCKyOEProceso,
          datosReportesOCKyOEPuesto,
          datosReportesOCKyOEPuestoTotales,
        })
    }

    case 'APP/CONTAINER/INDICADORES/APAGAR_BARRA_DE_CARGA_ACTION': {
      return state
        .setIn(['cargando'],action.cargando)
        .setIn(['mostrarGrafica'],action.mostrarGrafica)
    }
    
    case 'APP/CONTAINER/INDICADORES/SET_DEPARTAMENTO_ACTION':{
      return state
        .setIn(['arrDepartamentos'],List(action.data))
    }

    case 'APP/CONTAINER/INDICADORES/SET_TIPO_TICKET_ACTION':{
      return state
        .setIn(['arrTipoTicket'],List(action.data))
        .setIn(['departamento'],action.IdDepartamento)
    }
    
    case 'APP/CONTAINER/INDICADORES/SET_ANIOS_ACTION': {
      const {
        data,
        IdPlaza,
      } = action;
      
      return state
        .setIn(['anioCorte'],'')
        .setIn(['arrAnios'],List(data))
        .setIn(['plazaSeleccionada'],IdPlaza)
    }

    case 'APP/CONTAINER/INDICADORES/SET_PERIODO_ACTION': {
      const {
        data,
        Anio,
      } = action;
      
      return state
        .setIn(['periodoCorte'],'')
        .setIn(['arrSemanas'],List(data))
        .setIn(['anioCorte'],Anio)
    }

    case 'APP/CONTAINER/INDICADORES/CARGANDO_GRAFICOS_ACTION': {
      return state
        .setIn(['cargando'], action.bandera)
    }

    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default indicadoresReducer;
