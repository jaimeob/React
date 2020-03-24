import {
  // take,
  call,
  put,
  // select,
  takeLatest,
} from 'redux-saga/effects';
import {
  getYearsGeneralScreenApi,
  getPorcentImpactApi,
  getDataImpactApi,
  getDataDetailApi,
} from "./api";
import Actions from './actions';

const {
  REQUEST_YEARS_PORCENT_IMPACT,
  REQUEST_PORCENT_IMPACT,
  REQUEST_DATA_IMPACT_GENERAL,
  REQUEST_DATA_IMPACT_DETAIL,
} = Actions.getConstants();

export function* getYearsGeneralScreen() {
  const {
    status,
    data,
  } = yield call(getYearsGeneralScreenApi);

  if (status === 200) {
    yield put(
      Actions.get('REQUEST_YEARS_PORCENT_IMPACT_SUCCESS').fn(data, status),
    );
  }
}

export function* getPorcentImpact(action) {
  const {
    year,
  } = action

  const {
    status,
    data,
  } = yield call(getPorcentImpactApi, year);

  if (status === 200) {
    yield put(
      Actions.get('REQUEST_PORCENT_IMPACT_SUCCESS').fn(data, status),
    );
  }
}

export function* getDataImpact(action) {
  const {
    year,
  } = action

  const {
    status,
    data,
  } = yield call(getDataImpactApi, year);

  if (status === 200) {
    yield put(
      Actions.get('REQUEST_DATA_IMPACT_GENERAL_SUCCESS').fn(data, status),
    );
  }
  yield put(
    Actions.get('RETURN_PROGRESS').fn(['generalScreen','progressActive']),
  );
}

export function* getDataDetail(action) {
  const {
    year,
    id,
  } = action

  const {
    status,
    data,
  } = yield call(getDataDetailApi, {year, id});

  if (status === 200) {
    yield put(
      Actions.get('REQUEST_DATA_IMPACT_DETAIL_SUCCESS').fn(data, status),
    );
  }
  yield put(
    Actions.get('RETURN_PROGRESS').fn(['detailScreen','progressTableActive']),
  );
}

// Individual exports for testing
export default function* porcentajeDeImpactoSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(REQUEST_YEARS_PORCENT_IMPACT, getYearsGeneralScreen);
  yield takeLatest(REQUEST_PORCENT_IMPACT, getPorcentImpact);
  yield takeLatest(REQUEST_DATA_IMPACT_GENERAL, getDataImpact);
  yield takeLatest(REQUEST_DATA_IMPACT_DETAIL, getDataDetail);
  
}
