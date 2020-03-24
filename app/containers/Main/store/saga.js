import {
  takeLatest,
  call,
  put,
  // select,
} from 'redux-saga/effects';
import { isRequestOk } from 'utils/helpers';
import { noop } from 'redux-saga/utils';
// import {
//   REQUEST_ACTION_FAILED,
//   REQUEST_ACTION_SUCCESS,
// } from './constants';
// IMPLODASH

// import every from 'lodash/every';
// import isUndefined from 'lodash/isUndefined';

import Actions from './actions';

const {
  REQUEST_API,
  UPDATE_DATASOURCES,
  REQUEST_CONFIG_PROYECTO,
} = Actions.getConstants();

export function* requestApiSaga({ type, prop = '', fn = noop, args = [] }) {
  try {
    const rsp = yield call(fn, ...args);
    if (isRequestOk(rsp.status)) {
      yield put({
        type: UPDATE_DATASOURCES,
        requestAction: type,
        prop,
        response: rsp,
      })
    }
  } catch (error) {
    yield put({
      type: UPDATE_DATASOURCES,
      requestAction: type,
      error,
    })
  }
}

// export function* requestApiCall(action) {
//   const {
//     nombre = '',
//   } = action;
//   console.log(`Hola ${nombre} desde el sagas`);
//   try {
//     const {
//       data,
//       status,
//       request,
//       config,
//     } = yield call(requestFakeApi);
//     if (status === 200) {
//       yield put({
//         type: REQUEST_ACTION_SUCCESS,
//         data,
//         message: 'Datos obtenidos con éxito!',
//       })
//     } else {
//       yield put({
//         type: REQUEST_ACTION_FAILED,
//         data,
//         request,
//         config,
//         message: 'Valio todo!',
//       })
//     }
//   } catch (error) {
//     yield put({
//       type: REQUEST_ACTION_FAILED,
//       error,
//       message: 'Valio todo!',
//     })
//   }
// }


// Individual exports for testing
export default function* mainSaga() {
  // See example in containers/HomePage/saga.js
  yield [
    /* takeLatest(
      REQUEST_CONFIG_PROYECTO,
      requestProyectoSaga
    ), */
    takeLatest(
      REQUEST_API, 
      requestApiSaga
    ),
  ];
}
