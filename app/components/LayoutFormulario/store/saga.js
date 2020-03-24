


import {
  call,
  put,
  takeLatest,
  select,
} from 'redux-saga/effects';
// import every from 'lodash/every';
import {
  obtenerDepartamentos,
} from 'services/api';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';

import {
  isRequestOk,
} from 'utils/helpers';
import isDate from 'lodash/isDate';
import sortBy from 'lodash/sortBy';
// import moment from 'moment';
import {
  validarNombreFormulario,
  obtenerFormularios,
  getFormsListApi,
  updateStatusFormsListApi,
  crearConfiguracionBaseFormApi,
  crearConfiguracionDetBaseFormApi,
  eliminarComponentesPorConfiguracion,
  publicarConfiguracionFormApi,
  // activarConfiguracionFormApi,
  desactivarConfiguracionFormApi,
} from './api';
import Actions from './actions';
import {
  makeSelectOnlyFormularios,
} from './selectors';

const {
  REQUEST_SAVE_CONFIGURACION_FORM,
  REQUEST_SAVE_CONFIGURACION_FORM_SUCCESS,
  REQUEST_SAVE_CONFIGURACION_FORM_FAILED,
  REQUEST_SAVE_DET_CONFIGURACION_FORM,
  REQUEST_SAVE_DET_CONFIGURACION_FORM_SUCCESS,
  REQUEST_SAVE_DET_CONFIGURACION_FORM_FAILED,
  REQUEST_PUBLISH_CFG_FORM,
  REQUEST_PUBLISH_CFG_FORM_SUCCESS,
  REQUEST_PUBLISH_CFG_FORM_FAILED,
  REQUEST_DEPARTAMENTOS,
  REQUEST_VALIDATE_NOMBRE_FORM,
  REQUEST_FORMULARIOS,
  REQUEST_FORMS_LIST,
  REQUEST_UPDATE_STATUS_FORMS_LIST,
  HANDLE_STEP_GO_NEXT,
  REQUEST_FORMS_LIST_SUCCESS,
  REQUEST_FORMS_LIST_FAILED,
  REQUEST_DESACTIVAR_CONFIGURACION,
  // REQUEST_DESACTIVAR_CONFIGURACION_SUCCESS,
  CLONE_COMPONENTS,
  REQUEST_DESACTIVAR_CONFIGURACION_SUCCESS,
  REQUEST_DESACTIVAR_CONFIGURACION_FAILED,
} = Actions.getConstants();

// snackbar function helper
const allRequestsAreOk = ({ status }) => status === 200;

export function* snackbar(message = '', variant = 'default') {
  const snackbarStates = [
    'success',
    'warning',
    'error',
    'info',
    'default',
  ]
  if (snackbarStates.includes(variant)) {
    yield put(
      enqueueSnackbar({
        message,
        options: {
          variant,
        },
      })
    )
  }
}

export function* getDepartamentos() {
  const {
    status,
    data,
  } = yield call(obtenerDepartamentos);
  if (isRequestOk(status)) {
    yield put(
      Actions.get('REQUEST_DEPARTAMENTOS_SUCCESS').fn(data, status),
    );
  }
}

export function* getFormularios() {
  const {
    status,
    data,
  } = yield call(obtenerFormularios);
  // console.log('obtenerFormularios data', data)
  if (isRequestOk(status)) {
    yield put(
      Actions.get('REQUEST_FORMULARIOS_SUCCESS').fn(data, status),
    );
  }
}

/**
 * status: identifica el filtrado de los datos (activo o inactivo).
 * @param { status } action 
 */
export function* getFormsList(action) {
  try {
    const {
      status: tmpStatus = 'A',
    } = action;
    const statusFrm = tmpStatus === 'A' ? 'true' : 'false';
    const {
      status,
      data,
    } = yield call(getFormsListApi, statusFrm);
    if (isRequestOk(status)) {
      // Formateando los datos
      const formatedData = data.length > 0 ?
        data.map((item) => ({
          ...item,
          componentesformularios: sortBy(item.componentesformularios, ['order']),
          nombreDepartamento: item.departamento.nombre,
          nombreFormulario: item.nombre,
          estatus: `${item.activo ? '': 'IN'}ACTIVO`,
          publicado: isDate(new Date(item.fechaPublicacion)) ? 'PENDIENTE': Date(item.fechaPublicacion),
        })) : [];
        // console.log('formatedData', formatedData)
      yield put({
        type: REQUEST_FORMS_LIST_SUCCESS,
        payload: formatedData,
      })
    }
  } catch (error) {
    yield put({
      type: REQUEST_FORMS_LIST_FAILED,
    })
  }
}

