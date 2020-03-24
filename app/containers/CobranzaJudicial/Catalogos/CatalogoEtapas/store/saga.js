import { 
  // take,
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';
import {
  getTypeProcessApi,
  getListEtapasApi,
  updateStatusEtapasApi,
  getEtapasTypeProcessApi,
  createEtapaApi,
  editEtapaApi,
} from './api';

import {
  obtenerPermisos,
} from '../../../../../services/api';

import Actions from './actions';

const {
  REQUEST_GET_TYPE_PROCESS,
  REQUEST_GET_LIST_ETAPAS,
  REQUEST_UPDATE_STATUS_ETAPAS,
  REQUEST_ETAPAS_TYPE_PROCESS,
  REQUEST_CREATE_ETAPA,
  REQUEST_EDIT_ETAPA,
  OBTENER_PERMISOS,
} = Actions.getConstants();

export function* getTypeProcess() {
  const {
    status,
    data,
  } = yield call(getTypeProcessApi);

  if(status === 200) {
    yield put(
      Actions.get('REQUEST_GET_TYPE_PROCESS_SUCCESS').fn(data, status),
    );
    if(data.data.length === 0) {
      yield put(
        enqueueSnackbar({ 
          message: 'No se encontraron procesos registrados',
          options: { 
            variant: 'warning', 
          }, 
        })
      )
    }
  } else {
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'Error al obtener los procesos judiciales',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }
}

export function* getListEtapas(action) {
  const {
    payload,
  } = action

  const {
    status,
    data,
  } = yield call(getListEtapasApi, payload);

  if(status === 200) {

    yield put(
      Actions.get('REQUEST_GET_LIST_ETAPAS_SUCCESS').fn({data, newIndex: payload.newIndex}, status),
    );
    if(data.data.length === 0) {
      yield put(
        enqueueSnackbar({ 
          message: 'No se encontraron etapas registradas',
          options: { 
            variant: 'warning', 
          }, 
        })
      )
    }
  } else {
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'Error al obtener los estapas',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }
}

export function* updateStatusEtapas(action){
  const {
    payload,
  } = action

  const {
    status,
    // data,
  } = yield call(updateStatusEtapasApi, payload);

  if(status === 200){
    yield put(
      Actions.get('REQUEST_GET_LIST_ETAPAS').fn({ProcesoId: payload.ProcesoId,Estatus: payload.currentStatus, newIndex: payload.menuFilterIndex}, status),
    );
  } else{
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'Error al actualizar status',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }
}

export function* getEtapasTypeProcess(action){
  const {
    payload,
  } = action

  const {
    status,
    data,
  } = yield call(getEtapasTypeProcessApi, payload);

  if(status === 200){
    yield put(
      Actions.get('REQUEST_ETAPAS_TYPE_PROCESS_SUCCESS').fn(data, status),
    );
  } else{
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'Error al obtener las etapas',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }
}

export function* createEtapa(action){
  const {
    payload,
  } = action

  const {
    status,
    data,
  } = yield call(createEtapaApi, payload);

  if(status === 200){
    yield put(
      Actions.get('HANDLE_CLICK_LEAVE_NEW').fn(),
    );
    yield put(
      Actions.get('REQUEST_GET_LIST_ETAPAS').fn({ProcesoId: payload.procesoId, Estatus: payload.Estatus, newIndex: payload.newIndex}),
    );
    yield put(
      enqueueSnackbar({ 
        message: data.message,
        options: { 
          variant: 'success',
        }, 
      })
    )
  } else{
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'Error al dar de alta la etapa',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }
}

export function* editEtapa(action){
  const {
    payload,
  } = action

  const {
    status,
    data,
  } = yield call(editEtapaApi, payload);

  if(status === 200){
    yield put(
      Actions.get('HANDLE_CLICK_LEAVE_NEW').fn(),
    );
    yield put(
      Actions.get('REQUEST_GET_LIST_ETAPAS').fn({ProcesoId: payload.procesoId, Estatus: payload.Estatus, newIndex: payload.newIndex}),
    );
    yield put(
      enqueueSnackbar({ 
        message: data.message,
        options: { 
          variant: 'success',
        }, 
      })
    )
  } else{
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'Error al editar la etapa',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }
}

export function* obtenerPermisosSaga(){
  const paramsPermisos = yield select((state) => state.getIn(['global','paramsPermisos']).toJS());
  const idUsuario = yield select((state) => state.getIn(['global', 'currentUser', 'UsuarioId']));
  
  const {
    status,
    data,
  } = yield call(obtenerPermisos, {...paramsPermisos, idUsuario});

  if(status === 200){
    yield put(
      Actions.get('SET_PERMISOS').fn(data.permisos),
    );
  } else{
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'Error al obtener los permisos',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }
}

// Individual exports for testing
export default function* catalogoEtapasSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(REQUEST_GET_TYPE_PROCESS, getTypeProcess);
  yield takeLatest(REQUEST_GET_LIST_ETAPAS, getListEtapas);
  yield takeLatest(REQUEST_UPDATE_STATUS_ETAPAS, updateStatusEtapas);
  yield takeLatest(REQUEST_ETAPAS_TYPE_PROCESS, getEtapasTypeProcess);
  yield takeLatest(REQUEST_CREATE_ETAPA, createEtapa);
  yield takeLatest(REQUEST_EDIT_ETAPA, editEtapa);
  yield takeLatest(OBTENER_PERMISOS, obtenerPermisosSaga);
}
