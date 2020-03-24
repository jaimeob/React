// import { take, call, put, select } from 'redux-saga/effects';
import { takeLatest, call, put, select } from 'redux-saga/effects';
// import { toSafeInteger } from 'lodash'
// import { map } from 'lodash';
import XLSX from 'xlsx';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';

import moment from 'moment';
import dateFns from "date-fns";
import Actions from './actions';
// import { obtenerPermisos } from '../../../../services/api';
import {
  getAlmacenesUsuarioApi,
  getMoldesAlmacenApi,
  getInsumosAlmacenApi,
  getEstatusInventarioApi,
  postUploadFile,
  postGuardarInventarioApi,
  getInventariosCiclicosApi,
  getEvidenciasInventarioCiclicoApi,
  postGuardarArchivoEvidenciaApi,
  getDownloadedFile,
  postEliminarArchivoEvidenciaApi,
  getObtenerDetalleInventarioApi,
  setCantidadResultadosApi,
  getAlmacenFechaInicialApi,
} from './api';

export const {
  GET_ALMACENES,
  GET_ESTATUS,
  HANDLE_CHANGE_ALMACEN,
  NUEVA_CAPTURA_INVENTARIO,
  HANDLE_DOWNLOAD_ARCHIVO,
  HANDLE_DOWNLOAD_ARCHIVO_EVIDENCIA,
  ON_GUARDAR_INVENTARIO,
  ON_SUBIR_ARCHIVO_EVIDENCIA,
  ON_DOWNLOAD_ARCHIVO_EVIDENCIA,
  ON_DELETE_ARCHIVO_EVIDENCIA,
  HANDLE_OBTENER_DETALLE_INVENTARIO,
  HANDLE_DOWNLOAD_EXCEL,
  OBTENER_PERMISOS,
} = Actions.getConstants();