/**
 * body: contiene los id que se van actualizar y los campos que se van actualizar.
 * filter: identifica el filtrado de los datos (activo o inactivo).
 * @param { body:{"arrayParams": [{"_id":"id del form"}], "values":{"estatus": true}}, filter } action 
 */
export function* updateStatusFormsList(action) {
  const {
    body,
    filter,
  } = action
  const {
    status,
    // data,
  } = yield call(updateStatusFormsListApi, body);
  if (isRequestOk(status)) {
    yield put(
      Actions.get('REQUEST_FORMS_LIST').fn(filter),
    );
  }
}

export function* saveConfiguracionForm() {
  const requestAction = REQUEST_SAVE_CONFIGURACION_FORM;
  try {
    const formularios = yield select(makeSelectOnlyFormularios());
    const {
      backend: {
        datasources: {
          deptosFormularios = [],
        },
      },
      frontend: {
        form: {
          departamento,
          nombreFormulario: nombre,
          logoFile: {
            url: logoUrl = '',
          },
          formulario: {
            value: formularioId,
          },
        },
      },
    } = formularios;
    const databody = {
      departamento,
      nombre,
      logoUrl,
    };
    const resp = yield call(
      crearConfiguracionBaseFormApi,
      databody
    );
    const {
      status,
      data,
      // config,
    } = resp;
    if (isRequestOk(status)) {
      yield put({
        type: REQUEST_SAVE_CONFIGURACION_FORM_SUCCESS,
        data,
      });
      // CLONAMOS LOS ELEMENTOS:
      const withClonedComponents = deptosFormularios
        .find(
          (item) =>
            item.id === formularioId
        ) || {};
      if (Object.keys(withClonedComponents).length) {
        const {
          componentesformularios = [],
        } = withClonedComponents;
        yield put({
          type: CLONE_COMPONENTS,
          componentesformularios,
        });
      }
      yield put({ type: HANDLE_STEP_GO_NEXT });
    } else {
      let errorMessage = 'Ocurrió un error al momento de crear una configuración ';
      errorMessage += 'de formulario base. Operación no exitosa.'
      yield put({
        type: REQUEST_SAVE_CONFIGURACION_FORM_FAILED,
        requestAction,
        message: errorMessage,
        response: resp,
      });
      yield call(snackbar, errorMessage, 'warning');
    }
  } catch (error) {
    // console.log('catch error', error);
    yield put({
      type: REQUEST_SAVE_CONFIGURACION_FORM_FAILED,
      requestAction,
      message: 'Ocurrió un error en ',
      response: error,
    })
  }
}

export function* saveDetConfiguracionForm() {
  const requestAction = REQUEST_SAVE_DET_CONFIGURACION_FORM;
  try {
    const formularios = yield select(makeSelectOnlyFormularios());
    const {
      backend: {
        payloads: {
          configuracionformulario: {
            id: configuracionformularioId = '',
          },
        },
      },
      frontend: {
        configFormularioForm: {
          configuredComponents = [],
        },
      },
    } = formularios;
    // const orderedComponents = sortBy(configuredComponents, ['order'])
    const orderedComponents = configuredComponents
      .map((item, idx) => ({
        ...item,
        order: (idx + 1),
      }))
    const databody = {
      configuracionformularioId,
      configuredComponents: sortBy(orderedComponents, ['order']),
    };
    const {
      status: delResponseStatus,
    } = yield call(eliminarComponentesPorConfiguracion, configuracionformularioId)
    if (isRequestOk(delResponseStatus)) {
      const responses = yield call(
        crearConfiguracionDetBaseFormApi,
        databody
      );
      if (Array.isArray(responses)) {
        const validResponses = responses.every(allRequestsAreOk);
        if (validResponses) {
          yield call(getFormsList, { status: 'A' });
          yield put({
            type: REQUEST_SAVE_DET_CONFIGURACION_FORM_SUCCESS,
          });
        } else {
          yield put({
            type: REQUEST_SAVE_DET_CONFIGURACION_FORM_FAILED,
            payload: responses,
          });
        }
      }
    }
  } catch (error) {
    yield put({
      type: REQUEST_SAVE_CONFIGURACION_FORM_FAILED,
      requestAction,
      message: 'Ocurrió un error en ',
      response: error,
    })
  }
}

