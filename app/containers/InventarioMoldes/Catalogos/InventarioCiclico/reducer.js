/*
 *
 * InventarioCiclico reducer
 *
 */

import { fromJS } from 'immutable';
// import { isBoolean } from 'lodash';
// import toSafeInteger from 'lodash/toSafeInteger';
import Actions from './actions';
import STATE from './state';
import { DEFAULT_ACTION } from './constants';
// import moment from 'moment';

export const {        
  DEFAULT,
  SET_FECHAS,
  SET_FECHA_SELECCIONADA,
  SET_DIA_SELECCIONADO,
  REGRESAR,
  SET_INSUMOS_ALMACEN,
  SET_INSUMO_SELECCIONADO,
  ON_SELECTION_CHANGE,
  SET_ALMACENES,
  SET_ESTATUS,
  SET_MOLDES_ALMACEN,
  // HANDLE_CHANGE_ALMACEN,
  HANDLE_CHANGE_MOLDE,
  HANDLE_CHANGE_ESTATUS,
  ON_INPUT_MONTO_MOLDE,
  ON_ROWS_SELECCIONADOS_CHANGE,
  HANDLE_CHANGE_ARCHIVO,
  HANDLE_CHANGE_ARCHIVO_EVIDENCIA,
  HANDLE_DELETE_ARCHIVO,
  HANDLE_DELETE_ARCHIVO_EVIDENCIA,
  ON_CERRAR_INVENTARIO,
  HANDLE_ABRIR_MODAL,
  // SET_INVENTARIOS_ALMACEN,
  SET_INVENTARIO_GUARDADO,
  SET_EVIDENCIAS_ALMACEN,
  // SET_FECHA_INICIAL_ALMACEN,
  HANDLE_MOSTRAR_DETALLE,
  HANDLE_MOSTRAR_INVENTARIO,
  SET_RESULTADOS,
  HANDLE_ELIMINAR_MODAL,
  SET_USUARIO,
  SET_CANTIDAD_RESULTADOS,
  SET_CARGANDO,
  SET_PERMISOS,
  LIMPIAR_STATE,
  ON_SEARCH_CHANGE,
  ON_CHANGE_CELDA,
  ON_CHANGE_CELDA_EVIDENCIA,
  ON_CHANGE_CELDA_MONTO,
} = Actions.getConstants();

export const initialState = fromJS(STATE);

function inventarioCiclicoReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LIMPIAR_STATE: 
      return initialState;
    case SET_USUARIO: {
      return state.setIn(['inventarioCiclicoTabla', 'usuarioLogeado'], action.usuarioId)
    }
    case SET_PERMISOS: {
      return state.setIn([
        'permisos',
      ], fromJS(action.payload));
    }
    case SET_FECHAS: {
      return state.setIn(['inventarioCiclicoTabla', 'configuracionCalendario','datosSeleccionados','fechaActual'], action.fecha)
        .setIn(['inventarioCiclicoTabla', 'configuracionCalendario','datosSeleccionados','diaSeleccionado'], action.fecha)
        .setIn(['inventarioCiclicoTabla', 'configuracionCalendario','datosSeleccionados','fechaSeleccionada'], action.fecha)
    }
    case SET_FECHA_SELECCIONADA: {
      return state.setIn(['inventarioCiclicoTabla', 'configuracionCalendario','datosSeleccionados','fechaSeleccionada'], action.fecha)
    }
    case SET_DIA_SELECCIONADO: {
      return state.setIn(['inventarioCiclicoTabla', 'configuracionCalendario','datosSeleccionados','diaSeleccionado'], action.fecha)
    }
    case SET_INSUMO_SELECCIONADO: {
      return state.setIn(['inventarioCiclicoTabla', 'configuracionCalendario','insumoSeleccionado'], action.insumoSeleccionado)
    }
    case SET_ALMACENES: {
      return state.setIn(['inventarioCiclicoTabla','configuracionCalendario','almacenes'],action.datos)
    }
    case SET_ESTATUS: {
      return state.setIn(['inventarioCiclicoTabla','configuracionCalendario','estatus'],action.datos)
    }
    case SET_CARGANDO: {
      return state.setIn(['inventarioCiclicoTabla','cargando'],action.band)
    }
    case SET_CANTIDAD_RESULTADOS: {
      const cantidadResultados = state.getIn(['inventarioCiclicoTabla','cantidadResultados'])
      return state.setIn(['inventarioCiclicoTabla','cantidadResultados'],cantidadResultados-1)
    }
    
    // case SET_MOLDES: {
    //   return state.setIn(['inventarioCiclicoTabla','configuracionCalendario','moldes'],action.datos)
    // }
    case SET_INSUMOS_ALMACEN: {
      const datosPieza  = fromJS(action.datos[0])
      const datosAccesorios = fromJS(action.datos[1])
      return state.setIn(['inventarioCiclicoTabla', 'stepper'], 1)
        .setIn(['inventarioCiclicoTabla','configuracionCalendario','tablas','piezas','datos'],datosPieza)
        .setIn(['inventarioCiclicoTabla','configuracionCalendario','tablas','accesorios','datos'],datosAccesorios)
        .setIn(['inventarioCiclicoTabla','piezasTemporales'],datosPieza)
        .setIn(['inventarioCiclicoTabla','accesoriosTemporales'],datosAccesorios)
    }  
    case REGRESAR: {
      // Debo guardar los almacenes y los moldes tambien
      const configuracionInventario = state.getIn(
        [
          'inventarioCiclicoTabla',
          'configuracionCalendario',
        ]
      ).toJS()
      const usuario = state.getIn(
        [
          'inventarioCiclicoTabla',
          'usuarioLogeado',
        ]
      )
      const moldes = state.getIn(
        [
          'inventarioCiclicoTabla',
          'configuracionCalendario',
          'moldes',
        ]
      )

      const arrayMoldes = JSON.parse(JSON.stringify(moldes))
      const almacenes = state.getIn(
        [
          'inventarioCiclicoTabla',
          'configuracionCalendario',
          'almacenes',
        ]
      )
      const arrayAlmacenes = JSON.parse(JSON.stringify(almacenes))
      const estatus = state.getIn(
        [
          'inventarioCiclicoTabla',
          'configuracionCalendario',
          'estatus',
        ]
      )
      const arrayEstatus = JSON.parse(JSON.stringify(estatus))
      
      const inventariosCiclicos = state.getIn(
        [
          'inventarioCiclicoTabla',
          'inventariosCiclicos',
        ]
      )
      const arrayInventarios = JSON.parse(JSON.stringify(inventariosCiclicos))
      const evidenciasCalendario = state.getIn(
        [
          'inventarioCiclicoTabla',
          'evidenciasCalendario',
        ]
      )
      
      const arrayEvidencias = JSON.parse(JSON.stringify(evidenciasCalendario))
      
      const fechaInicial = state.getIn(
        [
          'inventarioCiclicoTabla',
          'fechaInicial',
        ]
      )
      const permisos = state.getIn(
        [
          'permisos',
        ]
      )
      return initialState.updateIn(
        [
          'inventarioCiclicoTabla',
          'configuracionCalendario',
        ],
        stt => stt.merge({
          datosSeleccionados: configuracionInventario.datosSeleccionados,
          almacenes:arrayAlmacenes,
          moldes:arrayMoldes,
          estatus:arrayEstatus,
        })
      ).setIn('inventarioCiclicoTabla','stepper', 0)
        // .setIn(['inventarioCiclicoTabla','configuracionCalendario','datosInsumos','piezasTotales'],configuracionInventario.datosInsumos.piezasTotales)
        // .setIn(['inventarioCiclicoTabla','configuracionCalendario','datosInsumos','accesoriosTotales'],configuracionInventario.datosInsumos.accesoriosTotales)
        .setIn(['inventarioCiclicoTabla','inventariosCiclicos'],arrayInventarios)
        .setIn(['inventarioCiclicoTabla','evidenciasCalendario'],arrayEvidencias)
        .setIn(['inventarioCiclicoTabla','fechaInicial'],fechaInicial)
        .setIn(['inventarioCiclicoTabla', 'usuarioLogeado'],usuario)
        .setIn(['inventarioCiclicoTabla','configuracionCalendario','datosSeleccionados','moldeSeleccionado'],'')
        .setIn(['inventarioCiclicoTabla','configuracionCalendario','datosSeleccionados','plantaSeleccionada'],'')
        .setIn(['permisos'],permisos)
      
    }

    case SET_MOLDES_ALMACEN: {
      if(action.id>0)
        return state.setIn(['inventarioCiclicoTabla','configuracionCalendario','datosSeleccionados','almacenSeleccionado'],action.id)
          .setIn(['inventarioCiclicoTabla','configuracionCalendario','moldes'],action.datos.moldes)
          .setIn(['inventarioCiclicoTabla','configuracionCalendario','datosSeleccionados','idSeleccionMolde'],'')
          .setIn(['inventarioCiclicoTabla','configuracionCalendario','datosSeleccionados','moldeSeleccionado'],'')
          .setIn(['inventarioCiclicoTabla','documentacion','planos'],'')
          .setIn(['inventarioCiclicoTabla','inventariosCiclicos'],action.datos.inventarios)
          .setIn(['inventarioCiclicoTabla','evidenciasCalendario'],action.datos.evidencias)
          .setIn(['inventarioCiclicoTabla','fechaInicial'],action.datos.fechas[0].FechaInicial)
          .setIn(['inventarioCiclicoTabla','cargando'],false)
      return state
    }

    // case SET_INVENTARIOS_ALMACEN: {
    //   return state.setIn(['inventarioCiclicoTabla','inventariosCiclicos'],action.datos)
    // }

    case SET_EVIDENCIAS_ALMACEN: {
      return state.setIn(['inventarioCiclicoTabla','evidenciasCalendario'],action.datos)
    }
    
    // case SET_FECHA_INICIAL_ALMACEN: {
    //   return state.setIn(['inventarioCiclicoTabla','fechaInicial'],action.datos[0].FechaInicial)
    //     .setIn(['inventarioCiclicoTabla','fechaInicial'],action.datos[0].FechaInicial)  
    // }

    case HANDLE_CHANGE_MOLDE: {
      
      const {
        id,
      } = action.event

      
      const arrayMoldes = state.getIn(['inventarioCiclicoTabla','configuracionCalendario', 'moldes'])
      const moldes = JSON.parse(JSON.stringify(arrayMoldes))
      const moldeSeleccionado= moldes.filter(molde => molde.Id === id)
      const {
        IdMolde,
        IdPlanta,
        PiezasInventariadas,
        AccesoriosInventariados,
        PiezasTotales,
        AccesoriosTotales,
        RutaPlano,
        NombrePlano,
      } = moldeSeleccionado[0]

      const arrayPlano = []
      arrayPlano.push({Ruta:RutaPlano,Nombre:NombrePlano})

      
      return state.setIn(['inventarioCiclicoTabla','configuracionCalendario','datosSeleccionados','idSeleccionMolde'],id)
        .setIn(['inventarioCiclicoTabla','configuracionCalendario','datosSeleccionados','moldeSeleccionado'],IdMolde)
        .setIn(['inventarioCiclicoTabla','configuracionCalendario','datosSeleccionados','plantaSeleccionada'],IdPlanta)
        .setIn(['inventarioCiclicoTabla','documentacion','planos'],fromJS(arrayPlano))
        .updateIn(
          [
            'inventarioCiclicoTabla',
            'configuracionCalendario',
            'datosInsumos',
          ],
          stt => stt.merge({
            piezasInventariadas: PiezasInventariadas,
            accesoriosInventariados: AccesoriosInventariados,
            piezasTotales: PiezasTotales,
            accesoriosTotales: AccesoriosTotales,
          })
        )
        // .setIn(['inventarioCiclicoTabla','configuracionCalendario','datosInsumos',piezas],PiezasInventariadas
        // .setIn(['inventarioCiclicoTabla','configuracionCalendario','datosInsumos'],AccesoriosInventariados)
        // .setIn(['inventarioCiclicoTabla','configuracionCalendario','datosInsumos'],PiezasTotales)
        // .setIn(['inventarioCiclicoTabla','configuracionCalendario','datosInsumos'],AccesoriosTotales)
    }


    case HANDLE_CHANGE_ESTATUS: {
      const insumo = action.tipoInsumo === 0 ? 'piezas' : 'accesorios'
      return state.updateIn(
        [
          'inventarioCiclicoTabla',
          'configuracionCalendario',
          'tablas',
          insumo,
          'datos',
          action.indice,
        ],
        stt => stt.merge({
          IdEstatus: action.valor,
          CampoValido: action.valor!=='',
          Estatus: '',
        })
      )
    }

    case ON_INPUT_MONTO_MOLDE: {
      
      const datosAccesorios = state.getIn(['inventarioCiclicoTabla','configuracionCalendario', 'tablas','accesorios','datos',action.index])
      const accesorio = JSON.parse(JSON.stringify(datosAccesorios))
      let accesoriosInventariados = state.getIn(['inventarioCiclicoTabla','configuracionCalendario', 'datosInsumos','accesoriosInventariados'])
      if (accesorio.Monto >= 0 && accesorio.Seleccionado) {
        accesoriosInventariados -= accesorio.Monto 
        accesoriosInventariados += action.value
      }
      return state.updateIn(
        ['inventarioCiclicoTabla', 'configuracionCalendario','tablas','accesorios','datos',action.index], stt => stt.merge({
          Monto : action.value,
          CampoValido : action.value!=='',
        })
      ).setIn(['inventarioCiclicoTabla','configuracionCalendario','datosInsumos','accesoriosInventariados'],accesoriosInventariados)
      
    }

    case ON_CHANGE_CELDA: {
      // Datos necesarios (indice,tipo,nombre,celda)
      // Aqui hacer como un booleano para cuando se cambie el estatus de pieza u accesorio regresarlo a falso
      // por si se me olvida crear un booleano para cada que se vaya a cambiar el estatus/evidencia/monto n_n
      const tipoInsumo = action.tipo === 0 ? 'piezas' : 'accesorios'
      const dato = state.getIn(['inventarioCiclicoTabla','configuracionCalendario', 'tablas',tipoInsumo,'datos',action.indice])
      // const accesorio = JSON.parse(JSON.stringify(datosAccesorios))
      // let accesoriosInventariados = state.getIn(['inventarioCiclicoTabla','configuracionCalendario', 'datosInsumos','accesoriosInventariados'])
      return state.setIn(['inventarioCiclicoTabla', 'configuracionCalendario','tablas',tipoInsumo,'datos',action.indice,action.nombre],action.celda)

    }

    case ON_CHANGE_CELDA_EVIDENCIA: {
      
      const datosAccesorios = state.getIn(['inventarioCiclicoTabla','configuracionCalendario', 'tablas','accesorios','datos',action.index])
      const accesorio = JSON.parse(JSON.stringify(datosAccesorios))
      let accesoriosInventariados = state.getIn(['inventarioCiclicoTabla','configuracionCalendario', 'datosInsumos','accesoriosInventariados'])
      if (accesorio.Monto >= 0 && accesorio.Seleccionado) {
        accesoriosInventariados -= accesorio.Monto 
        accesoriosInventariados += action.value
      }
      return state.updateIn(
        ['inventarioCiclicoTabla', 'configuracionCalendario','tablas','accesorios','datos',action.index], stt => stt.merge({
          Monto : action.value,
          CampoValido : action.value!=='',
        })
      ).setIn(['inventarioCiclicoTabla','configuracionCalendario','datosInsumos','accesoriosInventariados'],accesoriosInventariados)
    }
    case ON_CHANGE_CELDA_MONTO: {
      
      const datosAccesorios = state.getIn(['inventarioCiclicoTabla','configuracionCalendario', 'tablas','accesorios','datos',action.index])
      const accesorio = JSON.parse(JSON.stringify(datosAccesorios))
      let accesoriosInventariados = state.getIn(['inventarioCiclicoTabla','configuracionCalendario', 'datosInsumos','accesoriosInventariados'])
      if (accesorio.Monto >= 0 && accesorio.Seleccionado) {
        accesoriosInventariados -= accesorio.Monto 
        accesoriosInventariados += action.value
      }
      return state.updateIn(
        ['inventarioCiclicoTabla', 'configuracionCalendario','tablas','accesorios','datos',action.index], stt => stt.merge({
          Monto : action.value,
          CampoValido : action.value!=='',
        })
      ).setIn(['inventarioCiclicoTabla','configuracionCalendario','datosInsumos','accesoriosInventariados'],accesoriosInventariados)
      
    }

    case ON_SEARCH_CHANGE: {
      const tipoInsumo = action.tipo === 1 ? 'piezas':'accesorios'
      return state.setIn(['inventarioCiclicoTabla','configuracionCalendario', 'tablas',tipoInsumo,'textoBusqueda'],action.textoBusqueda)
    }
    

    case ON_ROWS_SELECCIONADOS_CHANGE: {
      const {
        rowSeleccionados,
        insumoSeleccionado,
      } = action


      const piezas = state.getIn(['inventarioCiclicoTabla','configuracionCalendario', 'tablas','piezas','datos']).toJS()
      const accesorios = state.getIn(['inventarioCiclicoTabla','configuracionCalendario', 'tablas','accesorios','datos']).toJS()


      if (insumoSeleccionado === 1) {
        let piezasInventariadas = 0
        piezas.forEach((pieza,index) => {
          piezas[index].Seleccionado = false
        })

        rowSeleccionados.forEach((row) => {
          piezas[row].Seleccionado = true
        })

        piezas.forEach((pieza) => {
          if (pieza.Seleccionado){
            piezasInventariadas+=1
          }
        })
        // })

        const hayDatosSeleccionados = piezas.filter(datoPieza => datoPieza.Seleccionado).length>0 || 
                                      accesorios.filter(datoAccesorio => datoAccesorio.Seleccionado).length>0
        return state
          .setIn(['inventarioCiclicoTabla','configuracionCalendario','seleccionesRows','piezasSeleccionadas'],rowSeleccionados)
          .setIn(['inventarioCiclicoTabla','configuracionCalendario','tablas','piezas','datos'],fromJS(piezas))
          .setIn(['inventarioCiclicoTabla','configuracionCalendario','datosInsumos','piezasInventariadas'],piezasInventariadas)
          .setIn(['inventarioCiclicoTabla','configuracionCalendario','guardarInventario'],hayDatosSeleccionados)
      }
      
      if (insumoSeleccionado === 2) {
        let accesoriosInventariados = 0
        // const idPlantaAccesorio = state.getIn(['movimientoInventarioTabla','campos', 'plantaAccesorio','valor'])
        // const datosAccesoriosFiltrados= accesorios.filter(datoAccesorio => datoAccesorio.Planta === idPlantaAccesorio+1)
        
        

        // if (rowSeleccionados.length === 0){
        //   datosAccesoriosFiltrados.forEach((accesorio,index) => {
        //     datosAccesoriosFiltrados[index].Seleccionado = false
        //   })
        // }
        accesorios.forEach((accesorio,index) => {
          accesorios[index].Seleccionado = false
        })

        rowSeleccionados.forEach((row) => {
          accesorios[row].Seleccionado = true
        })

        // datosAccesoriosFiltrados.forEach((accesorioFiltrado) => {
        accesorios.forEach((accesorio) => {
          if (accesorio.Seleccionado){
            accesoriosInventariados += accesorio.Monto
          }
        })
        // })
        const hayDatosSeleccionados = piezas.filter(datoPieza => datoPieza.Seleccionado).length>0 || 
                                      accesorios.filter(datoAccesorio => datoAccesorio.Seleccionado).length>0


        return state
          .setIn(['inventarioCiclicoTabla','configuracionCalendario','seleccionesRows','accesoriosSeleccionados'],rowSeleccionados)
          .setIn(['inventarioCiclicoTabla','configuracionCalendario','tablas','accesorios','datos'],fromJS(accesorios))
          .setIn(['inventarioCiclicoTabla','configuracionCalendario','datosInsumos','accesoriosInventariados'],accesoriosInventariados)
          .setIn(['inventarioCiclicoTabla','configuracionCalendario','guardarInventario'],hayDatosSeleccionados)
      }
      return state
      
    }
    case HANDLE_CHANGE_ARCHIVO: {
      const insumo = action.tipoInsumo === 0 ? 'piezas' : 'accesorios'
      const datos = state.getIn(['inventarioCiclicoTabla','configuracionCalendario', 'tablas',insumo,'datos',action.indice])
      // const datosprueba = state.getIn(['inventarioCiclicoTabla','configuracionCalendario', 'tablas',insumo,'datos'])
      // const prueba = JSON.parse(JSON.stringify(datosprueba))

      const datoInsumo = JSON.parse(JSON.stringify(datos))

      const archivos = state.getIn(
        [
          'inventarioCiclicoTabla',
          'documentacion',
          'archivos',
        ]
      ).toJS()
      for (let i = 0; i < action.formData.length; i+=1) {
        archivos.push({File:action.formData[i],IdInsumo:datoInsumo.IdInsumo})
      }
      return state.setIn(
        [
          'inventarioCiclicoTabla',
          'documentacion',
          'archivos',
        ],
        fromJS(archivos),
      ).updateIn(
        [
          'inventarioCiclicoTabla',
          'configuracionCalendario',
          'tablas',
          insumo,
          'datos',
          action.indice,
        ],
        stt => stt.merge({
          Evidencia: `Archivo ${action.indice}`,
        })
      )
    }

    case HANDLE_CHANGE_ARCHIVO_EVIDENCIA: {
      const tipoEvidencia = action.tipoEvidencia === 2 ? 'formatoConteo' : 'reporteResultados'

      const archivo = []

      for (let i = 0; i < action.formData.length; i+=1) {
        archivo.push(action.formData[i])
      }

      return state.setIn(
        [
          'inventarioCiclicoTabla',
          'documentacion',
          tipoEvidencia,
        ],
        fromJS(archivo),
      )
    }

    case HANDLE_DELETE_ARCHIVO: {
      const insumo = action.tipoInsumo === 0 ? 'piezas' : 'accesorios'
      const datos = state.getIn(['inventarioCiclicoTabla','configuracionCalendario', 'tablas',insumo,'datos',action.indice])

      const datoInsumo = JSON.parse(JSON.stringify(datos))

      const archivos = state.getIn(
        [
          'inventarioCiclicoTabla',
          'documentacion',
          'archivos',
        ]
      ).toJS()

      archivos.forEach((archivo,index) => {
        if (archivo.IdInsumo === datoInsumo.IdInsumo)
          archivos.splice(index,1)
      })

      return state.setIn(
        [
          'inventarioCiclicoTabla',
          'documentacion',
          'archivos',
        ],
        fromJS(archivos),
      ).updateIn(
        [
          'inventarioCiclicoTabla',
          'configuracionCalendario',
          'tablas',
          insumo,
          'datos',
          action.indice,
        ],
        stt => stt.merge({
          Evidencia: [],
        })
      )
    }

    case HANDLE_DELETE_ARCHIVO_EVIDENCIA: {
      const tipoEvidencia = action.tipoEvidencia === 2 ? 'formatoConteo' : 'reporteResultados'
      return state.setIn(
        [
          'inventarioCiclicoTabla',
          'documentacion',
          tipoEvidencia,
        ],
        fromJS([]),
      )
    }
    
    case ON_CERRAR_INVENTARIO: {
      // Debo guardar los almacenes y los moldes tambien
      const configuracionInventario = state.getIn(
        [
          'inventarioCiclicoTabla',
          'configuracionCalendario',
        ]
      ).toJS()

      const moldes = state.getIn(
        [
          'inventarioCiclicoTabla',
          'configuracionCalendario',
          'moldes',
        ]
      )
      const arrayMoldes = JSON.parse(JSON.stringify(moldes))
      const almacenes = state.getIn(
        [
          'inventarioCiclicoTabla',
          'configuracionCalendario',
          'almacenes',
        ]
      )
      const arrayAlmacenes = JSON.parse(JSON.stringify(almacenes))
      const estatus = state.getIn(
        [
          'inventarioCiclicoTabla',
          'configuracionCalendario',
          'estatus',
        ]
      )
      const arrayEstatus = JSON.parse(JSON.stringify(estatus))

      const inventariosCiclicos = state.getIn(
        [
          'inventarioCiclicoTabla',
          'inventariosCiclicos',
        ]
      )
      const arrayInventarios = JSON.parse(JSON.stringify(inventariosCiclicos))
      const evidenciasCalendario = state.getIn(
        [
          'inventarioCiclicoTabla',
          'evidenciasCalendario',
        ]
      )
      const arrayEvidencias = JSON.parse(JSON.stringify(evidenciasCalendario))

      const stepper = state.getIn(['inventarioCiclicoTabla','stepper'])
      const fechaInicial = state.getIn(
        [
          'inventarioCiclicoTabla',
          'fechaInicial',
        ]
      )
      const usuario = state.getIn(
        [
          'inventarioCiclicoTabla',
          'usuarioLogeado',
        ]
      )
      const permisos = state.getIn(
        [
          'permisos',
        ]
      )

      if(stepper=== 1){
        if(action.cerrar)
          return state.updateIn(
            [
              'inventarioCiclicoTabla',
              'configuracionCalendario',
            ],
            stt => stt.merge({
              bandModal: 0,
              abrirModal: false,
            })
          )
        if(configuracionInventario.abrirModal){
          return initialState.updateIn(
            [
              'inventarioCiclicoTabla',
              'configuracionCalendario',
            ],
            stt => stt.merge({
              datosSeleccionados: configuracionInventario.datosSeleccionados,
              almacenes:arrayAlmacenes,
              moldes:arrayMoldes,
              estatus:arrayEstatus,
            })
          ).setIn('inventarioCiclicoTabla','stepper', 0)
            // .setIn(['inventarioCiclicoTabla','configuracionCalendario','datosInsumos','piezasTotales'],configuracionInventario.datosInsumos.piezasTotales)
            // .setIn(['inventarioCiclicoTabla','configuracionCalendario','datosInsumos','accesoriosTotales'],configuracionInventario.datosInsumos.accesoriosTotales)
            .setIn(['inventarioCiclicoTabla','inventariosCiclicos'],arrayInventarios)
            .setIn(['inventarioCiclicoTabla','evidenciasCalendario'],arrayEvidencias)
            .setIn(['inventarioCiclicoTabla','configuracionCalendario','datosSeleccionados','moldeSeleccionado'],'')
            .setIn(['inventarioCiclicoTabla','configuracionCalendario','datosSeleccionados','plantaSeleccionada'],'')
            .setIn(['inventarioCiclicoTabla','fechaInicial'],fechaInicial)
            .setIn(['inventarioCiclicoTabla', 'usuarioLogeado'], usuario)
            .setIn(['permisos'], permisos)
            
        }
        if(configuracionInventario.hayCambioConfiguracion)
          return state.updateIn(
            [
              'inventarioCiclicoTabla',
              'configuracionCalendario',
            ],
            stt => stt.merge({
              abrirModal: true,
              bandModal: 1,
              mensajeConfirmacion: 'Existen datos no guardados, ¿Desea continuar?',
            })
          )
        return initialState.updateIn(
          [
            'inventarioCiclicoTabla',
            'configuracionCalendario',
          ],
          stt => stt.merge({
            datosSeleccionados: configuracionInventario.datosSeleccionados,
            almacenes:arrayAlmacenes,
            moldes:arrayMoldes,
            estatus:arrayEstatus,
          })
        ).setIn('inventarioCiclicoTabla','stepper', 0)
          .setIn(['inventarioCiclicoTabla','configuracionCalendario','datosInsumos','piezasTotales'],configuracionInventario.datosInsumos.piezasTotales)
          .setIn(['inventarioCiclicoTabla','configuracionCalendario','datosInsumos','accesoriosTotales'],configuracionInventario.datosInsumos.accesoriosTotales)
          .setIn(['inventarioCiclicoTabla','inventariosCiclicos'],arrayInventarios)
          .setIn(['inventarioCiclicoTabla','evidenciasCalendario'],arrayEvidencias)
          .setIn(['inventarioCiclicoTabla','fechaInicial'],fechaInicial)
          .setIn(['inventarioCiclicoTabla', 'usuarioLogeado'], usuario)
          .setIn(['permisos'], permisos)

      }
      return state.set('stepper', 1)
    }

    case HANDLE_ABRIR_MODAL: {
      const stepper = state.getIn(['inventarioCiclicoTabla','stepper'])
      const cantidadResultados = state.getIn(['inventarioCiclicoTabla','cantidadResultados'])
      // Solo puedes generar ${cantidadResultados} resultados
      const mensaje= action.tipoModal === 0 ? `Solo puedes generar ${cantidadResultados} resultados` : `¿Estás seguro que deseas cerrar el conteo de inventario?` 
      if(stepper=== 1){
        if(action.abrir)
          return state.updateIn(
            [
              'inventarioCiclicoTabla',
              'configuracionCalendario',
            ],
            stt => stt.merge({
              bandModal: action.tipoModal === 0 ? 1:2,
              abrirModal: true,
              mensajeConfirmacion: mensaje,
              tipoGuardado: action.tipoModal,
            })
          )
          

        return state.updateIn(
          [
            'inventarioCiclicoTabla',
            'configuracionCalendario',
          ],
          stt => stt.merge({
            bandModal: 0,
            abrirModal: false,
            mensajeConfirmacion: '',
          })
        )
      }
      return state.set('stepper', 1)
    }

    case HANDLE_ELIMINAR_MODAL: {
      if(action.abrir)
        return state.updateIn(
          [
            'inventarioCiclicoTabla',
            'configuracionCalendario',
          ],
          stt => stt.merge({
            bandModal: 2,
            abrirEliminarModal: true,
            mensajeConfirmacion: "¿Estas seguro que deseas eliminar?",
            idEvidenciaCalendario: action.IdEvidencia,
            tipoGuardado: action.tipoGuardado,
          })
        )
      return state.updateIn(
        [
          'inventarioCiclicoTabla',
          'configuracionCalendario',
        ],
        stt => stt.merge({
          bandModal: 0,
          abrirEliminarModal: false,
          idEvidenciaCalendario:'',
          mensajeConfirmacion:'',
        })
      )
    }
    



    case SET_INVENTARIO_GUARDADO: {
      const configuracionInventario = state.getIn(
        [
          'inventarioCiclicoTabla',
          'configuracionCalendario',
        ]
      ).toJS()

      const moldes = state.getIn(
        [
          'inventarioCiclicoTabla',
          'configuracionCalendario',
          'moldes',
        ]
      )
      const arrayMoldes = JSON.parse(JSON.stringify(moldes))
      const almacenes = state.getIn(
        [
          'inventarioCiclicoTabla',
          'configuracionCalendario',
          'almacenes',
        ]
      )
      const arrayAlmacenes = JSON.parse(JSON.stringify(almacenes))
      const estatus = state.getIn(
        [
          'inventarioCiclicoTabla',
          'configuracionCalendario',
          'estatus',
        ]
      )
      const arrayEstatus = JSON.parse(JSON.stringify(estatus))
      const fechaInicial = state.getIn(
        [
          'inventarioCiclicoTabla',
          'fechaInicial',
        ]
      )
      const usuario = state.getIn(
        [
          'inventarioCiclicoTabla',
          'usuarioLogeado',
        ]
      )
      const permisos = state.getIn(
        [
          'permisos',
        ]
      )
      return initialState.setIn(['inventarioCiclicoTabla','inventariosCiclicos'],action.datos)
        .setIn('inventarioCiclicoTabla','stepper', 0)
        .setIn(['inventarioCiclicoTabla','configuracionCalendario','datosInsumos','piezasTotales'],configuracionInventario.datosInsumos.piezasTotales)
        .setIn(['inventarioCiclicoTabla','configuracionCalendario','datosInsumos','accesoriosTotales'],configuracionInventario.datosInsumos.accesoriosTotales)
        .setIn(['inventarioCiclicoTabla','fechaInicial'],fechaInicial)
        .setIn(['inventarioCiclicoTabla','usuarioLogeado'],usuario)
        .setIn(['permisos'],permisos)
        .updateIn(
          [
            'inventarioCiclicoTabla',
            'configuracionCalendario',
          ],
          stt => stt.merge({
            datosSeleccionados: configuracionInventario.datosSeleccionados,
            almacenes:arrayAlmacenes,
            moldes:arrayMoldes,
            estatus:arrayEstatus,
          })
        )
    }


    case HANDLE_MOSTRAR_DETALLE: {
      const {
        datosDetalle,
        piezas,
        accesorios,
      } = action.datos

      const tipoDetalle = action.tipoDetalle === 0 ? 'existeInventario' : 'esDetalleInventario'
      const stepper = action.tipoDetalle === 0 ? 1 : 2

      const archivoFormato = []
      const archivoResultado = []
      const evidenciasArchivos = []
      const archivoPlanos = []
      const piezasSeleccionadas = [] 
      const accesoriosSeleccionados = []
      let resultados = 3
      let idFormatoConteo = null
      let idReporteResultados = null
      
      

      for (let i = 0; i < datosDetalle.length; i+=1) {
        resultados = action.tipoDetalle === 0 ? datosDetalle[i].Resultados : 0
        idFormatoConteo=datosDetalle[i].IdFormatoConteo
        idReporteResultados=datosDetalle[i].IdReporteResultados
        if(datosDetalle[i].NombreFormato){
          archivoFormato.push({Ruta:datosDetalle[i].RutaFormato,Nombre:datosDetalle[i].NombreFormato})
        }
        if(datosDetalle[i].NombreResultados){
          archivoResultado.push({Ruta:datosDetalle[i].RutaResultados,Nombre:datosDetalle[i].NombreResultados})
        }
        if(datosDetalle[i].NombrePlano){
          archivoPlanos.push({Ruta:datosDetalle[i].RutaPlano,Nombre:datosDetalle[i].NombrePlano})
        }

      }
 
      for (let i = 0; i < piezas.length; i+=1) {
        if(piezas[i].IdEstatus !== 'NOINV'){
          piezasSeleccionadas.push(i)
        }else{
          piezas[i].IdEstatus = 'REFINC'
        }

        if (piezas[i].NombreEvidencia !=='')
          evidenciasArchivos.push({Ruta:piezas[i].RutaEvidencia, Nombre:piezas[i].NombreEvidencia, IdInsumo:piezas[i].IdInsumo})
      }
      for (let i = 0; i < accesorios.length; i+=1) {
        if(accesorios[i].IdEstatus !== 'NOINV'){
          accesoriosSeleccionados.push(i)
        }else{
          accesorios[i].IdEstatus = 'REFINC'
        }
        if (accesorios[i].NombreEvidencia !=='')
          evidenciasArchivos.push({Ruta:accesorios[i].RutaEvidencia, Nombre:accesorios[i].NombreEvidencia, IdInsumo:accesorios[i].IdInsumo})
      }

      return state.setIn(['inventarioCiclicoTabla', 'stepper'], stepper)
        .setIn(['inventarioCiclicoTabla',tipoDetalle],true)
        .setIn(['inventarioCiclicoTabla','idInventarioCiclico'],action.idInventarioCiclico)
        .setIn(['inventarioCiclicoTabla','cantidadResultados'],resultados)
        .setIn(['inventarioCiclicoTabla','configuracionCalendario','tablas','piezas','datos'],fromJS(piezas))
        .setIn(['inventarioCiclicoTabla','configuracionCalendario','tablas','accesorios','datos'],fromJS(accesorios))
        .setIn(['inventarioCiclicoTabla','piezasTemporales'],fromJS(piezas))
        .setIn(['inventarioCiclicoTabla','accesoriosTemporales'],fromJS(accesorios))
        .setIn(['inventarioCiclicoTabla','documentacion','formatoConteo'],fromJS(archivoFormato))
        .setIn(['inventarioCiclicoTabla','documentacion','idFormatoConteo'],idFormatoConteo)
        .setIn(['inventarioCiclicoTabla','documentacion','reporteResultados'],fromJS(archivoResultado))
        .setIn(['inventarioCiclicoTabla','documentacion','idReporteResultados'],idReporteResultados)
        .setIn(['inventarioCiclicoTabla','documentacion','archivos'],fromJS(evidenciasArchivos))
        .setIn(['inventarioCiclicoTabla','documentacion','planos'],fromJS(archivoPlanos))
        .setIn(['inventarioCiclicoTabla','configuracionCalendario','datosSeleccionados','moldeSeleccionado'],datosDetalle[0].IdMolde)
        .setIn(['inventarioCiclicoTabla','configuracionCalendario','datosSeleccionados','plantaSeleccionada'],datosDetalle[0].IdPlanta)
        .setIn(['inventarioCiclicoTabla','configuracionCalendario','seleccionesRows','piezasSeleccionadas'], action.tipoDetalle === 1 ? []: piezasSeleccionadas)
        .setIn(['inventarioCiclicoTabla','configuracionCalendario','seleccionesRows','accesoriosSeleccionados'],action.tipoDetalle === 1 ? []: accesoriosSeleccionados)
        .setIn(['inventarioCiclicoTabla','configuracionCalendario','guardarInventario'],true)
        .setIn(['inventarioCiclicoTabla','editarInventario'],true)
        .updateIn(
          [
            'inventarioCiclicoTabla',
            'configuracionCalendario',
            'datosInsumos',
          ],
          stt => stt.merge({
            piezasInventariadas: datosDetalle[0].PiezasInventariadas,
            piezasTotales: datosDetalle[0].PiezasTotales,
            accesoriosInventariados: datosDetalle[0].AccesoriosInventariados,
            accesoriosTotales: datosDetalle[0].AccesoriosTotales,
          })
        )
    }

    case SET_RESULTADOS: {
      return state.setIn(['inventarioCiclicoTabla','generoResultados'],true)
    }

    default: {
      return state;
    }
  }
}

export default inventarioCiclicoReducer;
