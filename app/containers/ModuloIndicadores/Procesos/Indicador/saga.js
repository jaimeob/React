import { takeLatest, call, put, select } from 'redux-saga/effects';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';
import ActionsSpinner from 'components/Spinner/store/actions'
import Actions from './actions';

import {
  getIndicadores,
  getHistorial,
  getDownloadDetalle,
  postAutorizarResultado,
  getPuestosUsuariosIndicadores,
} from './api';

export const {
  GET_INDICADORES,
  GET_HISTORIAL,
  ON_CLICK_AUTORIZAR,
  ON_CLICK_DESCARGAR_DETALLE,
  GET_PUESTOS_USUARIOS_INDICADORES,
} = Actions.getConstants();

const {
  CHANGE_SPINNER, 
} = ActionsSpinner.getConstants();

export function* getIndicadoresSaga(action) {
  try {
    yield put({
      type: CHANGE_SPINNER,
      status: true,
    });
    
    const datos = yield select(state => state.getIn(['indicador', 'historial', 'datos', action.indice]).toJS()) 

    const {
      status,
      data = [],
    } = yield call(getIndicadores, datos.PeriodoId, datos.UsuarioId);

    if(status === 200){
      yield put(
        Actions.get('SET_INDICADORES').fn(data, datos.Entregado, datos.UsuarioId, datos.PeriodoId)
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
    yield put({
      type: CHANGE_SPINNER,
      status: false,
    });
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener los indicadores del usuario',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getHistorialSaga(){
  try {
    yield put({
      type: CHANGE_SPINNER,
      status: true,
    });
    
    const idUsuario = yield select(state => state.getIn(['global', 'currentUser', 'UsuarioId'])) 

    const {
      status,
      data = [],
    } = yield call(getHistorial, idUsuario);

    yield put({
      type: CHANGE_SPINNER,
      status: false,
    });

    if(status === 200){
      yield put(
        Actions.get('SET_HISTORIAL').fn(data, idUsuario)
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
        message: 'Hubo un error al obtener los indicadores del usuario',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* onClickAutorizarSaga(){
  try {
    yield put({
      type: CHANGE_SPINNER,
      status: true,
    });

    const principal = yield select(state => state.getIn(['indicador', 'principales']).toJS()) 
    const datos = {
      idUsuario: principal.idUsuario,
      idPeriodo: principal.idPeriodo,
    }
    const idUsuario = yield select(state => state.getIn(['global', 'currentUser', 'UsuarioId'])) 

    const {
      status,
      data,
    } = yield call(postAutorizarResultado, datos);
    if(status === 200){
      yield put(
        enqueueSnackbar({
          message: data[0].Mensaje,
          options: {
            variant: data[0].Error ? 'error' : 'success',
          },
        })
      );
      const {
        status: status2,
        data: data2,
      } = yield call(getHistorial, idUsuario);
  
      if(status2 === 200){
        yield put(
          Actions.get('SET_HISTORIAL').fn(data2, idUsuario)
        );
      } else {
        yield put(
          enqueueSnackbar({
            message: data[0].Mensaje,
            options: {
              variant: 'error',
            },
          })
        );
      }
      
      yield put({
        type: CHANGE_SPINNER,
        status: false,
      });
    } else {
      yield put(
        enqueueSnackbar({
          message: data[0].Mensaje,
          options: {
            variant: 'error',
          },
        })
      );
    }
    
  } catch (error) {
    console.log(error);
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al autorizar',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* onClickDescargarDetalleSaga(action){
  try {
    yield put({
      type: CHANGE_SPINNER,
      status: true,
    });

    const {
      status,
      data = [],
    } = yield call(getDownloadDetalle, action.idBitacoraCambio);
    
    if(status === 200){
      const blob = new Blob([data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'EvidenciaCambioIndicador.zip');


      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } else {
      yield put(
        enqueueSnackbar({
          message: 'Hubo un error al descargar la evidencia',
          options: {
            variant: 'error',
          },
        })
      );
    }
    yield put({
      type: CHANGE_SPINNER,
      status: false,
    });
  } catch (error) {
    console.log(error);
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al descargar la evidencia',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* onClickObtenerPuestosUsuariosIndicadores(){
  try {
    yield put({
      type: CHANGE_SPINNER,
      status: true,
    });

    const {
      status,
      data = [],
    } = yield call(getPuestosUsuariosIndicadores);

    if(status === 200){
      yield put(
        Actions.get('SET_PUESTOS_USUARIOS_INDICADORES').fn(data)
      );
    } else {
      yield put(
        enqueueSnackbar({
          message: 'Hubo un error al descargar el archivo',
          options: {
            variant: 'error',
          },
        })
      );
    }
    yield put({
      type: CHANGE_SPINNER,
      status: false,
    });
  } catch (error) {
    console.log(error);
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

export default function* indicadorSaga() {
  yield [
    takeLatest(
      GET_INDICADORES,
      getIndicadoresSaga
    ),
    takeLatest(
      GET_HISTORIAL,
      getHistorialSaga,
    ),
    takeLatest(
      ON_CLICK_AUTORIZAR,
      onClickAutorizarSaga,
    ),
    takeLatest(
      ON_CLICK_DESCARGAR_DETALLE,
      onClickDescargarDetalleSaga,
    ),
    takeLatest(
      GET_PUESTOS_USUARIOS_INDICADORES,
      onClickObtenerPuestosUsuariosIndicadores,
    ),
  ]
}
