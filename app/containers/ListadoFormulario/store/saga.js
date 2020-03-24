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
import {
  getDeptosFormsApi,
  getUsersSentApi,
  getAsignedUsersByDepsApi,
  getUsersDepartamentApi,
  // getFormsAssingApi,
  assignFormToEmployeeApi,
} from './api';
import Actions from './actions';
import makeSelectListadoFormulario from './selectors';


const {
  REQUEST_TOGGLE_ASSIGNATIONS,
  REQUEST_DEPARTAMENTS_FORMS_LIST,
  HANDLE_CLICK_BUTTON_ADD_USERS,
  REQUEST_FORMS_TEMPLATES,
  REQUEST_FORMS_TEMPLATES_SUCCESS,
  REQUEST_FORMS_ASSIGN,
} = Actions.getConstants();

/**
 * status: identifica el filtrado de los datos (activo o inactivo).
 * @param { status } action 
 */
export function* getDeptosForms(action) {
  const {
    user,
  } = action
  const {
    status,
    data,
    config,
  } = yield call(getDeptosFormsApi, user);
  // console.log('getDeptosForms data', data)
  console.log('CONFIG: getUserSent: ', config)
  if (isRequestOk(status)) {
    yield put(
      Actions.get('REQUEST_DEPARTAMENTS_FORMS_LIST_SUCCESS').fn(data, status),
    );
  }
}

export function* getUsersSent(action) {
  const {
    formulario,
    formulario: {
      IdConfigFormulario,
      IdDepartamento,
    },
    departamentId,
    idMongoDepartament,
    // configFormularioId,
  } = action;
  const resp = yield call(getUsersSentApi, IdDepartamento, IdConfigFormulario);
  console.log('getUsersSent resp', resp)
  const {
    status,
    data,
  } = resp;
  if (isRequestOk(status)) {
    // yield put(
    //   Actions
    //     .get('REQUEST_FORMS_ASSIGN')
    //     .fn(IdDepartamento, IdConfigFormulario),
    // );
    const payload = {
      formulario: {
        ...formulario,
        Componentes: JSON.parse(formulario.Componentes),
      },
      dataUsersSent: data,
      departamentId,
      idMongoDepartament,
      status,
    }
    yield put({
      type: REQUEST_FORMS_TEMPLATES_SUCCESS,
      ...payload,
    })
  }
}

export function* getFormsAssing(action) {
  // const { departamentId } = action;
  console.log('getFormsAssing action', action)
  const {
    status,
    data,
  } = yield call(getAsignedUsersByDepsApi, action); // TODO CONSUMIR MÉTODO PROPIO
  if (isRequestOk(status)) {
    yield put(
      Actions.get('REQUEST_FORMS_ASSIGN_SUCCESS').fn(data, status),
    );
  } 
}

export function* getUsersDepartament() {
  try {
    const listadoFormulario = yield select(makeSelectListadoFormulario());
    const {
      frontend: {
        selectedConfig: {
          IdDepartamento = null,
        },
      },
    } = listadoFormulario;
  
    const {
      status,
      data,
    } = yield call(getUsersDepartamentApi, IdDepartamento);
    console.log('data from api call', data)
    // TODO: lISTAR LOS EMPLEADOS POR DEPARTAMENTOS 
    if (isRequestOk(status)) {
      yield put(
        Actions.get('HANDLE_CLICK_BUTTON_ADD_USERS_SUCCESS').fn(data, status),
      );
    }
  } catch (error) {
    console.log('error in getUsersDepartament: ', error)
  }
}

export function* toggleAssignations({ type }) {
  try {
    const listadoFormulario = yield select(makeSelectListadoFormulario());
    const {
      frontend: {
        assignList: {
          dataSent = [],
        },
        configuracionformulario,
        configuracionformulario: {
          // FormularioId = '',
          IdConfigFormulario = '',
          IdDepartamento = '',
        },
      },
    } = listadoFormulario;
    const NoEmpleadoAsigna = 27197;
    const empleados = dataSent
      .filter((item) => !item.deleted)
      .map((item) => item.NoEmpleado || 0);
    const body = {
      IdConfigFormulario,
      IdDepartamento,
      NoEmpleadoAsigna,
      empleados,
    };
    console.log('configuracionformulario before call', configuracionformulario)
    const resp = yield call(assignFormToEmployeeApi, body)
    // const {
    //   status,
    //   data,
    // } = resp;
    console.log(`RESPONSE_${type}`, resp);
    console.log('toggleAssignations listadoFormulario', listadoFormulario)
  } catch (error) {
    console.log(error);
  }
}
// Individual exports for testing
export default function* listadoFormularioSaga() {
  // See example in containers/HomePage/saga.js
 
  yield takeLatest(REQUEST_DEPARTAMENTS_FORMS_LIST, getDeptosForms);
  yield takeLatest(HANDLE_CLICK_BUTTON_ADD_USERS, getUsersDepartament);
  yield takeLatest(REQUEST_FORMS_TEMPLATES, getUsersSent);
  yield takeLatest(REQUEST_FORMS_ASSIGN, getFormsAssing);
  yield takeLatest(REQUEST_TOGGLE_ASSIGNATIONS, toggleAssignations);
}
