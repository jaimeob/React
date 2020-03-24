import { takeLatest, call, put, select } from 'redux-saga/effects';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';
import Actions from './actions';

import {
  getListado,
  getTipoAgrupadores,
  getUrlFuncion,  
  postFunciones,
  setListadoActivar,
  setListadoDesactivar,
  postModulo,
  getModuloFuncion,
  getValidaExisteModulo,
  setListadoDesactivarFunciones,
  setListadoActivarFunciones,
} from './api';

export const {
  GET_LISTADO,
  GET_TIPOAGRUPADORES,
  GET_URLFUNCION,
  SET_LISTADO_ACTIVAR,
  SET_LISTADO_DESACTIVAR,
  POST_FUNCIONES,
  POST_MODULO,
  GET_MODULOFUNCION,
  GET_VALIDAEXISTEMODULO,
  SET_LISTADO_DESACTIVAR_FUNCIONES,
  SET_LISTADO_ACTIVAR_FUNCIONES,
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
          Actions.get('SET_LISTADO').fn([])
        );
        yield put(
          Actions.get('SET_LISTADO_FILTER').fn([])
        );
        yield put(
          Actions.get('SET_LISTADO').fn(data)
        );
        yield put(
          Actions.get('SET_LISTADO_FILTER').fn(data.filter((item) => item.Activo))
        );
      }
    } else {
      yield put(
        enqueueSnackbar({
          message: 'Hubo un error al obtener los Módulos',
          options: {
            variant: 'error',
          },
        })
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener los Módulos',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getTipoAgrupadoresAction() {
  
  try {
    const {
      status,
      data = [],
    } = yield call(getTipoAgrupadores);
    if(status === 200 && data.length > 0){
      yield put(
        Actions.get('SET_TIPOAGRUPADORES_TEXT').fn(data)
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
        message: 'Hubo un error al obtener los Tipo Agrupadores',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getUrlFuncionAction() {
  
  try {
    const {
      status,
      data = [],
    } = yield call(getUrlFuncion);
    if(status === 200 && data.length > 0){
      yield put(
        Actions.get('SET_URLFUNCION_SELECT').fn(data)
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
        message: 'Hubo un error al obtener las url',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getModuloFuncionAction(){
  try{
    const nuevoModulo = yield select((state) => state.getIn(['modulos','nuevoModulo']).toJS());
    let datosTabla ;
    const {
      status,
      data = [],
    } = yield call (getModuloFuncion, nuevoModulo.IdModulo)
    if(status === 200){
      datosTabla = data.filter((modulo) => modulo.Activo);
      
      yield put(
        Actions.get('SET_LISTADO').fn([])
      );
      yield put(
        Actions.get('SET_LISTADO_FILTER').fn([])
      );
      yield put(
        Actions.get('SET_DATOSGUARDAR').fn([])
      );
      yield put(
        Actions.get('SET_DATOSGUARDAR').fn(data.map((funciones) => (
          {
            'FuncionId' : funciones.FuncionId,     
            'idModulo':nuevoModulo.IdModulo,
            'IdTipoAgrupador':funciones.IdTipoAgrupador,
            'NombreFuncion' : funciones.NombreFuncion,
            'IdURLFuncion':funciones.IdURLFuncion,
            'UsuarioCreacion':nuevoModulo.usuario,
          }
        ))
        ));
      yield put(
        Actions.get('SET_LISTADO').fn(data)
      );
      yield put(
        Actions.get('SET_LISTADO_FILTER').fn(datosTabla.map((funciones) => (
          {
            'FuncionId': funciones.FuncionId,
            'NombreAgrupador': funciones.NombreAgrupador,
            'NombreFuncion': funciones.NombreFuncion,
            'URL': funciones.URL,
            'Activo': funciones.Activo,
          }
        ) )
        ));
      yield put(
        Actions.get('SET_SELECTED').fn([])
      );
    } else {
      yield put(
        Actions.get('SET_LISTADO').fn([])
      );
      yield put(
        Actions.get('SET_LISTADO_FILTER').fn([])
      );
      yield put(
        Actions.get('SET_DATOSGUARDAR').fn([])
      );
      yield put(
        enqueueSnackbar({
          message: "Hubo un error al consultar las funciones del modulo",
          options: {
            variant: 'error',
          },
        })
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

export function* getValidaExisteModuloAction(){
  try{
    const nuevoModulo = yield select((state) => state.getIn(['modulos','nuevoModulo']).toJS());
    if(nuevoModulo.textFieldModulo==='')
    {
      nuevoModulo.textFieldModulo='vacio';
    }
    const {
      status,
      data = [],
    } = yield call (getValidaExisteModulo, nuevoModulo.textFieldModulo)
    if(status === 200){
      if(data[0].existeModulo===1){
        yield put(
          Actions.get('SET_VACIO_NOMBRE_MODULO').fn(true,nuevoModulo.textFieldModulo)
        );
      } else{
        yield put(
          Actions.get('SET_VACIO_NOMBRE_MODULO').fn(false,nuevoModulo.textFieldModulo)
        );
      }
    } else {
      yield put(
        enqueueSnackbar({
          message: "Hubo un error al consultar si existe modulo",
          options: {
            variant: 'error',
          },
        })
      );
    }
  } catch( err ) {
    yield put(
      enqueueSnackbar({
        message: "Hubo un error al consultar si existe modulo",
        options: {
          variant: 'error',
        },
      })
    );
  }
}


export function* postModuloAction(){
  try{
    let datas;
    let modulo;
    const nuevoModulo = yield select((state) => state.getIn(['modulos','nuevoModulo']).toJS());
    const datos = yield select((state) => state.getIn(['modulos','nuevoModulo']).toJS());

    if(nuevoModulo.IdModulo===0)
    {
      if(datos.datosGuardar.length>0){
        const datoGuarda = datos.datosGuardar.filter((funcion) => 
          funcion.idModulo === 0);
        datas = datoGuarda.map((modulos) => (
          {
            'idModulo':modulos.idModulo,
            'nombreModulo':nuevoModulo.textFieldModulo,
            'descripcionModulo':nuevoModulo.textFieldDescripcion,
            'IdTipoAgrupador':modulos.IdTipoAgrupador,
            'NombreFuncion' : modulos.NombreFuncion,
            'IdURLFuncion':modulos.IdURLFuncion,
            'UsuarioCreacion':modulos.UsuarioCreacion,
          }
        )); 
      }else {
        
        modulo =[{'idModulo':nuevoModulo.IdModulo,
          'nombreModulo':nuevoModulo.textFieldModulo,
          'descripcionModulo':nuevoModulo.textFieldDescripcion,
          'UsuarioCreacion':nuevoModulo.usuario,
        }]
        datas =JSON.parse(JSON.stringify(modulo));
      }
      
    } else if (nuevoModulo.IdModulo> 0){
      
      if(datos.datosGuardar.length>0)
      {
        datas = datos.datosGuardar.map((modulos) => (
          {
            'FuncionId':modulos.FuncionId,
            'idModulo':modulos.idModulo,
            'nombreModulo':nuevoModulo.textFieldModulo,
            'descripcionModulo':nuevoModulo.textFieldDescripcion,
            'IdTipoAgrupador':modulos.IdTipoAgrupador,
            'NombreFuncion' : modulos.NombreFuncion,
            'IdURLFuncion':modulos.IdURLFuncion,
            'UsuarioCreacion':modulos.UsuarioCreacion,
          }
        ) );
      } else{
        modulo =[{'idModulo':nuevoModulo.IdModulo,
          'nombreModulo':nuevoModulo.textFieldModulo,
          'descripcionModulo':nuevoModulo.textFieldDescripcion,
          'UsuarioCreacion':nuevoModulo.usuario,
        }]
        datas =JSON.parse(JSON.stringify(modulo));
      } 
    }
    
    const {
      status,
    } = yield call (postModulo, datas)
    if (status === 200) {
      yield put(
        enqueueSnackbar({
          message: 'Datos guardados con éxito',
          options: {
            variant: 'success',
          },
        })
      );
      yield put (
        Actions.get('SET_SELECTED').fn([])
      );
      yield put (
        Actions.get('SET_IDMODULO').fn(0)
      );
      yield put (
        Actions.get('SET_DATOSGUARDAR').fn([])
      );
      yield put (
        Actions.get('GET_LISTADO').fn([])
      );
      yield put (
        Actions.get('SET_STEPPER').fn(0)
      );
    } 
  } catch( err ) {
    yield put(
      enqueueSnackbar({
        message: "Hubo un error al guardar el modulo",
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* postFuncionesAction(){
  try{

    const nuevoModulo = yield select((state) => state.getIn(['modulos','nuevoModulo']).toJS());
    
    const {
      status,
    } = yield call (postFunciones, nuevoModulo)
    if (status === 200) {

      const {data = []} = yield call (getModuloFuncion, nuevoModulo.IdModulo)

      yield put(
        Actions.get('SET_STEPPERADDMODULO').fn(false)
      );
      yield put(
        Actions.get('SET_LISTADO').fn([])
      );
      yield put(
        Actions.get('SET_LISTADO_FILTER').fn([])
      );
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
          message: 'Hubo un error al guardar la funcion',
          options: {
            variant: 'error',
          },
        })
      );
    }

  } catch( err ) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al guardar la funcion',
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
    } = yield call(setListadoActivar, params.datos);
    if(status === 200){
      const { data = []} = yield call(getListado);
      yield put(
        Actions.get('SET_LISTADO').fn([])
      );
      yield put(
        Actions.get('SET_LISTADO_FILTER').fn([])
      );
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
          message: 'Hubo un error al activar los Módulos',
          options: {
            variant: 'error',
          },
        })
      );
    }
 
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener los Módulos',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* setListadoDesactivarFuncionesAction(params) {
  
  try {
    const {
      status,
      data = [],
    } = yield call(setListadoDesactivarFunciones, params.datos);
    if(status === 200){
      yield put(
        Actions.get('SET_ELIMINAR_EMPRESA').fn(params.datos)
      );
      yield put(
        Actions.get('SET_SELECTED').fn([])
      );
      yield put(
        enqueueSnackbar({
          message: 'Los datos se eliminaron correctamente',
          options: {
            variant: 'success',
          },
        })
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
        message: 'Hubo un error al obtener los Módulos',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* setListadoActivarFuncionesAction(params) {
  
  try {
    const {
      status,
      data = [],
    } = yield call(setListadoActivarFunciones, params.datos);
    if(status === 200){
      yield put(
        Actions.get('SET_ACTIVAR_EMPRESA').fn(params.datos)
      );
      yield put(
        Actions.get('SET_SELECTED').fn([])
      );
      yield put(
        enqueueSnackbar({
          message: 'Los datos se activaron correctamente',
          options: {
            variant: 'success',
          },
        })
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
        message: 'Hubo un error al obtener los Módulos',
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
      /* eslint-disable no-shadow */
      const { data = []} = yield call(getListado);
     
      yield put(
        Actions.get('SET_LISTADO').fn([])
      );
      yield put(
        Actions.get('SET_LISTADO_FILTER').fn([])
      );
      yield put(
        Actions.get('SET_LISTADO').fn(data)
      );
      yield put(
        Actions.get('SET_LISTADO_FILTER').fn(data.filter((item) => item.Activo))
      );
      yield put(
        Actions.get('SET_SELECTED').fn([])
      );
    } else if(status === 200 && data.recordset[0].desactivado === 0) {
      yield put(
        enqueueSnackbar({
          message: 'El módulo cuenta con opciones activas, por lo cual no se puede eliminar.',
          options: {
            variant: 'warning',
          },
        })
      );
    } else if(status === 200 && data.recordset[0].desactivado === 2) {
      yield put(
        enqueueSnackbar({
          message: 'El módulo se encuentra asignado a un puesto – rol por lo cual no se puede eliminar.',
          options: {
            variant: 'warning',
          },
        })
      );
    } else if(status === 200 && data.recordset.length && data.recordset[0].desactivado === 3) {
      let mensaje = '';
      if(data.recordset.length === 1){
        const rol = data.recordset[0].NombreRol;
        mensaje = `El módulo se encuentra asignado al rol: ${rol}, por lo cual no se puede eliminar.`;
      } else {
        let roles = '';
        data.recordset.forEach(rol => {
          roles += `${rol.NombreRol}, `;
        });
        mensaje =  `El módulo se encuentra asignado a los roles: ${roles}, por lo cual no se puede eliminar.`;
      }
      yield put(
        enqueueSnackbar({
          message: mensaje,
          options: {
            variant: 'warning',
          },
        })
      );
    } else if(status === 200 && data.recordset[0].desactivado === 4) {
      let mensaje = '';
      if(data.recordset.length === 1){
        const usuario = data.recordset[0].Nombre;
        mensaje = `El módulo se encuentra asignado al usuario: ${usuario}, por lo cual no se puede eliminar.`;
      } else {
        let usuarios = '';
        data.recordset.forEach(usuario => {
          usuarios += `${usuario.Nombre}, `;
        });
        mensaje =  `El módulo se encuentra asignado a los usuarios: ${usuarios}, por lo cual no se puede eliminar.`;
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
        message: 'Hubo un error al obtener los Módulos',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export default function* modulosSaga() {
  yield [
    takeLatest(
      GET_LISTADO,
      getListadoAction,
    ),
    takeLatest(
      GET_TIPOAGRUPADORES,
      getTipoAgrupadoresAction,
    ),
    takeLatest(
      GET_URLFUNCION,
      getUrlFuncionAction,
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
      POST_MODULO,
      postModuloAction,
    ),
    takeLatest(
      POST_FUNCIONES,
      postFuncionesAction,
    ),
    takeLatest(
      GET_MODULOFUNCION,
      getModuloFuncionAction,
    ),
    takeLatest(
      GET_VALIDAEXISTEMODULO,
      getValidaExisteModuloAction,
    ),
    takeLatest(
      SET_LISTADO_DESACTIVAR_FUNCIONES,
      setListadoDesactivarFuncionesAction,
    ),
    takeLatest(
      SET_LISTADO_ACTIVAR_FUNCIONES,
      setListadoActivarFuncionesAction,
    ),
  ]
}
