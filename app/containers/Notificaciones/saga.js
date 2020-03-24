// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { call, put, takeLatest } from 'redux-saga/effects';
import Actions from './actions';

import {
  cambiarEstatusNotificacionesApi,
} from './api';



export const {
  OBTENER_NOTIFICACIONES,
  CAMBIAR_NOTIFICACIONES,
} = Actions.getConstants();

const ACTION = (name = '') => Actions.get(name).id || '';


// export function* getNotificaciones(action) {
//   try {
//     const notificaciones = yield call(getNotificacionesApi,action.id)
//     yield put({
//       type: 'APP/CONTAINER/NOTIFICACIONES/SET_IMPRIME_NOTIFICACIONES', notificaciones,
//     });
//   } catch (err) {
//     yield put({
//       // type: ('APP/CONTAINER/CONFIGURACIONTICKETS/REQUEST_DEPARTAMENTOS_FAILED', err),
//     })
//   }
// }

export function* cambiarEstatusNotificaciones(datos) {
  try {
    yield call (cambiarEstatusNotificacionesApi,datos);
  } catch (err) {
    yield put({
      // type: ('APP/CONTAINER/CONFIGURACIONTICKETS/REQUEST_DEPARTAMENTOS_FAILED', err),
    })
  }
}

export default function* notificacionesSaga() {
  yield [
    takeLatest(ACTION('CAMBIAR_ESTATUS_NOTIFICACION'), cambiarEstatusNotificaciones),
  ]
}