export function* getAlmacenesSaga(action) {
  try {
    const {
      status,
      data = [],
    } = yield call(getAlmacenesUsuarioApi,action.usuarioLogeado);
    if(status === 200){
      yield put(
        Actions.get('SET_ALMACENES').fn(data)
      );
    } else {
      // yield put(
      //   enqueueSnackbar({
      //     message: data.message,
      //     options: {
      //       variant: 'error',
      //     },
      //   })
      // );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener almacenes',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

// export function* getTablaMovimientosSaga() {
//   try {
//     const {
//       status,
//       data = [],
//     } = yield call(getInventariosCiclicosApi, );

//     if(status === 200){
//       yield put(
//         Actions.get('SET_TABLA_MOVIMIENTOS').fn(data)
//       );
//     } 
//   } catch (error) {
//     yield put(
//       enqueueSnackbar({
//         message: 'Hubo un error al obtener la información',
//         options: {
//           variant: 'error',
//         },
//       })
//     );
//   }
// }
// export function* obtenerPermisosAction(){
//   const paramsPermisos = yield select((state) => state.getIn(['global','paramsPermisos']).toJS());
//   const idUsuario = yield select((state) => state.getIn(['global', 'currentUser', 'UsuarioId']));
  
//   const {
//     status,
//     data,
//   } = yield call(obtenerPermisos, {...paramsPermisos, idUsuario});
//   if(status === 200){
//     yield put(
//       Actions.get('SET_PERMISOS').fn(data.permisos),
//     );
//   } else{
//     yield put(
//       enqueueSnackbar({ 
//         // message: data.message,
//         message: 'Error al obtener los permisos',
//         options: { 
//           variant: 'error', 
//         }, 
//       })
//     )
//   }
// }

export function* getEstatusSaga() {
  try {
    const {
      status,
      data = [],
    } = yield call(getEstatusInventarioApi);

    if(status === 200){
      yield put(
        Actions.get('SET_ESTATUS').fn(data)
      );
    } else {
      // yield put(
      //   enqueueSnackbar({
      //     message: data.message,
      //     options: {
      //       variant: 'error',
      //     },
      //   })
      // );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener la información',
        options: {
          variant: 'error',
        },
      })
    );
  }
}
export function* getMoldesAlmacenSaga(action) {
  try {

    const arrayMolde = []
    const datos = {
      moldes: [],
      inventarios: [],
      evidencias: [],
      fechas: [],
    };

    // data.molde
    // data.fechaInicial
    const {
      status,
      data = [],
    } = yield call(getMoldesAlmacenApi,action.event.id);

    if(status === 200){
      data.forEach((datoMolde,index) => {
        if (datoMolde.Planta === 1) {
          arrayMolde.push({Id: index+1, IdMolde: datoMolde.IdMolde,Nombre: datoMolde.Nombre, IdPlanta: datoMolde.Planta, 
            Planta: 'PB',PiezasInventariadas:datoMolde.PiezasInventariadas,AccesoriosInventariados:datoMolde.AccesoriosInventariados,
            PiezasTotales:datoMolde.PiezasTotales,AccesoriosTotales:datoMolde.AccesoriosTotales,RutaPlano:datoMolde.RutaPlano,
            NombrePlano:datoMolde.NombrePlano})
        } else {
          arrayMolde.push({Id: index+1, IdMolde: datoMolde.IdMolde,Nombre: datoMolde.Nombre, IdPlanta: datoMolde.Planta, 
            Planta: `N${datoMolde.Planta-1}`,PiezasInventariadas:datoMolde.PiezasInventariadas,AccesoriosInventariados:datoMolde.AccesoriosInventariados,
            PiezasTotales:datoMolde.PiezasTotales,AccesoriosTotales:datoMolde.AccesoriosTotales,RutaPlano:datoMolde.RutaPlano,
            NombrePlano:datoMolde.NombrePlano})
        }
      })
      datos.moldes = arrayMolde

    } else {
      yield put(
        enqueueSnackbar({
          message: data.message,
          options: {
            variant: 'error',
          },
        })
      );
    }

    const {
      status: statusInv,
      data : dataInv,
    } = yield call(getInventariosCiclicosApi, action.event.id);
    if(statusInv === 200){
      datos.inventarios = dataInv
      // yield put(
      //   Actions.get('SET_INVENTARIOS_ALMACEN').fn(dataInv)
      // );
    }

    const {
      status: statusEvi,
      data : dataEvi,
    } = yield call(getEvidenciasInventarioCiclicoApi, action.event.id);
    if(statusEvi === 200){
      datos.evidencias = dataEvi
      // yield put(
      //   Actions.get('SET_EVIDENCIAS_ALMACEN').fn(dataEvi)
      // );
    }

    const {
      status: statusFecha,
      data : dataFecha,
    } = yield call(getAlmacenFechaInicialApi, action.event.id);
    if(statusFecha === 200){
      datos.fechas = dataFecha
      // yield put(
      //   Actions.get('SET_FECHA_INICIAL_ALMACEN').fn(dataFecha)
      // );
    }


    yield put(
      Actions.get('SET_MOLDES_ALMACEN').fn(action.event.id,datos)
    );





  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener la información',
        options: {
          variant: 'error',
        },
      })
    );
  }
}
export function* getInsumosAlmacenSaga() {
  try {

    // const Estado = yield select(state => state.getIn(['inventarioCiclico','inventarioCiclicoTabla','configuracionCalendario']))
    // const EstadoBien = JSON.parse(JSON.stringify(Estado))
    
    // Obtener almacen, molde, planta
    const IdMolde = yield select(state => state.getIn(['inventarioCiclico','inventarioCiclicoTabla','configuracionCalendario',
      'datosSeleccionados','moldeSeleccionado']))
    const IdAlmacen = yield select(state => state.getIn(['inventarioCiclico','inventarioCiclicoTabla','configuracionCalendario',
      'datosSeleccionados','almacenSeleccionado']))
    const IdPlanta = yield select(state => state.getIn(['inventarioCiclico','inventarioCiclicoTabla','configuracionCalendario',
      'datosSeleccionados','plantaSeleccionada']))
    
    const datos = {
      IdMolde,
      IdAlmacen,
      IdPlanta,
    }
    const {
      status,
      data = [],
    } = yield call(getInsumosAlmacenApi,datos);

    const datosInsumos = [data.piezas,data.accesorios]

    if(status === 200){
      yield put(
        Actions.get('SET_INSUMOS_ALMACEN').fn(datosInsumos)
      );
    } else {
      // yield put(
      //   enqueueSnackbar({
      //     message: data.message,
      //     options: {
      //       variant: 'error',
      //     },
      //   })
      // );
    }
  } catch (error) {
    // yield put(
    //   enqueueSnackbar({
    //     message: 'Hubo un error al obtener la información',
    //     options: {
    //       variant: 'error',
    //     },
    //   })
    // );
  }
}
export function* handleDownloadArchivoSaga(action) {
  try {
    let url = '';
    let band = true;
    let file;
    let nombreArchivo
    let ruta;
    const insumo = action.tipoInsumo === 0 ? 'piezas' : 'accesorios'
    const datos = yield select((state) => 
      state.getIn(
        [
          'inventarioCiclico',
          'inventarioCiclicoTabla',
          'configuracionCalendario',
          'tablas',
          insumo,
          'datos',
          action.indice,
        ]
      )
    )
    const datoInsumo = JSON.parse(JSON.stringify(datos))
    // const idInsumo = action.tipoInsumo === 0 ? datoInsumo.IdPieza : datoInsumo.IdAccesorio
    const archivos = yield select((state) => 
      state.getIn(
        [
          'inventarioCiclico',
          'inventarioCiclicoTabla',
          'documentacion',
          'archivos',

        ]
      ).toJS()
    )
    const detalleInventario = yield select((state) => 
      state.getIn(
        [
          'inventarioCiclico',
          'inventarioCiclicoTabla',
          'esDetalleInventario',
        ]
      )
    )

    

    if (detalleInventario || archivos[0].Nombre ){
      archivos.forEach((archivo) => {
        if (archivo.IdInsumo === datoInsumo.IdInsumo){
          ruta = archivo.Ruta
          nombreArchivo = archivo.Nombre
        }
        
      })
      const {
        status,
        data,
      } = yield call (getDownloadedFile, ruta);
      if(status === 200){
        url = window.URL.createObjectURL(new Blob([data]));
      } else {
        
        yield put(
          enqueueSnackbar({
            message: 'Hubo un error al descargar el archivo',
            options: {
              variant: 'error',
            },
          })
        )
        band = false;
      }
    }else{
      archivos.forEach((archivo) => {
        if (archivo.IdInsumo === datoInsumo.IdInsumo)
          file = archivo.File
      })
      url = window.URL.createObjectURL(new Blob([file]));
      nombreArchivo=file.name

    }



    // const detalleMovimiento = yield select((state) => 
    //   state.getIn(
    //     [
    //       'movimientosInventario',
    //       'movimientoInventarioTabla',
    //       'esDetalleMovimiento',
    //     ]
    //   )
    // )
    // let nombreArchivo
    // if (detalleMovimiento){
    //   const file = yield select((state) => 
    //     state.getIn(
    //       [
    //         'movimientosInventario',
    //         'movimientoInventarioTabla',
    //         'documentacion',
    //         'archivos',
    //         action.id,
    //       ]
    //     ).toJS()
    //   )
    //   nombreArchivo=file.Nombre
    //   const {
    //     status,
    //     data,
    //   } = yield call (getDownloadedFile, file.Ruta);
    //   if(status === 200){
    //     url = window.URL.createObjectURL(new Blob([data]));
    //   } else {
        
    //     yield put(
    //       enqueueSnackbar({
    //         message: 'Hubo un error al descargar el archivo',
    //         options: {
    //           variant: 'error',
    //         },
    //       })
    //     )
    //     band = false;
    //   }
    // }else{
    // const file = yield select((state) => 
    //   state.getIn(
    //     [
    //       'movimientosInventario',
    //       'movimientoInventarioTabla',
    //       'documentacion',
    //       'archivos',
    //       action.id,
    //     ]
    //   )
    // )
    

    // }
    if(band){
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', nombreArchivo);
      document.body.appendChild(link);
      link.click();
      yield put(
        enqueueSnackbar({
          message: 'Se ha descargado el archivo correctamente.',
          options: {
            variant: 'success',
          },
        })
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al descargar el archivo',
        options: {
          variant: 'error',
        },
      })
    );
  }
}
export function* handleDownloadArchivoEvidenciaSaga(action) {
  try {
    let url = '';
    let band = true;
    let nombreArchivo

    // eslint-disable-next-line no-nested-ternary
    const tipoEvidencia = action.tipoEvidencia === 4 ? 'planos' : action.tipoEvidencia === 2 ? 'formatoConteo' : 'reporteResultados'

    const detalleInventario = yield select((state) => 
      state.getIn(
        [
          'inventarioCiclico',
          'inventarioCiclicoTabla',
          'esDetalleInventario',
        ]
      )
    )

    const archivo = yield select((state) => 
      state.getIn(
        [
          'inventarioCiclico',
          'inventarioCiclicoTabla',
          'documentacion',
          tipoEvidencia,

        ]
      ).toJS()
    )

    
    // Si se quisiera poder modificar el detalle aqui en donde dice es detalle inventario tendria que validar 
    // si se elimino el archivo y hacer una validacion de se volvio a subir el archivo algo asi xD
    
    if (detalleInventario || action.tipoEvidencia === 4 || archivo[0].Nombre){
      
      
      nombreArchivo=archivo[0].Nombre
      const {
        status,
        data,
      } = yield call (getDownloadedFile, archivo[0].Ruta);
      if(status === 200){
        url = window.URL.createObjectURL(new Blob([data]));
      } else {
        
        yield put(
          enqueueSnackbar({
            message: 'Hubo un error al descargar el archivo',
            options: {
              variant: 'error',
            },
          })
        )
        band = false;
      }
    }else{
      url = window.URL.createObjectURL(new Blob([archivo[0]]));
      nombreArchivo = archivo[0].name
    }
    // }
    if(band){
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', nombreArchivo);
      document.body.appendChild(link);
      link.click();
      yield put(
        enqueueSnackbar({
          message: 'Se ha descargado el archivo correctamente.',
          options: {
            variant: 'success',
          },
        })
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al descargar el archivo',
        options: {
          variant: 'error',
        },
      })
    );
  }
}
export function* handleGuardarInventarioSaga(action) {
  try {
    yield put(
      Actions.get('HANDLE_ABRIR_MODAL').fn(false)
    )
    
    
    if (action.guardar){
      
      const tipoGuardado = yield select(state => state.getIn(['inventarioCiclico','inventarioCiclicoTabla','configuracionCalendario',
        'tipoGuardado']))

      const almacenSeleccionado = yield select(state => state.getIn(['inventarioCiclico','inventarioCiclicoTabla','configuracionCalendario',
        'datosSeleccionados','almacenSeleccionado']))
      
      const moldeSeleccionado = yield select(state => state.getIn(['inventarioCiclico','inventarioCiclicoTabla','configuracionCalendario',
        'datosSeleccionados','moldeSeleccionado']))
      
      const plantaSeleccionada = yield select(state => state.getIn(['inventarioCiclico','inventarioCiclicoTabla','configuracionCalendario',
        'datosSeleccionados','plantaSeleccionada']))
      
      const usuarioLogeado = yield select(state => state.getIn(['inventarioCiclico','inventarioCiclicoTabla',
        'usuarioLogeado']))
      
      const formatoConteo = yield select(state => state.getIn(['inventarioCiclico','inventarioCiclicoTabla',
        'documentacion','formatoConteo']).toJS())
      const idFormatoConteo = yield select(state => state.getIn(['inventarioCiclico','inventarioCiclicoTabla',
        'documentacion','idFormatoConteo']))
      const reporteResultados = yield select(state => state.getIn(['inventarioCiclico','inventarioCiclicoTabla',
        'documentacion','reporteResultados']).toJS())
      const idReporteResultados = yield select(state => state.getIn(['inventarioCiclico','inventarioCiclicoTabla',
        'documentacion','idReporteResultados']))
      const cantidadResultados = yield select(state => state.getIn(['inventarioCiclico','inventarioCiclicoTabla',
        'cantidadResultados']))

      const archivos = yield select((state) => 
        state.getIn(
          [
            'inventarioCiclico',
            'inventarioCiclicoTabla',
            'documentacion',
            'archivos',
          ]
        ).toJS()
      )
      
      const arregloArchivos = [];
      const archivoFormatoConteo = [];
      const archivoReporteResultados = [];
      const estatusInventario = tipoGuardado === 1 ? 'CERRADO': 'REFCOM'
      if (archivos.length>0){
        
        const formData = new FormData()
        formData.append('refId', 'documentacion')
        const idInsumos = [];
        
        for (let k = 0; k < archivos.length; k+=1) {
          if (archivos[k].File || archivos[k].Ruta){
            if(archivos[k].File){
              formData.append('files', archivos[k].File, archivos[k].File.name)
              idInsumos.push(archivos[k].IdInsumo)
            }else{
              arregloArchivos.push(
                {
                  'rutaArchivo': archivos[k].Ruta,
                  'name': archivos[k].Nombre,
                  'idInsumo': archivos[k].IdInsumo,
                }
              ) 
            }
          } 
        }
        if (idInsumos.length>0){
          const {
            status: statusFi,
            data : dataFi,
          } = yield call(postUploadFile, formData);
        
          
          
          if(statusFi === 200){
            for (let k = 0; k < dataFi.length; k+=1) {
              arregloArchivos.push(
                {
                  'rutaArchivo': dataFi[k].url,
                  'name': dataFi[k].name,
                  'idInsumo': idInsumos[k],
                }
              ) 
            }
          }
        }
      }
      

      // Formato Conteo
      if (formatoConteo.length>0){
        const formDataFormato = new FormData()
        formDataFormato.append('refId', 'documentacion')
        
        for (let k = 0; k < formatoConteo.length; k+=1) {
          if(formatoConteo[k].name || formatoConteo[k].Ruta){
            if(formatoConteo[k].name){
              formDataFormato.append('files', formatoConteo[k], formatoConteo[k].name)
            }else{
              archivoFormatoConteo.push(
                {
                  'idArchivo':idFormatoConteo,
                  'rutaArchivo': formatoConteo[k].Ruta,
                  'name': formatoConteo[k].Nombre,
                }
              ) 
            }
          }
        }
  
        const {
          status: statusFormato,
          data : dataFormato,
        } = yield call(postUploadFile, formDataFormato);
        
      
        if(statusFormato === 200){
          for (let k = 0; k < dataFormato.length; k+=1) {
            archivoFormatoConteo.push(
              {
                'idArchivo':idFormatoConteo,
                'rutaArchivo': dataFormato[k].url,
                'name': dataFormato[k].name,
              }
            ) 
          }
        }
      }

      

      // Reporte de resultados
      if (reporteResultados.length>0){
        
        const formDataReporte = new FormData()
        formDataReporte.append('refId', 'documentacion')
        
        for (let k = 0; k < reporteResultados.length; k+=1) {
          if(reporteResultados[k].name || reporteResultados[k].Ruta){
            if(reporteResultados[k].name){
              formDataReporte.append('files', reporteResultados[k], reporteResultados[k].name)
            }else{
              archivoReporteResultados.push(
                {
                  'idArchivo':idReporteResultados,
                  'rutaArchivo': reporteResultados[k].Ruta,
                  'name': reporteResultados[k].Nombre,
                }
              ) 
            }
          }
        }
  
        const {
          status: statusReporte,
          data : dataReporte,
        } = yield call(postUploadFile, formDataReporte);
        
      
        if(statusReporte === 200){
          for (let k = 0; k < dataReporte.length; k+=1) {
            archivoReporteResultados
              .push(
                {
                  'idArchivo':idReporteResultados,
                  'rutaArchivo': dataReporte[k].url,
                  'name': dataReporte[k].name,
                }
              ) 
          }
        }
      }

      
      const piezas = yield select((state) => 
        state.getIn(
          [
            'inventarioCiclico',
            'inventarioCiclicoTabla',
            'configuracionCalendario',
            'tablas',
            'piezas',
            'datos',
          ]
        ).toJS()
      )
      piezas.forEach((pieza,index) => {
        if (!pieza.Seleccionado)
          piezas[index].IdEstatus = 'NOINV'
      })
      // const piezasSeleccionadas =piezas.filter(datoPieza => datoPieza.Seleccionado)
      
      const accesorios = yield select((state) => 
        state.getIn(
          [
            'inventarioCiclico',
            'inventarioCiclicoTabla',
            'configuracionCalendario',
            'tablas',
            'accesorios',
            'datos',
          ]
        ).toJS()
      )
      accesorios.forEach((accesorio,index) => {
        if (accesorio.Seleccionado && accesorio.Cantidad === accesorio.Monto){
          accesorios[index].IdEstatus = 'REFCOM'
        }else{
          accesorios[index].IdEstatus = 'REFINC'
        }
        if (!accesorio.Seleccionado){
          accesorios[index].IdEstatus = 'NOINV'
        }
      })
      // const accesoriosSeleccionados = accesorios.filter(datoAccesorio => datoAccesorio.Seleccionado)

      // En accesorios y piezas si no estan seleccionados cambiar estatus a incompleto 
      const datosInventario = {
        proceso: 'INVCIC',
        almacenSeleccionado,
        moldeSeleccionado,
        plantaSeleccionada,
        usuarioLogeado,
        evidencias: arregloArchivos,
        formatoConteo: archivoFormatoConteo,
        reporteResultados: archivoReporteResultados,
        piezas,
        accesorios,
        estatus: estatusInventario,
        cantidadResultados,
      }
      const {
        status,
        data,
      } = yield call(postGuardarInventarioApi, datosInventario)
      if(status === 200){
        yield put(
          enqueueSnackbar({
            message:tipoGuardado === 1 ?'El conteo fue cerrado correctamente': 'El conteo fue guardado correctamente',
            options: {
              variant: 'success',
            },
          })
        );
        yield put(
          Actions.get('SET_INVENTARIO_GUARDADO').fn(data)
        );
      } else {
        yield put(
          enqueueSnackbar({
            message: data.message,
            options: {
              variant: 'error',
            },
          })
        );
      }
    }
  } catch (error) {
    
    // yield put(
    //   enqueueSnackbar({
    //     message: 'Hubo un error al subir el archivo',
    //     options: {
    //       variant: 'error',
    //     },
    //   })
    // );
  }

}
export function* handleGuardarArchivoEvidenciaSaga(action) {
  try {

    const almacenSeleccionado = yield select(state => state.getIn(['inventarioCiclico','inventarioCiclicoTabla','configuracionCalendario',
      'datosSeleccionados','almacenSeleccionado']))

    const usuarioLogeado = yield select(state => state.getIn(['inventarioCiclico','inventarioCiclicoTabla',
      'usuarioLogeado']))

    const arregloArchivos = [];
    const formData = new FormData()
    formData.append('refId', 'documentacion')
    
    for (let k = 0; k < action.formData.length; k+=1) {
      formData.append('files', action.formData[k], action.formData[k].name)
    }

    const {
      status: statusFi,
      data : dataFi,
    } = yield call(postUploadFile, formData);
    
    if(statusFi === 200){
      for (let k = 0; k < dataFi.length; k+=1) {
        arregloArchivos.push(
          {
            'rutaArchivo': dataFi[k].url,
            'name': dataFi[k].name,
          }
        ) 
      }
    }

    
    const Fecha = moment(action.fecha).format('YYYY/MM/DD HH:mm:ss');
    
    const datos = {
      rutaArchivo: arregloArchivos[0].rutaArchivo,
      nombre: arregloArchivos[0].name,
      almacenSeleccionado,
      fechaInventario: Fecha,
      usuarioLogeado,
    }
    const {
      status,
      data,
    } = yield call(postGuardarArchivoEvidenciaApi, datos)

    if(status === 200){
      yield put(
        enqueueSnackbar({
          message: 'Archivo guardado correctamente',
          options: {
            variant: 'success',
          },
        })
      );
      yield put(
        Actions.get('SET_EVIDENCIAS_ALMACEN').fn(data)
      );
    } else {
      yield put(
        enqueueSnackbar({
          message: data.message,
          options: {
            variant: 'error',
          },
        })
      );
    }
  } catch (error) {
    
    // yield put(
    //   enqueueSnackbar({
    //     message: 'Hubo un error al subir el archivo',
    //     options: {
    //       variant: 'error',
    //     },
    //   })
    // );
  }
}
export function* handleEliminarArchivoEvidenciaSaga(action) {
  try {
    const idEvidencia = yield select(state => state.getIn(['inventarioCiclico','inventarioCiclicoTabla','configuracionCalendario',
      'idEvidenciaCalendario']))
    
    yield put(
      Actions.get('HANDLE_ELIMINAR_MODAL').fn(false)
    );

    if (action.eliminar){
      const idAlmacen = yield select(state => state.getIn(['inventarioCiclico','inventarioCiclicoTabla','configuracionCalendario',
        'datosSeleccionados','almacenSeleccionado']))

      
      
      const datos = {
        idEvidencia,
        idAlmacen,
      }
      const {
        status,
        data = [],
      } = yield call(postEliminarArchivoEvidenciaApi,datos);
      if(status === 200){
        yield put(
          Actions.get('SET_EVIDENCIAS_ALMACEN').fn(data)
        );
      } else {
      // yield put(
      //   enqueueSnackbar({
      //     message: data.message,
      //     options: {
      //       variant: 'error',
      //     },
      //   })
      // );
      }
    }
  } catch (error) {
    // yield put(
    //   enqueueSnackbar({
    //     message: 'Hubo un error al obtener la información',
    //     options: {
    //       variant: 'error',
    //     },
    //   })
    // );
  }
}
export function* handleDownloadAEvidenciaCalendarioSaga(action) {
  try {

    let url = '';
    let band = true;
    let nombreArchivo = "";

    const evidencias = yield select((state) => 
      state.getIn(
        [
          'inventarioCiclico',
          'inventarioCiclicoTabla',
          'evidenciasCalendario',
        ]
      )
    )

    const evidenciaSeleccionada = evidencias.filter(evidencia => evidencia.EvidenciaInventarioId === action.IdEvidencia)
    nombreArchivo=evidenciaSeleccionada[0].Nombre
    const {
      status,
      data,
    } = yield call (getDownloadedFile, evidenciaSeleccionada[0].Ruta);

    if(status === 200){
      url = window.URL.createObjectURL(new Blob([data]));
    } else {
    
      yield put(
        enqueueSnackbar({
          message: 'Hubo un error al descargar el archivo',
          options: {
            variant: 'error',
          },
        })
      )
      band = false;
    }

    if(band){
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', nombreArchivo);
      document.body.appendChild(link);
      link.click();
      yield put(
        enqueueSnackbar({
          message: 'Se ha descargado el archivo correctamente.',
          options: {
            variant: 'success',
          },
        })
      );
    }

  } catch (error) {
  
    // yield put(
    //   enqueueSnackbar({
    //     message: 'Hubo un error al subir el archivo',
    //     options: {
    //       variant: 'error',
    //     },
    //   })
    // );
  }
}

