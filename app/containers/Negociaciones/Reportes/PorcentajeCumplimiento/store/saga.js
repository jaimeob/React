// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing

import { takeLatest, call, put } from 'redux-saga/effects';
import { enqueueSnackbar } from 'reducers/notifications/actions';

import ActionsSpinner from 'components/Spinner/store/actions'

import { 
  getCompliancePercentage,
  getPlazas,
} from './api'
import Actions from './actions';

const {
  SET_COMPLIANCE_PERCENTAGE,
  SET_PLAZAS,
} = Actions.getConstants();

const {
  CHANGE_SPINNER, 
} = ActionsSpinner.getConstants();

export function* ObtenerPorcentajeCumplimiento(action){
  const {
    IdPlaza, 
    InitialDate, 
    FinalDate,
  } =  action;
  yield put({
    type: CHANGE_SPINNER,
    status: true,
  });
  const {
    status,
    data = {},
    message,
  } = yield call(getCompliancePercentage, IdPlaza, InitialDate, FinalDate)
  yield put({
    type: CHANGE_SPINNER,
    status: false,
  });
  if (status === 200) {
    yield put({
      type: SET_COMPLIANCE_PERCENTAGE,
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
export default function* porcentajeCumplimientoSaga() {
  yield [
    takeLatest('NEGOCIACIONES/REPORTES/PORCENTAJECUMPLIMIENTO/GET_COMPLIANCE_PERCENTAGE_ACTION', ObtenerPorcentajeCumplimiento),
    takeLatest('NEGOCIACIONES/REPORTES/PORCENTAJECUMPLIMIENTO/GET_PLAZAS_ACTION', ObtenerPlazas),
  ]
}
