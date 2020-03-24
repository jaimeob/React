// import { take, call, put, select } from 'redux-saga/effects';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';
import Actions from './actions';

import { obtenerPermisos } from '../../services/api';

import {
  getConfiguracionBono,
  puestosConfiguracionBono,
  getvalidaExiste,
  postGuardar,
  setListadoDesactivar,
  setListadoActivar,
} from './api';

export const {
  GET_CONFIGURACION_BONO,
  PUESTOS_CONFIGURACION_BONO,
  OBTENER_PERMISOS,
  GET_VALIDA_EXISTE,
  POST_GUARDAR,
  SET_LISTADO_DESACTIVAR,
  SET_LISTADO_ACTIVAR,
} = Actions.getConstants();
// Individual exports for testing

export function* getConfiguracionBonoAction() {
  
  try {
    const {
      status,
      data = [],
    } = yield call(getConfiguracionBono,0);
    
    if(data.length > 0){
      yield put(
        Actions.get('SET_CONFIGURACION_BONO').fn(data)
      );
      yield put(
        Actions.get('SET_LISTADO_FILTER').fn(data.filter((item) => item.Activo))
      );
    } 
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener configuración bono',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* puestosConfiguracionBonoAction(configuracionBono) {

  try {
    const {
      status,
      data = [],
    } = yield call(puestosConfiguracionBono,configuracionBono.datos);
     
    if(data.length > 0){
      yield put(
        Actions.get('SET_PUESTOS').fn([])
      );
      yield put(
        Actions.get('SET_PUESTOS_ASIGNADOS').fn([])
      );
      yield put(
        Actions.get('SET_PUESTOS').fn(data)
      );
      yield put(
        Actions.get('SET_PUESTOS_ASIGNADOS').fn(data.filter((item) => item.Asignado===1))
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
        message: 'Hubo un error al obtener configuración bono',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* obtenerPermisosSagaAction(){
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

export function* getValidaExisteAction(){
  try{
    const nuevoModulo = yield select((state) => state.getIn(['configuracionBono','nuevoModulo']).toJS());
    
    if(nuevoModulo.textFieldGrupo==='')
    {
      nuevoModulo.textFieldGrupo=null;
    }
    
    const {
      data ,
    } = yield call (getvalidaExiste, nuevoModulo.textFieldGrupo)
    
    if(data.length > 0){
      if(data[0].existe===1){
        yield put(
          Actions.get('SET_VACIO_NOMBRE').fn(true,nuevoModulo.textFieldGrupo,'nombreGrupo')
        );
      } else{
        yield put(
          Actions.get('SET_VACIO_NOMBRE').fn(false,nuevoModulo.textFieldGrupo,'nombreGrupo')
        );
      }
    } 
  } catch( err ) {
    yield put(
      enqueueSnackbar({
        message: "Hubo un error al consultar si existe el grupo",
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* postGuardarAction(){
  try{

    const Bono = yield select((state) => state.getIn(['configuracionBono','nuevoModulo']).toJS());
    const idUsuario = yield select(state => state.getIn(['global', 'currentUser', 'UsuarioId']))
    
    const configuracionBono = 
      {
        'idConfiguracionBono':Bono.idConfiguracionBono,
        'grupo':Bono.textFieldGrupo,
        'dias':Bono.textFieldDias,
        'puestosAsigandos':Bono.puestosIds,
        'idUsuario':idUsuario,
      }
    // console.log('configuracionBono',configuracionBono);
    const {
      data,
    } = yield call (postGuardar, configuracionBono)
    // console.log('data',data);
    if (data.length > 0) {
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
        Actions.get('SET_LISTADO_FILTER').fn(data.filter((indica) => indica.Activo))
      );
      yield put(
        Actions.get('SET_SELECTED').fn([])
      );
      yield put(
        Actions.get('SET_STEPPER').fn(0)
      );
      yield put(
        Actions.get('SET_TEXTFIELD_GRUPO').fn('')
      );
      yield put(
        Actions.get('SET_TEXTFIELD_DIAS').fn('')
      );
      
      yield put(
        enqueueSnackbar({
          message: 'Datos guardados con éxito',
          options: {
            variant: 'success',
          },
        })
      );

    } else {
      yield put(
        enqueueSnackbar({
          message: 'Hubo un error al guardar el indicador',
          options: {
            variant: 'error',
          },
        })
      );
    }

  } catch( err ) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al guardar el indicador',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* setListadoDesactivarAction() {

  const bono = yield select((state) => state.getIn(['configuracionBono','modulosTabla']).toJS());
  const idUsuario = yield select(state => state.getIn(['global', 'currentUser', 'UsuarioId']))

  const desactivaBono = 
  {
    'idConfiguracionBono':bono.selected,
    'idUsuario':idUsuario,
    'activo':0,
  }

  try {
    const {
      data = [],
    } = yield call(setListadoDesactivar, desactivaBono)

    // console.log('data',data)
    if (data.length > 0) {
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
        Actions.get('SET_LISTADO_FILTER').fn(data.filter((bonos) => bonos.Activo))
      );
      yield put(
        Actions.get('SET_SELECTED').fn([])
      );
      yield put(
        Actions.get('SET_STEPPER').fn(0)
      );
      yield put(
        Actions.get('SET_TEXTFIELD_GRUPO').fn('')
      );
      yield put(
        Actions.get('SET_TEXTFIELD_DIAS').fn('')
      );
    } 
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al desactivar indicador',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* setListadoActivarAction() {
  
  const bono = yield select((state) => state.getIn(['configuracionBono','modulosTabla']).toJS());
  const idUsuario = yield select(state => state.getIn(['global', 'currentUser', 'UsuarioId']))

  const desactivaIndicador = 
  {
    'idConfiguracionBono':bono.selected,
    'idUsuario':idUsuario,
    'activo':1,
  }
  try {
    const {
      data,
    } = yield call(setListadoActivar, desactivaIndicador);
    if (data.length > 0) {
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
        Actions.get('SET_LISTADO_FILTER').fn(data.filter((bonos) => bonos.Activo))
      );
      yield put(
        Actions.get('SET_SELECTED').fn([])
      );
      yield put(
        Actions.get('SET_STEPPER').fn(0)
      );
      yield put(
        Actions.get('SET_TEXTFIELD_GRUPO').fn('')
      );
      yield put(
        Actions.get('SET_TEXTFIELD_DIAS').fn('')
      );
    }
 
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al activar indicador',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export default function* configuracionBonoSaga() {
  // See example in containers/HomePage/saga.js
  yield [
    takeLatest(
      GET_CONFIGURACION_BONO,
      getConfiguracionBonoAction,
    ),
    takeLatest(
      PUESTOS_CONFIGURACION_BONO,
      puestosConfiguracionBonoAction,
    ),
    takeLatest(
      OBTENER_PERMISOS,
      obtenerPermisosSagaAction
    ),
    takeLatest(
      GET_VALIDA_EXISTE,
      getValidaExisteAction,
    ),
    takeLatest(
      POST_GUARDAR,
      postGuardarAction,
    ),
    takeLatest(
      SET_LISTADO_DESACTIVAR,
      setListadoDesactivarAction,
    ),
    takeLatest(
      SET_LISTADO_ACTIVAR,
      setListadoActivarAction,
    ),
  ]
}
