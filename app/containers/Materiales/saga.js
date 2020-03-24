import { takeLatest, call, put, select} from 'redux-saga/effects';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';
import { isNull } from 'util';
import Actions from './actions';
import { obtenerPermisos } from '../../services/api';

import {
  getMateriales,
  getAgrupadores,
  postMateriales,
  deleteMaterial,
  getMaterialDetalle,
  actualizarMaterial,
  getExistencia,
} from './api';

export const {
  GET_MATERIALES,
  GET_AGRUPADORES,
  POST_MATERIALES,
  DELETE_MATERIAL,
  GET_MATERIAL_DETALLE,
  ACTUALIZAR_MATERIAL,
  OBTENER_PERMISOS,
} = Actions.getConstants();
// Individual exports for testing
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

export function* getMaterialesAction() {
  try {
    const {
      status,
      data = [],
    } = yield call(getMateriales);

    for (let i = 0; i < data.length; i+=1) {
      const existencia = yield call(getExistencia, data[i].IdArticulo);

      if(existencia.data.length > 0) {
        data[i].ExistencialActual = existencia.data[0].Existencia
      } else {
        data[i].ExistencialActual = 0
      }

      if(isNull(existencia.data[0].CantidadAutorizada)) {
        data[i].CantidadAutorizada = 0;
      } else {
        data[i].CantidadAutorizada = existencia.data[0].CantidadAutorizada;
      }

      if(isNull(existencia.data[0].CantidadSolicitada)) {
        data[i].CantidadSolicitada = 0;
      } else {
        data[i].CantidadSolicitada = existencia.data[0].CantidadSolicitada;
      }

      data[i].Precio = `$ ${data[i].Precio.toFixed(2)}`
    }
    
    if(status === 200 && data.length > 0){
      yield put(
        Actions.get('SET_MATERIALES').fn(data)
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener los Materiales',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getAgrupadoresAction() {
  try {
    const {
      status,
      data = [],
    } = yield call(getAgrupadores);
    
    if(status === 200 && data.length > 0){
      yield put(
        Actions.get('SET_AGRUPADORES').fn(data)
      );
    } else {
      yield put(
        enqueueSnackbar({
          message: "Hubo un error al obtener los Agrupadores",
          options: {
            variant: 'error',
          },
        })
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener los Agrupadores',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getMaterialDetalleAction(action) {
  try {
    const {
      status,
      data = [],
    } = yield call(getMaterialDetalle, action.idArticulo);
    if(status === 200 && data.length > 0){
      yield put(
        Actions.get('SET_MATERIAL_DETALLE').fn(data)
      );
    } else {
      yield put(
        enqueueSnackbar({
          message: "Hubo un error al obtener los Materiales",
          options: {
            variant: 'error',
          },
        })
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener los Materiales',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* deleteMaterialAction(action) {
  try {
    const materiales = yield call(getMateriales);
    const articulo = materiales.data.filter((word) => word.IdArticulo === action.idArticulo);

    const existencia = yield call(getExistencia, articulo[0].IdArticulo);

    if(existencia.data.length > 0) {
      articulo[0].ExistencialActual = existencia.data[0].Existencia
    } else {
      articulo[0].ExistencialActual = 0
    }

    if(isNull(existencia.data[0].CantidadAutorizada)) {
      articulo[0].CantidadAutorizada = 0;
    } else {
      articulo[0].CantidadAutorizada = existencia.data[0].CantidadAutorizada;
    }

    if(isNull(existencia.data[0].CantidadSolicitada)) {
      articulo[0].CantidadSolicitada = 0;
    } else {
      articulo[0].CantidadSolicitada = existencia.data[0].CantidadSolicitada;
    }

    if (articulo[0].ExistencialActual !== 0 ||  articulo[0].CantidadSolicitada !== 0 || articulo[0].CantidadAutorizada !== 0 ){
      yield put(
        enqueueSnackbar({
          message: 'El material se encuentra en inventario y/o movimiento',
          options: {
            variant: 'warning',
          },
        })
      );
      yield put(
        Actions.get('CLOSE_MODAL').fn()
      )
    } else {
      const {
        status,
      } = yield call(deleteMaterial, action.idArticulo);
      
      if(status === 200){
        yield put(
          Actions.get('CLOSE_MODAL').fn()
        );
        yield put(
          Actions.get('GET_MATERIALES').fn()
        );
        yield put(
          enqueueSnackbar({
            message: 'El material fue eliminado con éxito',
            options: {
              variant: 'success',
            },
          })
        );
      } else {
        yield put(
          enqueueSnackbar({
            message: "Hubo un error al eliminar el material",
            options: {
              variant: 'error',
            },
          })
        );
      }
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al eliminar el material',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* postMaterialesAction(){
  try{

    const materialNuevo = yield select((state) => state.getIn(['materiales','materialesTabla', 'materialNuevo']).toJS());
    // eslint-disable-next-line prefer-destructuring
    const idAgrupador = materialNuevo.idAgrupador.value;
    const nombre = materialNuevo.nombre.value;
    const precio = materialNuevo.precio.value;
    const stockMinimo = parseInt(materialNuevo.stockMinimo.value, 10);
    const stockMaximo = parseInt(materialNuevo.stockMaximo.value, 10);
    
    // eslint-disable-next-line no-restricted-globals
    if(idAgrupador.length === 0 || nombre.length === 0 || precio.length === 0 || isNaN(precio) || isNaN(stockMinimo) || isNaN(stockMaximo)) {
      
      if(idAgrupador.length === 0) {
        yield put (
          Actions.get('SET_ERROR_AGRUPADOR').fn()
        );
      }

      if(nombre.length === 0) {
        yield put (
          Actions.get('SET_ERROR_NOMBRE').fn()
        );
      }

      // eslint-disable-next-line no-restricted-globals
      if(precio.length === 0 || isNaN(precio)) {
        yield put (
          Actions.get('SET_ERROR_PRECIO').fn()
        );
      }

      // eslint-disable-next-line no-restricted-globals
      if(isNaN(stockMinimo)) {
        yield put (
          Actions.get('SET_ERROR_STOCK_MINIMO').fn()
        );
      }

      // eslint-disable-next-line no-restricted-globals
      if(isNaN(stockMaximo)) {
        yield put (
          Actions.get('SET_ERROR_STOCK_MAXIMO').fn()
        );
      }

      yield put(
        enqueueSnackbar({
          message: 'Existen datos obligatorios en blanco, favor de ingresarlos.',
          options: {
            variant: 'warning',
          },
        })
      );
    } else {
      // eslint-disable-next-line no-lonely-if
      if(stockMinimo >= stockMaximo){
        yield put(
          enqueueSnackbar({
            message: 'El stock máximo no puede ser menor o igual al stock mínimo',
            options: {
              variant: 'warning',
            },
          })
        );
      } else {
        const {
          status,
        } = yield call (postMateriales, materialNuevo);
        
        if (status === 200) {
          yield put (
            Actions.get('REGRESAR').fn()
          );
          yield put(
            Actions.get('GET_MATERIALES').fn()
          );
          yield put(
            enqueueSnackbar({
              message: 'El artículo se ha guardado correctamente.',
              options: {
                variant: 'success',
              },
            })
          );
        } else {
          yield put(
            enqueueSnackbar({
              message: "Hubo un error al guardar el artículo",
              options: {
                variant: 'error',
              },
            })
          );
        }
      }
    }

  } catch( err ) {
    yield put(
      enqueueSnackbar({
        message: "Hubo un error al guardar el artículo",
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* actualizarMaterialAction(){
  try{
    const materialNuevo = yield select((state) => state.getIn(['materiales','materialesTabla', 'materialNuevo']).toJS());
    // eslint-disable-next-line prefer-destructuring
    const idAgrupador = materialNuevo.idAgrupador;
    const nombre = materialNuevo.nombre.value;
    const precio = materialNuevo.precio.value;
    const stockMinimo = parseInt(materialNuevo.stockMinimo.value, 10);
    const stockMaximo = parseInt(materialNuevo.stockMaximo.value, 10);

    // eslint-disable-next-line no-restricted-globals
    if(idAgrupador.length === 0 || nombre.length === 0 || precio.length === 0 || isNaN(precio) || isNaN(stockMinimo) || isNaN(stockMaximo)) {
      if(idAgrupador.length === 0) {
        yield put (
          Actions.get('SET_ERROR_AGRUPADOR').fn()
        );
      }

      if(nombre.length === 0) {
        yield put (
          Actions.get('SET_ERROR_NOMBRE').fn()
        );
      }

      // eslint-disable-next-line no-restricted-globals
      if(precio.length === 0 || isNaN(precio)) {
        yield put (
          Actions.get('SET_ERROR_PRECIO').fn()
        );
      }

      // eslint-disable-next-line no-restricted-globals
      if(isNaN(stockMinimo)) {
        yield put (
          Actions.get('SET_ERROR_STOCK_MINIMO').fn()
        );
      }

      // eslint-disable-next-line no-restricted-globals
      if(isNaN(stockMaximo)) {
        yield put (
          Actions.get('SET_ERROR_STOCK_MAXIMO').fn()
        );
      }

      yield put(
        enqueueSnackbar({
          message: 'Existen datos obligatorios en blanco, favor de ingresarlos.',
          options: {
            variant: 'warning',
          },
        })
      );
    } else {
      // eslint-disable-next-line no-lonely-if
      if(stockMinimo >= stockMaximo){
        yield put(
          enqueueSnackbar({
            message: 'El stock máximo no puede ser menor o igual al stock mínimo',
            options: {
              variant: 'warning',
            },
          })
        );
      } else {
        const {
          status,
        } = yield call (actualizarMaterial, materialNuevo);
        
        if (status === 200) {
          yield put (
            Actions.get('REGRESAR').fn()
          );
          yield put(
            Actions.get('GET_MATERIALES').fn()
          );
          yield put(
            enqueueSnackbar({
              message: 'El artículo se ha guardado correctamente.',
              options: {
                variant: 'success',
              },
            })
          );
        } else {
          yield put(
            enqueueSnackbar({
              message: "Hubo un error al guardar el artículo",
              options: {
                variant: 'error',
              },
            })
          );
        }
      }
    }

  } catch( err ) {
    yield put(
      enqueueSnackbar({
        message: "Hubo un error al guardar el artículo",
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export default function* materialesSaga() {
  yield [
    takeLatest(
      GET_MATERIALES,
      getMaterialesAction
    ),
    takeLatest(
      GET_AGRUPADORES,
      getAgrupadoresAction
    ),
    takeLatest(
      POST_MATERIALES,
      postMaterialesAction
    ),
    takeLatest(
      DELETE_MATERIAL,
      deleteMaterialAction
    ),
    takeLatest(
      GET_MATERIAL_DETALLE,
      getMaterialDetalleAction
    ),
    takeLatest(
      ACTUALIZAR_MATERIAL,
      actualizarMaterialAction
    ),
    takeLatest(
      OBTENER_PERMISOS,
      obtenerPermisosAction
    ),
  ]
}
