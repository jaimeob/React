/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
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
  getEbitdas,
  getPlazas,
  updateStatusEbitdaApi,
  storeEbitda,
  editEbitda,
  getYearEbitda,
} from './api';

import { obtenerPermisos } from '../../../services/api';

import Actions from './actions';

const {
  REQUEST_GET_EBITDAS,
  REQUEST_UPDATE_STATUS_EBITDA,
  REQUEST_GET_PLAZAS,
  REQUEST_EBITDA_YEAR,
  REQUEST_POST_EBITDA,
  REQUEST_EDIT_EBITDA,
  OBTENER_PERMISOS,
} = Actions.getConstants();

export function* getEbitdasSaga(action) {
  const {
    status,
    data,
  } = yield call(getEbitdas, action.status);
  

  if(status === 200) {
  
    yield put(
      Actions.get('SET_EBITDAS').fn(data.data),
    );
  }
}

export function* getPlazasSaga() {
  const {
    status,
    data,
  } = yield call(getPlazas);

  if(status === 200) {
    yield put(
      Actions.get('SET_PLAZAS').fn(data),
    );
    
  } else {
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'Error al obtener las plazas',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }
}

export function* storeEbitdaSaga() {

  const usuarioId = yield select(
    state => state.getIn([
      'global', 
      'currentUser', 
      'UsuarioId', 
    ]));

  const ebitdaId = yield select(
    state => state.getIn([
      'configuracionEbitda', 
      'registrarEbitda', 
      'frontend', 
      'ebitda',
      'ebitdaId', 
    ]));

  const ebitdaYear = yield select(
    state => state.getIn([
      'configuracionEbitda', 
      'registrarEbitda', 
      'frontend', 
      'ebitda',
      'period',
    ]));
  
  const plazas = yield select(
    state => state.getIn([
      'configuracionEbitda', 
      'registrarEbitda', 
      'backend', 
      'datasources',
      'plazas',
    ]).toJS()   
      .map(plaza => ({
        IdPlaza: plaza.IdPlaza,
        EbitdaPlaneado: !isNaN(plaza.EbitdaPlaneado) ? plaza.EbitdaPlaneado : 0,
        Ebitda: !isNaN(plaza.Ebitda) ? plaza.Ebitda : 0,
      }))
  );

  const period = {
    ebitdaId,
    ebitdaYear,
    plazas,
    usuarioId,
  };
  
  const {
    status,
  } = yield call(storeEbitda, period);
  
  if(status === 200) {
    yield put(
      enqueueSnackbar({
        message: 'Datos guardados con éxito',
        options: { 
          variant: 'success', 
        }, 
      })
    )
   
    yield put(
      Actions.get('REQUEST_GET_EBITDAS').fn(),
    );

    yield put(
      Actions.get('SET_EBITDA_DETAIL').fn({
        period: '',
        ebitdaId: 0,
        active: true,
      }),
    );

    yield put(
      Actions.get('SET_STEPPER').fn(0),
    );

    yield put(
      Actions.get('REQUEST_GET_PLAZAS').fn()
    );
    
  } else {
    yield put(
      enqueueSnackbar({
        message: 'Error al guardar el ebitda',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }
}

export function* editEbitdaSaga(action) {
  const {
    status,
    data,
  } = yield call(editEbitda, action.id);

  if(status === 200) {

    const plazas = data.data.map(el => ({
      IdPlaza: el.IdPlaza,
      Nombre: el.Nombre,
      EbitdaPlaneado: el.EbitdaPlaneado,
      Ebitda: el.Ebitda,
    }));
   
    yield put(
      Actions.get('SET_EBITDA_DETAIL').fn({
        ebitdaId: data.data[0].id,
        period: data.data[0].Anio,
        active: data.data[0].Activo,
      }),
    );

    yield put(
      Actions.get('SET_PLAZAS').fn(plazas),
    );
    
  } else {
    yield put(
      enqueueSnackbar({
        message: 'Error al obtener el ebitda',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }
}

export function* requestEbitdaYearSaga(action) {
  if(action.period === ''){
    return;
  }

  const {
    status,
    data,
  } = yield call(getYearEbitda, action.id, action.period);
 
  if(status === 200 && data.data.length > 0) {
    if(data.data[0].existeEbitda === 1){
      yield put(
        Actions.get('SET_ERROR').fn('period', true, 'El periodo ya se encuentra registrado')
      )
    } else {
      yield put(
        Actions.get('SET_ERROR').fn('period', false, 'Requerido*')
      )
    }
  } else {
    yield put(
      enqueueSnackbar({
        message: 'Error al consultar el periodo',
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

export function* updateStatusEbitda(action){
  const idUsuario = yield select((state) => state.getIn(['global', 'currentUser', 'UsuarioId']));

  const {
    payload,
  } = action

  payload.idUsuario = idUsuario;

  const {
    status,
    // data,
  } = yield call(updateStatusEbitdaApi, payload);

  if(status === 200){
    yield put(
      Actions.get('SET_MENU_FILTER_INDEX').fn(0),
    );
    yield put(
      Actions.get('REQUEST_GET_EBITDAS').fn(),
    );
    yield put(
      enqueueSnackbar({
        message: 'El registro se actualizó correctamente',
        options: { 
          variant: 'success', 
        }, 
      })
    )
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

// Individual exports for testing
export default function* configuracionEbitda() {
  // See example in containers/HomePage/saga.js
  yield [
    takeLatest(REQUEST_GET_EBITDAS, getEbitdasSaga),
    takeLatest(REQUEST_UPDATE_STATUS_EBITDA, updateStatusEbitda),
    takeLatest(REQUEST_GET_PLAZAS, getPlazasSaga),
    takeLatest(REQUEST_EBITDA_YEAR, requestEbitdaYearSaga),
    takeLatest(REQUEST_POST_EBITDA, storeEbitdaSaga),
    takeLatest(REQUEST_EDIT_EBITDA, editEbitdaSaga),
    takeLatest(OBTENER_PERMISOS, obtenerPermisosSaga),
  ];
}
