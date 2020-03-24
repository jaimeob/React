import {
  // take,
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import {
  getGoalDaysApi,
  getDaysAverageApi,
  getDaysAverageDetailApi,
} from "./api";
import Actions from './actions';

const {
  REQUEST_GOAL_DAYS,
  REQUEST_DAYS_AVERAGE_DETAIL,
} = Actions.getConstants();

export function* getGoalDays() {
  yield put(
    Actions.get('HANDLE_CHARGE_PROGRESS').fn(true),
  );

  const datos = JSON.parse(JSON.stringify(yield select((state) => state
    .getIn(
      ['diasPromedio']
    ))));
  const parametros = {
    dateStart : datos.dateStart,
    dateEnd : datos.dateEnd,
  }

  const year = parametros.dateStart.toString().substring(0,4)

  const {
    status: statusGoal,
    data: dataGoal,
  } = yield call(getGoalDaysApi, year);

  if (statusGoal === 200) {

    const {
      status,
      data,
    } = yield call(getDaysAverageApi, parametros);

    if (status === 200) {
      yield put(
        Actions.get('REQUEST_GOAL_DAYS_SUCCESS').fn(dataGoal, statusGoal),
      );

      yield put(
        Actions.get('REQUEST_DAYS_AVERAGE_SUCCESS').fn(data, status),
      );
    }
  }

  yield put(
    Actions.get('HANDLE_CHARGE_PROGRESS').fn(false),
  );
}

export function* getDaysAverageDetail(action) {

  const datos = JSON.parse(JSON.stringify(yield select((state) => state
    .getIn(
      ['diasPromedio']
    ))));
  const parametros = {
    dateStart : datos.dateStart,
    dateEnd: datos.dateEnd,
    employe: action.employe,
  }

  const {
    status,
    data,
  } = yield call(getDaysAverageDetailApi, parametros);

  if (status === 200) {
    yield put(
      Actions.get('REQUEST_DAYS_AVERAGE_DETAIL_SUCCESS').fn(data, status),
    );
  }
}
// Individual exports for testing
export default function* diasPromedioSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(REQUEST_GOAL_DAYS, getGoalDays);
  yield takeLatest(REQUEST_DAYS_AVERAGE_DETAIL, getDaysAverageDetail);
}
