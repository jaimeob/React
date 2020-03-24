import {
  // take,
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import {
  getGoalPorcentSaveApi,
  getPorcentSavePlazaApi,
} from "./api";
import Actions from './actions';

const {
  REQUEST_GOAL_PORCENT_SAVE,
} = Actions.getConstants();

export function* getGoalPorcentSave() {
  // const {
  //   year,
  // } = action

  yield put(
    Actions.get('HANDLE_CHARGE_PROGRESS').fn(true),
  );

  const datos = JSON.parse(JSON.stringify(yield select((state) => state
    .getIn(
      ['porcentajeAhorroCompras']
    ))));
  const parametros = {
    dateStart : datos.dateStart,
    dateEnd: datos.dateEnd,
  }

  const {
    status: statusGoal,
    data: dataGoal,
  } = yield call(getGoalPorcentSaveApi, parametros.dateStart.toString().substring(0,4));

  if (statusGoal === 200) {
    const {
      status,
      data,
    } = yield call(getPorcentSavePlazaApi, parametros);
  
    if (status === 200) {
      yield put(
        Actions.get('REQUEST_GOAL_PORCENT_SAVE_SUCCESS').fn(dataGoal, statusGoal),
      );

      yield put(
        Actions.get('REQUEST_PORCENT_SAVE_SUCCESS').fn(data, status),
      );
    }
  }

  yield put(
    Actions.get('HANDLE_CHARGE_PROGRESS').fn(false),
  );
}

// Individual exports for testing
export default function* porcentajeAhorroComprasSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(REQUEST_GOAL_PORCENT_SAVE, getGoalPorcentSave);
}
