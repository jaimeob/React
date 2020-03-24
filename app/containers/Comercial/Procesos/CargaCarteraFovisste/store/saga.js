// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { enqueueSnackbar } from 'reducers/notifications/actions';

import {
  getCurrentDateApi,
  getWeeksMonthsApi,
  getPlazasUserApi,
  getBaseLayoutApi,
  setLoadedIndicatorsApi,
  getListGeneralApi,
} from './api'

import Actions from './actions';
const {
  SET_TYPE_LOAD,
  SET_CURRENT_DATE,
  SET_WEEKS_MONTHS,
  SET_PERIODICITY,
  SET_PLAZAS,
  SET_BASE_LOAD,
  SET_LIST_GENERAL,
  SET_MODAL_LOAD_DETAILS,
  DEFAULT_CONFIGURATION,
} = Actions.getConstants();

export function* initialConfiguration(){
  const tipoCargaId = 1; // TODO: Cartera Fovisste
  yield call(getDateCurrent);
  yield call(getWeeksMonths, {year: -1, periodicity: 'M', period: -1});
  yield call(getListGeneral, {tipoCargaId});
  yield call(getBaseLayout, {tipoCargaId});
  yield put({
    type: SET_TYPE_LOAD,
    currentTypeLoad: tipoCargaId,
  });
}

export function* getDateCurrent(){
  const {
    status,
    data = [],
    message,
  } = yield call(getCurrentDateApi)
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
export function* getWeeksMonths(action){
  const { year, periodicity, period } = action;
  const {
    status,
    message,
    data: { weeks, months },
  } = yield call(getWeeksMonthsApi, {year, periodicity, period});
  if (status === 200) {
    yield put({
      type: SET_WEEKS_MONTHS,
      weeks, months,
    });
    yield put({
      type: SET_PERIODICITY,
      periodicity,
    });
  } else {
    yield put(
      enqueueSnackbar({
        message,
        options: {
          variant: 'error',
        },
      }));
  }
}
export function* getPlazasUser(){
  const idUser = yield select(state => state.getIn(
    ['global', 'currentUser', 'UsuarioId']
  ));
  const {
    status,
    message,
    data: { data },
  } = yield call(getPlazasUserApi, idUser);
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
      }));
  }
}
export function* getListGeneral(action){
  // TODO: PROMOTORA
  const empresaId = 1;
  const anio = yield select(state => state.getIn(
    ['cargaCarteraFovisste', 'backend', 'currentDate', 'Year']
  ));
  const {
    status,
    message,
    data: { data },
  } = yield call(getListGeneralApi, action.tipoCargaId, empresaId, anio, );
  if (status === 200) {
    yield put({
      type: SET_LIST_GENERAL,
      listGeneral: data,
    });
  } else {
    yield put(
      enqueueSnackbar({
        message,
        options: {
          variant: 'error',
        },
      }));
  }
}
export function* getBaseLayout(action){
  const {
    status,
    message,
    data: { content, layoutName, typeLoadId},
  } = yield call(getBaseLayoutApi, action.tipoCargaId);
  if (status === 200) {
    yield put({
      type: SET_BASE_LOAD,
      layoutContent: { content, layoutName, typeLoadId },
    });
  } else {
    yield put(
      enqueueSnackbar({
        message,
        options: {
          variant: 'error',
        },
      }));
  }
}
export function* setLoadedIndicators(action){
  const anio = yield select(state => state.getIn(
    ['cargaCarteraFovisste', 'backend', 'currentDate', 'Year']
  ));
  const {
    status,
    // data,
  } = yield call(
    setLoadedIndicatorsApi,
    action.tipoCargaId,
    action.empresaId,
    action.params,
  );
  if (status === 200) {
    yield put({
      type: SET_MODAL_LOAD_DETAILS,
      modalLoadDetails: false,
    })
    yield call(getListGeneral, { tipoCargaId: action.tipoCargaId, empresaId: action.empresaId, anio });
    yield put({
      type: DEFAULT_CONFIGURATION,
      validatedFile: false,
      fileLoad: {
        cols: [],
        rows: [],
        name: '',
        size: 0,
      },
      selectedMonth: 0,
      iconViewExplotion: false,
    })
    yield put(
      enqueueSnackbar({
        message: 'Archivo cargado con exito.',
        options: {
          variant: 'success',
        },
      }));
  } else {
    yield put(
      enqueueSnackbar({
        message: 'Error al cargar archivo.',
        options: {
          variant: 'error',
        },
      }));
  }
}

export default function* cargaCarteraFovissteSaga() {
  yield [
    takeLatest('COMERCIAL/PROCESOS/CARGACARTERAFOVISSTE/INITIAL_CONFIGURATION_ACTION', initialConfiguration),
    takeLatest('COMERCIAL/PROCESOS/CARGACARTERAFOVISSTE/GET_LIST_GENERAL_ACTION', getListGeneral),
    takeLatest('COMERCIAL/PROCESOS/CARGACARTERAFOVISSTE/GET_BASE_LAYOUT_ACTION', getBaseLayout),
    takeLatest('COMERCIAL/PROCESOS/CARGACARTERAFOVISSTE/GET_CURRENT_DATE_ACTION', getDateCurrent),
    takeLatest('COMERCIAL/PROCESOS/CARGACARTERAFOVISSTE/GET_WEEKS_MONTHS_ACTION', getWeeksMonths),
    takeLatest('COMERCIAL/PROCESOS/CARGACARTERAFOVISSTE/GET_PLAZAS_USER_ACTION', getPlazasUser),
    takeLatest('COMERCIAL/PROCESOS/CARGACARTERAFOVISSTE/SET_LOADED_INDICATORS_ACTION', setLoadedIndicators),
  ]
}
