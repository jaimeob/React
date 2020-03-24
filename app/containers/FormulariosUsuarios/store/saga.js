// import { take, call, put, select } from 'redux-saga/effects';
import {
  // take,
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import {
  isRequestOk,
} from 'utils/helpers';
import moment from 'moment';
import {
  getFormsUserApi,
  getAssignedFormsApi,
  saveChangesFormulario,
} from './api';
import makeSelectFormulariosUsuarios from './selectors';
import Actions from './actions';

const {
  REQUEST_GET_ASSIGNED_FORMS,
  REQUEST_GET_ASSIGNED_FORMS_SUCCESS,
  REQUEST_GET_ASSIGNED_FORMS_FAILED,
  // CHANGE_SELECTED_USER,
  REQUEST_SAVE_CHANGES,
  REQUEST_SAVE_CHANGES_SUCCESS,
  REQUEST_SAVE_CHANGES_FAILED,
} = Actions.getConstants();
/**
 * status: identifica el filtrado de los datos (activo o inactivo).
 * @param { status } action 
 */
export function* getFormsUser(action) {
  const {
    user,
  } = action
  const {
    status,
    data,
  } = yield call(getFormsUserApi, {user});
  // console.log('getFormsUserApi data', data)
  if (isRequestOk(status)) {
    yield put(
      Actions.get('REQUEST_GET_FORMS_USER_SUCCESS').fn(data, status),
    );
  }
}

export function* reqGetAssignedFormsSaga(action) {
  try {
    // TODO: Deberá obtener el ID del usuario para filtrar
    //       los departamentos por usuario.
    const formulariosAsignados = yield select(makeSelectFormulariosUsuarios());
    const {
      frontend: {
        selectedUser: {
          NoEmpleado: id = null,
          NoEmpleadoAsigna = null,
        },
      },
    } = formulariosAsignados;
    console.log('before response from GET_ASSIGNED_FOMRMS_SUCCESS', action)
    const resp = yield call(getAssignedFormsApi, id, NoEmpleadoAsigna);
    const {
      status,
      data,
    } = resp;
    if (isRequestOk(status)) {
      yield put({
        type: REQUEST_GET_ASSIGNED_FORMS_SUCCESS,
        data,
      })
    } else {
      yield put({
        type: REQUEST_GET_ASSIGNED_FORMS_FAILED,
        message: 'No se pudieron obtener los formularios asignados',
        data,
      })
    }
  } catch (error) {
    yield put({
      type: REQUEST_GET_ASSIGNED_FORMS_FAILED,
      error,
      message: 'catch error',
    })
  }
}

// export function* verifyChanged(action) {
//   const {
//     user: {
//       NoEmpleado: id,
//     },
//     prevId,
//   } = action;
//   console.log('verifyChanged action', action)
//   // if (prevId !== id) {
//   //   yield call(reqGetAssignedFormsSaga);
//   // }
// }

export function* requestSaveConfigForm(action) {
  try {
    const formulariosUsuarios = yield select(makeSelectFormulariosUsuarios());
    const {
      Finalizar = false,
    } = action;
    const {
      frontend: {
        selectedForm: {
          FormularioId = null,
          Componentes = [],
        },
      },
    } = formulariosUsuarios;
    const FechaActualizacion = moment(Date.now()).format('YYYY/MM/DD HH:mm:ss');
    const body = {
      Componentes,
      FechaActualizacion,
      Finalizar,
    };
    const resp = yield call(
      saveChangesFormulario,
      body,
      FormularioId,
    );
    const {
      data,
      status,
      config,
    } = resp;
    if (isRequestOk(status)) {
      yield put({
        type: REQUEST_SAVE_CHANGES_SUCCESS,
        data,
      })
    } else {
      yield put({
        type: REQUEST_SAVE_CHANGES_FAILED,     
        message: 'No se pudieron guardar los cambios correctamente',
        payload: {
          config,
        },
      })
    }
  } catch (error) {
    yield put({
      type: REQUEST_SAVE_CHANGES_FAILED,     
      message: 'Ocurrió un error en el servidor.',
      payload: error,
    })
  }
}

// Individual exports for testing
export default function* listadoFormularioSaga() {
  // See example in containers/HomePage/saga.js
 
  yield takeLatest(Actions.get('REQUEST_GET_FORMS_USER').id, getFormsUser);
  // yield takeLatest(CHANGE_SELECTED_USER, verifyChanged);
  yield takeLatest(REQUEST_GET_ASSIGNED_FORMS, reqGetAssignedFormsSaga);
  yield takeLatest(REQUEST_SAVE_CHANGES, requestSaveConfigForm);
  
}
