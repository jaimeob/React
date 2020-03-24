// import { take, call, put, select } from 'redux-saga/effects';
import { takeLatest, call,all, put, select } from 'redux-saga/effects';
// import { toSafeInteger } from 'lodash'
// import {
//   enqueueSnackbar,
// } from 'reducers/notifications/actions';

import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';
import Actions from './actions';
import { obtenerPermisos } from '../../../../services/api';

import {
  getPlazasUsuarioApi,
  getTipoMovimientosApi,
  getMoldesInexistentesApi,
  getPiezasMoldeApi,
  getAccesoriosMoldeApi,
  postUploadFile,
  postGuardarNuevoMovimientoApi,
  getMovimientosApi,
  getMovimientoDetalleApi,
  getTablasMovimientoDetalleApi,
  getDownloadedFile,
  getMoldesExistentesApi,
  getInsumosExistentesApi,
  getDatosFolioApi,
  // getAlmacenesApi,
  getAlmacenesUsuarioApi,
  getPlazasApi,
} from './api';

export const {
  GET_COMBOS,
  GET_PUESTOS,
  GET_PLAZAS,
  GET_TIPOS_MOVIMIENTOS,
  SET_MOLDE_SELECCIONADO,
  ON_TIPO_MOVIMIENTO_CHANGE,
  ON_MOLDE_SELECCIONADO_CHANGE,
  ON_INPUT_CHANGE_SECCION,
  HANDLE_CHANGE_ARCHIVO,
  HANDLE_DOWNLOAD_ARCHIVO,
  ON_ELIMINAR_ARCHIVO_DOCUMENTACION,
  ON_CLICK_AGREGAR_MOVIMIENTO,
  GET_TABLA_MOVIMIENTOS,
  ON_SELECT_MOVIMIENTO,
  OBTENER_MOLDES_FOLIO,
  OBTENER_PERMISOS,
  ON_INPUT_PLAZA_CHANGE,
  ON_INPUT_PLAZA_DESTINO_CHANGE,
} = Actions.getConstants();

export function* obtenerPermisosAction(){
  const paramsPermisos = yield select((state) => state.getIn(['global','paramsPermisos']).toJS());
  const idUsuario = yield select((state) => state.getIn(['global', 'currentUser', 'UsuarioId']));
  
  const {
    status,
    data,
  } = yield call(obtenerPermisos, {...paramsPermisos, idUsuario});

  if(status === 200){
    yield put(
      Actions.get('SET_PERMISOS').fn(data.permisos),
    );
  } else{
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'Error al obtener los permisos',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }
}
// export function* getCombosSaga() {
//   try {
//     const {
//       status,
//       data = [],
//     } = yield call(getCombos);
    
//     if(status === 200){
//       yield put(
//         Actions.get('SET_COMBOS').fn(data)
//       );
//     } else {
//       yield put(
//         enqueueSnackbar({
//           message: data.message,
//           options: {
//             variant: 'error',
//           },
//         })
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

// export function* getPuestosSaga() {
//   try {
//     const {
//       status,
//       data = [],
//     } = yield call(getPuestos);
    
