// import isRequestOk from 'utils/helpers';
import {
  // take,
  call,
  put,
  // select,
  takeLatest,
} from 'redux-saga/effects';
import { enqueueSnackbar } from 'reducers/notifications/actions';
import {
  getFamilysApi,
  updateStatusFamilysApi,
  getSubFamilysFamilyApi,
  saveChangesSubfamilysApi,
  getChargesDepartamentsApi,
  saveChargeFamilyApi,
} from "./api";


import Actions from './actions';

const {
  REQUEST_GET_FAMILY,
  REQUEST_UPDATE_STATUS_FAMILY,
  HANDLE_CLICK_EDIT_FAMILY,
  HANDLE_CLICK_ADD_SUBFAMILY,
  REQUEST_SAVE_SUBFAMILYS,
  GET_CHARGES_DEPARTAMENT,
  SET_CHARGES_DEPARTAMENT,
  CHANGE_MODAL_CHARGES,
  SAVE_CHARGE_FAMILY,
} = Actions.getConstants();

export function* getFamilys(action) {
  const {
    payload,
  } = action;
  const {
    status,
    data,
  } = yield call(getFamilysApi, payload);

  if (status === 200) {
    yield put(
      Actions.get('REQUEST_GET_FAMILY_SUCCESS').fn({data, payload}, status),
    );
  }
}

export function* getSubFamilysFamily(action) {
  const {
    payload,
  } = action;

  const {
    status,
    data,
  } = yield call(getSubFamilysFamilyApi, payload);

  if(status === 200){
    yield put(Actions.get('REQUEST_CLICK_EDIT_FAMILY_SUCCESS').fn({data,payload}));
  }
}

export function* getSubFamilysFamilyAdd(action) {
  const {
    dataSubFamily,
    rowsDelete,
  } = action;

  const {
    status,
    data,
  } = yield call(getSubFamilysFamilyApi, {id: -1});

  if(status === 200){
    yield put(Actions.get('HANDLE_CLICK_ADD_SUBFAMILY_SUCCESS').fn({data, dataSubFamily, rowsDelete}));
  }
}

export function* updateStatusFamilys(action) {
  const{
    payload,
  } = action;

  const{
    status,
    // data,
  } = yield call(updateStatusFamilysApi, payload);

  if(status === 200){
    yield put(
      Actions.get('REQUEST_GET_FAMILY')
        .fn({
          state: payload.filterFamily,
          index: payload.preMenuFilterIndex,
          newIndex: payload.menuFilterIndex,
        }),
    );
  }

}

export function* saveChangesSubfamilys(action) {
  const{
    payload,
  } = action;

  const{
    status,
    data,
  } = yield call(saveChangesSubfamilysApi, payload);

  if(status === 200){
    if(data.data[0].Codigo === 0) {
      yield put(
        Actions.get('REQUEST_GET_FAMILY').fn({ state: 'Todos', newIndex: 0, index: 0})
      );
      yield put(
        Actions.get('SHOW_MODAL_SUCCESS').fn(payload.modal),
      );
    } else {
      yield put(
        Actions.get('SHOW_MODAL_ERROR_SAVE').fn('openModalErrorSave', true),
      );
    }
  }
}

export function* getChargesDepartament(action) {
  const idDepartament = 22;
  const{
    idFamilySelected,
    modalCharge,
  } = action;
  const{
    status,
    data,
  } = yield call(getChargesDepartamentsApi, idDepartament, idFamilySelected);
  if(status === 200){
    yield put({
      type: SET_CHARGES_DEPARTAMENT,
      listCharges: data,
    });
    yield put({
      type: CHANGE_MODAL_CHARGES,
      idFamilySelected,
      modalCharge,
    });
  }
}
export function* saveChargeFamily(action) {
  const{
    IdFamily,
    add,
    del,
  } = action;
  const{
    status,
  } = yield call(saveChargeFamilyApi, IdFamily, add, del);
  if(status === 200){
    yield put({
      type: CHANGE_MODAL_CHARGES,
      idFamilySelected: 0,
      modalCharge: false,
    });
    yield put({
      type: SET_CHARGES_DEPARTAMENT,
      listCharges: [],
    });
    yield put(
      enqueueSnackbar({
        message: "Puestos actualizados con éxito.",
        options: {
          variant: 'success',
        },
      }))
  } else {
    yield put(
      enqueueSnackbar({
        message: "Ocurrió un error al asignar puestos.",
        options: {
          variant: 'error',
        },
      }))
  }
}

// Individual exports for testing
export default function* listadoFamiliasSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(REQUEST_GET_FAMILY, getFamilys);
  yield takeLatest(REQUEST_UPDATE_STATUS_FAMILY, updateStatusFamilys);
  yield takeLatest(HANDLE_CLICK_EDIT_FAMILY, getSubFamilysFamily);
  yield takeLatest(HANDLE_CLICK_ADD_SUBFAMILY, getSubFamilysFamilyAdd);
  yield takeLatest(REQUEST_SAVE_SUBFAMILYS, saveChangesSubfamilys);
  yield takeLatest(GET_CHARGES_DEPARTAMENT, getChargesDepartament);
  yield takeLatest(SAVE_CHARGE_FAMILY, saveChargeFamily);
}
