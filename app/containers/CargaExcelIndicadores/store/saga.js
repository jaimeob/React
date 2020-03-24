// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { enqueueSnackbar } from 'reducers/notifications/actions';

import {
  getPlazasGeneralApi,
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

export function* initialConfiguration(action){

  const { tipoCargaId, periodicity } = action
  yield call(getDateCurrent);
  yield call(getPlazasGeneral);
  yield call(getWeeksMonths, {year: -1, periodicity, period: -1});
  if (tipoCargaId !== 3) {
    yield call(getListGeneral, {tipoCargaId});
  }
  yield call(getBaseLayout, {tipoCargaId});
  yield put({
    type: SET_TYPE_LOAD,
    currentTypeLoad: tipoCargaId,
  });
}

export function* getPlazasGeneral(){
  // TODO: Plaza = 0 regresa todas las plazas excepto Corporativo
  const idPlaza = 0
  const {
    status,
    data,
  } = yield call(getPlazasGeneralApi, idPlaza);
  if (status === 200 ) {
    yield put({
      type: SET_PLAZAS,
      data,
    });
  }
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
  const {
    tipoCargaId,
    plazaId = -1,
  } = action;
  const anio = yield select(state => state.getIn(
    ['cargaGeneral', 'backend', 'currentDate', 'Year']
  ));
  const {
    status,
    message,
    data: { data },
  } = yield call(getListGeneralApi, tipoCargaId, empresaId, anio, plazaId);
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
    ['cargaGeneral', 'backend', 'currentDate', 'Year']
  ));
  const plazaId = yield select(state => state.getIn(
    ['cargaGeneral', 'frontend', 'ui', 'selectedPlaza']
  ));
  const {
    tipoCargaId,
    empresaId,
    params,
  } = action;
  const {
    status,
    data: {
      status: statusResponse,
    },
  } = yield call(
    setLoadedIndicatorsApi,
    tipoCargaId,
    empresaId,
    params,
  );
  if (status === 200 && statusResponse === 200) {
    yield put({
      type: SET_MODAL_LOAD_DETAILS,
      modalLoadDetails: false,
    })
    yield put({
      type: DEFAULT_CONFIGURATION,
      validatedFile: false,
      fileLoad: {
        cols: [],
        rows: [],
        name: '',
        size: 0,
      },
      loadingErrors: {
        colsLayout: [],
        rowsLoaded: [],
        rowsErrors: [],
      },
      selectedPlaza: 0,
      selectedMonth: 0,
      selectedWeek: 0,
      selectedDay: null,
      modalContentLayout: false,
      modalCargaBase: false,
      modalLoadDetails: false,
      modalLoadingErrors: false,
      iconViewExplotion: false,
      listGeneral: [],
    })
    yield call(getListGeneral, { tipoCargaId, empresaId, anio, plazaId: plazaId || -1 });
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
        message: 'Error al cargar archivo, favor de llamar a soporte técnico.',
        options: {
          variant: 'error',
        },
      }));
  }
}

export default function* cargaGeneralSaga() {
  yield [
    takeLatest('CARGAXLSINDI/PROCESOS/CARGAGENERAL/INITIAL_CONFIGURATION_ACTION', initialConfiguration),
    takeLatest('CARGAXLSINDI/PROCESOS/CARGAGENERAL/GET_PLAZAS_GENERAL_ACTION', getPlazasGeneral),
    takeLatest('CARGAXLSINDI/PROCESOS/CARGAGENERAL/GET_LIST_GENERAL_ACTION', getListGeneral),
    takeLatest('CARGAXLSINDI/PROCESOS/CARGAGENERAL/GET_BASE_LAYOUT_ACTION', getBaseLayout),
    takeLatest('CARGAXLSINDI/PROCESOS/CARGAGENERAL/GET_CURRENT_DATE_ACTION', getDateCurrent),
    takeLatest('CARGAXLSINDI/PROCESOS/CARGAGENERAL/GET_WEEKS_MONTHS_ACTION', getWeeksMonths),
    takeLatest('CARGAXLSINDI/PROCESOS/CARGAGENERAL/GET_PLAZAS_USER_ACTION', getPlazasUser),
    takeLatest('CARGAXLSINDI/PROCESOS/CARGAGENERAL/SET_LOADED_INDICATORS_ACTION', setLoadedIndicators),
  ]
}
