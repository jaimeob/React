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
  getPeriods,
  getPlazas,
  closePeriod,
  storePeriod,
  editPeriods,
  getYearPeriod,
} from './api';

import { obtenerPermisos } from '../../../services/api';

import Actions from './actions';

const {
  REQUEST_GET_PERIODS,
  REQUEST_GET_PLAZAS,
  REQUEST_CLOSE_PERIOD,
  REQUEST_POST_PERIOD,
  REQUEST_EDIT_PERIOD,
  REQUEST_PERIOD_YEAR,
  OBTENER_PERMISOS,
} = Actions.getConstants();

export function* getPeriodsSaga() {
  const {
    status,
    data,
  } = yield call(getPeriods);

  if(status === 200) {
    yield put(
      Actions.get('SET_DATA').fn(data.data),
    );

    const stateData = yield select(
      state => state.getIn([
        'configuracionPeriodos', 
        'configuracionPeriodo', 
        'backend', 
        'datasources', 
        'data']).toJS());
      
    const options = yield select(
      state => state.getIn([
        'configuracionPeriodos', 
        'configuracionPeriodo', 
        'frontend', 
        'ui', 
        'options']).toJS());

    const total = stateData.filter(el => el.Estatus === options[0]);
    
    yield put(
      Actions.get('SET_DISABLED_ADD_BUTTON').fn(total.length > 0),
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
      Actions.get('SET_TOTAL_PLAZAS').fn(data.length),
    );
    
    const plazas = data.map(el => ({
      ...el, Rentabilidad: 0,
    }))

    yield put(
      Actions.get('SET_PLAZAS').fn(plazas),
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

export function* closePeriodSaga(action) {

  const idUsuario = yield select(
    state => state.getIn([
      'global', 
      'currentUser', 
      'UsuarioId', 
    ]));

  const {
    status,
  } = yield call(closePeriod, action.id, idUsuario);
  
  if(status === 200) {
    yield put(
      Actions.get('SET_MODAL').fn('Check'),
    );
    yield put(
      Actions.get('REQUEST_GET_PERIODS').fn(),
    );
  } else {
    yield put(
      enqueueSnackbar({
        message: 'Error al cerrar el periodo',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }
}

export function* storePeriodSaga() {

  const usuarioId = yield select(
    state => state.getIn([
      'global', 
      'currentUser', 
      'UsuarioId', 
    ]));

  const periodId = yield select(
    state => state.getIn([
      'configuracionPeriodos', 
      'registrarPeriodo', 
      'frontend', 
      'ui',
      'periodDetail',
      'periodId', 
    ]));

  const periodYear = yield select(
    state => state.getIn([
      'configuracionPeriodos', 
      'registrarPeriodo', 
      'frontend', 
      'ui',
      'periodDetail',
      'period',
    ]));
  
  const closeStorePeriod = yield select(
    state => state.getIn([
      'configuracionPeriodos', 
      'registrarPeriodo', 
      'frontend', 
      'ui',
      'periodDetail',
      'closePeriod',
    ]));

  const plazas = yield select(
    state => state.getIn([
      'configuracionPeriodos', 
      'registrarPeriodo', 
      'backend', 
      'datasources',
      'plazas',
    ]).toJS()
      // .filter(plaza => Object.prototype.hasOwnProperty.call(plaza, 'Rentabilidad'))
      // .filter(plaza => plaza.Rentabilidad > 0)      
      .map(plaza => ({
        IdPlaza: plaza.IdPlaza,
        Rentabilidad: plaza.Rentabilidad,
      }))
  );

  const period = {
    periodId,
    periodYear,
    closeStorePeriod,
    plazas,
    usuarioId,
  };

  const {
    status,
  } = yield call(storePeriod, period);
  
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
      Actions.get('REQUEST_GET_PERIODS').fn(),
    );

    yield put(
      Actions.get('REQUEST_GET_PLAZAS').fn(),
    );

    yield put(
      Actions.get('SET_PERIOD_DETAIL').fn({
        periodId: 0,
        period: '',
        closePeriod: 0,
      }),
    );

    yield put(
      Actions.get('SET_STEPPER').fn(0),
    );
  } else {
    yield put(
      enqueueSnackbar({
        message: 'Error al guardar el periodo',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }
}

export function* editPeriodSaga(action) {
  const {
    status,
    data,
  } = yield call(editPeriods, action.id);

  if(status === 200) {

    const plazas = data.data.map(el => ({
      IdPlaza: el.IdPlaza,
      Nombre: el.Nombre,
      Rentabilidad: el.Porcentaje,
    }));

    yield put(
      Actions.get('SET_PERIOD_DETAIL').fn({
        periodId: data.data[0].id,
        period: data.data[0].Anio,
        closePeriod: data.data[0].Cerrado,
      }),
    );

    yield put(
      Actions.get('SET_PLAZAS').fn(plazas),
    );
    
  } else {
    yield put(
      enqueueSnackbar({
        message: 'Error al obtener el periodo',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }
}

export function* getYearPeriodSaga(action) {
  if(action.period === ''){
    return;
  }

  const {
    status,
    data,
  } = yield call(getYearPeriod, action.id, action.period);

  if(status === 200 && data.data.length > 0) {
    if(data.data[0].existePeriodo === 1){
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

// Individual exports for testing
export default function* configuracionPeriodosSaga() {
  // See example in containers/HomePage/saga.js
  yield [
    takeLatest(REQUEST_GET_PERIODS, getPeriodsSaga),
    takeLatest(REQUEST_GET_PLAZAS, getPlazasSaga),
    takeLatest(REQUEST_CLOSE_PERIOD, closePeriodSaga),
    takeLatest(REQUEST_POST_PERIOD, storePeriodSaga),
    takeLatest(REQUEST_EDIT_PERIOD, editPeriodSaga),
    takeLatest(REQUEST_PERIOD_YEAR, getYearPeriodSaga),
    takeLatest(OBTENER_PERMISOS, obtenerPermisosSaga),
  ];
}
