import { takeLatest, call, put, select } from 'redux-saga/effects';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';
import Actions from './actions';
import {
  getListado,
  setListadoActivar,
  setListadoDesactivar,
  getValidaExisteRol,
  getConsultaEmpresas,
  getConsultaModulos,
  getPermisosFuncion,
  getRoles,
  guardarRoles,
  setEmpresasDesactivar,
  setEmpresasActivar,
} from './api';

export const {
  GET_LISTADO,
  SET_LISTADO_ACTIVAR,
  SET_LISTADO_DESACTIVAR,
  GET_VALIDAEXISTEROL,
  GET_EMPRESAS,
  GET_MODULOS,
  GET_MODULO_FUNCION,
  GET_ROLES,
  POST_ROL,
  SET_LISTADO_DESACTIVAR_EMPRESAS,
  SET_LISTADO_ACTIVAR_EMPRESAS,
  SET_LOADING,
} = Actions.getConstants();
// Individual exports for testing

export function* getListadoAction() {
  
  try {
    const {
      status,
      data = [],
    } = yield call(getListado);
   
    if(status === 200 ){
      if(data.length > 0)
      {
        yield put(
          Actions.get('SET_LISTADO').fn(data)
        );
        yield put(
          Actions.get('SET_LISTADO_FILTER').fn(data.filter((modulo) => modulo.Activo))
        );
      }
    } else {
      yield put(
        enqueueSnackbar({
          message: 'Hubo un error al obtener los Roles',
          options: {
            variant: 'error',
          },
        })
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener los Roles',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* setListadoActivarAction(params) {
  try {
    const {
      status,
      data = [],
    } = yield call(setListadoActivar, params.datos);
    if(status === 200){
      const { data = []} = yield call(getListado);
      yield put(
        Actions.get('SET_LISTADO').fn(data)
      );
      yield put(
        Actions.get('SET_LISTADO_FILTER').fn(data.filter((modulo) => modulo.Activo))
      );
      yield put(
        Actions.get('SET_SELECTED').fn([])
      );
    } else {
      yield put(
        enqueueSnackbar({
          message: 'Hubo un error al activar los Roles',
          options: {
            variant: 'error',
          },
        })
      );
    }
 
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener los Roles',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* setListadoDesactivarAction(params) {
  try {
    const {
      status,
      data = [],
    } = yield call(setListadoDesactivar, params.datos)
    
    if(status === 200 && data.recordset[0].desactivado === 1){
      const { data = []} = yield call(getListado);
      yield put(
        Actions.get('SET_LISTADO').fn(data)
      );
      yield put(
        Actions.get('SET_LISTADO_FILTER').fn(data.filter((modulo) => modulo.Activo))
      );
      yield put(
        Actions.get('SET_SELECTED').fn([])
      );
    } else if(data.recordset.length > 0) {
      let mensaje = '';
      if(data.recordset.length === 1){
        const rol = data.recordset[0].NombreRol;
        mensaje = `El rol ${rol} no se puede dar de baja ya que está asignado a un puesto-rol `;
      } else {
        let roles = '';
        data.recordset.forEach(rol => {
          roles += `${rol.NombreRol}, `;
        });
        mensaje =  `Los roles ${roles} no se pueden dar de baja ya que están asignado a un puesto-rol `;
      }
      yield put(
        enqueueSnackbar({
          message: mensaje,
          options: {
            variant: 'warning',
          },
        })
      );
    }
 
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener los Roles',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getValidaExisteRolAction(){
  try{
    const nuevoRol = yield select((state) => state.getIn(['roles','nuevoModulo']).toJS());
    if(nuevoRol.textFieldModulo==='')
    {
      nuevoRol.textFieldModulo='vacio';
    }
    const {
      status,
      data = [],
    } = yield call (getValidaExisteRol, nuevoRol.textFieldModulo)
    
    if(status === 200){
      if(data[0].existeRol===1){
        yield put(
          Actions.get('SET_VACIO_NOMBRE_MODULO').fn(true,nuevoRol.textFieldModulo)
        );
      } else{
        yield put(
          Actions.get('SET_VACIO_NOMBRE_MODULO').fn(false,nuevoRol.textFieldModulo)
        );
      }
    } else {
      yield put(
        enqueueSnackbar({
          message: "Hubo un error al validar nombre rol",
          options: {
            variant: 'error',
          },
        })
      );
    }
  } catch( err ) {
    yield put(
      enqueueSnackbar({
        message: "Hubo un error al validar nombre rol",
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getEmpresasAction(params) {
  try {
    const {
      status,
      data = [],
    } = yield call(getConsultaEmpresas, params.datos);
    if(status === 200 && data.length > 0){
      yield put(
        Actions.get('SET_GETEMPRESAS').fn(data)
      );
    } else {
      yield put(
        enqueueSnackbar({
          message: 'Hubo un error al obtener las empresas',
          options: {
            variant: 'error',
          },
        })
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener las empresas',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getModulosAction() {
  try {
    const {
      status,
      data = [],
    } = yield call(getConsultaModulos);
 
    if(status === 200 && data.length > 0){
      yield put(
        Actions.get('SET_MODULOS').fn(data)
      );
    } else {
      yield put(
        enqueueSnackbar({
          message: 'Hubo un error al obtener los modulos',
          options: {
            variant: 'error',
          },
        })
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener los modulos',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getModuloFuncionAction(params){
  try{
    const {
      status,
      data = [],
    } = yield call (getPermisosFuncion, params.datos)
    
    if(status === 200 && data.permisos.length > 0 ) {
      yield put(
        Actions.get('SET_FUNCIONES').fn({ permisos: data.permisos, params: params.datos})
      );
    }
  } catch( err ) {
    yield put(
      enqueueSnackbar({
        message: "Hubo un error al consultar el modulo",
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getRolesAction(datos){
  
  yield put(
    Actions.get('SET_LOADING').fn(true)
  )

  try{
    const {
      status,
      data = [],
    } = yield call (getRoles, datos.datos)

    if(status === 200  && data.length > 0 ){
      yield put(
        Actions.get('SET_LISTADO_FILTER').fn([])
      );
      yield put(
        Actions.get('SET_LISTADO').fn([])
      );
      yield put(
        Actions.get('SET_LISTADO').fn(data)
      );
      yield put(
        Actions.get('SET_LISTADO_FILTER').fn(data.filter(rolEmpresa => (rolEmpresa.Activo)))
      );
    } else {
      yield put(
        Actions.get('SET_LISTADO').fn([])
      );
      yield put(
        Actions.get('SET_LISTADO_FILTER').fn([])
      );
    }
  } catch( err ) {
    yield put(
      enqueueSnackbar({
        message: "Hubo un error al consultar el modulo",
        options: {
          variant: 'error',
        },
      })
    );
  }

  yield put(
    Actions.get('SET_LOADING').fn(false)
  )
}

export function* postRolAction(params){
  try{
    const {
      status,
    } = yield call (guardarRoles, params.datos)

    if(status === 200){
      const { data = []} = yield call(getListado);
      yield put(
        Actions.get('SET_LISTADO').fn(data)
      );
      yield put(
        Actions.get('SET_LISTADO_FILTER').fn(data.filter((rol) => rol.Activo))
      );
      yield put(
        Actions.get('SET_SELECTED').fn([])
      );
      yield put(
        Actions.get('SET_STEPPER').fn(0)
      );
      yield put(
        enqueueSnackbar({
          message: 'El rol se ha guardado correctamente',
          options: {
            variant: 'success',
          },
        })
      );
    } else {
      yield put(
        enqueueSnackbar({
          message: 'Hubo un error al guardar el rol',
          options: {
            variant: 'error',
          },
        })
      );
    }
  } catch( err ) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al guardar el rol',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* setListadoDesactivarEmpresasAction(params) {
  try {
    const {
      status,
    } = yield call(setEmpresasDesactivar,params);
    
    if(status === 200){
      yield put(
        Actions.get('SET_ELIMINAR_EMPRESA').fn(params.datos.selected)
      );
    }

  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al eliminar las empreasa',
        options: {
          variant: 'error',
        },
      })
    );
  } 
}

export function* setListadoActivarEmpresasAction(params) {
  try {
    const {
      status,
    } = yield call(setEmpresasActivar,params);
    if(status === 200){
      yield put(
        Actions.get('SET_ACTIVAR_EMPRESA').fn(params.datos.selected)
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al eliminar las empreasa',
        options: {
          variant: 'error',
        },
      })
    );
  } 
}

export default function* rolesSaga() {
  yield [
    takeLatest(
      GET_LISTADO,
      getListadoAction,
    ),
    takeLatest(
      SET_LISTADO_ACTIVAR,
      setListadoActivarAction,
    ),
    takeLatest(
      SET_LISTADO_DESACTIVAR,
      setListadoDesactivarAction,
    ),
    takeLatest(
      GET_VALIDAEXISTEROL,
      getValidaExisteRolAction,
    ),
    takeLatest(
      GET_EMPRESAS,
      getEmpresasAction,
    ),
    takeLatest(
      GET_MODULOS,
      getModulosAction,
    ),
    takeLatest(
      GET_MODULO_FUNCION,
      getModuloFuncionAction,
    ),
    takeLatest(
      GET_ROLES,
      getRolesAction,
    ),
    takeLatest(
      POST_ROL,
      postRolAction
    ),
    takeLatest(
      SET_LISTADO_DESACTIVAR_EMPRESAS,
      setListadoDesactivarEmpresasAction
    ),
    takeLatest(
      SET_LISTADO_ACTIVAR_EMPRESAS,
      setListadoActivarEmpresasAction
    ),
  ]
}
