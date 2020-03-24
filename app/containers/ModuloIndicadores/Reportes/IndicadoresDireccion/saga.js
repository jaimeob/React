import { takeLatest, call, put, select } from 'redux-saga/effects';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';
import ActionsSpinner from 'components/Spinner/store/actions'
import Actions from './actions';

import {
  getFiltros,
  getPuestos,
  getDatos,
} from './api';

export const {
  GET_FILTROS,
  GET_DEPARTAMENTO_PUESTOS,
  ON_CLICK_FILTRAR,
} = Actions.getConstants();

const {
  CHANGE_SPINNER, 
} = ActionsSpinner.getConstants();

export function* getFiltrosSaga() {
  try {
    yield put({
      type: CHANGE_SPINNER,
      status: true,
    });
    
    const {
      status,
      data = [],
    } = yield call(getFiltros);
    
    yield put({
      type: CHANGE_SPINNER,
      status: false,
    });

    if(status === 200){
      yield put(
        Actions.get('SET_FILTROS').fn(data)
      );
    } else {
      yield put(
        enqueueSnackbar({
          message: data.message,
          options: {
            variant: 'error',
          },
        })
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener los filtros',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getDepartamentoPuestosSaga(action){
  try {
    yield put({
      type: CHANGE_SPINNER,
      status: true,
    });
    
    const {
      status,
      data = [],
    } = yield call(getPuestos, action.idDepartamento);
    
    yield put({
      type: CHANGE_SPINNER,
      status: false,
    });

    if(status === 200){
      yield put(
        Actions.get('SET_DEPARTAMENTO_PUESTOS').fn(data)
      );
    } else {
      yield put(
        enqueueSnackbar({
          message: data.message,
          options: {
            variant: 'error',
          },
        })
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener los puestos',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* onClickFiltrarSaga(){
  try {
    yield put({
      type: CHANGE_SPINNER,
      status: true,
    });
    
    const filtros = yield select(state => state.getIn(
      ['indicadoresDireccion', 'principales', 'filtros']
    ).toJS())
    
    const datos = {
      idPeriodo: filtros.periodoSlc,
      idDireccion: filtros.direccionSlc || null,
      idPlaza: filtros.plazaSlc || null,
      idDepartamento: filtros.departamentoSlc || null,
      idPuesto: filtros.puestoSlc || null,
      idFormato: filtros.formatoEvalSlc || null,
    };
    
    const {
      status,
      data = [],
    } = yield call(getDatos, datos);

    yield put({
      type: CHANGE_SPINNER,
      status: false,
    });

    if(status === 200){
      yield put(
        Actions.get('SET_DATOS').fn(data)
      );
    } else {
      yield put(
        enqueueSnackbar({
          message: data.message,
          options: {
            variant: 'error',
          },
        })
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener los datos',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export default function* indicadoresDireccionSaga() {
  yield [
    takeLatest(
      GET_FILTROS,
      getFiltrosSaga
    ),
    takeLatest(
      GET_DEPARTAMENTO_PUESTOS,
      getDepartamentoPuestosSaga,
    ),
    takeLatest(
      ON_CLICK_FILTRAR,
      onClickFiltrarSaga,
    ),
  ]
}

