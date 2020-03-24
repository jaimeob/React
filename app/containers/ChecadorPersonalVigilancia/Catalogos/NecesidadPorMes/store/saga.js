// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { enqueueSnackbar } from 'reducers/notifications/actions';

import { 
  getCurrentDate,
  getCompanys,
  getPlazas,
  getListNeeds,
  getYearsNeeds,
  saveNewNeed,
} from './api';

import Actions from './actions';
const {
  SET_COMPANYS,
  SET_CURRENT_DATE,
  SET_PLAZAS,
  SET_LIST_NEEDS,
  SET_YEARS_NEEDS,
  CHANGE_STEP,
} = Actions.getConstants();

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
export function* ObtenerListadoNecesidades(action){
  const {
    idCompany,
    year,
  } = action;
  const {
    status,
    data = [],
    message,
  } = yield call(getListNeeds, idCompany, year)
  const listNeeds = data.data.map(needs =>  { 
    needs.Meses = JSON.parse(needs.Meses)
    return needs
  })
  if (status === 200) {
    yield put({
      type: SET_LIST_NEEDS,
      listNeeds,
    });
  }  else {
    yield put(
      enqueueSnackbar({ 
        message, 
        options: { 
          variant: 'error', 
        }, 
      })) 
  }
}
export function* ObtenerAniosNecesidades(){
  const {
    status,
    data,
    message,
  } = yield call(getYearsNeeds)
  if (status === 200) {
    yield put({
      type: SET_YEARS_NEEDS,
      years: data.data,
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
export function* guardarNuevaNecesidad(action){
  const TipoMovto = action.typeNeedSelected
  const {
    data: {
      statusCode,
    },
  } = yield call(saveNewNeed, TipoMovto, action.newNeed)
  if (parseInt(statusCode,10) === 200) {
    
    const year = yield select( state => state.getIn(
      ['necesidadPorMes','backend','datasources','currentDate','Year']
    ))
    const idCompany = yield select( state => state.getIn(
      ['necesidadPorMes','frontend','ui','selectedCompany']
    ))
    const last = yield select( state => state.getIn(
      ['necesidadPorMes','frontend','steps', 'last']
    ))
    const current = yield select( state => state.getIn(
      ['necesidadPorMes','frontend','steps', 'current']
    ))

    yield call(ObtenerListadoNecesidades, {idCompany, year});
    
    yield put({
      type: CHANGE_STEP,
      steps: {last: current, current: last},
    });
    
    yield put(
      enqueueSnackbar({ 
        message: "Datos guardados con éxito", 
        options: { 
          variant: 'success', 
        }, 
      })); 
  } else {
    yield put(
      enqueueSnackbar({ 
        message: "Error al guardar cambios", 
        options: { 
          variant: 'error', 
        }, 
      })) 
  }
}
export default function* negociacionesSaga() {
  yield [
    takeLatest('CPV/CTLG/NECESIDADMES/GET_CURRENT_DATE_ACTION', ObtenerFechaActual),
    takeLatest('CPV/CTLG/NECESIDADMES/GET_COMPANYS_ACTION', ObtenerEmpresas),
    takeLatest('CPV/CTLG/NECESIDADMES/GET_PLAZAS_ACTION', ObtenerPlazas),
    takeLatest('CPV/CTLG/NECESIDADMES/GET_LIST_NEEDS_ACTION', ObtenerListadoNecesidades),
    takeLatest('CPV/CTLG/NECESIDADMES/GET_YEARS_NEEDS_ACTION', ObtenerAniosNecesidades),
    takeLatest('CPV/CTLG/NECESIDADMES/SAVE_NEW_NEED_ACTION', guardarNuevaNecesidad),
  ]
}
