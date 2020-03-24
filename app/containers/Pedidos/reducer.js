/*
 *
 * Pedidos reducer
 *
 */

import { fromJS, List, Map } from 'immutable';
import React from 'react';
import {
  Chip,
  Avatar,
} from '@material-ui/core'
import Actions from './actions';
import STATE from './state';

export const initialState = fromJS(STATE);
export const {
  DEFAULT,
  SET_PEDIDOS,
  SET_PLAZAS,
  SET_ESTATUS,
  SET_PEDIDO_DETALLE,
  SET_MOUNTED,
  SET_TABLA_MOUNTED,
  ON_FECHA_INPUT,
  ON_INPUT_AUTORIZACION,
  ON_INPUT_COMENTARIOS,
  ON_INPUT_COMENTARIOS_GENERAL,
  ON_INPUT_GUIA,
  ON_INPUT_PAQUETERIA,
  ON_INPUT_COM_RECEPCION,
  ON_INPUT_RECIBIDO,
  ON_RECIBIR,
  ON_UPLOAD_FILE,
  ON_UPLOAD_RECEPCION,
  ON_UPLOAD_COTIZACION,
  ON_CLICK_MODAL,
  LIMPIAR_FILTROS,
  CHANGE_FECHA_AUTORIZACION,
  CHANGE_FECHA_INICIO,
  CHANGE_PLAZA,
  CHANGE_ESTATUS,
  AGREGAR_PEDIDO,
  CAMBIAR_PLAZA,
  DESACTIVAR_GUARDAR,
  OBTENER_COTIZACION,
  AUTORIZAR_MULTIPLE,
  ON_DELETE_FILE,
  ON_DELETE_COTIZACION_FILE,
  ON_DELETE_RECEPCION_FILE,
  LIMPIAR_STATE,
  ON_INPUT_IMPORTE,
} = Actions.getConstants();

function pedidosReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT:
      return state;

    // Retorna el estado inicial del componente
    case LIMPIAR_STATE: {
      return initialState;
    }

    // Cambia una variable del estado para mostrar la pantalla de agregado
    case AGREGAR_PEDIDO: {
      return state.setIn(
        ['pedidosTabla', 'agregar'], 
        !state.getIn(['pedidosTabla', 'agregar'])
      );
    }

    // Desactiva el boton de guardado en caso de que 
    // existan campos requeridos(saga)
    case DESACTIVAR_GUARDAR: {
      return  state.updateIn(
        ['pedidosTabla', 'pedidoDetalle'],
        detalle => detalle.merge({
          datos : fromJS(action.datos),
          bandGuardar : true,
          bandIntento : true,
        })
      )
    }

    // Boton para cambiar de coorporativo a plaza
    case CAMBIAR_PLAZA: {
      return state.set('idPlaza', state.get('idPlaza') === 9 ? 10 : 9);
    }

    case ON_CLICK_MODAL: {
      return state.setIn(['pedidosTabla', 'openModal'], 
        !state.getIn(['pedidosTabla', 'openModal']))
    }

    // Retorna la siguiente pagina de cotizaciones
    case OBTENER_COTIZACION: {
      const pag = state.getIn(['pedidosTabla', 'pedidoDetalle', 'cotizacionesPageFin']);
      const pagIni= state.getIn(['pedidosTabla', 'pedidoDetalle', 'cotizacionesPageInicio']);
      const cotizaciones = state.getIn(['pedidosTabla', 'pedidoDetalle', 'cotizaciones']);
      const newPagFin = action.id === 1 ? pag + 3 : pag - 3;
      const newPagIni = action.id === 1 ? pagIni + 3 : pagIni - 3;
      
      return state.updateIn(['pedidosTabla', 'pedidoDetalle'], stt => stt.merge({
        cotizacionesPageFin : newPagFin,
        cotizacionesPageInicio : newPagIni,
        cotizacionesPaginado : cotizaciones.slice(newPagIni, newPagFin),
      }))
    }

    // Componente montado
    case SET_MOUNTED: {
      return state.set('mounted', true)
    }

    // Agrega en un arreglo los pedidos ids para multiple autorizacion
    case AUTORIZAR_MULTIPLE: {
      return state.updateIn(['pedidosTabla', 'pedidoDetalle'], stt => stt.merge({
        ids: action.ids,
        totalPaginas: action.ids.length,
      }))
    }

    // Limpia los filtros
    case LIMPIAR_FILTROS: {
      return state.setIn(
        ['pedidosTabla', 'parametros'], 
        initialState.getIn(['pedidosTabla', 'parametros'])
      )
    }

    // Elimina el archivo de recepcion y valida los campos para permitir guardar
    case ON_DELETE_RECEPCION_FILE: {
      const newState = state.updateIn(
        ['pedidosTabla', 'pedidoDetalle', 'datos', action.id], stt => stt.merge({
          EvidenciaRec : [],
          RutaEvidenciaRecepcionInputFile : null,
          FileRecepcion : null,
          RutaEvidenciaRecepcionNombreArchivo : '',
          BandEvidenciaRecep : 0,
        })
      );
      const datos = JSON.parse(
        JSON.stringify(
          newState.getIn(
            ['pedidosTabla', 'pedidoDetalle', 'datos']
          )
        )
      );
      let band = false;
      for (let i = 0; i < datos.length; i+=1) {
        if(datos[i].DetalleEstatus === 13 && 
          ((datos[i].BandRecibidaInput === 1 && datos[i].BandEvidenciaRecep === 0)) ||
          (datos[i].BandRecibidaInput === 0 && datos[i].BandEvidenciaRecep === 1)){
          band = true;
          i = datos.length;
        } 
      }
      return newState.setIn(['pedidosTabla', 'pedidoDetalle', 'bandGuardar'], band)
    }

    // Elimina el archivo de evidencia y valida los campos para permitir guardar
    case ON_DELETE_FILE: {
      const datos = JSON.parse(
        JSON.stringify(
          state.getIn(
            ['pedidosTabla', 'pedidoDetalle', 'datos']
          )
        )
      );
      let band = false;
      for (let i = 0; i < datos.length; i+=1) {
        if(
          (action.cadena !== '' && 
            (datos[i].DetalleEstatus !== 13 && 
              (datos[i].BandGuiaInput === 0 || datos[i].BandPaqueteriaInput === 0)
            )
          ) || 
          (action.cadena === '' && 
              (datos[i].DetalleEstatus !== 13 && 
                (datos[i].BandGuiaInput === 1 || datos[i].BandPaqueteriaInput === 1)
              )
          )
        ){
          band = true;
          i = datos.length;
        }
      }
      return state.updateIn(
        ['pedidosTabla', 'pedidoDetalle', 'datos', action.id], stt => stt.merge({
          Evidencia : null,
          InformacionEnvioInputFile : null,
          File : null,
          BandEvidencia : 0,
        })
      ).setIn(['pedidosTabla', 'pedidoDetalle', 'bandGuardar'], band)
    }

    // Elimina una cotizacion y valida los campos para permitir guardar
    case ON_DELETE_COTIZACION_FILE: {
      const files = state.getIn(['pedidosTabla', 'pedidoDetalle', 'cotizaciones']).toJS();
      const page = state.getIn(['pedidosTabla', 'pedidoDetalle', 'cotizacionesPageFin'])
      const id = (((page / 3) -1 ) * 3) + action.id;
      files.splice(id, 1);
      let bandCot = 1;
      for (let i = 0; i < files.length; i+=1) {
        if(typeof files[i].url !== 'string')
          bandCot = 0;
      }
      const datos = JSON.parse(
        JSON.stringify(
          state.getIn(
            ['pedidosTabla', 'pedidoDetalle', 'datos']
          )
        )
      );
      let band = false;
     
      for (let i = 0; i < datos.length; i+=1) {
        if(i === action.id){
          datos[i].AutorizadoInput = action.cadena;
        }
        if(((datos[i].ComentariosInput === '' || datos[i].ComentariosInput === null) &&
          (datos[i].AutorizadoInput === '' || datos[i].AutorizadoInput === 0)) || 
          (Number.isNaN(datos[i].AutorizadoInput) || datos[i].AutorizadoInput === null || 
            datos[i].AutorizadoInput === '') || files.length === 0){
          band = true;
        }
      }
      return state.updateIn(['pedidosTabla', 'pedidoDetalle'], stt => stt.merge({
        cotizaciones: files,
        cotizacionesPaginado: files.slice(0,3),
        // cotizacionesEliminadas: eliminado,
        cotizacionesPageFin: 3,
        cotizacionesPageInicio: 0,
        bandCotizacion: bandCot,
      }))
        .setIn(['pedidosTabla', 'pedidoDetalle', 'bandGuardar'], band)

    }

    // Actualiza el state con las fechas insertadas en el filtro
    case ON_FECHA_INPUT: {
      if(action.id)
        return state.setIn(
          [
            'pedidosTabla', 
            'parametros', 
            'fechaSolicitudInput',
          ],
          action.event
        );
      return state.setIn(
        [
          'pedidosTabla', 
          'parametros', 
          'fechaAutorizacionInput',
        ],
        action.event
      );
    }

    // Actualiza el state con el valor de autorizacion y valida los campos para
    // permitir guardar.
    case ON_INPUT_AUTORIZACION: {
      const datos = JSON.parse(
        JSON.stringify(
          state.getIn(
            ['pedidosTabla', 'pedidoDetalle', 'datos']
          )
        )
      );
      const coti = state.getIn(
        ['pedidosTabla', 'pedidoDetalle', 'cotizaciones']
      ).toJS();
      
      let band = false;
     
      for (let i = 0; i < datos.length; i+=1) {
        if(i === action.id){
          datos[i].AutorizadoInput = action.cadena;
        }
        if(((datos[i].ComentariosInput === '' || datos[i].ComentariosInput === null) &&
          (action.cadena === '' || action.cadena === 0)) || 
          (Number.isNaN(datos[i].AutorizadoInput) || datos[i].AutorizadoInput === null || 
            datos[i].AutorizadoInput === '') || coti.length === 0){  
          band = true;
        }
      }
     
      return state.updateIn(
        ['pedidosTabla', 'pedidoDetalle', 'datos', action.id], stt => stt.merge({
          AutorizadoInput : action.cadena,
          BandAutorizadoInput : 1,
          ComentariosInputRequerido: action.cadena === 0,
        })
      ).setIn(['pedidosTabla', 'pedidoDetalle', 'bandGuardar'], band)
        .set('modificado', true)
    }

    // Actualiza el state con el valor de autorizacion y valida los campos para
    // permitir guardar.
    case ON_INPUT_IMPORTE: {
      const datos = JSON.parse(
        JSON.stringify(
          state.getIn(
            ['pedidosTabla', 'pedidoDetalle', 'datos']
          )
        )
      );
      const coti = state.getIn(
        ['pedidosTabla', 'pedidoDetalle', 'cotizaciones']
      ).toJS();
      let band = false;
     
      for (let i = 0; i < datos.length; i+=1) {
        if(i === action.id){
          datos[i].ImporteInput = action.cadena;
        }
        if(((datos[i].ComentariosInput === '' || datos[i].ComentariosInput === null) &&
          (datos[i].AutorizadoInput === '' || datos[i].AutorizadoInput === 0)) || 
          (Number.isNaN(datos[i].AutorizadoInput) || datos[i].AutorizadoInput === null || 
            datos[i].AutorizadoInput === '' || !datos[i].ImporteInput) || coti.length === 0){
          band = true;
        }
      }
     
      return state.updateIn(
        ['pedidosTabla', 'pedidoDetalle', 'datos', action.id], stt => stt.merge({
          ImporteInput : action.cadena,
          BandImporteInput : 1,
        })
      ).setIn(['pedidosTabla', 'pedidoDetalle', 'bandGuardar'], band)
        .set('modificado', true)
    }

    // Actualiza el state con los comentarios ingresados y valida si
    // el campo autorizacion es 0 requiera un comentario para poder guardar
    case ON_INPUT_COMENTARIOS: {
      let band = false;
      const datos = state.getIn(
        ['pedidosTabla', 'pedidoDetalle', 'datos']
      ).toJS()
      ;
      const coti = state.getIn(
        ['pedidosTabla', 'pedidoDetalle', 'cotizaciones']
      ).toJS();
      for (let i = 0; i < datos.length; i+=1) {
        if(!datos[i].ImporteInput || coti.length === 0 || action.cadena === ''){
          band = true;
        }
        
      }

      return state.updateIn(
        ['pedidosTabla', 'pedidoDetalle', 'datos', action.id], stt => stt.merge({
          ComentariosInput : action.cadena,
        })
      ).setIn(['pedidosTabla', 'pedidoDetalle', 'bandGuardar'], band)
        .set('modificado', true)
    }

    // Actualiza el state con los comentarios generales del pedido
    case ON_INPUT_COMENTARIOS_GENERAL: {
      return state.updateIn(
        ['pedidosTabla', 'pedidoDetalle'], stt => stt.merge({
          ComentariosGeneral: action.cadena,
          bandComentariosGeneral: false,
        })
      );
    }

    // Actualizar el state con la guia ingresada y valida los campos para 
    // permitir guardar
    case ON_INPUT_GUIA: {
      const newState = state.updateIn(
        ['pedidosTabla', 'pedidoDetalle', 'datos', action.id], stt => stt.merge({
          GuiaInput : action.cadena,
          BandGuiaInput : action.cadena ? 1 : 0,
        }));

      const datos = JSON.parse(
        JSON.stringify(
          newState.getIn(
            ['pedidosTabla', 'pedidoDetalle', 'datos']
          )
        )
      );
      let band = false;
      for (let i = 0; i < datos.length; i+=1) {
        if(
          (datos[i].BandGuiaInput === 1 && 
            (datos[i].DetalleEstatus !== 13 && 
              (datos[i].BandEvidencia === 0 || datos[i].BandPaqueteriaInput === 0)
            )
          ) || 
          (datos[i].BandGuiaInput === 0 && 
            (datos[i].DetalleEstatus !== 13 && 
              (datos[i].BandEvidencia === 1 || datos[i].BandPaqueteriaInput === 1)
            )
          )
        ){
          band = true;
          i = datos.length;
        }
      }
      
      return newState.setIn(
        ['pedidosTabla', 'pedidoDetalle', 'bandGuardar'], 
        band
      ).set('modificado', true)
    }

    // Actualiza el state con la paqueteria ingresada y valida los campos para
    // permitir guardar
    case ON_INPUT_PAQUETERIA: {
      const newState = state.updateIn(
        ['pedidosTabla', 'pedidoDetalle', 'datos', action.id], stt => stt.merge({
          PaqueteriaInput : action.cadena,
          BandPaqueteriaInput : action.cadena ? 1 : 0,
        }));

      const datos = JSON.parse(
        JSON.stringify(
          newState.getIn(
            ['pedidosTabla', 'pedidoDetalle', 'datos']
          )
        )
      );
      let band = false;
      for (let i = 0; i < datos.length; i+=1) {
        if(
          (datos[i].BandPaqueteriaInput === 1 && 
            (datos[i].DetalleEstatus !== 13 && 
              (datos[i].BandEvidencia === 0 || datos[i].BandGuiaInput === 0)
            )
          ) || 
          (datos[i].BandPaqueteriaInput === 0 && 
            (datos[i].DetalleEstatus !== 13 && 
              (datos[i].BandEvidencia === 1 || datos[i].BandGuiaInput === 1)
            )
          )
        ){
          band = true;
          i = datos.length;
        }
      }
      return newState.setIn(
        ['pedidosTabla', 'pedidoDetalle', 'bandGuardar'], 
        band
      ).set('modificado', true)
    }

    // Actualiza el state con los comentarios de recepción ingresados.
    case ON_INPUT_COM_RECEPCION: {
      return state.updateIn(
        ['pedidosTabla', 'pedidoDetalle', 'datos', action.id], stt => stt.merge({
          ComentariosRecepcionInput : action.cadena,
        })
      ).set('modificado', true)
    }

    // Actualiza el state para mostrar la pantalla para recibir el pedido
    case ON_RECIBIR: {
      const cabeceras = [
        {
          campo: 'IdArticulo',
          nombre: 'ID',
          options: {
            searchable: true,
          },
        },
        {
          campo: 'Modulo',
          nombre: 'Modulo',
          options: {
            searchable: false,
          },
        },
        {
          campo: 'Articulo',
          nombre: 'Articulo',
          options: {
            searchable: false,
          },
        },
        {
          campo: 'CantSolicitada',
          nombre: 'Pedido',
          options: {
            searchable: false,
          },
        },
        {
          campo: 'Autorizado',
          nombre: 'Autorizado',
          options: {
            searchable: false,
          },
        },
        {
          campo: 'Recibido',
          nombre: 'Recibido',
          options: {
            searchable: false,
            display: true,
          },
        },
        {
          campo: 'ComentariosRecepcion',
          nombre: 'Comentarios',
          options: {
            searchable: false,
            display: true,
          },
        },
        {
          campo: 'RutaEvidenciaRecepcion',
          nombre: 'Evidencia',
          options: {
            searchable: false,
            display: true,
          },
        },
      ];
      return state.updateIn(
        ['pedidosTabla', 'pedidoDetalle'],  stt => stt.merge({
          recibir: true,
          cabeceras,
        }))
    }

    // Actualiza el state con la cantidad recibida y valida los campos para
    // permitir guardar.
    case ON_INPUT_RECIBIDO: {
      const newState = state.updateIn(
        ['pedidosTabla', 'pedidoDetalle', 'datos', action.id], stt => stt.merge({
          RecibidoInput : action.cadena,
          BandRecibidaInput : action.cadena !== '' ? 1 : 0,
        })
      );
      const datos = JSON.parse(
        JSON.stringify(
          newState.getIn(
            ['pedidosTabla', 'pedidoDetalle', 'datos']
          )
        )
      );
      let band = false;
      for (let i = 0; i < datos.length; i+=1) {
        if(datos[i].DetalleEstatus === 13 && 
            (
              (datos[i].BandRecibidaInput === 1 && datos[i].BandEvidenciaRecep === 0) ||
              (datos[i].BandRecibidaInput === 0 && datos[i].BandEvidenciaRecep === 1)
            )
        ){
          band = true;
          i = datos.length;
        } 
      }
      return newState.setIn(
        ['pedidosTabla', 'pedidoDetalle', 'bandGuardar'], 
        band
      ).set('modificado', true)
    }
    
    // Actualiza el state con el archivo de evidencia y valida los campos para
    // permitir guardar.
    case ON_UPLOAD_FILE: {
      const newState = state.updateIn(
        ['pedidosTabla', 'pedidoDetalle', 'datos', action.id], stt => stt.merge({
          Evidencia : action.arreglo,
          InformacionEnvioInputFile : action.formData,
          File : action.file,
          InformacionEnvioNombreArchivo : action.file.name,
          BandEvidencia : 1,
        }));

      const datos = JSON.parse(
        JSON.stringify(
          newState.getIn(
            ['pedidosTabla', 'pedidoDetalle', 'datos']
          )
        )
      );
      let band = false;
      for (let i = 0; i < datos.length; i+=1) {
        if(
          (datos[i].BandEvidencia === 1 && 
            (datos[i].DetalleEstatus !== 13 && 
              (datos[i].BandGuiaInput === 0 || datos[i].BandPaqueteriaInput === 0)
            )
          ) || 
          (datos[i].BandEvidencia === 0 && 
            (datos[i].DetalleEstatus !== 13 && 
              (datos[i].BandGuiaInput === 1 || datos[i].BandPaqueteriaInput === 1)
            )
          )
        ){
          band = true;
          i = datos.length;
        }
      }
      return newState.setIn(
        ['pedidosTabla', 'pedidoDetalle', 'bandGuardar'], 
        band
      ).set('modificado', true);
    }

    // Actualiza el state con la cotizacion subida y valida los campos para 
    // permitir guardar
    case ON_UPLOAD_COTIZACION: {
      const cotizaciones = state.getIn(
        ['pedidosTabla', 'pedidoDetalle', 'cotizaciones']
      ).toJS();
      const datos = JSON.parse(
        JSON.stringify(
          state.getIn(
            ['pedidosTabla', 'pedidoDetalle', 'datos']
          )
        )
      );
      let band = false;
      for (let i = 0; i < datos.length; i+=1) {
        if(datos[i].DetalleEstatus === 12 && datos[i].BandAutorizadoInput === 0){
          band = true;
        } 
      }

      for (let j = 0; j < action.arreglo.length; j+=1) {
        cotizaciones.push(action.arreglo[j]);
      }

      return state.updateIn(
        ['pedidosTabla', 'pedidoDetalle'], stt => stt.merge({
          cotizaciones,
          cotizacionesPaginado : cotizaciones.slice(0, 3),
          cotizacionesForm : action.formData,
          bandCotizacion : true,
          cotizacionesInput : null,
        })
      ).setIn(['pedidosTabla', 'pedidoDetalle', 'bandGuardar'], band)
    }
    
    // Actualiza el state con la recepcion subida y valida los campos para
    // permitir guardar
    case ON_UPLOAD_RECEPCION:{
      const newState = state.updateIn(
        ['pedidosTabla', 'pedidoDetalle', 'datos', action.id], stt => stt.merge({
          EvidenciaRec : action.arreglo,
          RutaEvidenciaRecepcionInputFile : action.formData,
          FileRecepcion : action.file,
          RutaEvidenciaRecepcionNombreArchivo : action.file.name,
          BandEvidenciaRecep : 1,
        })
      );
      const datos = JSON.parse(
        JSON.stringify(
          newState.getIn(
            ['pedidosTabla', 'pedidoDetalle', 'datos']
          )
        )
      );
      let band = false;
      for (let i = 0; i < datos.length; i+=1) {
        if(datos[i].DetalleEstatus === 13 && 
          (
            (datos[i].BandRecibidaInput === 0 && datos[i].BandEvidenciaRecep === 1) || 
            (datos[i].BandRecibidaInput === 1 && datos[i].BandEvidenciaRecep === 0)
          )
        ){
          band = true;
          i = datos.length;
        } 
      }
      return newState.setIn(
        ['pedidosTabla', 'pedidoDetalle', 'bandGuardar'], 
        band
      ).set('modificado', true)
    }

    // Actualiza el state con la fecha de autorizacion seleccionada en los params.
    case CHANGE_FECHA_AUTORIZACION: {
      return state.updateIn(['pedidosTabla', 'parametros'], stt => stt.merge({
        fecAutorizacionInicio : action.fechaIni,
        fecAutorizacionFin : action.fechaFin,
      }))
    }

    // Actualiza el state con la fecha de inicio seleccionada en los params.
    case CHANGE_FECHA_INICIO: {
      return state.updateIn(['pedidosTabla', 'parametros'], stt => stt.merge({
        fecSolicitudInicio : action.fechaIni,
        fecSolicitudFin : action.fechaFin,
      }))
    }


    // Actualiza el state con la plaza seleccionada en los parametros
    case CHANGE_PLAZA: {
      return state.setIn(['pedidosTabla', 'parametros', 'plaza'], action.plaza);
    }

    // Actualiza el state con el estatus seleccionado en los parametros
    case CHANGE_ESTATUS: {
      return state.setIn(
        [
          'pedidosTabla', 
          'parametros', 
          'estatusSeleccionado',
        ], 
        action.estatus
      );
    }

    // Actualiza el state con el arreglo de plaza obtenidos de bd
    case SET_PLAZAS: {
      return state.setIn(['pedidosTabla', 'plazas'], List(action.datos))
    }

    // Actualiza el state con el arreglo de estatus obtenidos de bd
    case SET_ESTATUS: {
      return state.setIn(['pedidosTabla', 'estatusCombo'], List(action.datos))
    }
    case SET_TABLA_MOUNTED: {
      return state.setIn(['pedidosTabla', 'noCambio'], true)
    }
    // Actualiza el state con los pedidos obtenidos de bd
    case SET_PEDIDOS: {
      const datos = state.get('pedidosTabla').toJS();
      for (let i = 0; i < action.datos.datos[0].length; i+=1) {
        // debugger;
        const color = /\(([^)]+)\)/.exec(action.datos.datos[0][i].Color);
        action.datos.datos[0][i].Estatus = <Chip
          avatar={<Avatar style={{backgroundColor: action.datos.datos[0][i].Color}}></Avatar>}
          label={action.datos.datos[0][i].Estatus} 
          style={{
            backgroundColor: 'white',
            borderColor: `rgba(${color[1]}, 0.5)`,
            width: '135px',
            justifyContent: 'start',
          }}
          variant="outlined"
        />
      }
      return initialState.updateIn(['pedidosTabla'], (tabla) => tabla.merge({
        cabeceras: action.datos.cabeceras,
        datos: action.datos.datos[0],
        plazas: fromJS(datos.plazas),
        estatusCombo: fromJS(datos.estatusCombo),
        stepper: 0,
      })).updateIn(['pedidosTabla', 'pedidoDetalle'], detalle => detalle.merge({
        bandIntento : false,
        prevIntento : true,
        bandGuardar : false,
      })).updateIn(['pedidosTabla', 'parametros'], stt => stt.merge({
        plaza: Map(datos.parametros.plaza),
        estatusSeleccionado: Map(datos.parametros.estatusSeleccionado),
        fechaSolicitudInput: datos.parametros.fechaSolicitudInput,
        fechaAutorizacionInput: datos.parametros.fechaAutorizacionInput,
        fecSolicitudInicio : datos.parametros.fecSolicitudInicio,
        fecSolicitudFin : datos.parametros.fecSolicitudFin,
        fecAutorizacionInicio : datos.parametros.fecAutorizacionInicio,
        fecAutorizacionFin : datos.parametros.fecAutorizacionFin,
      })).set('mounted', true).set('idPlaza', action.idPlaza);
    }

    // Actualiza el state con el pedido seleccionado para motrar el detalle
    case SET_PEDIDO_DETALLE: {
      const datos = action.datos.datos[0];
      const idPlaza = state.get('idPlaza');
      const cab = action.datos.cabeceras;
      // for (let i = 0; i < cab.length; i+=1) {
      //   if(action.datos.infoPedido.idEstatus === 12 && 
      //     cab[i].campo === 'ComentariosSol'
      //   ){
      //     cab.splice(i, 1);
      //   } 
      //   else if(idPlaza === 9){
      //     if
      //     if(cab[i].campo === 'ComentariosSol'){
      //       cab.splice(i, 1);
      //     }
      //   } else {
      //     if(cab[i].campo === 'ComentariosSol'){
      //       cab.splice(i, 1);
      //     } else {
      //       cab.splice();
      //     }
      //   }
      //   i-=1;
      // }
      return state.updateIn(
        ['pedidosTabla', 'pedidoDetalle'], 
        pedido => pedido.merge({
          cabeceras: cab,
          datos: fromJS(action.datos.datos[0]),
          infoPedido: Map(action.datos.infoPedido),
          cotizaciones: action.datos.cotizaciones,
          cotizacionesPaginado: action.datos.cotizaciones.slice(0,3),
          paginaActual: action.indice,
          recibir: false,
          prevIntento: true,
          ComentariosGeneral: action.datos.infoPedido.comentariosGen,
        })
      ).setIn(['pedidosTabla', 'stepper'], idPlaza === 9 ? 1: 2);
    }

    // default
    default:
      return state;
  }
}

export default pedidosReducer;
