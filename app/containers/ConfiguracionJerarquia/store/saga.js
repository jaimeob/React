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
import _ from 'lodash';
import {
  getData,
  updateStatusData,
  getDepartmentsAndPositions,
  postJerarquia,
  editJerarquia,
  getNombreJerarquia,
} from './api';
import Actions from './actions';
import { obtenerPermisos } from '../../../services/api';

const {
  REQUEST_GET_DATA,
  REQUEST_UPDATE_STATUS_DATA,
  REQUEST_GET_DEPARTMENTS_AND_POSITIONS,
  REQUEST_POST_JERARQUIA,
  REQUEST_EDIT_JERARQUIA,
  OBTENER_PERMISOS,
  REQUEST_NAME,
} = Actions.getConstants();

const {
  CHANGE_SPINNER,
} = ActionsSpinner.getConstants();

export function* requestGetDataSaga() {
  yield put({
    type: CHANGE_SPINNER,
    status: true,
  });

  const {
    status,
    data,
  } = yield call(getData);

  if(status === 200) {
    yield put(
      Actions.get('SET_DATA').fn(data.data.filter(el => el.NombreDepartamento !== null))
    );
  } else {
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
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

export function* requestUpdateStatusDataSaga(action) {
  const {
    status: selectedStatus,
    dataIds,
  } = action;

  const idUsuario = yield select((state) => state.getIn(['global', 'currentUser', 'UsuarioId']));

  const {
    status,
    data,
  } = yield call(updateStatusData, selectedStatus, dataIds, idUsuario);

  if(status === 200) {
    if(selectedStatus === 0){
      yield put(
        Actions.get('SET_MODAL_DELETE').fn()
      );

      yield put(
        Actions.get('SET_DATA').fn(data.data)
      );

      yield put(
        enqueueSnackbar({ 
          // message: data.message,
          message: 'El registro ha sido eliminado correctamente',
          options: { 
            variant: 'success', 
          }, 
        })
      ) 
    } else {
      yield put(
        Actions.get('SET_DATA').fn(data.data)
      );
      
      yield put(
        enqueueSnackbar({ 
          // message: data.message,
          message: 'El registro ha sido activado correctamente',
          options: { 
            variant: 'success', 
          }, 
        })
      ) 
    }
  } else {
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'Error al obtener los registros',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }
}

export function* requestGetDepartmentsAndPositionsSaga() {
  const {
    status,
    data: {
      data: {
        departments,
        positions,
      },
    },
  } = yield call(getDepartmentsAndPositions);
  // debugger;
  if(status === 200) {
    yield put(
      Actions.get('SET_DEPARTMENTS_AND_POSITIONS').fn(departments, positions)
    );
  } else {
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'Error al obtener los registros',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }
}

function flattenMyTree(tree) {
  function recurse(nodes, path) {
    return _.map(nodes, (node) => {
      const newPath = _.union(path, [node.id]);
      return [
        // _.assign({pathname: newPath.join(' > '), level: path.length}, _.omit(node, 'children')),
        _.assign({idPadre: newPath[newPath.findIndex((id) => id === node.id) - 1] || null}, _.omit(node, 'children')),
        recurse(node.children, newPath),
      ];
    });
  }
  return _.flattenDeep(recurse(tree, []));
}

export function* requestPostJerarquiaSaga() {
  yield put({
    type: CHANGE_SPINNER,
    status: true,
  });

  const idUsuario = yield select((state) => state.getIn(['global', 'currentUser', 'UsuarioId']));
  const jerarquia = yield select((state) => state.getIn(['configuracionJerarquia', 'registrarJerarquia', 'frontend', 'jerarquia']).toJS());
  const selectedDepartment = yield select((state) => state.getIn(['configuracionJerarquia', 'registrarJerarquia', 'frontend', 'selectedDepartment'])
    .toJS()
    .map(el => el.value)
  );
  const idJerarquia = yield select((state) => state.getIn(['configuracionJerarquia', 'registrarJerarquia', 'frontend', 'idJerarquia']));
  const imageFile = yield select((state) => state.getIn(['configuracionJerarquia', 'registrarJerarquia', 'frontend', 'imageFile']));
  const name = yield select((state) => state.getIn(['configuracionJerarquia', 'registrarJerarquia', 'frontend', 'name']));
  
  const postData = {
    idUsuario,
    jerarquia,
    selectedDepartment,
    idJerarquia,
    imageFile,
    name,
    puestosPadre: [... new Set(flattenMyTree(jerarquia).filter(puesto => puesto.idPadre !== null).map(puesto => puesto.idPadre))], // Set es para eliminar duplicados del array
    puestosHijo: flattenMyTree(jerarquia).filter(puesto => puesto.idPadre !== null).map(puesto => ({ id: puesto.id, idPadre: puesto.idPadre })),
  };

  const {
    status,
    data,
  } = yield call(postJerarquia, postData);
 
  if(status === 200 && data.hijos.length > 0){
    yield put(
      enqueueSnackbar({ 
        message: `Los puestos ${data.hijos.map(el => el.Nombre).join(', ')} ya son hijos de otro puesto.`,
        options: { 
          variant: 'warning', 
        }, 
      })
    );
  } else {
    if(status === 200 && data.data.length > 0) {
      yield put(
        Actions.get('RESET_LISTADO_JERARQUIA').fn(data.data)
      );
  
      yield put(
        enqueueSnackbar({ 
          message: 'Los datos fueron guardados correctamente',
          options: { 
            variant: 'success', 
          }, 
        })
      );
    } else {
      yield put(
        enqueueSnackbar({ 
          // message: data.message,
          message: 'Error al guardar la jerarquía',
          options: { 
            variant: 'error', 
          }, 
        })
      )
    }
  }

  yield put({
    type: CHANGE_SPINNER,
    status: false,
  });
}

export function* requestEditJerarquiaSaga(action) {  
  const {
    status,
    data,
  } = yield call(editJerarquia, action.id);

  if(status === 200 && data.data.length > 0) {
    yield put(
      Actions.get('SET_EDIT_JERARQUIA').fn(data.data[0])
    );
  } else {
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'Error al obtener los datos',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }
}

export function* obtenerPermisosSaga(){
  const paramsPermisos = yield select((state) => state.getIn(['global','paramsPermisos']).toJS());
  const idUsuario = yield select((state) => state.getIn(['global', 'currentUser', 'UsuarioId']));
  /*
  const paramsPermisos = {
    funcionId: 2501,
    idModulo: 2238,
    idRolEmpresa: 1250,
  }
  */
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

export function* setNameSaga(action){
  const idJerarquia = yield select((state) => state.getIn(['configuracionJerarquia','registrarJerarquia', 'frontend', 'idJerarquia']));
  const {
    name,
  } = action;

  if(name === ''){
    return;
  }

  /*
  const paramsPermisos = {
    funcionId: 2501,
    idModulo: 2238,
    idRolEmpresa: 1250,
  }
  */
  const {
    status,
    data,
  } = yield call(getNombreJerarquia, idJerarquia, name);

  if(status === 200){
    if(data.data[0].existeJerarquia === 0){
      yield put(
        Actions.get('SET_ERROR').fn(false, ''),
      );
    } else {
      yield put(
        Actions.get('SET_ERROR').fn(true, 'El nombre de la jerarquía ya existe'),
      );
    }

    /*
    yield put(
      Actions.get('SET_NAME').fn(name),
    );
    */
  } else{
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'Error al consultar la jerarquía',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }
}

// Individual exports for testing
export default function* configuracionJerarquia() {
  // See example in containers/HomePage/saga.js
  yield [
    takeLatest(REQUEST_GET_DATA, requestGetDataSaga),
    takeLatest(REQUEST_UPDATE_STATUS_DATA, requestUpdateStatusDataSaga),
    takeLatest(REQUEST_GET_DEPARTMENTS_AND_POSITIONS, requestGetDepartmentsAndPositionsSaga),
    takeLatest(REQUEST_POST_JERARQUIA, requestPostJerarquiaSaga),
    takeLatest(REQUEST_EDIT_JERARQUIA, requestEditJerarquiaSaga),
    takeLatest(OBTENER_PERMISOS, obtenerPermisosSaga),
    takeLatest(REQUEST_NAME, setNameSaga),
  ];
}
