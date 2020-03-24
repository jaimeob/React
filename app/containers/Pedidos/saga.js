import { takeLatest, call, put, select } from 'redux-saga/effects';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';
import Actions from './actions';

import {
  getPedidos,
  getPlazas,
  getEstatus,
  getPedidoDetalle,
  postAutorizarPedido,
  postUploadFile,
  getDownloadedFile,
  postRecibirPedido,
  deleteUploadFile,
} from './api';

export const {
  GET_PEDIDOS,
  GET_PLAZAS,
  GET_ESTATUS,
  GET_PEDIDO_DETALLE,
  AUTORIZAR_PEDIDO,
  RECIBIR_PEDIDO,
  AUTORIZAR_MULTIPLE,
  DOWNLOAD_FILE,
  DOWNLOAD_FILE_RECEPCION,
  DOWNLOAD_COTIZACION,
  ON_CLICK_SIGUIENTE,
} = Actions.getConstants();
// Individual exports for testing

// Hace un llamado a la api getPedidos y llama setPedidos para actualizar el state
export function* getPedidosAction() {
  try {
    const datos = JSON.parse(JSON.stringify(yield select((state) => state
      .getIn(
        ['pedidos', 'pedidosTabla', 'parametros']
      )))); 
    const idPlaza = yield select(state => state.getIn(['global', 'currentUser', 'IdPlaza'])) 

    const parametros = {
      idPedido: null,
      // eslint-disable-next-line no-nested-ternary
      idPlaza: idPlaza === 9 ? (datos.plaza.id === '' ? null : datos.plaza.id) : idPlaza,
      idEstatus: datos.estatusSeleccionado.id === '' ? 
        null : 
        datos.estatusSeleccionado.id,
      fecSolicitudInicio: datos.fecSolicitudInicio,
      fecSolicitudFin: datos.fecSolicitudFin,
      fecAutorizacionInicio: datos.fecAutorizacionInicio,
      fecAutorizacionFin: datos.fecAutorizacionFin,
    }
    const {
      status,
      data = [],
    } = yield call(getPedidos, parametros);
    
    if(status === 200){
      yield put(
        Actions.get('SET_PEDIDOS').fn(data, idPlaza)
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
        message: 'Hubo un error al obtener los pedidos',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

// Obtiene el siguiente idpedido a autorizar y llama la api para obtener 
// el detalle
export function* onClickSiguienteAction() {
  try {
    const stt = JSON.parse(JSON.stringify(yield select((state) => state
      .getIn(
        ['pedidos', 'pedidosTabla', 'pedidoDetalle']
      ))));
    const action = {
      idPedido : stt.ids[stt.paginaActual],
      pagina : stt.paginaActual + 1,
    };
    if(stt.paginaActual < stt.totalPaginas)
      yield call (getPedidoDetalleAction, action)
    else
      yield call (getPedidosAction)
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al mover de página',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

// Hace un llamado a la api getPlazas y llama setPlazas para actualizar el state
export function* getPlazasAction() {
  try {
    const {
      status,
      data = [],
    } = yield call(getPlazas);
    
    if(status === 200 && data.length > 0){
      yield put(
        Actions.get('SET_PLAZAS').fn(data)
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
        message: 'Hubo un error al obtener las Plazas',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

// Hace un llamado a la api getEstatus y llama setEstatus para actualizar el state
export function* getEstatusAction() {
  try {
    const {
      status,
      data = [],
    } = yield call(getEstatus);
    
    if(status === 200 && data.length > 0){
      yield put(
        Actions.get('SET_ESTATUS').fn(data)
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
        message: 'Hubo un error al obtener los estatus',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

// Hace un llamado a la api getPedidoDetalle y llama setPedidoDetalle
// para actualizar el state
export function* getPedidoDetalleAction(action) {
  try {
    const plaza = yield select((state) => state
      .getIn(
        ['pedidos', 'idPlaza']));
    const band = plaza === 9 ? 0 : 1
    const {
      status,
      data = [],
    } = yield call(getPedidoDetalle, action.idPedido, band);

    if(status === 200 && data.datos.length > 0){
      yield put(
        Actions.get('SET_PEDIDO_DETALLE').fn(data, action.pagina)
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
        message: 'Hubo un error al obtener el detalle',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

// Valida los campos para poder llamar la api de recibirPedido
export function* postRecibirPedidoAction() {
  try {
    const stt = JSON.parse(JSON.stringify(yield select((state) => state
      .getIn(
        ['pedidos', 'pedidosTabla', 'pedidoDetalle']
      ))));
    const files = yield select((state) => state
      .getIn(
        ['pedidos', 'pedidosTabla', 'pedidoDetalle', 'cotizaciones']
      ));
    const idUsuario = yield select(state => state.getIn(['global', 'currentUser', 'UsuarioId'])) 
    const datos = {
      detalle : stt.datos,
      comGenerales : stt.ComentariosGeneral,
      cotizaciones : [],
      idPedido : stt.infoPedido.idPedido,
      idUsuario,
      idEstatus : stt.infoPedido.idEstatus,
    }
    let band = true;
    
    for (let i = 0; i < datos.detalle.length; i+=1) {
      if(datos.detalle[i].DetalleEstatus === 13 && 
        datos.detalle[i].BandRecibidaInput === 1 && 
        datos.detalle[i].BandEvidenciaRecep === 1
      ){
        band = false;
        i = datos.detalle.length;
      }
    }
    if(band){
      yield put(
        enqueueSnackbar({
          message: 'Existen datos obligatorios en blanco. Favor de ingresarlos',
          options: {
            variant: 'warning',
          },
        })
      );
      yield put(
        Actions.get('DESACTIVAR_GUARDAR').fn(datos.detalle)
      );
    } else {
      let estatus = 200;
      for (let i = 0; i < stt.datos.length; i+=1) {
        if(stt.datos[i].DetalleEstatus === 13 && stt.datos[i].RutaEvidenciaRecepcionInputFile && estatus === 200){
          const {
            status : stat,
            data : file,
          } = yield call(postUploadFile,
            yield select((state) => state.getIn(
              [
                'pedidos', 
                'pedidosTabla', 
                'pedidoDetalle', 
                'datos', 
                i, 
                'RutaEvidenciaRecepcionInputFile',
              ]
            )))
          if(stat === 200){
            datos.detalle[i].RutaEvidenciaRecepcionInputFile = file[0].url;
          } else {
            estatus = 400;
          }
        }
      }
      if(files.size > 0){
        const arregloFiles = new FormData();
        arregloFiles.append('refId', 'cotizaciones');
        for (let j = 0; j < files.size; j+=1) {
          const file = yield select((state) => state
            .getIn(
              ['pedidos', 'pedidosTabla', 'pedidoDetalle', 'cotizaciones', j]
            ));
          if(file.name)
            arregloFiles.append('files', file, file.name);
        }
        
        const {
          status : estatusDos,
          data : file,
        } = yield call(postUploadFile, arregloFiles)
        if(estatusDos === 200){
          for (let k = 0; k < file.length; k+=1) {
            datos.cotizaciones[k]= {
              url : file[k].url,
              IdCotizacion : null,
            };
          }
        }
      }

      const {
        status,
        data = [],
      } = yield call(postRecibirPedido, datos);

      if(status === 200){
        yield put(
          enqueueSnackbar({
            message: 'Se ha recibido correctamente',
            options: {
              variant: 'success',
            },
          })
        );
        yield put(
          Actions.get('GET_PEDIDOS').fn()
        )
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
    console.log(error);
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al recibir el pedido',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

// Valida los campos para poder llamar la api de autorizarPedido, en caso de ser
// autorizacion multiple obtiene el siguiente pedido
export function* postAutorizarPedidoAction() {
  try {
    const stt = JSON.parse(JSON.stringify(yield select((state) => state
      .getIn(
        ['pedidos', 'pedidosTabla', 'pedidoDetalle']
      ))));
    const files = yield select((state) => state
      .getIn(
        ['pedidos', 'pedidosTabla', 'pedidoDetalle', 'cotizaciones']
      ));
    const idUsuario = yield select(state => state.getIn(['global', 'currentUser', 'UsuarioId'])) 
    const datos = {
      detalle : stt.datos,
      comGenerales : stt.ComentariosGeneral,
      cotizaciones : [],
      idPedido : stt.infoPedido.idPedido,
      idUsuario,
      idEstatus : stt.infoPedido.idEstatus,
      soloCoti : true,
    }
    
    let band = false;
    let bandDos = true;
    let contador = 0;

    for (let i = 0; i < datos.detalle.length; i+=1) {
      if(datos.idEstatus === 12){
        if(Number.isNaN(datos.detalle[i].AutorizadoInput) 
        || datos.detalle[i].AutorizadoInput === null || files.length === 0){
          band = true;
          datos.detalle[i].Band = 0;
          contador+=1;
        }
        if((contador === datos.detalle.length || contador === 0) && stt.bandCotizacion){
          band = false;
        }
        datos.soloCoti = false;
      } else if((datos.idEstatus === 8 || datos.idEstatus === 11) &&
          datos.detalle[i].DetalleEstatus !== 13){
        if((!stt.bandCotizacion || !stt.bandComentariosGeneral) && (datos.detalle[i].BandGuiaInput === 0 || 
          datos.detalle[i].BandPaqueteriaInput === 0 || datos.detalle[i].BandEvidencia === 0)){
          if(bandDos)
            band = true;
          contador+=1;
          // datos.detalle[i].BandGuia = 
          //   datos.detalle[i].BandGuia ? 1 : 0;
          // datos.detalle[i].BandPaqueteria = 
          //   datos.detalle[i].BandPaqueteria ? 1 : 0;
          // datos.detalle[i].BandEvidencia = 
          //   datos.detalle[i].BandEvidencia ? 1 : 0;
        } else {
          band = false;
          bandDos = false;
          datos.soloCoti = false;
        }
        
        if((contador === 0 || contador === datos.detalle.length) && (stt.bandCotizacion || !stt.bandComentariosGeneral)){
          band = false;
          datos.soloCoti = true;
        }
      } else if(datos.idEstatus === 13 && (stt.cotizacionesForm.length === 0 || !stt.bandComentariosGeneral)){
        band = true;
      }
    }
    if(band){
      yield put(
        enqueueSnackbar({
          message: 'Existen datos obligatorios en blanco. Favor de ingresarlos',
          options: {
            variant: 'warning',
          },
        })
      );
      yield put(
        Actions.get('DESACTIVAR_GUARDAR').fn(datos.detalle)
      );
    } else {
      let estatus = 200;
      for (let i = 0; i < stt.datos.length; i+=1) {
        if(stt.datos[i].DetalleEstatus !== 13 && stt.datos[i].InformacionEnvioInputFile && estatus === 200){
          const {
            status : stat,
            data : file,
          } = yield call(postUploadFile,
            yield select((state) => state.getIn(
              [
                'pedidos', 
                'pedidosTabla', 
                'pedidoDetalle', 
                'datos', 
                i, 
                'InformacionEnvioInputFile',
              ]
            )))
          if(stat === 200){
            datos.detalle[i].InformacionEnvioInputFile = file[0].url;
          } else {
            estatus = 400;
          }
        }
      }
      // if(stt.cotizacionesEliminadas.length){
      //   for (let i = 0; i < stt.cotizacionesEliminadas.length; i+=1) {
      //     datos.cotizaciones.push({
      //       IdCotizacion: stt.cotizacionesEliminadas[i].IdCotizacion,
      //       idMongo : '',
      //       url: '',
      //       nombreArchivo: '',
      //     })
      //     yield call(deleteUploadFile, stt.cotizacionesEliminadas[i].IdMongo)
      //   }
      // }

      if(files.size > 0){
        const arregloFiles = new FormData();
        arregloFiles.append('refId', 'cotizaciones');
        for (let j = 0; j < files.size; j+=1) {
          const file = yield select((state) => state
            .getIn(
              ['pedidos', 'pedidosTabla', 'pedidoDetalle', 'cotizaciones', j]
            ));
          if(file.name)
            arregloFiles.append('files', file, file.name);
        }
        
        const {
          status : estatusDos,
          data : file,
        } = yield call(postUploadFile, arregloFiles)
        if(estatusDos === 200){
          for (let k = 0; k < file.length; k+=1) {
            datos.cotizaciones.push(
              {
                url : file[k].url,
                idMongo : file[k].id,
                IdCotizacion : null,
                nombreArchivo : file[k].name,
              },
            );
          }
        }
      }
      const {
        status,
        data = [],
      } = yield call(postAutorizarPedido, datos);
      if(status === 200){
        if(stt.paginaActual === stt.totalPaginas){
          yield put(
            enqueueSnackbar({
              message: data.message,
              options: {
                variant: 'success',
              },
            })
          );
          yield put(
            Actions.get('GET_PEDIDOS').fn()
          )
        } else {
          const action = {
            idPedido : stt.ids[stt.paginaActual],
            pagina : stt.paginaActual + 1,
          };
          yield put(
            enqueueSnackbar({
              message: data.message,
              options: {
                variant: 'success',
              },
            })
          );
          yield call (getPedidoDetalleAction, action)
        }
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
    console.log(error);
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al autorizar el pedido',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

// Hace un llamado a la funtion getPedidoDetalle y le manda el primer id
export function* autorizarMultipleAction(act) {
  try {
    const action = {
      idPedido: act.ids[0],
    };
    yield call(getPedidoDetalleAction, action)
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener el detalle',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

// Descarga el archivo de evidencia de envio ya sea del servidor o local
export function* downloadFileAction(act) {
  try {
    let url = '';
    let band = true;
    if(typeof act.url === 'object'){
      const data = yield select((state) => state
        .getIn(
          ['pedidos', 'pedidosTabla', 'pedidoDetalle', 'datos', act.id, 'File']
        ));

      url = window.URL.createObjectURL(new Blob([data]));
    } else {
      const {
        status,
        data,
      } = yield call (getDownloadedFile, act.url);
      if(status === 200){
        url = window.URL.createObjectURL(new Blob([data]));
        // eslint-disable-next-line no-useless-escape
        const ext = act.url.split(/\#|\?/)[0].split('.').pop().trim();
        act.name += `.${ext}`;
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
    }
    if(band){
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', act.name);
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
    console.log(error)

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

// Descarga el archivo de recepcion ya sea del servidor o local
export function* downloadFileRecepcionAction(act) {
  try {
    let url = '';
    let band = true;
    
    if(typeof act.url === 'object'){
      const data = yield select((state) => state
        .getIn(
          ['pedidos', 'pedidosTabla', 'pedidoDetalle', 'datos', act.id, 'FileRecepcion']
        ));
      url = window.URL.createObjectURL(new Blob([data]));
    } else {
      const {
        status,
        data,
      } = yield call (getDownloadedFile, act.url);
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
    }
    if(band){
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', act.name);
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

// Descarga la cotizacion subida ya sea del servidor o local
export function* downloadCotizacionAction(act) {
  try {
    let url = '';
    let band = true;
    if(!act.url){
      const data = yield select((state) => state
        .getIn(
          ['pedidos', 'pedidosTabla', 'pedidoDetalle', 'cotizaciones', act.id]
        ));
      url = window.URL.createObjectURL(new Blob([data]));
    } else {
      const {
        status,
        data,
      } = yield call (getDownloadedFile, act.url);
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
    }
    if(band){
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', act.name);
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

export default function* pedidosSaga() {
  yield [
    takeLatest(
      GET_PEDIDOS,
      getPedidosAction
    ),
    takeLatest(
      GET_PLAZAS,
      getPlazasAction,
    ),
    takeLatest(
      GET_ESTATUS,
      getEstatusAction,
    ),
    takeLatest(
      GET_PEDIDO_DETALLE,
      getPedidoDetalleAction,
    ),
    takeLatest(
      AUTORIZAR_PEDIDO,
      postAutorizarPedidoAction, 
    ),
    takeLatest(
      AUTORIZAR_MULTIPLE,
      autorizarMultipleAction,
    ),
    takeLatest(
      DOWNLOAD_FILE,
      downloadFileAction,
    ),
    takeLatest(
      DOWNLOAD_FILE_RECEPCION,
      downloadFileRecepcionAction,
    ),
    takeLatest(
      DOWNLOAD_COTIZACION,
      downloadCotizacionAction,
    ),
    takeLatest(
      RECIBIR_PEDIDO,
      postRecibirPedidoAction,
    ),
    takeLatest(
      ON_CLICK_SIGUIENTE,
      onClickSiguienteAction,
    ),
  ]
}
