/*
 *
 * MovimientosInventario reducer
 *
 */
import { fromJS } from 'immutable';
import React,{ Fragment } from 'react';
import { isBoolean,isUndefined } from 'lodash';
import Actions from './actions';
import STATE from './state';
import { DEFAULT_ACTION } from './constants';


export const {
  DEFAULT,
  NUEVO_MOVIMIENTO,
  REGRESAR,
  SET_PLAZAS,
  SET_PLAZAS_DETALLE,
  SET_PLAZAS_DESTINO,
  SET_TIPOS_MOVIMIENTOS,
  ON_INPUT_CHANGE,
  ON_INPUT_FOLIO_CHANGE,
  ON_TIPOMOVIMIENTO_CHANGE,
  ON_CHANGE_SECCION_TAB,
  ON_INPUT_MONTO_MOLDE,
  SET_INPUT_CHANGE_SECCION,
  SET_TABLA_MOLDE,
  SET_ROW_MOLDE_SELECCIONADO,
  SET_INSUMOS_MOLDE,
  SET_PIEZAS_MOLDE,
  SET_ACCESORIOS_MOLDE,
  HANDLE_CHANGE_ARCHIVO_EDITAR,
  HANDLE_DELETE_ARCHIVO,
  HANDLE_DELETE_ARCHIVO_EDICION,
  ON_CLICK_CANCELAR_MOVIMIENTO,
  HANDLE_ABRIR_MODAL_AGREGAR,
  // ON_CLICK_AGREGAR_MOVIMIENTO,
  ON_CLICK_AGREGAR,
  SET_MOVIMIENTO_GUARDADO,
  SET_TABLA_MOVIMIENTOS,
  SET_DETALLE_MOVIMIENTO,
  SET_DETALLE_TABLAS_MOVIMIENTO,
  SET_MOSTRAR_MOLDE,
  SET_PERMISOS,
  SET_ALMACENES,
  SET_ALMACENES_VALOR,
  SET_USUARIO,
  SET_ALMACENES_DESTINO,
  SET_ALMACENES_DESTINO_VALOR,
  LIMPIAR_STATE,
  ON_SEARCH_CHANGE,
} = Actions.getConstants();

export const initialState = fromJS(STATE);



function movimientosInventarioReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LIMPIAR_STATE: 
      return initialState;
    case SET_PERMISOS: {
      return state.setIn([
        'permisos',
      ], fromJS(action.payload));
    }
    case NUEVO_MOVIMIENTO: {
      return state.setIn(['movimientoInventarioTabla', 'stepper'], 1);
    }
    case SET_USUARIO: {
      return state.setIn(['movimientoInventarioTabla', 'usuarioLogeado'], action.usuarioId)
    }
    case SET_PLAZAS: {
      return state.setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','plazas'],action.datos)
    }
    case SET_PLAZAS_DETALLE: {
      return state.setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','plazasDetalle'],action.datos)
    }
    case SET_PLAZAS_DESTINO: {
      const {
        plazas,
        // plazaSeleccionada,
      } = action
      // const plazasDestino = plazas.filter(datoPlaza=> datoPlaza.IdPlaza !== plazaSeleccionada)

      return state.setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','plazasDestino'],plazas)
    }
    case SET_TIPOS_MOVIMIENTOS: {
      return state.setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','tiposMovimientos'],action.datos)
    }
    case SET_TABLA_MOLDE: {
      
      return state.setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','tablas','molde','datos'],action.datos)
        .setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','seleccionesRows','rowMoldeSeleccionado'],[])
        .setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','moldeSeleccionado'], '')
        .setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','hayMoldeSeleccionado'], false)
    }
    case SET_TABLA_MOVIMIENTOS: {
      
      return state.setIn(['movimientoInventarioTabla','datos'],action.datos)
    }
    case SET_DETALLE_MOVIMIENTO: {
      const {
        PlazaSeleccionada,
        TipoMovimiento,
        Observacion,
        IdMolde,
        IdAlmacen,
        IdPlazaDestino,
        IdAlmacenDestino,
      } = action.datos.generales;


      return state.setIn(['movimientoInventarioTabla','campos','plaza','valor'],PlazaSeleccionada)
        .setIn(['movimientoInventarioTabla','campos','plazaDestino','valor'],IdPlazaDestino)
        .setIn(['movimientoInventarioTabla','campos','tipoMovimiento','valor'],TipoMovimiento)
        .setIn(['movimientoInventarioTabla','campos','observacion','valor'],Observacion)
        .setIn(['movimientoInventarioTabla','campos','almacen','valor'],IdAlmacen)
        .setIn(['movimientoInventarioTabla','campos','almacenDestino','valor'],IdAlmacenDestino)
        .setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','moldeSeleccionado'],IdMolde)
        .setIn(['movimientoInventarioTabla','stepper'],2)
        .setIn(['movimientoInventarioTabla','PDF'], action.datos)
        .setIn(['movimientoInventarioTabla','esDetalleMovimiento'],true)
        .setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','mostrarMolde'],true)
        .setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','hayMoldeSeleccionado'],true)
        
    }
    case SET_DETALLE_TABLAS_MOVIMIENTO: {
      const arrayPlazas = state.getIn(
        [
          'movimientoInventarioTabla',
          'configuracionNuevoMovimiento',
          'plazas',
        ]
      )
      const arrayPlantas = []
      const datosMolde = action.datos.molde
      const moldeSeleccionado = datosMolde.filter(molde => molde.idMolde === action.idMolde)
      
      for (let i = 0; i < moldeSeleccionado[0].plantas; i+=1) {
        arrayPlantas.push({id:i+1,nombre:i=== 0 ?`Planta Baja`:`Nivel ${i}`})
      }
      
      return state.setIn(['movimientoInventarioTabla','documentacion', 'archivos'],fromJS(action.datos.archivos))
        .setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento', 'tablas','molde','datos'],fromJS(action.datos.molde))
        .setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento', 'tablas','pieza','datos'],fromJS(action.datos.piezas))
        .setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento', 'tablas','accesorio','datos'],fromJS(action.datos.accesorios))
        .setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento', 'almacenes'],fromJS(action.datos.almacenes))
        .setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento', 'almacenesDestino'],fromJS(action.datos.almacenesDestino))
        .setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento', 'plazasDestino'],fromJS(arrayPlazas))
        // .setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento', 'tiposMovimientosDetalle'],fromJS(action.datos.tiposMovimientos))
        .setIn(['movimientoInventarioTabla','combos','plantas'], arrayPlantas)
    }
    case SET_MOSTRAR_MOLDE: {
      return state.setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','mostrarMolde'],true)
    }
    case REGRESAR: {
      const datosMovimiento = state.getIn(
        [
          'movimientoInventarioTabla',
          'datos',
        ]
      )
      const usuario = state.getIn(['movimientoInventarioTabla','usuarioLogeado'])
      const plazas = state.getIn(
        [
          'movimientoInventarioTabla',
          'configuracionNuevoMovimiento',
          'plazas',
        ]
      )

      const tiposMovimientos = state.getIn(
        [
          'movimientoInventarioTabla',
          'configuracionNuevoMovimiento',
          'tiposMovimientos',
        ]
      )
      const permisos = state.getIn(
        [
          'permisos',
        ]
      )
      return initialState.updateIn(
        [
          'movimientoInventarioTabla',
          'configuracionNuevoMovimiento',
        ],
        stt => stt.merge({
          plazas: fromJS(plazas),
          tiposMovimientos: fromJS(tiposMovimientos),
        })
      ).setIn(['movimientoInventarioTabla', 'stepper'], 0)
        .setIn(['movimientoInventarioTabla', 'usuarioLogeado'], usuario)
        .setIn(['permisos'], permisos)
        .setIn(['movimientoInventarioTabla', 'datos'], datosMovimiento)
      // .setIn(['transformacionesTabla', 'show'], false)
      // .setIn(['transformacionesTabla', 'update'], false)
      // .setIn(['transformacionesTabla', 'disabled'], false)
      // .setIn(['transformacionesTabla', 'origen'], fromJS(obj))
      // .setIn(['transformacionesTabla', 'destino'], fromJS(obj))
      // .setIn(['transformacionesTabla', 'nuevaTransformacion'], fromJS(nuevaTransformacion));
    }
    case ON_TIPOMOVIMIENTO_CHANGE: {
      return state
    }
    case ON_INPUT_CHANGE: {
      const tipoMovimientoSeleccionado = state.getIn(['movimientoInventarioTabla','campos', 'tipoMovimiento','valor'])
      const almacenSeleccionado = state.getIn(['movimientoInventarioTabla','campos', 'almacen','valor'])
      const plazaSeleccionada = state.getIn(['movimientoInventarioTabla','campos', 'plaza','valor'])

      // const datosPieza = state.getIn(['movimientoInventarioTabla','configuracionNuevoMovimiento', 'tablas','pieza','datos'])
      // const piezas = JSON.parse(JSON.stringify(datosPieza))
      // const datosAccesorios = state.getIn(['movimientoInventarioTabla','configuracionNuevoMovimiento', 'tablas','accesorio','datos'])
      // const accesorios = JSON.parse(JSON.stringify(datosAccesorios))

      // const hayDatosSeleccionados = piezas.filter(datoPieza => datoPieza.Seleccionado).length>0 || 
      //                               accesorios.filter(datoAccesorio => datoAccesorio.Seleccionado).length>0
      if(action.campo === 0){
        const mostrarMolde = tipoMovimientoSeleccionado !== '' && action.valor !== '' && tipoMovimientoSeleccionado !== 5 && almacenSeleccionado !== ''
        // const datosSeleccionados = action.valor !== '' && tipoMovimientoSeleccionado !== '' && almacenSeleccionado !== '' 
        return state.updateIn(
          [
            'movimientoInventarioTabla',
            'campos',
            'plaza',
          ],
          stt => stt.merge({
            valor: action.valor,
            campoValido: true,
          })
        ) 
          .setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','mostrarMolde'],mostrarMolde)
          .setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','hayCambioConfiguracion'],true)
          .setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','guardarMovimiento'],false)
          .setIn(['movimientoInventarioTabla','campos','almacen','valor'],'')
          
      }
      if(action.campo === 1){
        // const almacenSeleccionado = state.getIn(['movimientoInventarioTabla','campos', 'almacen','valor'])
        const mostrarMolde = plazaSeleccionada !== '' && action.valor !== '' && action.valor !== 5 && almacenSeleccionado !== ''
        return state.updateIn(
          [
            'movimientoInventarioTabla',
            'campos',
            'tipoMovimiento',
          ],
          stt => stt.merge({
            valor: action.valor,
            campoValido: true,
          })
        )
          .setIn(['movimientoInventarioTabla','campos', 'plaza','campoValido'],plazaSeleccionada !== '')
          .setIn(['movimientoInventarioTabla','campos', 'almacen','campoValido'],almacenSeleccionado !== '')
          .setIn(['movimientoInventarioTabla','campos', 'folio','valor'],'')
          .setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','mostrarMolde'],mostrarMolde)
          .setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','hayCambioConfiguracion'],true)
          .setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','guardarMovimiento'],false)
      }
      if(action.campo === 2){

        return state.updateIn(
          [
            'movimientoInventarioTabla',
            'campos',
            'observacion',
          ],
          stt => stt.merge({
            valor: action.valor,
            campoValido: true,
          })
        ).setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','hayCambioConfiguracion'],action.valor !== '')
      }
      if(action.campo === 3){

        return state.updateIn(
          [
            'movimientoInventarioTabla',
            'campos',
            'folio',
          ],
          stt => stt.merge({
            valor: action.valor,
            campoValido: true,
          })
        ).setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','hayCambioConfiguracion'],action.valor !== '')
      }
      return state;
    }
    case ON_INPUT_FOLIO_CHANGE: {
      return state.updateIn(
        [
          'movimientoInventarioTabla',
          'campos',
          'folio',
        ],
        stt => stt.merge({
          valor: action.valor,
          campoValido: true,
        })
      ).setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','hayCambioConfiguracion'],action.valor !== '')
    }
    case ON_CHANGE_SECCION_TAB: {
      return state.setIn(
        [
          'movimientoInventarioTabla',
          'configuracionNuevoMovimiento',
          'pestañaSeleccionada',
        ],
        action.id,
      )
    }
    case SET_INPUT_CHANGE_SECCION: {
      const esDetalleMovimiento = state.getIn(['movimientoInventarioTabla','esDetalleMovimiento'])
      if(action.campo === 0){
        const datosPieza = state.getIn(['movimientoInventarioTabla','configuracionNuevoMovimiento', 'tablas','pieza','datos'])
        const piezas = JSON.parse(JSON.stringify(datosPieza))

        const datosPiezasFiltradas= piezas.filter(datoPieza => datoPieza.Planta === action.valor)
        const rowPiezasSeleccionadas = [] 
        datosPiezasFiltradas.forEach((datoPieza,index) => {
          if(datoPieza.Seleccionado)
            rowPiezasSeleccionadas.push(index)
        })
        
        if (esDetalleMovimiento)
          return state.updateIn(
            [
              'movimientoInventarioTabla',
              'campos',
              'plantaPieza',
            ],
            stt => stt.merge({
              valor: action.valor,
              campoValido: (action.valor >= 0),
            })
          )
        return state.updateIn(
          [
            'movimientoInventarioTabla',
            'campos',
            'plantaPieza',
          ],
          stt => stt.merge({
            valor: action.valor,
            campoValido: (action.valor >= 0),
          })
        ).setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','seleccionesRows','rowPiezasSeleccionadas'],rowPiezasSeleccionadas)
      }


      if(action.campo === 1){


        const datosAccesorios = state.getIn(['movimientoInventarioTabla','configuracionNuevoMovimiento', 'tablas','accesorio','datos'])
        const accesorios = JSON.parse(JSON.stringify(datosAccesorios))
        const datosAccesoriosFiltrados= accesorios.filter(datoAccesorio => datoAccesorio.Planta === action.valor)
        

        const rowAccesoriosSeleccionados = [] 
        datosAccesoriosFiltrados.forEach((datoAccesorio,index) => {
          if(datoAccesorio.Seleccionado)
            rowAccesoriosSeleccionados.push(index)
        })
        if (esDetalleMovimiento)
          return state.updateIn(
            [
              'movimientoInventarioTabla',
              'campos',
              'plantaAccesorio',
            ],
            stt => stt.merge({
              valor: action.valor,
              campoValido: (action.valor >= 0),
            })
          )
        return state.updateIn(
          [
            'movimientoInventarioTabla',
            'campos',
            'plantaAccesorio',
          ],
          stt => stt.merge({
            valor: action.valor,
            campoValido: (action.valor >= 0),
          })
        ).setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','seleccionesRows','rowAccesoriosSeleccionados'],rowAccesoriosSeleccionados)
      }

      if(action.campo === 2){

        const datosPieza = state.getIn(['movimientoInventarioTabla','configuracionNuevoMovimiento', 'tablas','pieza','datos'])
        const piezas = JSON.parse(JSON.stringify(datosPieza))
        const datosAccesorios = state.getIn(['movimientoInventarioTabla','configuracionNuevoMovimiento', 'tablas','accesorio','datos'])
        const accesorios = JSON.parse(JSON.stringify(datosAccesorios))

        const hayDatosSeleccionados = piezas.filter(datoPieza => datoPieza.Seleccionado).length>0 || 
                                      accesorios.filter(datoAccesorio => datoAccesorio.Seleccionado).length>0

        return state.updateIn(
          [
            'movimientoInventarioTabla',
            'campos',
            'plazaDestino',
          ],
          stt => stt.merge({
            valor: action.valor,
            campoValido: true,
          })
        ).setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','guardarMovimiento'],hayDatosSeleccionados)
      }


      return state;
    }
    case SET_ROW_MOLDE_SELECCIONADO: {
      const {
        rowSeleccionados,
        pestañaSeleccionada,
        idMolde,
      } = action

      
      const tipoMovimientoSeleccionado = state.getIn(['movimientoInventarioTabla','campos', 'tipoMovimiento','valor'])
      let valorSalidaTraspaso = true;
      if (tipoMovimientoSeleccionado === 6){
        const plazaDestino = state.getIn(['movimientoInventarioTabla','campos','plazaDestino','valor'])
        valorSalidaTraspaso = plazaDestino !== ''
      }
      

      const datosPieza = state.getIn(['movimientoInventarioTabla','configuracionNuevoMovimiento', 'tablas','pieza','datos'])
      const piezas = JSON.parse(JSON.stringify(datosPieza))
      const datosAccesorios = state.getIn(['movimientoInventarioTabla','configuracionNuevoMovimiento', 'tablas','accesorio','datos'])
      const accesorios = JSON.parse(JSON.stringify(datosAccesorios))

      // cambiar plantas seleccionadas
      const moldeExistente = rowSeleccionados.length>0 ? idMolde : ''

      if (pestañaSeleccionada === 0) {
        const arrayPlantas = []
        
        const datosMolde = state.getIn(['movimientoInventarioTabla','configuracionNuevoMovimiento', 'tablas','molde','datos'])
        
        if(rowSeleccionados.length>0 ){
          const moldeSeleccionado = datosMolde.filter(molde => molde.idMolde === idMolde)
          for (let i = 0; i < moldeSeleccionado[0].plantas; i+=1) {
            arrayPlantas.push({id:i+1,nombre:i=== 0 ?`Planta Baja`:`Nivel ${i}`})
          }
        }

        return state
          .setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','seleccionesRows','rowMoldeSeleccionado'],rowSeleccionados)
          .setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','moldeSeleccionado'], moldeExistente)
          .setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','hayMoldeSeleccionado'], rowSeleccionados.length>0)
          .setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','seleccionesRows','rowPiezasSeleccionadas'], [])
          .setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','seleccionesRows','rowAccesoriosSeleccionados'], [])
          .setIn(['movimientoInventarioTabla','combos','plantas'], arrayPlantas)
          .setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','guardarMovimiento'],false)
      }
      if (pestañaSeleccionada === 1) {
        
        const idPlantaPieza = state.getIn(['movimientoInventarioTabla','campos', 'plantaPieza','valor'])
        const datosPiezasFiltradas= piezas.filter(datoPieza => datoPieza.Planta === idPlantaPieza)
        

        
        datosPiezasFiltradas.forEach((pieza,index) => {
          datosPiezasFiltradas[index].Seleccionado = false
        })

        rowSeleccionados.forEach((row) => {
          datosPiezasFiltradas[row].Seleccionado = true
        })

        datosPiezasFiltradas.forEach((piezaFiltrada) => {
          piezas.forEach((pieza,index) => {
            if (piezaFiltrada.IdPieza === pieza.IdPieza){
              piezas[index].Seleccionado = piezaFiltrada.Seleccionado
            }
          })
        })

        const hayDatosSeleccionados = piezas.filter(datoPieza => datoPieza.Seleccionado).length>0 || 
                                      accesorios.filter(datoAccesorio => datoAccesorio.Seleccionado).length>0

        return state
          .setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','seleccionesRows','rowPiezasSeleccionadas'],rowSeleccionados)
          .setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','tablas','pieza','datos'],fromJS(piezas))
          .setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','guardarMovimiento'],hayDatosSeleccionados&&valorSalidaTraspaso)
      }
      if (pestañaSeleccionada === 2) {
        const idPlantaAccesorio = state.getIn(['movimientoInventarioTabla','campos', 'plantaAccesorio','valor'])
        const datosAccesoriosFiltrados= accesorios.filter(datoAccesorio => datoAccesorio.Planta === idPlantaAccesorio)
        

        if (rowSeleccionados.length === 0){
          datosAccesoriosFiltrados.forEach((accesorio,index) => {
            datosAccesoriosFiltrados[index].Seleccionado = false
          })
        }
        rowSeleccionados.forEach((row) => {
          datosAccesoriosFiltrados[row].Seleccionado = true
        })

        datosAccesoriosFiltrados.forEach((accesorioFiltrado) => {
          accesorios.forEach((accesorio,index) => {
            if (accesorioFiltrado.IdAccesorio === accesorio.IdAccesorio && accesorioFiltrado.IdUbicacion === accesorio.IdUbicacion){
              accesorios[index].Seleccionado = accesorioFiltrado.Seleccionado
            }
          })
        })

        const hayDatosSeleccionados = piezas.filter(datoPieza => datoPieza.Seleccionado).length>0 || 
                                      accesorios.filter(datoAccesorio => datoAccesorio.Seleccionado).length>0


        return state
          .setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','seleccionesRows','rowAccesoriosSeleccionados'],rowSeleccionados)
          .setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','tablas','accesorio','datos'],fromJS(accesorios))
          .setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','guardarMovimiento'],hayDatosSeleccionados && valorSalidaTraspaso)
      }
      return state
      
    }
    case SET_INSUMOS_MOLDE: {
      const datosPieza  = fromJS(action.datos[0])
      const datosAccesorios = fromJS(action.datos[1])

      return state
        .setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','tablas','pieza','datos'],datosPieza)
        .setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','tablas','accesorio','datos'],datosAccesorios)
    }
    case SET_PIEZAS_MOLDE: {
      return state
        .setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','tablas','pieza','datos'],action.datos)
    }
    case SET_ACCESORIOS_MOLDE: {
      return state
        .setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','tablas','accesorio','datos'],action.datos)
    }
    case ON_INPUT_MONTO_MOLDE: {

      const datosAccesorios = state.getIn(['movimientoInventarioTabla','configuracionNuevoMovimiento', 'tablas','accesorio','datos'])
      const accesorios = JSON.parse(JSON.stringify(datosAccesorios))
      const idPlantaAccesorio = state.getIn(['movimientoInventarioTabla','campos', 'plantaAccesorio','valor'])
      const datosAccesoriosFiltrados= accesorios.filter(datoAccesorio => datoAccesorio.Planta === idPlantaAccesorio)
      let indiceReal = -1
      let idAccesorio = -1
      let idUbicacion = -1

      // const rowAccesoriosSeleccionados = [] 
      datosAccesoriosFiltrados.forEach((datoAccesorio,index) => {
        if(index === action.index){
          idAccesorio = datoAccesorio.IdAccesorio
          idUbicacion = datoAccesorio.IdUbicacion
        } 
      })

      accesorios.forEach((accesorio,index) => {
        if(idAccesorio === accesorio.IdAccesorio && idUbicacion === accesorio.IdUbicacion ){
          indiceReal = index
        } 
      })
      if (indiceReal !== -1){
        return state.updateIn(
          ['movimientoInventarioTabla', 'configuracionNuevoMovimiento', 'tablas','accesorio','datos',indiceReal], stt => stt.merge({
            Monto : action.value,
            CampoValido : action.value>0,
          })
        )
      }
      return state
    }
    case HANDLE_CHANGE_ARCHIVO_EDITAR: {
      const archivos = state.getIn(
        [
          'movimientoInventarioTabla',
          'documentacion',
          'archivos',
        ]
      ).toJS()

      for (let i = 0; i < action.file.formData.length; i+=1) {
        archivos.push(action.file.formData[i])
      }
      return state.setIn(
        [
          'movimientoInventarioTabla',
          'documentacion',
          'archivos',
        ],
        fromJS(archivos),
      ).setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','hayCambioConfiguracion'],archivos.length > 0 )
    }
    case HANDLE_DELETE_ARCHIVO: {
      if(isBoolean(action.id))
        return state.updateIn(
          [
            'movimientoInventarioTabla',
            'documentacion',
          ],
          stt => stt.merge({
            eliminarArchivo: false,
            idArchivo: null,
          })
        )
      
      return state.updateIn(
        [
          'movimientoInventarioTabla',
          'documentacion',
        ],
        stt => stt.merge({
          eliminarArchivo: true,
          idArchivoTempo: action.id,
        })
      )
    }
    case HANDLE_DELETE_ARCHIVO_EDICION: {
      return state.updateIn(
        [
          'movimientoInventarioTabla',
          'documentacion',
        ],
        stt => stt.merge({
          archivos : fromJS(action.archivos),
          eliminarArchivo: false,
          idArchivoTempo: null,
        })
      ).setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','hayCambioConfiguracion'],action.archivos.length > 0 )
    }
    case ON_CLICK_CANCELAR_MOVIMIENTO: {
      const nuevoMovimiento = state.getIn(
        [
          'movimientoInventarioTabla',
          'configuracionNuevoMovimiento',
        ]
      ).toJS()
      const stepper = state.getIn(['movimientoInventarioTabla','stepper'])
      const usuario = state.getIn(['movimientoInventarioTabla','usuarioLogeado'])

      const datosMovimiento = state.getIn(
        [
          'movimientoInventarioTabla',
          'datos',
        ]
      )
      const plazas = state.getIn(
        [
          'movimientoInventarioTabla',
          'configuracionNuevoMovimiento',
          'plazas',
        ]
      )

      const tiposMovimientos = state.getIn(
        [
          'movimientoInventarioTabla',
          'configuracionNuevoMovimiento',
          'tiposMovimientos',
        ]
      )
      const permisos = state.getIn(
        [
          'permisos',
        ]
      )
      if(stepper=== 1){
        if(action.cancelar)
          return state.updateIn(
            [
              'movimientoInventarioTabla',
              'configuracionNuevoMovimiento',
            ],
            stt => stt.merge({
              bandModal: 0,
              abrirModalAgregar: false,
            })
          )
        if(nuevoMovimiento.abrirModalAgregar){
          return initialState.updateIn(
            [
              'movimientoInventarioTabla',
              'configuracionNuevoMovimiento',
            ],
            stt => stt.merge({
              plazas: fromJS(plazas),
              tiposMovimientos: fromJS(tiposMovimientos),
            })
          ).setIn(['movimientoInventarioTabla','stepper'], 0)
            .setIn(['movimientoInventarioTabla', 'usuarioLogeado'], usuario)
            .setIn(['permisos'], permisos)
            .setIn(['movimientoInventarioTabla', 'datos'], datosMovimiento)
            
        }
        if(nuevoMovimiento.hayCambioConfiguracion)
          return state.updateIn(
            [
              'movimientoInventarioTabla',
              'configuracionNuevoMovimiento',
            ],
            stt => stt.merge({
              abrirModalAgregar: true,
              bandModal: 5,
              mensajeConfirmacion:<Fragment>Existen datos no guardados.<br/> ¿Deseá continuar?</Fragment>,
            })
          )
          
        return initialState.updateIn(
          [
            'movimientoInventarioTabla',
            'configuracionNuevoMovimiento',
          ],
          stt => stt.merge({
            plazas: fromJS(plazas),
            tiposMovimientos: fromJS(tiposMovimientos),
          })
        ).setIn(['movimientoInventarioTabla','stepper'], 0)
          .setIn(['movimientoInventarioTabla', 'usuarioLogeado'], usuario)
          .setIn(['permisos'], permisos)
          .setIn(['movimientoInventarioTabla', 'datos'], datosMovimiento)
      }
      if(stepper === 2){
        return initialState.updateIn(
          [
            'movimientoInventarioTabla',
            'configuracionNuevoMovimiento',
          ],
          stt => stt.merge({
            plazas: fromJS(plazas),
            tiposMovimientos: fromJS(tiposMovimientos),
          })
        ).setIn(['movimientoInventarioTabla','stepper'], 0)
          .setIn(['movimientoInventarioTabla', 'usuarioLogeado'], usuario)
          .setIn(['permisos'], permisos)
          .setIn(['movimientoInventarioTabla', 'datos'], datosMovimiento)
      }
      
      return state.set('stepper', 1)
    }
    case SET_MOVIMIENTO_GUARDADO: {
      const plazas = state.getIn(
        [
          'movimientoInventarioTabla',
          'configuracionNuevoMovimiento',
          'plazas',
        ]
      )
      const usuario = state.getIn(['movimientoInventarioTabla','usuarioLogeado'])
      const tiposMovimientos = state.getIn(
        [
          'movimientoInventarioTabla',
          'configuracionNuevoMovimiento',
          'tiposMovimientos',
        ]
      )
      const permisos = state.getIn(
        [
          'permisos',
        ]
      )
      return initialState.set('stepper', 0)
        .setIn(['movimientoInventarioTabla','datos'],action.datos)
        .setIn(['movimientoInventarioTabla', 'usuarioLogeado'], usuario)
        .setIn(['permisos'], permisos)
        .updateIn(
          [
            'movimientoInventarioTabla',
            'configuracionNuevoMovimiento',
          ],
          stt => stt.merge({
            plazas: fromJS(plazas),
            tiposMovimientos: fromJS(tiposMovimientos),
          })
        )
    }
    case HANDLE_ABRIR_MODAL_AGREGAR: {
      const stepper = state.getIn(['movimientoInventarioTabla','stepper'])

      if(stepper=== 1){
        if(action.abrir)
          return state.updateIn(
            [
              'movimientoInventarioTabla',
              'configuracionNuevoMovimiento',
            ],
            stt => stt.merge({
              bandModal: 4,
              abrirModalAgregar: true,
              mensajeConfirmacion: <Fragment>Los datos no podran ser modificados.<br/> ¿Deseá continuar?</Fragment>,
            })
          )

        return state.updateIn(
          [
            'movimientoInventarioTabla',
            'configuracionNuevoMovimiento',
          ],
          stt => stt.merge({
            bandModal: 0,
            abrirModalAgregar: false,
          })
        )
      }
      return state.set('stepper', 1)
    }
    case SET_ALMACENES: {
      return state.setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','almacenes'],action.datos)
    }
    case SET_ALMACENES_DESTINO: {
      const idAlmacenSeleccionado = state.getIn(['movimientoInventarioTabla','campos', 'almacen','valor'])
      const arrayAlmacenes = action.datos.filter(almacen=> almacen.IdAlmacen !== idAlmacenSeleccionado)
      return state.setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','almacenesDestino'],action.datos)
        .setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','almacenesDestinoValidos'],arrayAlmacenes)
    }
    case SET_ALMACENES_VALOR: {
      
      const tipoMovimientoSeleccionado = state.getIn(['movimientoInventarioTabla','campos', 'tipoMovimiento','valor'])
      const plazaSeleccionada = state.getIn(['movimientoInventarioTabla','campos', 'plaza','valor'])
      const mostrarMolde = tipoMovimientoSeleccionado !== '' && plazaSeleccionada !== '' && tipoMovimientoSeleccionado !== 5 && action.valor !== ''
      const almacenesDestino = state.getIn(
        [
          'movimientoInventarioTabla',
          'configuracionNuevoMovimiento',
          'almacenesDestino',
        ]
      )

      const arrayAlmacenes = almacenesDestino.filter(almacen=> almacen.IdAlmacen !== action.valor)


      let almacenDestino = state.getIn(['movimientoInventarioTabla','campos', 'almacenDestino','valor'])
      if(action.valor === almacenDestino){
        almacenDestino = ''
      }
      return state.updateIn(
        [
          'movimientoInventarioTabla',
          'campos',
          'almacen',
        ],
        stt => stt.merge({
          valor: isUndefined(action.valor) ? '' :action.valor,
          campoValido: action.valor!=='',
        })
      ).setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','mostrarMolde'],mostrarMolde)
        .setIn(['movimientoInventarioTabla','campos','almacenDestino','valor'],almacenDestino)
        .setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','almacenesDestinoValidos'],arrayAlmacenes)
        .setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento','guardarMovimiento'],false)
    }
    case SET_ALMACENES_DESTINO_VALOR: {
      return state.updateIn(
        [
          'movimientoInventarioTabla',
          'campos',
          'almacenDestino',
        ],
        stt => stt.merge({
          valor: action.valor,
          campoValido: action.valor!=='',
        })
      ) 
    }

    case ON_SEARCH_CHANGE: {
      if(action.tipo >0){
        const tipoInsumo = action.tipo === 1 ? 'pieza':'accesorio'
        return state.setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento', 'tablas',tipoInsumo,'textoBusqueda'],action.textoBusqueda)
      }
      return state.setIn(['movimientoInventarioTabla','configuracionNuevoMovimiento', 'tablas','molde','configuracion','textoBusqueda'],action.textoBusqueda)
    }

    case ON_CLICK_AGREGAR: {
      return state
      // const secciones = state.getIn(
      //   [
      //     'configuracion',
      //     'secciones',
      //   ]
      // ).toJS();
      
      // if(action.cancelar)
      //   return state.updateIn(
      //     [
      //       'configuracion',
      //       'secciones',
      //     ],
      //     stt => stt.merge({
      //       bandModal: 0,
      //       abrirModalAgregar: false,
      //       hayCambioSeccion: true,
      //       hayCambio: true,
      //     })
      //   )

      // if(secciones.hayCambioSeccion || secciones.hayCambio)
      //   return state.updateIn(
      //     [
      //       'configuracion',
      //       'secciones',
      //     ],
      //     stt => stt.merge({
      //       abrirModalAgregar: true,
      //       bandModal: 4,
      //       hayCambioSeccion: false,
      //       hayCambio: false,
      //       mensajeConfirmacion: '¿Está seguro que desea salir?',
      //     })
      //   )
        
      // return state.updateIn(
      //   [
      //     'configuracion',
      //     'secciones',
      //   ], 
      //   stt => stt.merge({
      //     seccionSlc : fromJS(
      //       {
      //         idSeccion: null,
      //         plantaTabla: '',
      //         nombreTabla: '',
      //         identificadorTabla: '',
      //         insumos: 0,
      //         area: 0,
      //         esAccesorio: true,
      //         datos: [],
      //       },
      //     ),
      //     esAccesorio: false,
      //     pestañaSlc: 0,
      //     abrirModalAgregar: false,
      //     hayCambioSeccion: false,
      //     bandModal: 0,
      //     idPieza: null,
      //     indiceSeccion: null,
      //     mensajeConfirmacion: '',
      //   })
      // ).updateIn(
      //   [
      //     'configuracion',
      //     'secciones',
      //     'campos',
      //   ],
      //   stt => stt.merge({
      //     nombre : {
      //       valor: '',
      //       campoValido: true,
      //     },
      //     planta : {
      //       valor: '',
      //       campoValido: true,
      //     },
      //     pieza : {
      //       valor: '',
      //       campoValido: true,
      //     },
      //     identificador : {
      //       valor: '',
      //       campoValido: true,
      //     },
      //     numeracion : {
      //       valor: '',
      //       campoValido: true,
      //     },
      //     forma : {
      //       valor: 0,
      //       campoValido: true,
      //     },
      //     alto : {
      //       valor: '',
      //       campoValido: true,
      //     },
      //     ancho : {
      //       valor: '',
      //       campoValido: true,
      //     },
      //     usos : {
      //       valor: '',
      //       campoValido: true,
      //     },
      //     area : {
      //       valor: '',
      //       campoValido: true,
      //     },
      //     material : {
      //       valor: '',
      //       campoValido: true,
      //     },
      //     cantPiezas : {
      //       valor: '',
      //       campoValido: true,
      //     },
      //     tiempoVida : {
      //       valor: '',
      //       campoValido: true,
      //     },
      //   })
      // )

    }
    default: {
      return state;
    }
  }
}

export default movimientosInventarioReducer;
