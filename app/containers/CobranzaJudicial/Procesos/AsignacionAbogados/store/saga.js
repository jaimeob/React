// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { enqueueSnackbar } from 'reducers/notifications/actions';
import { obtenerPermisos } from '../../../../../services/api';

import { 
  getPlazas,
  getYearApi,
  getCompanysApi,
  getDatesApi,
  getListClientsApi,
  getLawyersApi,
  getTypesCarterasApi,
  getLayoutAsignacionApi,
  postGuardarAsignacionAbogadoApi,
  postDesactivarAsignacionAbogadoApi,
} from './api'
import Actions from './actions';
const {
  SET_PLAZAS,
  REQUEST_GET_YEAR,
  REQUEST_GET_COMPANYS,
  REQUEST_GET_DATES,
  REQUEST_GET_LIST_CLIENTS,
  REQUEST_GET_LAWYERS,
  REQUEST_GET_TYPES_CARTERAS,
  POST_GUARDAR_ASIGNACION,
  DESACTIVAR_ASIGNACION,
  HANDLE_CHANGE_COMPANY,
  HANDLE_OPEN_MODAL,
  OBTENER_PERMISOS,
} = Actions.getConstants();

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

export function* getYear() {
  const {
    status,
    data,
  } = yield call(getYearApi)

  if(status === 200) {
    yield put(
      Actions.get('REQUEST_GET_YEAR_SUCCESS').fn(data, status),
    );
    if(data.length === 0) {
      yield put(
        enqueueSnackbar({ 
          message: 'No se encontro el año',
          options: {
            variant: 'warning', 
          }, 
        })
      )
    }
  } else {
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'Error al obtener el año',
        options: {
          variant: 'error', 
        }, 
      })
    )
  }
}

export function* getCompanys() {
  const {
    status,
    data,
  } = yield call(getCompanysApi)

  if(status === 200) {
    yield put(
      Actions.get('REQUEST_GET_COMPANYS_SUCCESS').fn(data, status),
    );
    if(data.length === 0) {
      yield put(
        enqueueSnackbar({ 
          message: 'No se encontraron empresas registradas',
          options: {
            variant: 'warning', 
          }, 
        })
      )
    }
  } else {
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'Error al obtener las empresas',
        options: {
          variant: 'error', 
        }, 
      })
    )
  }
}

export function* getDates(action) {
  const {
    companySelected,
  } = action

  const {
    status,
    data,
  } = yield call(getDatesApi, companySelected)

  if(status === 200) {
    yield put(
      Actions.get('REQUEST_GET_DATES_SUCCESS').fn(data, status),
    );
    if(data.length === 0) {
      yield put(
        enqueueSnackbar({ 
          message: 'No se encontraron fechas registradas',
          options: {
            variant: 'warning', 
          }, 
        })
      )
    }
  } else {
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'Error al obtener las fechas',
        options: {
          variant: 'error', 
        }, 
      })
    )
  }
}

export function* getListClients(action) {
  const {
    payload,
  } = action
  const {
    status,
    data,
  } = yield call(getListClientsApi, payload)

  if(status === 200) {
    yield put(
      Actions.get('REQUEST_GET_LIST_CLIENTS_SUCCESS').fn(data, status),
    );
    if(data.length === 0) {
      yield put(
        enqueueSnackbar({ 
          message: 'No se encontró información de la fecha seleccionada',
          options: {
            variant: 'warning', 
          }, 
        })
      )
    }
  } else {
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'Error al obtener listado',
        options: {
          variant: 'error', 
        }, 
      })
    )
  }

  const {
    status: statusLayout,
    data: dataLayout,
  } = yield call(getLayoutAsignacionApi, action.payload.companySelected);

  if(statusLayout === 200 && dataLayout.data[0].cabeceras.length > 0){
    yield put(
      Actions.get('SET_LAYOUT_COLUMNS').fn(dataLayout.data[0].cabeceras),
    );
  }
}

export function* getLawyers() {

  const {
    status,
    data,
  } = yield call(getLawyersApi)

  if(status === 200) {
    yield put(
      Actions.get('REQUEST_GET_LAWYERS_SUCCESS').fn(data, status),
    );
    if(data.data.length === 0) {
      yield put(
        enqueueSnackbar({ 
          message: 'No se encontraron abogados activos',
          options: {
            variant: 'warning', 
          }, 
        })
      )
    }
  } else {
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'Error al obtener abogados',
        options: {
          variant: 'error', 
        }, 
      })
    )
  }
}

export function* getTypesCarteras() {

  const {
    status,
    data,
  } = yield call(getTypesCarterasApi)

  if(status === 200) {
    yield put(
      Actions.get('REQUEST_GET_TYPES_CARTERAS_SUCCESS').fn(data, status),
    );
    if(data.data.length === 0) {
      yield put(
        enqueueSnackbar({ 
          message: 'No se encontraron carteras en el catalogo',
          options: {
            variant: 'warning', 
          }, 
        })
      )
    }
  } else {
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'Error al obtener los tipos de carteras',
        options: {
          variant: 'error', 
        }, 
      })
    )
  }
}

