// import { take, call, put, select } from 'redux-saga/effects';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';
import Actions from './actions';

import { obtenerPermisos } from '../../services/api';

import {getEntregaIndicador,postEntregaIndicador,getValoresEtiquetas,getCombosFiltros} from './api'

export const {
  OBTENER_PERMISOS,
  GET_ENTREGA_INDICADOR,
  POST_ENTREGA_INDICADOR,
  GET_VALORES_ETIQUETAS,
  GET_COMBOS_FILTROS,
} = Actions.getConstants();

export function* obtenerPermisosSagaAction(){
  try {
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
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al cosultar los permisos',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getEntregaIndicadorAction(){
  try {
    const {
      status,
      data,
    } = yield call(getEntregaIndicador);

    if(data.length>0){
      yield put(
        Actions.get('SET_ENTREGA_INDICADOR').fn(data),
      );
    } 
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al cosultar entrega indicador',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* postEntregaIndicadorAction(){
  const data = yield select((state)=>state.getIn(['entregaIndicador','selected']))
  
  const idUsuario = yield select((state) => state.getIn(['global', 'currentUser', 'UsuarioId']));
  const datos = {data,idUsuario}
  
  try {
    const {
      status,
      data,
    } = yield call(postEntregaIndicador,datos);
    
    if(data.length>0){
      yield put(
        Actions.get('SET_ENTREGA_INDICADOR').fn(data),
      );
      yield put(
        Actions.get('GET_VALORES_ETIQUETAS').fn(),
      );
      yield put(
        enqueueSnackbar({
          message: 'Datos guardados con éxito',
          options: {
            variant: 'Success',
          },
        })
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al guardar entrega indicador',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getValoresEtiquetasAction(){
  try {
    const {
      status,
      data,
    } = yield call(getValoresEtiquetas);
    
    if(data.length > 0){
      yield put(
        Actions.get('SET_VALORES_ETIQUETAS').fn(data[0].totalEvaluados,data[0].aplicaBono,data[0].pendienteEntrega),
      );
    } 
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al cosultar valores etiquetas',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getCombosFiltrosAction(){
  try {
    const {
      status,
      data,
    } = yield call(getCombosFiltros);
    
    if(data.direccion.length > 0){
      yield put(
        Actions.get('SET_COMBOS_FILTROS').fn(data),
      );
    } 
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al cosultar valores etiquetas',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

// Individual exports for testing
export default function* entregaIndicadorSaga() {
  // See example in containers/HomePage/saga.js
  yield [
    takeLatest(
      OBTENER_PERMISOS,
      obtenerPermisosSagaAction
    ),
    takeLatest(
      GET_ENTREGA_INDICADOR,
      getEntregaIndicadorAction
    ),
    takeLatest(
      POST_ENTREGA_INDICADOR,
      postEntregaIndicadorAction
    ),
    takeLatest (
      GET_VALORES_ETIQUETAS,
      getValoresEtiquetasAction
    ),
    takeLatest(
      GET_COMBOS_FILTROS,
      getCombosFiltrosAction
    ),
  ]
}
