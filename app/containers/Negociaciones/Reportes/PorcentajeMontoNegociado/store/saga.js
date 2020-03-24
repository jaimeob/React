// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { takeLatest, call, put } from 'redux-saga/effects';
import { enqueueSnackbar } from 'reducers/notifications/actions';

import ActionsSpinner from 'components/Spinner/store/actions'

import { 
  getPlazas,
  getFamilys,
  getNegotiatedAmount,
} from './api'
import Actions from './actions';

const {
  SET_PLAZAS,
  SET_FAMILYS,
  SET_NEGOTIATED_AMOUNT,
} = Actions.getConstants();

const {
  CHANGE_SPINNER, 
} = ActionsSpinner.getConstants();

export function* ObtenerPlazas(action){
  const {
    IdPlaza,
  } =  action;
  const {
    status,
    data = [],
  } = yield call(getPlazas, IdPlaza)
  if (status === 200) {
    yield put({
      type: SET_PLAZAS,
      data,
    });
  }
}

export function* ObtenerMontoNegociado(action){
  const {
    PlazaId,
    FamiliaId,
  } =  action;
  yield put({
    type: CHANGE_SPINNER,
    status: true,
  });

  const {
    status,
    data = [],
  } = yield call(getNegotiatedAmount, PlazaId, FamiliaId)
  yield put({
    type: CHANGE_SPINNER,
    status: false,
  });
  if (status === 200) {
    yield put({
      type: SET_NEGOTIATED_AMOUNT,
      data,
    });
  }
}

export function* ObtenerFamilias(action){
  const {
    state = '',
  } =  action;
  const {
    data: {
      data,
      message,
    },
    status,
  } = yield call(getFamilys, state)
  if (status === 200) {
    yield put({
      type: SET_FAMILYS,
      data,
    });
  } else {
    yield put(
      enqueueSnackbar({ 
        message, 
        options: { 
          variant: 'error', 
        }, 
      })) 
  }
}
export default function* negociacionesSaga() {
  yield [
    takeLatest('NEGOCIACIONES/REPORTES/PORCENTAJEMONTONEGOCIADO/GET_PLAZAS_ACTION', ObtenerPlazas),
    takeLatest('NEGOCIACIONES/REPORTES/PORCENTAJEMONTONEGOCIADO/GET_FAMILYS_ACTION', ObtenerFamilias),
    takeLatest('NEGOCIACIONES/REPORTES/PORCENTAJEMONTONEGOCIADO/GET_NEGOTIATED_AMOUNT_ACTION', ObtenerMontoNegociado),
  ]
}
