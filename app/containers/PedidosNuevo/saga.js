import { takeLatest, call, put, select } from 'redux-saga/effects';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';
import Actions from './actions';

import {
  getMateriales,
  getAgrupadores,
  postPedido,
  getExistencia,
  getAllMateriales,
} from './api';

export const {
  GET_MATERIALES,
  GET_AGRUPADORES,
  POST_PEDIDOS,
  ADD_BY_ID,
  SET_ARTICULO,
  AGREGAR_ARTICULO,
  GET_PLAZA,
} = Actions.getConstants();
// Individual exports for testing

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

export function* getPlazaAction() {
  
  try {
    const usuario = yield select(state => state.getIn(['global', 'currentUser']).toJS())

    yield put(
      Actions.get('SET_PLAZA').fn(usuario)
    );
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

export function* agregarArticuloAction(action) {
  try {
    
    const rows = yield select((state) => state.getIn(
      [ 
        'pedidosNuevo',
        'pedidosNuevoTabla', 
        'pedido',
        'rows',
      ]
    ).toJS());
    // eslint-disable-next-line eqeqeq
    const filteredKeywords = rows.filter((word) => word.IdArticulo == action.row.IdArticulo);
    console.log(filteredKeywords.length)
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

export function* postPedidosAction(){
  try{
    const pedido = yield select((state) => state.getIn(
      [ 
        'pedidosNuevo',
        'pedidosNuevoTabla', 
        'pedido',
      ]
    ).toJS());
    const usuario = yield select(state => state.getIn(['global', 'currentUser']).toJS())
    pedido.IdUsuario = usuario.UsuarioId;
    pedido.IdPlaza = usuario.IdPlaza;
    pedido.Plaza = usuario.Plaza;
    pedido.Usuario = usuario.Nombre;

    // eslint-disable-next-line eqeqeq
    if(pedido.rows.length != 0) {
      const {
        status,
        // data = [],
      } = yield call (postPedido, pedido);

      if (status === 200) {
        yield put (
          Actions.get('SET_ROW_EMPTY').fn([])
        );
        yield put(
          enqueueSnackbar({
            message: "El pedido se genero con exito",
            options: {
              variant: 'success',
            },
          })
        );
      } else {
        yield put(
          enqueueSnackbar({
            message: "Hubo un error al general el pedido",
            options: {
              variant: 'error',
            },
          })
        );
      }
    } else {
      yield put(
        enqueueSnackbar({
          message: "Debe seleccionar al menos un articulo",
          options: {
            variant: 'warning',
          },
        })
      );
    }

  } catch( err ) {
    yield put(
      enqueueSnackbar({
        message: "Hubo un error al general el pedido",
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export default function* pedidosNuevoSaga() {
  yield [
    takeLatest(
      GET_MATERIALES,
      getMaterialesAction
    ),
    takeLatest(
      GET_PLAZA,
      getPlazaAction
    ),
    takeLatest(
      GET_AGRUPADORES,
      getAgrupadoresAction
    ),
    takeLatest(
      POST_PEDIDOS,
      postPedidosAction
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
