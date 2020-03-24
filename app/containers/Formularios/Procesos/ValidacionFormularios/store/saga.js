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
  getUsuarios,
  validarFormulario,
} from './api';
import Actions from './actions';

const {
  REQUEST_GET_ENCUESTAS,
  REQUEST_GET_DEPARTAMENTOS_PUESTOS,
  REQUEST_SHOW_ENCUESTA,
  GET_USUARIOS,
  POST_VALIDACION,
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
    const reportes =  params.tipoFormulario === 'REFFOR'
      ? data.recordset.filter(reporte => reporte.RequiereValidacion)
      : data.recordset

    yield put(
      Actions.get('SET_ENCUESTAS').fn(reportes)
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
  
  if(status === 200 && data.recordset.length > 0) {
    yield put(
      Actions.get('SET_ENCUESTA_DETALLE').fn(data.recordset[0], action.id)
    );    

    yield put(
      Actions.get('SET_USUARIOS_ASIGNADOS').fn(data.recordset[0].UsuariosAsignaciones)
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

export function* getUsuariosAction() {
  try {
    const usuarios = yield call(getUsuarios);

    if(usuarios.status === 200){
      yield put(
        Actions.get('SET_USUARIOS').fn(usuarios.data)
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener los usuarios',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* postValidacionAction() {
  yield put({
    type: CHANGE_SPINNER,
    status: true,
  });
  try {
    const front = yield select((state) => state.getIn(['reporteEncuestas', 'encuestasNuevo', 'frontend']).toJS());
    const usuarioCreacion = yield select((state) => state.getIn(['global', 'currentUser', 'UsuarioId']));

    const datos = {
      idAsignacion: front.idAsignacion,
      comentario: front.comentario,
      usuario: front.usuario.value,
      estatus: front.estatus,
      usuarioCreacion,
    }
    
    if (datos.comentario === null || datos.usuario === null){
      yield put(
        enqueueSnackbar({
          message: 'Es necesario asignar un usuario y un comentario para continuar',
          options: {
            variant: 'warning',
          },
        })
      );
    } else {
      const {
        status,
      } = yield call(validarFormulario, datos);
    
      if(status === 200){
        yield put(
          Actions.get('SET_MODAL_BACK').fn()
        );
        yield put(
          Actions.get('CLOSE_MODAL').fn()
        );
        yield put(
          enqueueSnackbar({
            message: 'La validación fue realizada correctamente',
            options: {
              variant: 'success',
            },
          })
        );
      } else{
        yield put(
          enqueueSnackbar({ 
            // message: data.message,
            message: 'Error al realizar la validacion',
            options: { 
              variant: 'error', 
            }, 
          })
        )
      }
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Error al realizar la validacion',
        options: {
          variant: 'error',
        },
      })
    );
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
    takeLatest(GET_USUARIOS, getUsuariosAction),
    takeLatest(POST_VALIDACION, postValidacionAction),
  ];
}