//     if(status === 200){
//       yield put(
//         Actions.get('SET_PUESTOS').fn(data)
//       );
//     } else {
//       yield put(
//         enqueueSnackbar({
//           message: data.message,
//           options: {
//             variant: 'error',
//           },
//         })
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
export function* getTablaMovimientosSaga() {
  try {
    const idUsuario = yield select((state) => state.getIn(['global', 'currentUser', 'UsuarioId']));
    // 'INVIDM'
    const {
      status,
      data = [],
    } = yield call(getMovimientosApi,idUsuario);



    if(status === 200){
      yield put(
        Actions.get('SET_TABLA_MOVIMIENTOS').fn(data)
      );
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

export function* getPlazasSaga(action) {
  try {
    const datos= {
      usuarioId: action.usuarioId,
    }
    const {
      status,
      data = [],
    } = yield call(getPlazasUsuarioApi,datos);
    if(status === 200){
      yield put(
        Actions.get('SET_PLAZAS').fn(data)
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

export function* getTiposMovimientosSaga() {
  try {
    const {
      status,
      data = [],
    } = yield call(getTipoMovimientosApi, 'INVIDM');

    if(status === 200){
      yield put(
        Actions.get('SET_TIPOS_MOVIMIENTOS').fn(data)
      );
    } else {
      // yield put(
      //   enqueueSnackbar({
      //     message: data.messages
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

export function* setTipoMovimientoSaga(action) {
  try {
    yield put(
      Actions.get('ON_INPUT_CHANGE').fn(action.campo,action.valor)
    );
    if (action.campo === 4){
      yield put(
        Actions.get('SET_ALMACENES_VALOR').fn(action.valor)
      );
    }
    
    const idPlazaSeleccionada = yield select(state => state.getIn(['movimientosInventario','movimientoInventarioTabla',
      'campos','plaza','valor']))
    const tipoMovimiento = yield select(state => state.getIn(['movimientosInventario','movimientoInventarioTabla',
      'campos','tipoMovimiento','valor']))
    const plazas = yield select(state => state.getIn(['movimientosInventario','movimientoInventarioTabla',
      'configuracionNuevoMovimiento','plazas']))
    const idAlmacen = yield select(state => state.getIn(['movimientosInventario','movimientoInventarioTabla',
      'campos','almacen','valor']))
    const datos= {
      IdPlaza: idPlazaSeleccionada,
      IdTipoMovimiento: tipoMovimiento,
      IdAlmacen: idAlmacen,
    }
    
    if (tipoMovimiento === 6 && action.campo === 1 && idPlazaSeleccionada !== ''){
      
      yield put(
        Actions.get('SET_PLAZAS_DESTINO').fn(plazas,idPlazaSeleccionada)
      );
    }

    // Si es nuevo molde checo aqui, si no tengo que checar de los existentes
    if (idPlazaSeleccionada !== '' && tipoMovimiento !=='' && idAlmacen !=='' && tipoMovimiento !== 5){
      if (tipoMovimiento === 3){
        const {
          status,
          data = [],
        } = yield call(getMoldesInexistentesApi);
        
        if(status === 200){
          yield put(
            Actions.get('SET_TABLA_MOLDE').fn(data)
          );
        }
      }else{
        const {
          status,
          data = [],
        } = yield call(getMoldesExistentesApi,datos);

        if(status === 200){
          yield put(
            Actions.get('SET_TABLA_MOLDE').fn(data)
          );
        }
      }
    }
  } catch (error) {
    // 
  }
}
export function* setMoldeSeleccionadoSaga(action) {
  const {
    rowSeleccionados,
    idMolde,
    pestañaSeleccionada,
  } = action

  try {
    const idPlazaSeleccionada = yield select(state => state.getIn(['movimientosInventario','movimientoInventarioTabla',
      'campos','plaza','valor']))
    const idTipoMovimiento = yield select(state => state.getIn(['movimientosInventario','movimientoInventarioTabla',
      'campos','tipoMovimiento','valor']))
    const idAlmacen = yield select(state => state.getIn(['movimientosInventario','movimientoInventarioTabla',
      'campos','almacen','valor']))


    yield put(
      Actions.get('SET_ROW_MOLDE_SELECCIONADO').fn(rowSeleccionados,pestañaSeleccionada,idMolde)
    );

    const datos = {
      idMolde,
      idPlazaSeleccionada,
      idTipoMovimiento,
      idAlmacen,
    }
    if (pestañaSeleccionada === 0 && idTipoMovimiento !== 5) {
      if (idTipoMovimiento === 3 ){
        // Verificar tipo Movimiento Nuevo Molde
        const [piezas, accesorios] = yield all([
          call(getPiezasMoldeApi, datos),
          call(getAccesoriosMoldeApi, datos),
        ])

        const data = [piezas.data,accesorios.data]
        // if(status === 200){
        yield put(
          Actions.get('SET_INSUMOS_MOLDE').fn(data)
        );
      // }
      }else{
        const {
          status,
          data,
        } = yield call(getInsumosExistentesApi, datos)
        const datosInsumos = [data.piezas,data.accesorios]
        
        if(status === 200){
          yield put(
            Actions.get('SET_INSUMOS_MOLDE').fn(datosInsumos)
          );
        }
      }
    }
  } catch (error) {
    // 
  }
}

export function* getAlmacenesSaga(action) {
  
  try {
    
    yield put(
      Actions.get('ON_INPUT_CHANGE').fn(action.campo,action.valor)
    );
    const usuario = yield select(state => state.getIn(['movimientosInventario','movimientoInventarioTabla',
      'usuarioLogeado']))
      

    const datos = {
      usuario,
      idPlaza:action.valor,
    }

    const {
      status,
      data = [],
    } = yield call(getAlmacenesUsuarioApi,datos);

    
    if(status === 200){
      yield put(
        Actions.get('SET_ALMACENES').fn(data)
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
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al cambiar de almacen',
        options: {
          variant: 'error',
        },
      })
    );
  }
}


export function* getAlmacenesDestinoSaga(action) {
  
  try {
    
    yield put(
      Actions.get('SET_INPUT_CHANGE_SECCION').fn(action.campo,action.valor)
    );

    const usuario = yield select(state => state.getIn(['movimientosInventario','movimientoInventarioTabla',
      'usuarioLogeado']))
      

    const datos = {
      usuario,
      idPlaza:action.valor,
    }

    const {
      status,
      data = [],
    } = yield call(getAlmacenesUsuarioApi,datos);

    
    if(status === 200){
      yield put(
        Actions.get('SET_ALMACENES_DESTINO').fn(data)
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
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al cambiar de almacen destino',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* setPlazaSeleccionadaSeccionSaga(action) {
  const {
    campo, 
    valor,
  } = action

  try {
    if (action.campo === 3){
      
      yield put(
        Actions.get('SET_ALMACENES_DESTINO_VALOR').fn(valor)
      );
    }else{
      yield put(
        Actions.get('SET_INPUT_CHANGE_SECCION').fn(campo,valor)
      );
    }




  } catch (error) {
    // 
  }
}
export function* handleChangeArchivoSaga(action) {
  try {
    yield put(
      Actions.get('HANDLE_CHANGE_ARCHIVO_EDITAR').fn(action)
    )
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
export function* handleDeleteArchivoSaga() {
  try {
    const indice = yield select(state => state.getIn(
      [
        'movimientosInventario',
        'movimientoInventarioTabla',
        'documentacion',
        'idArchivoTempo',        
      ]
    ))
    
    const archivos = yield select((state) => 
      state.getIn(
        [
          'movimientosInventario',
          'movimientoInventarioTabla',
          'documentacion',
          'archivos',
        ]
      ).toJS()
    )
    archivos.splice(indice, 1);

    yield put(
      Actions.get('HANDLE_DELETE_ARCHIVO_EDICION').fn(archivos)
    );

  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al eliminar el archivo',
        options: {
          variant: 'error',
        },
      })
    );
  }
}
export function* handleDownloadArchivoSaga(action) {
  try {
    let url = '';
    let band = true;

    const detalleMovimiento = yield select((state) => 
      state.getIn(
        [
          'movimientosInventario',
          'movimientoInventarioTabla',
          'esDetalleMovimiento',
        ]
      )
    )
    let nombreArchivo
    if (detalleMovimiento){
      const file = yield select((state) => 
        state.getIn(
          [
            'movimientosInventario',
            'movimientoInventarioTabla',
            'documentacion',
            'archivos',
            action.id,
          ]
        ).toJS()
      )
      nombreArchivo=file.Nombre
      const {
        status,
        data,
      } = yield call (getDownloadedFile, file.Ruta);
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
      const file = yield select((state) => 
        state.getIn(
          [
            'movimientosInventario',
            'movimientoInventarioTabla',
            'documentacion',
            'archivos',
            action.id,
          ]
        )
      )
      url = window.URL.createObjectURL(new Blob([file]));
      nombreArchivo=file.name
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
export function* handleGuardarMovimientoSaga(action) {
  try {
    yield put(
      Actions.get('HANDLE_ABRIR_MODAL_AGREGAR').fn(false)
    )
    
    if (action.agregar){
      const idPlazaSeleccionada = yield select(state => state.getIn(['movimientosInventario','movimientoInventarioTabla',
        'campos','plaza','valor']))
      const idPlazaDestino = yield select(state => state.getIn(['movimientosInventario','movimientoInventarioTabla',
        'campos','plazaDestino','valor']))
      const idTipoMovimiento = yield select(state => state.getIn(['movimientosInventario','movimientoInventarioTabla',
        'campos','tipoMovimiento','valor']))
      const observaciones = yield select(state => state.getIn(['movimientosInventario','movimientoInventarioTabla',
        'campos','observacion','valor']))
      const moldeSeleccionado = yield select(state => state.getIn(['movimientosInventario','movimientoInventarioTabla',
        'configuracionNuevoMovimiento','moldeSeleccionado']))
      const idInventario = yield select(state => state.getIn(['movimientosInventario','movimientoInventarioTabla',
        'campos','almacen','valor']))
      const idInventarioDestino = yield select(state => state.getIn(['movimientosInventario','movimientoInventarioTabla',
        'campos','almacenDestino','valor']))
      const usuario = yield select(state => state.getIn(['movimientosInventario','movimientoInventarioTabla',
        'usuarioLogeado']))
      const archivos = yield select((state) => 
        state.getIn(
          [
            'movimientosInventario',
            'movimientoInventarioTabla',
            'documentacion',
            'archivos',
          ]
        ).toJS()
      )
      const arregloArchivos = [];

      if (archivos.length>0){
        
        const formData = new FormData()
        formData.append('refId', 'documentacion')
        
        for (let k = 0; k < archivos.length; k+=1) {
          formData.append('files', archivos[k], archivos[k].name)
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
      }
      

      const piezas = yield select((state) => 
        state.getIn(
          [
            'movimientosInventario',
            'movimientoInventarioTabla',
            'configuracionNuevoMovimiento',
            'tablas',
            'pieza',
            'datos',
          ]
        ).toJS()
      )

    
      const piezasSeleccionadas =piezas.filter(datoPieza => datoPieza.Seleccionado)
      
      const accesorios = yield select((state) => 
        state.getIn(
          [
            'movimientosInventario',
            'movimientoInventarioTabla',
            'configuracionNuevoMovimiento',
            'tablas',
            'accesorio',
            'datos',
          ]
        ).toJS()
      )

      const accesoriosSeleccionados = accesorios.filter(datoAccesorio => datoAccesorio.Seleccionado)
      

      const datosNuevoMovimiento = {
        proceso: 'INVIDM',
        idPlazaSeleccionada,
        idTipoMovimiento,
        moldeSeleccionado,
        observaciones,
        archivos: arregloArchivos,
        piezasSeleccionadas,
        accesoriosSeleccionados,
        idPlazaDestino: idPlazaDestino === '' ? 0 : idPlazaDestino ,
        usuario,
        idInventario,
        idInventarioDestino: idInventarioDestino === '' ? 0 : idInventarioDestino,
      }
      
      const {
        status,
        data,
      } = yield call(postGuardarNuevoMovimientoApi, datosNuevoMovimiento)

      if(status === 200){
        yield put(
          enqueueSnackbar({
            message: 'El movimiento fue realizado correctamente',
            options: {
              variant: 'success',
            },
          })
        );

        yield put(
          Actions.get('SET_MOVIMIENTO_GUARDADO').fn(data)
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
export function* handleSelectMovimientoSaga(action) {
  try {
    const [datos, datosArreglos,datosPlazas] = yield all([
      call(getMovimientoDetalleApi, action.IdMovimiento),
      call(getTablasMovimientoDetalleApi, action.IdMovimiento),
      call(getPlazasApi),
    ])
    const detalle = {
      generales: datos.data[0],
      molde: datosArreglos.data.molde,
      accesorios: datosArreglos.data.accesorios,
      piezas: datosArreglos.data.piezas,
    }

    if(datos.status === 200){
      yield put(
        Actions.get('SET_DETALLE_MOVIMIENTO').fn(detalle)
      );
    }
    if(datosArreglos.status === 200){
      yield put(
        Actions.get('SET_DETALLE_TABLAS_MOVIMIENTO').fn(datosArreglos.data,datos.data[0].IdMolde)
      );
    }
    if(datosPlazas.status === 200){
      yield put(
        Actions.get('SET_PLAZAS_DETALLE').fn(datosPlazas.data)
      );
    }
  } catch (error) {
    //
  }
}
export function* handleObtenerMoldeFolioSaga(action) {
  try {

    const idPlazaSeleccionada = yield select(state => state.getIn(['movimientosInventario','movimientoInventarioTabla',
      'campos','plaza','valor']))
    const idAlmacen = yield select(state => state.getIn(['movimientosInventario','movimientoInventarioTabla',
      'campos','almacen','valor']))

    const datos = {
      folio: action.folio,
      idPlazaSeleccionada,
      idAlmacen,
    }
    
    // Aqui obtener todos el Molde, Piezas y Accesorios
    const {
      status,
      data = [],
    } = yield call(getDatosFolioApi,datos);
    if(status === 200 && data.moldes.length>0){
      const datosInsumos = [data.piezas,data.accesorios]
      yield put(
        Actions.get('SET_TABLA_MOLDE').fn(data.moldes)
      );
      yield put(
        Actions.get('SET_MOSTRAR_MOLDE').fn()
      );
      yield put(
        Actions.get('SET_INSUMOS_MOLDE').fn(datosInsumos)
      );
    } else {
      yield put(
        Actions.get('SET_TABLA_MOLDE').fn([])
      );
      const nombreAlmacen = data.folio.length>0 ? data.folio[0].NombreAlmacen: ''
      const estatusFolio = data.folio.length>0 && data.folio[0].Estatus === 1 ? 'Este folio de traspaso ya fue recibido' : 'No existe el folio'
      yield put(
        enqueueSnackbar({
          message: data.folio.length>0 && data.folio[0].Estatus === 0 ?`Este folio pertenece al almacen: ${nombreAlmacen}`:estatusFolio,
          options: {
            variant: 'warning',
          },
        })
      );
      // Si no obtiene nada pues no cambia nada xDxDxD

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

export default function* movimientosInventarioSaga() {
  yield [
    takeLatest(
      OBTENER_PERMISOS,
      obtenerPermisosAction
    ),
    takeLatest(
      GET_TABLA_MOVIMIENTOS,
      getTablaMovimientosSaga,
    ),
    takeLatest(
      GET_PLAZAS,
      getPlazasSaga,
    ),
    takeLatest(
      GET_TIPOS_MOVIMIENTOS,
      getTiposMovimientosSaga,
    ),
    takeLatest(
      ON_TIPO_MOVIMIENTO_CHANGE,
      setTipoMovimientoSaga,
    ),
    takeLatest(
      ON_MOLDE_SELECCIONADO_CHANGE,
      setMoldeSeleccionadoSaga,
    ),
    takeLatest(
      ON_INPUT_CHANGE_SECCION,
      setPlazaSeleccionadaSeccionSaga,
    ),
    takeLatest(
      HANDLE_CHANGE_ARCHIVO,
      handleChangeArchivoSaga,
    ),
    takeLatest(
      ON_ELIMINAR_ARCHIVO_DOCUMENTACION,
      handleDeleteArchivoSaga,
    ),
    takeLatest(
      HANDLE_DOWNLOAD_ARCHIVO,
      handleDownloadArchivoSaga,
    ),
    takeLatest(
      ON_CLICK_AGREGAR_MOVIMIENTO,
      handleGuardarMovimientoSaga,
    ),
    takeLatest(
      ON_SELECT_MOVIMIENTO,
      handleSelectMovimientoSaga,
    ),
    takeLatest(
      OBTENER_MOLDES_FOLIO,
      handleObtenerMoldeFolioSaga,
    ),
    takeLatest(
      ON_INPUT_PLAZA_CHANGE,
      getAlmacenesSaga,
    ),
    takeLatest(
      ON_INPUT_PLAZA_DESTINO_CHANGE,
      getAlmacenesDestinoSaga,
    ),
  ]
  // See example in containers/HomePage/saga.js
}
