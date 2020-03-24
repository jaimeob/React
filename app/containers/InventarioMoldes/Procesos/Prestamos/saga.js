/* eslint-disable object-shorthand */
import { takeLatest, call, put, select} from 'redux-saga/effects';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';

import Actions from './actions';
import { obtenerPermisos } from '../../../../services/api';

import {
  getPrestamos,
  getPlazas,
  getAlmacenes,
  getAlmacenesPlaza,
  getMoldesAlmacenes,
  getInsumos,
  postPrestamos,
  getPrestamoDetalle,
  devolverPrestamo,
  getExistencia,
} from './api';

export const {
  GET_DATOS_GENERALES,
  GET_PRESTAMO_DETALLE,
  SET_SNACKBAR,
  POST_PRESTAMOS,
  DEVOLVER_PRESTAMO,
  OBTENER_PERMISOS,
} = Actions.getConstants();
// Individual exports for testing

export function* obtenerPermisosAction(){
  const paramsPermisos = yield select((state) => state.getIn(['global','paramsPermisos']).toJS());
  // const paramsPermisos = {
  //   idModulo: 2240,
  //   funcionId: 2492,
  //   idRolEmpresa: 1250,
  // }
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

export function* getDatosGeneralesAction() {
  try {
    const global = yield select((state) => state.getIn(['global']).toJS());

    const datos = {
      usuarioId : global.currentUser.UsuarioId,
      idPlaza : null,
    }
    
    const prestamos = yield call(getPrestamos);
    const plazas = yield call(getPlazas, datos);
    const almacenes = yield call(getAlmacenes, datos);
    const almacenesPlaza = yield call(getAlmacenesPlaza);
    const moldesAlmacenes = yield call(getMoldesAlmacenes);
    const insumos = yield call(getInsumos);
    const datosGenerales = {
      prestamos: prestamos.data,
      plazas: plazas.data,
      almacenes: almacenes.data,
      insumos: insumos.data.filter(insumo => insumo.Estatus !== 'REFPRE'),
      almacenesPlaza: almacenesPlaza.data,
      moldesAlmacenes: moldesAlmacenes.data,
    }
    
    if(prestamos.status === 200){
      yield put(
        Actions.get('SET_DATOS_GENERALES').fn(datosGenerales)
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener los prestamos',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* setSnackBarAction(action) {
  switch (action.snack) {
    case 1:
      yield put(
        enqueueSnackbar({
          message: 'No es posible combinar piezas con accesorios',
          options: {
            variant: 'warning',
          },
        })
      );
      yield put(
        Actions.get('CLEAR_SNACKBAR').fn()
      );
      break;
    case 2:
      yield put(
        enqueueSnackbar({
          message: 'La pieza origen ya se encuentra registrada',
          options: {
            variant: 'warning',
          },
        })
      );
      yield put(
        Actions.get('CLEAR_SNACKBAR').fn()
      );
      break;
    case 3:
      yield put(
        enqueueSnackbar({
          message: 'La pieza destino ya se encuentra registrada',
          options: {
            variant: 'warning',
          },
        })
      );
      yield put(
        Actions.get('CLEAR_SNACKBAR').fn()
      );
      break;
    case 4:
      yield put(
        enqueueSnackbar({
          message: 'Registro actualizado correctamente',
          options: {
            variant: 'success',
          },
        })
      );
      yield put(
        Actions.get('CLEAR_SNACKBAR').fn()
      );
      break;
    case 5:
      yield put(
        enqueueSnackbar({
          message: 'Registro eliminado correctamente',
          options: {
            variant: 'success',
          },
        })
      );
      yield put(
        Actions.get('CLEAR_SNACKBAR').fn()
      );
      break;
    default:
      break;
  }
  
  
}

export function* getPrestamoDetalleAction(action) {
  try {
    const {
      status,
      data = [],
    } = yield call(getPrestamoDetalle, action.idPrestamo);

    const plazas = yield select((state) => state.getIn(['prestamo', 'prestamoTabla', 'nuevoPrestamo', 'combos', 'plazas']).toJS());
    const almacenes = yield select((state) => state.getIn(['prestamo', 'prestamoTabla', 'almacenes']).toJS());
    const moldesAlmacenes = yield select((state) => state.getIn(['prestamo', 'prestamoTabla', 'moldesAlmacenes']).toJS());
    const filterPrestamos = data[1].filter(registro => registro.ReferenciaO === 'ALMIDMALM' && registro.ReferenciaD === 'ALMIDMALM')
    

    filterPrestamos.forEach(registro => {
      const cantAlm = data[1].filter(registro2 => registro.CodigoOrigen === registro2.CodigoOrigen && registro.CodigoDestino === registro2.CodigoDestino && registro2.ReferenciaO === 'ALMIDMALM' && registro2.ReferenciaD === 'ALMIDMALM')[0];
      const cantObr = data[1].filter(registro2 => registro.CodigoOrigen === registro2.CodigoOrigen && registro.CodigoDestino === registro2.CodigoDestino && registro2.ReferenciaO === 'ALMIDMALM' && registro2.ReferenciaD === 'ALMIDMOBR')[0];      
      registro.CantAlm = cantAlm ? cantAlm.ExistenciaDest : 0;
      registro.CantObr = cantObr ? cantObr.ExistenciaDest : 0;
      registro.ExistenciaTotal = (cantAlm ? cantAlm.ExistenciaDest : 0) + (cantObr ? cantObr.ExistenciaDest : 0);
    });

    const nuevoPrestamo = {
      campos: {
        descripcion: {
          valor: data[0][0].Descripcion,
          campoValido: false,
          disabled: false,
        },
        plaza: {
          valor: data[0][0].IdPlaza,
          campoValido: false,
          disabled: false,
        },
        almacen: {
          valor: data[0][0].IdAlmacen,
          campoValido: false,
          disabled: true,
        },
        moldeOrigen: {
          valor: data[0][0].IdMoldeOrigen,
          campoValido: false,
          disabled: true,
        },
        moldeDestino: {
          valor: data[0][0].IdMoldeDestino,
          campoValido: false,
          disabled: true,
        },
        piezaOrigen: {
          valor: '',
          campoValido: false,
          disabled: true,
        },
        piezaDestino: {
          valor: '',
          campoValido: false,
          disabled: true,
        },
      },
      combos: {
        plazas: plazas,
        almacenes: almacenes,
        moldesOrigen: moldesAlmacenes,
        moldesDestino: moldesAlmacenes,
        piezasOrigen: [],
        piezasDestino: [],
      },
      tablas: {
        prestamos:{
          seleccionados: [],
          datos: filterPrestamos,
        },
      },
    }

    if(status === 200){
      yield put(
        Actions.get('SET_PRESTAMO_DETALLE').fn(nuevoPrestamo)
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

export function* devolverPrestamoAction(action) {
  try {
    const nuevoPrestamo = yield select((state) => state.getIn(['prestamo', 'prestamoTabla', 'nuevoPrestamo']).toJS());
    const registro = nuevoPrestamo.tablas.prestamos.datos.filter(pd => pd.IdPrestamoDetalle === action.idPrestamoDetalle)[0]
    
    if(registro.Estatus === 'Devuelto') {
      yield put(
        enqueueSnackbar({
          message: 'Devolución realizada',
          options: {
            variant: 'warning',
          },
        })
      );
    } else {
      const existencia = {
        CodigoOrigen: registro.CodigoDestino,
        IdMoldeOrigen: nuevoPrestamo.campos.moldeDestino.valor,
        CodigoDestino: registro.CodigoOrigen,
        IdMoldeDestino: nuevoPrestamo.campos.moldeOrigen.valor,
        IdPlaza: nuevoPrestamo.campos.plaza.valor,
        IdInventario: nuevoPrestamo.campos.almacen.valor,
      }
      
      const {
        status,
        data
      } = yield call(getExistencia, existencia);

      // eslint-disable-next-line no-lonely-if
      if(data[0][0].Cantidad === 0 && (data[0][0].Cantidad === 0 || data[1].length === 0)) {
        yield put(
          enqueueSnackbar({
            message: 'Esta pieza ya no existe en inventario, no es posible realizar la devolución',
            options: {
              variant: 'warning',
            },
          })
        );
      } else {
        
        let existenciaDestino = 0
        if(data[3].length > 0) {
          existenciaDestino = data[2][0].Cantidad + data[3][0].Cantidad
        } else {
          existenciaDestino = data[2][0].Cantidad
        }

        if(existenciaDestino < registro.CantidadMaxDest){
          let bandera = 1 
          if(registro.ExistenciaTotal > 0 && registro.ExistenciaTotal < registro.CantPrestada){
            bandera = 2
          }

          let monto = 0;
          if((registro.CantPrestada + registro.Existencia) > registro.CantidadMax) {
            monto = registro.CantidadMax - registro.Existencia
          } else {
            monto = registro.CantPrestada
          }

          const datos = {
            IdPrestamoDetalle : action.idPrestamoDetalle,
            IdMoldeOrigen : nuevoPrestamo.campos.moldeOrigen.valor,
            IdMoldeDestino : nuevoPrestamo.campos.moldeDestino.valor,
            IdPlaza : nuevoPrestamo.campos.plaza.valor,
            IdAlmacen : nuevoPrestamo.campos.almacen.valor,
            Monto : monto,
            CantAlm: registro.CantAlm,
            CantObr: registro.CantObr,
            ExistenciaTotal: registro.ExistenciaTotal,
            Bandera : bandera,
          }

          const {
            status,
          } = yield call(devolverPrestamo, datos);
          
          if(status === 200){
            yield put(
              Actions.get('GET_PRESTAMO_DETALLE').fn(registro.IdPrestamo)
            );
            yield put(
              Actions.get('CLOSE_MODAL').fn()
            );
            yield put(
              enqueueSnackbar({
                message: 'El prestamo fue devuelto con éxito',
                options: {
                  variant: 'success',
                },
              })
            );
          } else {
            yield put(
              enqueueSnackbar({
                message: "Hubo un error al devolver el prestamo",
                options: {
                  variant: 'error',
                },
              })
            );
          }
        } else {
          yield put(
            enqueueSnackbar({
              message: "La pieza seleccionada ya existe en el molde origen, no es posible ser devuelta.",
              options: {
                variant: 'warning',
              },
            })
          );
        }

        
      }
    }

  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al devolver el prestamo',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* postPrestamosAction() {
  try {
    const nuevoPrestamo = yield select((state) => state.getIn(['prestamo', 'prestamoTabla', 'nuevoPrestamo']).toJS());
    const {
      status,
    } = yield call(postPrestamos, nuevoPrestamo);
    if(status === 200){
      yield put(
        Actions.get('REGRESAR').fn()
      );
      yield put(
        Actions.get('CLOSE_MODAL').fn()
      );
      yield put(
        Actions.get('GET_DATOS_GENERALES').fn()
      );
      yield put(
        enqueueSnackbar({
          message: 'El prestamo se realizo correctamente',
          options: {
            variant: 'success',
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

// Individual exports for testing
export default function* transformacionSaga() {
  yield[
    takeLatest(
      OBTENER_PERMISOS,
      obtenerPermisosAction
    ),
    takeLatest(
      GET_DATOS_GENERALES,
      getDatosGeneralesAction
    ),
    takeLatest(
      GET_PRESTAMO_DETALLE,
      getPrestamoDetalleAction
    ),
    takeLatest(
      SET_SNACKBAR,
      setSnackBarAction
    ),
    takeLatest(
      POST_PRESTAMOS,
      postPrestamosAction
    ),
    takeLatest(
      DEVOLVER_PRESTAMO,
      devolverPrestamoAction
    ),
  ]
}