export function* handleObtenerDetalleInventarioSaga(action) {
  try {
    if (action.IdInventarioCiclico > 0 ){
      const {
        status,
        data,
      } = yield call(getObtenerDetalleInventarioApi, action.IdInventarioCiclico)

  
      if(status === 200){
        yield put(
          Actions.get('HANDLE_MOSTRAR_DETALLE').fn(data,action.tipoDetalle,action.IdInventarioCiclico)
        );
      }
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener el detalle del inventario',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* handleDownloadExcelSaga (action) {
  // const {
  //   Columns,
  //   Rows,
  //   // FileName,
  // } = actions
  
  // const Columns = []
  if (action.tipoExcel === 1){
    yield put(
      Actions.get('SET_CANTIDAD_RESULTADOS').fn()
    );
    const cantidadResultados = yield select(state => state.getIn(['inventarioCiclico','inventarioCiclicoTabla',
      'cantidadResultados']))
    const idInventarioCiclico = yield select(state => state.getIn(['inventarioCiclico','inventarioCiclicoTabla',
      'idInventarioCiclico']))

    const datos = {
      idInventario: idInventarioCiclico,
      cantidad: cantidadResultados,
    }
    
    if(idInventarioCiclico !== ''){
      yield call(setCantidadResultadosApi,datos);
    }
    
    yield put(
      Actions.get('SET_RESULTADOS').fn()
    );
    // setCantidadResultadosApi
  }else{
  
    const FileName = action.tipoExcel === 0 ? "Formato de conteo" : "Reporte de resultados"
    // Transformar las piezas
    const arrayDatos = []
    const cabeceraFormatoConteo = ["Seccion","Codigo","Identificador","Descripción Insumo","Tipo","Unidad","CantidadFisica"]
    const cabeceraResultados = ["Seccion","Codigo","Identificador","Descripción Insumo","Tipo","Unidad","Precio prom","Cant.Fisica","Diferencia","Tipo de Diferenc."]
    // nombreAlmacen
    // fecha

    // Fecha seleccionada
    const datosSeleccionados = yield select((state) => 
      state.getIn(
        [
          'inventarioCiclico',
          'inventarioCiclicoTabla',
          'configuracionCalendario',
          'datosSeleccionados',
        ]
      ).toJS()
    )

    const arrayAlmacenes = yield select((state) => 
      state.getIn(
        [
          'inventarioCiclico',
          'inventarioCiclicoTabla',
          'configuracionCalendario',
          'almacenes',
        ]
      )
    )

    const almacenes = JSON.parse(JSON.stringify(arrayAlmacenes))
  

    const almacenSeleccionado = almacenes.filter(almacen => almacen.IdAlmacen === datosSeleccionados.almacenSeleccionado)
    const fecha = dateFns.format(datosSeleccionados.fechaSeleccionada, "DD/MM/YYYY")



    const piezas = yield select((state) => 
      state.getIn(
        [
          'inventarioCiclico',
          'inventarioCiclicoTabla',
          'configuracionCalendario',
          'tablas',
          'piezas',
          'datos',
        ]
      ).toJS()
    )
    const accesorios = yield select((state) => 
      state.getIn(
        [
          'inventarioCiclico',
          'inventarioCiclicoTabla',
          'configuracionCalendario',
          'tablas',
          'accesorios',
          'datos',
        ]
      ).toJS()
    )
  
  

    piezas.forEach((pieza) => {
      if(action.tipoExcel === 0){
        arrayDatos.push([pieza.Seccion,pieza.IdInsumo,pieza.Identificador,pieza.Nombre,"Pieza","pza",""])
      }else{
        arrayDatos.push([pieza.Seccion,pieza.IdInsumo,pieza.Identificador,pieza.Nombre,"Pieza",100,10,0,0,"Ok"])
      }  
    })

    accesorios.forEach((accesorio) => {
      if(action.tipoExcel === 0){
        arrayDatos.push([accesorio.Seccion,accesorio.IdInsumo,accesorio.Identificador,accesorio.Nombre,"Accesorios","pza",""])
      }else{
        arrayDatos.push([accesorio.Seccion,accesorio.IdInsumo,accesorio.Identificador,accesorio.Nombre,"Accesorios",10,1,0,0,"Ok"])
      }
    })

  
  
  
  
    if (arrayDatos && arrayDatos.length) {  
      try{
        if (action.tipoExcel === 0){
          const datosExcel = []
          // dataLayoutNegociaciones.push(Columns)
          // dataLayoutNegociaciones.push(Rows)
          // Columns.map(col => Rows.map(row => row[col]))
          datosExcel.push(["Formato de conteo"])
          datosExcel.push(["Almacen",almacenSeleccionado[0].Nombre,"","","","Fecha",fecha])
          datosExcel.push([])
          datosExcel.push(cabeceraFormatoConteo)
          datosExcel.push(...arrayDatos.map(row => Object.values(row)))
          // dataLayoutNegociaciones.push(...Rows.map(row => Object.getOwnPropertyNames(row)))
          // datosExcel.push(arrayDatos)
        
          const wb = XLSX.utils.book_new()
          const ws = XLSX.utils.aoa_to_sheet(datosExcel);
          XLSX.utils.book_append_sheet(wb, ws, 'Formato');/* add worksheet to workbook */
          XLSX.writeFile(wb, FileName.concat('.xlsx'))/* write workbook */
        // loadExportExplotionAction(-1)
        }else{
          const datosExcel = []
          // dataLayoutNegociaciones.push(Columns)
          // dataLayoutNegociaciones.push(Rows)
          // Columns.map(col => Rows.map(row => row[col]))
          datosExcel.push(["Reporte de resultados"])
          datosExcel.push(["Almacen",almacenSeleccionado[0].Nombre,"","","","Fecha",fecha])
          datosExcel.push([])
          datosExcel.push(cabeceraResultados)
          datosExcel.push(...arrayDatos.map(row => Object.values(row)))
          // dataLayoutNegociaciones.push(...Rows.map(row => Object.getOwnPropertyNames(row)))
          // datosExcel.push(arrayDatos)
        
          const wb = XLSX.utils.book_new()
          const ws = XLSX.utils.aoa_to_sheet(datosExcel);
          XLSX.utils.book_append_sheet(wb, ws, 'Resultados');/* add worksheet to workbook */
          XLSX.writeFile(wb, FileName.concat('.xlsx'))/* write workbook */

          yield put(
            Actions.get('SET_RESULTADOS').fn()
          );

        // loadExportExplotionAction(-1)
        }


  

      }catch(err){
        enqueueSnackbar({
          message: 'Ocurrio un problema al descargar, favor de comunicarse con Soporte.',
          options: { variant: 'error' },
        })
      // loadExportExplotionAction(0) 
      }
    }else{
      enqueueSnackbar({
        message: 'No existe información para descargar, favor de verificar.',
        options: { variant: 'error' },
      })
    // loadExportExplotionAction(0)
    }
  }
}


// Individual exports for testing
export default function* inventarioCiclicoSaga() {
  yield [
    // takeLatest(
    //   OBTENER_PERMISOS,
    //   obtenerPermisosAction
    // ),
    takeLatest(
      GET_ALMACENES,
      getAlmacenesSaga,
    ),
    takeLatest(
      GET_ESTATUS,
      getEstatusSaga,
    ),
    takeLatest(
      HANDLE_CHANGE_ALMACEN,
      getMoldesAlmacenSaga,
    ),
    takeLatest(
      NUEVA_CAPTURA_INVENTARIO,
      getInsumosAlmacenSaga,
    ),
    takeLatest(
      HANDLE_DOWNLOAD_ARCHIVO,
      handleDownloadArchivoSaga,
    ),
    takeLatest(
      HANDLE_DOWNLOAD_ARCHIVO_EVIDENCIA,
      handleDownloadArchivoEvidenciaSaga,
    ),
    takeLatest(
      ON_GUARDAR_INVENTARIO,
      handleGuardarInventarioSaga,
    ),
    takeLatest(
      ON_SUBIR_ARCHIVO_EVIDENCIA,
      handleGuardarArchivoEvidenciaSaga,
    ),
    takeLatest(
      ON_DOWNLOAD_ARCHIVO_EVIDENCIA,
      handleDownloadAEvidenciaCalendarioSaga,
    ),
    takeLatest(
      ON_DELETE_ARCHIVO_EVIDENCIA,
      handleEliminarArchivoEvidenciaSaga,
    ),
    takeLatest(
      HANDLE_OBTENER_DETALLE_INVENTARIO,
      handleObtenerDetalleInventarioSaga,
    ),
    takeLatest(
      HANDLE_DOWNLOAD_EXCEL,
      handleDownloadExcelSaga,
    ),
    
    
    
  ]
}
