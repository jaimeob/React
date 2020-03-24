// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { takeLatest, call, put } from 'redux-saga/effects';
import { enqueueSnackbar } from 'reducers/notifications/actions';
import ActionsSpinner from 'components/Spinner/store/actions';

import {
  getCurrentDate,
  getCompanys,
  getPlazas,
  getAssitance,
} from './api';

import Actions from './actions';
const {
  SET_COMPANYS,
  SET_CURRENT_DATE,
  SET_PLAZAS,
  SET_ATTENDANCE,
  SET_ROWS_CHECKED,
} = Actions.getConstants();

const {
  CHANGE_SPINNER,
} = ActionsSpinner.getConstants();

export function* ObtenerFechaActual(){
  const {
    status,
    data,
    message,
  } = yield call(getCurrentDate)
  if (status === 200) {
    yield put({
      type: SET_CURRENT_DATE,
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
export function* ObtenerEmpresas(){
  const {
    status,
    data,
    message,
  } = yield call(getCompanys)
  if (status === 200) {
    yield put({
      type: SET_COMPANYS,
      companys: data.data,
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
    message,
  } = yield call(getPlazas, IdPlaza)
  if (status === 200) {
    yield put({
      type: SET_PLAZAS,
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

export function* ObtenerAssistencias(action){
  const {
    selectedCompany,
    selectedPlaza,
    concentrated,
    startDate,
    endDate,
  } =  action;
  yield put({
    type: CHANGE_SPINNER,
    status: true,
  });
  const {
    data: {
      error,
      message,
      statusCode,
      data,
    },
  } = yield call( getAssitance,
    selectedCompany,
    selectedPlaza,
    concentrated,
    startDate,
    endDate)
  yield put({
    type: CHANGE_SPINNER,
    status: false,
  });
  if (parseInt(statusCode,10) === 200) {
    const rowsChecked = []
    const arrAttendance = []
    data.forEach( dt => {
      arrAttendance.push({
        ...dt,
        Selected: false,
      })
      rowsChecked.push({
        Id: dt.Id,
        Selected: false,
        Archivo: dt.Archivo,
      })
    })
    yield put({
      type: SET_ATTENDANCE,
      arrAttendance,
    });
    yield put({
      type: SET_ROWS_CHECKED,
      rowsChecked,
    });
  } else {
    yield put(
      enqueueSnackbar({
        message: `${error}: ${message}`,
        options: {
          variant: 'error',
        },
      }))
  }
}

export default function* reporteAsistenciaSaga() {
  yield [
    takeLatest('CPV/RPT/RPTASISTENCIA/GET_CURRENT_DATE_ACTION', ObtenerFechaActual),
    takeLatest('CPV/RPT/RPTASISTENCIA/GET_COMPANYS_ACTION', ObtenerEmpresas),
    takeLatest('CPV/RPT/RPTASISTENCIA/GET_PLAZAS_ACTION', ObtenerPlazas),
    takeLatest('CPV/RPT/RPTASISTENCIA/GET_ATTENDANCE_ACTION', ObtenerAssistencias),
  ]
}

