// Individual exports for testing
import { takeLatest, call, put } from 'redux-saga/effects';
import { enqueueSnackbar } from 'reducers/notifications/actions';
import { 
  getCurrentDateTime,
  getLayoutNegociaciones, 
  getDetalleInsumo, 
  getPlazas, 
  getExplotions,
  getExplotionsDetails,
  addExplotion,
} from './api'
import Actions from './actions';

const {
  SET_LAYOUT_NEGOCIACIONES,
  SET_DETALLE_INSUMO,
  SET_PLAZAS,
  SET_EXPLOTIONS,
  SET_EXPLOTIONS_DETAILS,
  SET_CURRENT_DATE_TIME,
  REQUEST_ADD_EXPLOTION,
  GET_EXPLOTIONS,
  EXPLOTION_DETAILS,
} = Actions.getConstants();

export function* ObtenerLayoutNegociaciones(action){
  const {
    idPrototipo,
  } =  action;
  const {
    status,
    data = [],
  } = yield call(getLayoutNegociaciones, idPrototipo)
  if (status === 200) {
    yield put({
      type: SET_LAYOUT_NEGOCIACIONES,
      data,
    });
  }
}

export function* ObtenerFechaHora(){
  const {
    status,
    data = [],
  } = yield call(getCurrentDateTime)

  const consult = {
    idExplotion: -1, 
    idPlaza: -1, 
    anio: data.Year,
  }

  if (status === 200) {
    yield put({
      type: SET_CURRENT_DATE_TIME,
      data,
    });
    yield put({
      type: GET_EXPLOTIONS,
      ...consult,
    });
  }
}
export function* ObtenerDetalleInsumo(action){
  const {
    Supplies,
    rowsExplotion,
  } =  action;
  const {
    status,
    data = [],
  } = yield call(getDetalleInsumo, Supplies)
  
  if (status === 200) {
    const rows = [...rowsExplotion]
    const pool = rows.map( row => {
      const rowDetails = data.find( dt => dt.insumo === row.insumo)
      return Object.assign(row, rowDetails)
    })
    yield put({
      type: SET_DETALLE_INSUMO,
      data,
    });
    const details = {
      headers: ["insumo","descripcion","unidad","cantidad","ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"],
      rows: pool,
    }
    yield put({
      type: EXPLOTION_DETAILS,
      details,
    });
  }
}

export function* ObtenerPlazas(action){
  const {
    IdPlaza,
  } =  action;
  const {
    status,
    data = [],
  } = yield call(getPlazas, IdPlaza)
  if (status === 200) {
    yield put({
      type: SET_PLAZAS,
      data,
    });
  }
}

export function* ObtenerExplosiones(action){
  const {
    idExplotion,
    idPlaza,
    anio,
  } =  action;
  const {
    status,
    data = [],
  } = yield call(getExplotions, idExplotion, idPlaza, anio)
  if (status === 200) {
    yield put({
      type: SET_EXPLOTIONS,
      data,
    });
  }
}

export function* ObtenerExplosionesDetalle(action){
  const {
    IdExplotion,
  } =  action;
  const {
    status,
    data = [],
  } = yield call(getExplotionsDetails, IdExplotion)
  if (status === 200) {
    yield put({
      type: SET_EXPLOTIONS_DETAILS,
      data,
    });
  }
}

export function* AgregarExplosion(action){
  const {
    JsonExplotion,
    JsonExplotionDetails,
    additionalData,
  } =  action;
  const {
    status,
    data = [],
  } = yield call(addExplotion, {JsonExplotion, JsonExplotionDetails})
  
  if (status === 200) {
    yield put({
      type: REQUEST_ADD_EXPLOTION,
      data,
    }); 
    yield put(
      enqueueSnackbar({ 
        message: data.message, 
        options: { 
          variant: data.codigo ? 'success' : 'error', 
        }, 
      }) 
    ) 
    yield put({
      type: GET_EXPLOTIONS,
      additionalData,
    }); 
  }else{
    yield put({
      type: REQUEST_ADD_EXPLOTION,
      data,
    });
    yield put(
      enqueueSnackbar({ 
        message: data.message, 
        options: { 
          variant: 'error', 
        }, 
      }) 
    )
  }
}
export default function* negociacionesSaga() {
  yield [
    takeLatest('APP/CONTAINERS/NEGOCIACIONES/GET_CURRENT_DATE_TIME_ACTION', ObtenerFechaHora),
    takeLatest('APP/CONTAINERS/NEGOCIACIONES/GET_LAYOUT_NEGOCIACIONES_ACTION', ObtenerLayoutNegociaciones),
    takeLatest('APP/CONTAINERS/NEGOCIACIONES/GET_DETALLE_INSUMO_ACTION', ObtenerDetalleInsumo),
    takeLatest('APP/CONTAINERS/NEGOCIACIONES/GET_PLAZAS_ACTION', ObtenerPlazas),
    takeLatest('APP/CONTAINERS/NEGOCIACIONES/GET_EXPLOTIONS_ACTION', ObtenerExplosiones),
    takeLatest('APP/CONTAINERS/NEGOCIACIONES/GET_EXPLOTIONS_DETAILS_ACTION', ObtenerExplosionesDetalle),
    takeLatest('APP/CONTAINERS/NEGOCIACIONES/ADD_EXPLOTIONS_ACTION', AgregarExplosion),
  ]
}