export function* updatePublishCfgForm({ type }) {
  try {
    // OBTENIENDO EL ESTADO
    const formularios = yield select(makeSelectOnlyFormularios());
    const {
      backend: {
        payloads: {
          configuracionformulario: {
            id: configuracionformularioId = '',
          },
        },
      },
    } = formularios;
    const requestBody = {
      configuracionformularioId,
    }
    const {
      status,
      data, // eslint-disable-line
    } = yield call(publicarConfiguracionFormApi, requestBody);
    if (isRequestOk(status)) {
      yield call(getFormsList, { status: 'A' })
      yield put({
        type: REQUEST_PUBLISH_CFG_FORM_SUCCESS,
        nombreFormulario: data.nombre,
      });
    } else {
      yield put({
        type: REQUEST_PUBLISH_CFG_FORM_FAILED,
      })
    }
    // REALIZANDO PETICIÓN A LA API
  } catch (error) {
    yield put({
      type: REQUEST_PUBLISH_CFG_FORM_FAILED,
      message: `Ocurrió un error al concluír la acción ${type}`,
      response: error,
    })
  }
}

export function* updateDeactiveCfgForm({ type }) {
  try {
    // OBTENIENDO EL ESTADO
    const formularios = yield select(makeSelectOnlyFormularios());
    const {
      frontend: {
        ui: {
          selectedConfiguracionId: id,
        },
      },
    } = formularios;
    const requestBody = {
      configuracionformularioId: id,
    }
    const {
      status,
      // data, // TODO
    } = yield call(desactivarConfiguracionFormApi, requestBody);
    if (isRequestOk(status)) {
      yield put({
        type: REQUEST_DESACTIVAR_CONFIGURACION_SUCCESS,
      })
      yield call (getFormsList);
      // yield call(
      //   snackbar,
      //   'Configuración eliminada correctamente',
      //   'success'
      // );
      // TODO: Actualizar el listado de configuraciones
    } else {
      yield put({
        type: REQUEST_DESACTIVAR_CONFIGURACION_FAILED,
      })
    }
    // REALIZANDO PETICIÓN A LA API
  } catch (error) {
    yield put({
      type: REQUEST_DESACTIVAR_CONFIGURACION_FAILED,
      message: `Ocurrió un error al concluír la acción ${type}`,
      response: error,
    })
  }
}

/**
 * 
 * 
 */
export function* validateFormName(action) {
  const actionId = 'REQUEST_VALIDATE_NOMBRE_FORM';
  try {
    const {
      val = '',
      newVal = '',
    } = action;
    const {
      status,
      data,
      request,
    } = yield call(validarNombreFormulario, val)

    if (val !== newVal) {
      if (isRequestOk(status) && !data.length) {
        yield put(
          enqueueSnackbar({
            message: 'Nombre de formulario disponible',
            options: {
              variant: 'success',
            },
          })
        )
        yield put(
          Actions.get('REQUEST_VALIDATE_NOMBRE_FORM_SUCCESS').fn(data, status),
        );
      } else {
        yield put(
          enqueueSnackbar({
            message: 'Ya existe un formulario con ese nombre',
            options: {
              variant: 'error',
            },
          })
        )
        yield put(
          Actions.get('REQUEST_VALIDATE_NOMBRE_FORM_FAILED').fn(
            request,
          )
        );
      }
    }
  } catch (error) {
    yield put(
      Actions.get('REQUEST_FAILED').fn(
        actionId,
        error,
      )
    );
  }
}

export default function* formulariosSaga() {
  // See example in containers/HomePage/saga.js

  yield takeLatest(REQUEST_DEPARTAMENTOS, getDepartamentos);
  yield takeLatest(REQUEST_VALIDATE_NOMBRE_FORM, validateFormName);
  yield takeLatest(REQUEST_FORMULARIOS, getFormularios);
  yield takeLatest(REQUEST_FORMS_LIST, getFormsList);
  yield takeLatest(REQUEST_UPDATE_STATUS_FORMS_LIST, updateStatusFormsList);
  yield takeLatest(REQUEST_SAVE_CONFIGURACION_FORM, saveConfiguracionForm);
  yield takeLatest(REQUEST_PUBLISH_CFG_FORM, updatePublishCfgForm);
  yield takeLatest(REQUEST_SAVE_DET_CONFIGURACION_FORM, saveDetConfiguracionForm);
  yield takeLatest(REQUEST_DESACTIVAR_CONFIGURACION, updateDeactiveCfgForm);
  // yield takeLatest(REQUEST_PUBLISH_CFG_FORM, updatePublishCfgForm);
}