export function* postGuardarAsignacion(action) {

  const clientes = yield select(state => state.getIn( ['asignacionAbogados', 'backend', 'rows']).toJS()  )
  const idUsuario = yield select(state => state.getIn(['global', 'currentUser', 'UsuarioId']))
  
  const client = clientes.find(cliente => cliente.Id ===  action.data.clientSelected);
  
  action.data.idEtapa = client.idEtapa;
  action.data.idAbogado = client.idAbogado;
  action.data.NomCliente = client.NomCliente;
  action.data.NomPlaza = client.NomPlaza || client.NomMunicipio;
  action.data.ProcesoJudicialId = client.ProcesoJudicialId;
  action.data.TipoCartera = client.TipoCartera;
  action.data.usuario = idUsuario;
  action.data.clientSelected = client.NumCliente;
  /*
  if(action.data.idAbogado === 0 && action.data.lawyerSelected === 0){
    yield put(
      enqueueSnackbar({ 
        message: 'Es necesario seleccionar un abogado',
        options: {
          variant: 'warning', 
        }, 
      })
    )
    return;
  }
  */
  const {
    status,
    // data,
  } = yield call(postGuardarAsignacionAbogadoApi, action.data)
 
  if(status === 200) {
    yield put(
      enqueueSnackbar({ 
        message: 'Datos guardados con exito',
        options: {
          variant: 'success', 
        }, 
      })
    );

    yield put({
      type: HANDLE_OPEN_MODAL,
      open: false,
      dialog: 'modalAssign',
    });

    const year = yield select(state => state.getIn( ['asignacionAbogados', 'frontend', 'year']))
    const companySelected = yield select(state => state.getIn( ['asignacionAbogados', 'frontend', 'companySelected']))
    const dateId = yield select(state => state.getIn( ['asignacionAbogados', 'frontend', 'retailWeek']))

    const payload = {
      year,
      companySelected,
      dateId,
    }
  
    const {
      status: statusDos,
      data,
    } = yield call(getListClientsApi, payload)
    
    if(statusDos === 200) {
      yield put(
        Actions.get('REQUEST_GET_LIST_CLIENTS_SUCCESS').fn(data, statusDos),
      );
      if(data.length === 0) {
        yield put(
          enqueueSnackbar({ 
            message: 'No se encontró información de la fecha seleccionada',
            options: {
              variant: 'warning', 
            }, 
          })
        )
      }

    } else {
      yield put(
        enqueueSnackbar({ 
          // message: data.message,
          message: 'Error al desactivar el registro',
          options: {
            variant: 'error', 
          }, 
        })
      )
    }
  } else {
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'Error al guardar los datos',
        options: {
          variant: 'error', 
        }, 
      })
    )
  }
}

export function* postDesactivarAsignacion(action) {

  const clientes = yield select(state => state.getIn( ['asignacionAbogados', 'backend', 'rows']).toJS()  )
  const idUsuario = yield select(state => state.getIn(['global', 'currentUser', 'UsuarioId']))
  const client = clientes.find(cliente => cliente.Id ===  action.data.clientSelected);  
  action.data.idAbogado = client.idAbogado;
  action.data.NumCliente = client.NumCliente;
  action.data.usuario = idUsuario; 
  
  if(action.data.idAbogado === 0){
    yield put(
      enqueueSnackbar({ 
        message: 'El cliente no se puede eliminar, porque no tiene asignado un abogado',
        options: {
          variant: 'warning', 
        }, 
      })
    )
    return;
  }
  
  const {
    status,
    // data,
  } = yield call(postDesactivarAsignacionAbogadoApi, action.data)

  if(status === 200) {
    
    yield put(
      enqueueSnackbar({ 
        message: 'Datos eliminados con exito',
        options: {
          variant: 'success', 
        }, 
      })
    );
    
    yield put({
      type: HANDLE_OPEN_MODAL,
      open: false,
      dialog: 'modalDelete',
    });

    const year = yield select(state => state.getIn( ['asignacionAbogados', 'frontend', 'year']))
    const companySelected = yield select(state => state.getIn( ['asignacionAbogados', 'frontend', 'companySelected']))
    const dateId = yield select(state => state.getIn( ['asignacionAbogados', 'frontend', 'retailWeek']))

    const payload = {
      year,
      companySelected,
      dateId,
    }
  
    const {
      status: statusDos,
      data,
    } = yield call(getListClientsApi, payload)
  
    if(statusDos === 200) {
      yield put(
        Actions.get('REQUEST_GET_LIST_CLIENTS_SUCCESS').fn(data, statusDos),
      );
      if(data.length === 0) {
        yield put(
          enqueueSnackbar({ 
            message: 'No se encontró información de la fecha seleccionada',
            options: {
              variant: 'warning', 
            }, 
          })
        )
      }

    } else {
      yield put(
        enqueueSnackbar({ 
          // message: data.message,
          message: 'Error al desactivar el registro',
          options: {
            variant: 'error', 
          }, 
        })
      )
    }
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

export default function* asignacionAbogadosSaga() {
  // See example in containers/HomePage/saga.js
  yield [
    takeLatest('COBRANZAJUDICIAL/PROCESOS/ASIGNACIONABOGADOS/GET_PLAZAS_ACTION', ObtenerPlazas),
  ]
  yield takeLatest(REQUEST_GET_YEAR, getYear);
  yield takeLatest(REQUEST_GET_COMPANYS, getCompanys);
  yield takeLatest(REQUEST_GET_DATES, getDates);
  yield takeLatest(REQUEST_GET_LIST_CLIENTS, getListClients);
  yield takeLatest(REQUEST_GET_LAWYERS, getLawyers);
  yield takeLatest(REQUEST_GET_TYPES_CARTERAS, getTypesCarteras);
  yield takeLatest(POST_GUARDAR_ASIGNACION, postGuardarAsignacion)
  yield takeLatest(DESACTIVAR_ASIGNACION, postDesactivarAsignacion)
  yield takeLatest(OBTENER_PERMISOS,obtenerPermisosSaga);
}
