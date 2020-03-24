import { takeLatest, call, put, select } from 'redux-saga/effects';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';
import Actions from './actions';
import { obtenerPermisos } from '../../services/api';

import {
  getMateriales,
  getAgrupadores,
  postMovimiento,
  getMovimientos,
  getReportes,
  getMovimientoDetalle,
  getExistencia,
  getAllMateriales,
} from './api';

export const {
  GET_MATERIALES,
  GET_AGRUPADORES,
  POST_MOVIMIENTOS,
  GET_MOVIMIENTOS,
  GET_REPORTES,
  GET_MOVIMIENTO_DETALLE,
  ADD_BY_ID,
  SET_ARTICULO,
  CLEAR_MODAL,
  AGREGAR_ARTICULO,
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

export function* getMaterialesAction(action) {
  
  try {
    const idAgrupador = action.idAgrupador.target.value;
    const {
      status,
      data = [],
      agrupador = idAgrupador,
    } = yield call(getMateriales, idAgrupador);

    for (let i = 0; i < data.length; i+=1) {
      const {
        [i] :{
          IdArticulo,
        },
      } = data;
      const idPlaza = yield select(state => state.getIn(['global', 'currentUser', 'IdPlaza']))

      const existencia = yield call(getExistencia, IdArticulo, idPlaza);
      if(existencia.data.length > 0) {
        data[i].ExistencialActual = existencia.data[0].Existencia
      } else {
        data[i].ExistencialActual = 0
      }
      
    }
    
    if(status === 200 && data.length > 0){
      yield put(
        Actions.get('CLEAR_ID').fn(data, agrupador)
      );
      yield put(
        Actions.get('SET_MATERIALES').fn(data, agrupador)
      );
    } else {
      yield put(
        enqueueSnackbar({
          message: "No se encuentran artículos en este módulo",
          options: {
            variant: 'warning',
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

export function* setArticuloAction(action) {
  try {
    const {
      status,
      data = [],
    } = yield call(getAllMateriales);

    // eslint-disable-next-line eqeqeq
    const idPlaza = yield select(state => state.getIn(['global', 'currentUser', 'IdPlaza']))

    const articulo = data.filter((value) => value.IdArticulo == action.idArticulo);
    const materiales = yield call(getMateriales, articulo[0].IdAgrupador);
    const existencia = yield call(getExistencia, articulo[0].IdArticulo, idPlaza);
    if(existencia.data[0].CantidadAutorizada === null) {
      articulo[0].CantidadAutorizada = 0;
    } else {
      articulo[0].CantidadAutorizada = existencia.data[0].CantidadAutorizada
    }
    
    if(existencia.data[0].CantidadSolicitada === null) {
      articulo[0].CantidadSolicitada = 0;
    } else {
      articulo[0].CantidadSolicitada = existencia.data[0].CantidadSolicitada
    }

    if(existencia.data.length > 0) {
      articulo[0].ExistencialActual = existencia.data[0].Existencia;
    } else {
      articulo[0].ExistencialActual = 0
    }

    if(status === 200 && data.length > 0){
      yield put(
        Actions.get('CLEAR_MODAL').fn()
      );
      yield put(
        Actions.get('SET_ARTICULO_DETALLE').fn(articulo[0])
      );
      yield put(
        Actions.get('SET_MATERIALES').fn(materiales.data, articulo[0].IdAgrupador)
      );
    } else {
      yield put(
        enqueueSnackbar({
          message: "Artículo inexistente",
          options: {
            variant: 'error',
          },
        })
      );
    }
  } catch {
    yield put(
      enqueueSnackbar({
        message: 'Artículo inexistente',
        options: {
          variant: 'error',
        },
      })
    );
  }
  
}

export function* agregarArticuloAction(action) {
  try {
    const rows = yield select((state) => state.getIn(
      [ 
        'inventarioPlaza',
        'inventarioPlazaTabla', 
        'movimiento',
        'rows',
      ]
    ).toJS());
      
    // eslint-disable-next-line eqeqeq
    const filteredKeywords = rows.filter((word) => word.IdArticulo == action.row.IdArticulo);

    // eslint-disable-next-line eqeqeq
    if(filteredKeywords.length == 0){
      if (action.row.Cantidad > 0) {
        yield put(
          Actions.get('SET_ROW').fn(action.row)
        );
      } else {
        yield put(
          enqueueSnackbar({
            message: 'La cantidad debe ser mayor a 0',
            options: {
              variant: 'warning',
            },
          })
        );
      }
      
    } else {
      yield put(
        enqueueSnackbar({
          message: 'Artículo ya solicitado',
          options: {
            variant: 'warning',
          },
        })
      );
    }
    
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al agregar el artículo',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* addByIdAction(action) {
  try {
    const {
      status,
      data = [],
    } = yield call(getAllMateriales);

    // eslint-disable-next-line eqeqeq
    const idPlaza = yield select(state => state.getIn(['global', 'currentUser', 'IdPlaza']))
    const articulo = data.filter((value) => value.IdArticulo == action.id);
    const materiales = yield call(getMateriales, articulo[0].IdAgrupador);
    const existencia = yield call(getExistencia, articulo[0].IdArticulo, idPlaza);
    if(existencia.data[0].CantidadAutorizada === null) {
      articulo[0].CantidadAutorizada = 0;
    } else {
      articulo[0].CantidadAutorizada = existencia.data[0].CantidadAutorizada
    }
    
    if(existencia.data[0].CantidadSolicitada === null) {
      articulo[0].CantidadSolicitada = 0;
    } else {
      articulo[0].CantidadSolicitada = existencia.data[0].CantidadSolicitada
    }
    
    if(existencia.data.length > 0) {
      articulo[0].ExistencialActual = existencia.data[0].Existencia;
    } else {
      articulo[0].ExistencialActual = 0
    }

    if(status === 200 && data.length > 0){
      yield put(
        Actions.get('CLEAR_MODAL').fn()
      );
      yield put(
        Actions.get('SET_ARTICULO_DETALLE').fn(articulo[0])
      );
      yield put(
        Actions.get('SET_MATERIALES').fn(materiales.data, articulo[0].IdAgrupador)
      );
    } else {
      yield put(
        enqueueSnackbar({
          message: "Artículo inexistente",
          options: {
            variant: 'warning',
          },
        })
      );
    }
  } catch {
    yield put(
      enqueueSnackbar({
        message: 'Artículo inexistente',
        options: {
          variant: 'warning',
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
          message: "Hubo un error al obtener los agrupadores",
          options: {
            variant: 'error',
          },
        })
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener los agrupadores',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getReportesAction(action) {
  try {
    const {
      status,
      data = [],
    } = yield call(getReportes, action.idPlaza);

    for (let i = 0; i < data.length; i+=1) {
      data[i].Precio = `$ ${data[i].Precio.toFixed(2)}`
    }
    
    if(status === 200 && data.length > 0){
      yield put(
        Actions.get('SET_REPORTES').fn(data)
      );
    } else {
      yield put(
        enqueueSnackbar({
          message: "Hubo un error al obtener los Reportes",
          options: {
            variant: 'error',
          },
        })
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener los Reportes',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getMovimientosAction() {
  try {
    const {
      status,
      data = [],
    } = yield call(getMovimientos);

    const usuario = yield select(state => state.getIn(['global', 'currentUser']).toJS())

    let filter = []
    
    if(usuario.IdPlaza !== 9) {
      filter = data.filter(registro => registro.IdProceso === 8 && registro.IdPlaza === usuario.IdPlaza)
    } else {
      filter = data.filter(registro => registro.IdProceso === 8)
    }

    if(status === 200 && data.length > 0){
      yield put(
        Actions.get('SET_MOVIMIENTOS').fn(filter, usuario)
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener los movimientos',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* postMovimientosAction(){
  try{
    const movimiento = yield select((state) => state.getIn(
      [ 
        'inventarioPlaza',
        'inventarioPlazaTabla', 
        'movimiento',
      ]
    ).toJS());

    const global = yield select((state) => state.getIn(['global']).toJS());
    movimiento.IdUsuario = global.currentUser.UsuarioId

    const {
      status,
      // data = [],
    } = yield call (postMovimiento, movimiento );

    if (status === 200) {
      yield put (
        Actions.get('SET_ROW_EMPTY').fn([])
      );
      yield put (
        Actions.get('GET_MOVIMIENTOS').fn([])
      );
      yield put(
        enqueueSnackbar({
          message: "Movimiento realizado correctamente",
          options: {
            variant: 'success',
          },
        })
      );
    } else {
      yield put(
        enqueueSnackbar({
          message: "Hubo un error al guardar el movimiento",
          options: {
            variant: 'error',
          },
        })
      );
    }

  } catch( err ) {
    yield put(
      enqueueSnackbar({
        message: "Hubo un error al guardar el movimiento",
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getMovimientoDetalleAction(action) {
  try {
    const {
      status,
      data = [],
    } = yield call(getMovimientoDetalle, action.idMovimiento);

    if(status === 200 && data.length > 0){
      yield put(
        Actions.get('SET_MOVIMIENTO_DETALLE').fn(data)
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
        message: 'Hubo un error al obtener los Materiales',
        options: {
          variant: 'error',
        },
      })
    );
  }
}


export default function* inventarioPlazaSaga() {
  yield [
    takeLatest(
      OBTENER_PERMISOS,
      obtenerPermisosAction
    ),
    takeLatest(
      GET_MATERIALES,
      getMaterialesAction
    ),
    takeLatest(
      GET_AGRUPADORES,
      getAgrupadoresAction
    ),
    takeLatest(
      POST_MOVIMIENTOS,
      postMovimientosAction
    ),
    takeLatest(
      GET_MOVIMIENTOS,
      getMovimientosAction
    ),
    takeLatest(
      GET_REPORTES,
      getReportesAction
    ),
    takeLatest(
      GET_MOVIMIENTO_DETALLE,
      getMovimientoDetalleAction
    ),
    takeLatest(
      ADD_BY_ID,
      addByIdAction,
    ),
    takeLatest(
      SET_ARTICULO,
      setArticuloAction,
    ),
    takeLatest(
      AGREGAR_ARTICULO,
      agregarArticuloAction
    ),
  ]
}
