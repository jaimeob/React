/* eslint-disable no-lonely-if */
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
import ActionsSpinner from 'components/Spinner/store/actions';
import {
  getReportesEncuestas,
  getDepartamentosPuestos,
  getReporteEncuesta,
} from './api';
import Actions from './actions';

const {
  REQUEST_GET_ENCUESTAS,
  REQUEST_GET_DEPARTAMENTOS_PUESTOS,
  REQUEST_SHOW_ENCUESTA,
} = Actions.getConstants();

const {
  CHANGE_SPINNER,
} = ActionsSpinner.getConstants();

export function* requestGetEncuestasSaga(params) {

  yield put({
    type: CHANGE_SPINNER,
    status: true,
  });

  const usuarioId = yield select((state) => state.getIn(['global', 'currentUser', 'UsuarioId']));

  const {
    status,
    data,
  } = yield call(getReportesEncuestas, params.tipoFormulario, usuarioId);
  
  if(status === 200) {
    /*
    const reportes =  params.tipoFormulario === 'REFFOR'
      ? data.recordset.filter(reporte => !reporte.RequiereValidacion)
      : data.recordset
     */
    yield put(
      Actions.get('SET_ENCUESTAS').fn(data.recordset)
    );
    
  } else {
    yield put(
      enqueueSnackbar({ 
        message: 'Error al obtener los registros',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }

  yield put({
    type: CHANGE_SPINNER,
    status: false,
  });
}

export function* requestGetDepartamentosPuestosSaga() {
  const {
    status,
    data: {
      data: {
        departments: departamentos,
        positions: puestos,
      },
    },
  } = yield call(getDepartamentosPuestos);

  if(status === 200) {
    yield put(
      Actions.get('SET_DEPARTAMENTOS_PUESTOS').fn(departamentos, puestos.map(puesto => ({ value: puesto.id, label: puesto.title, idDepartamento: puesto.idDepartamento, referencia: puesto.referencia })))
    );
  } else {
    yield put(
      enqueueSnackbar({ 
        message: 'Error al obtener los registros',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }
}

export function* requestShowEncuestaSaga(action) {
  yield put({
    type: CHANGE_SPINNER,
    status: true,
  });

  const {
    status,
    data,
  } = yield call(getReporteEncuesta, action.id);

  if(status === 200 && data.recordsets.length > 0) {
    yield put(
      Actions.get('SET_ENCUESTA_DETALLE').fn(data.asignacion)
    );    

    yield put(
      Actions.get('SET_USUARIOS_EVALUADOS').fn(data.usuariosEvaluados)
    );

    yield put(
      Actions.get('SET_USUARIOS_EVALUADORES').fn(data.usuariosEvaluadores)
    );

    yield put(
      Actions.get('SET_USUARIOS_AUTORIZADOS').fn(data.usuariosAutorizados)
    );
    
  } else {
    yield put(
      enqueueSnackbar({ 
        message: 'Error al obtener los registros',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }

  yield put({
    type: CHANGE_SPINNER,
    status: false,
  });
}

// Individual exports for testing
export default function* reporteEncuestasSaga() {
  // See example in containers/HomePage/saga.js
  yield [
    takeLatest(REQUEST_GET_DEPARTAMENTOS_PUESTOS, requestGetDepartamentosPuestosSaga),
    takeLatest(REQUEST_GET_ENCUESTAS, requestGetEncuestasSaga),
    takeLatest(REQUEST_SHOW_ENCUESTA, requestShowEncuestaSaga),
  ];
}
