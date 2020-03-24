// import { take, call, put, select } from 'redux-saga/effects';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';
import Actions from './actions';

import { obtenerPermisos } from '../../services/api';

import {
  postGuardaIndicador,
  consultaIndicador,
  setListadoDesactivar,
  setListadoActivar,
  getvalidaExiste,
} from './api';


export const {
  POST_GUARDA_INDICADOR,
  CONSULTA_INDICADOR,
  SET_LISTADO_DESACTIVAR,
  SET_LISTADO_ACTIVAR,
  GET_VALIDA_EXISTE,
  OBTENER_PERMISOS,
} = Actions.getConstants();
// Individual exports for testing

export function* postGuardaIndicadorAction(){
  try{

    const indicador = yield select((state) => state.getIn(['catalogoIndicadores','nuevoModulo']).toJS());
    const idUsuario = yield select(state => state.getIn(['global', 'currentUser', 'UsuarioId']))

    const indicadores = 
      {
        'nombre':indicador.textFieldNombre,
        'descripcion':indicador.textFieldDescripcion,
        'idIndicador':indicador.idIndicador,
        'idUsuario':idUsuario,
      }
    
    const {
      data,
    } = yield call (postGuardaIndicador, indicadores)

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
        Actions.get('SET_TEXTFIELD_NOMBRE').fn('')
      );
      yield put(
        Actions.get('SET_TEXTFIELD_DESCRIPCION').fn('')
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



export function* consultaIndicadorAction(){
  try{

    const {
      data,
    } = yield call (consultaIndicador)
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
        Actions.get('SET_TEXTFIELD_NOMBRE').fn('')
      );
      yield put(
        Actions.get('SET_TEXTFIELD_DESCRIPCION').fn('')
      );
      
    } 
  } catch( err ) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al consultar los indicadores',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* setListadoDesactivarAction() {

  const indicador = yield select((state) => state.getIn(['catalogoIndicadores','modulosTabla']).toJS());
  const idUsuario = yield select(state => state.getIn(['global', 'currentUser', 'UsuarioId']))

  const desactivaIndicador = 
  {
    'idIndicador':indicador.selected,
    'idUsuario':idUsuario,
    'activo':0,
  }

  try {
    const {
      data = [],
    } = yield call(setListadoDesactivar, desactivaIndicador)

    if (data.status === 1) {
      yield put(
        Actions.get('SET_LISTADO').fn([])
      );
      yield put(
        Actions.get('SET_LISTADO_FILTER').fn([])
      );
      yield put(
        Actions.get('SET_LISTADO').fn(data.recordsets[0])
      );
      yield put(
        Actions.get('SET_LISTADO_FILTER').fn(data.recordsets[0].filter((indica) => indica.Activo))
      );
      yield put(
        Actions.get('SET_SELECTED').fn([])
      );
      yield put(
        Actions.get('SET_STEPPER').fn(0)
      );
      yield put(
        Actions.get('SET_TEXTFIELD_NOMBRE').fn('')
      );
      yield put(
        Actions.get('SET_TEXTFIELD_DESCRIPCION').fn('')
      );
    } else {
      yield put(
        enqueueSnackbar({
          message: data.recordset[0].mensaje,
          options: {
            variant: 'warning',
          },
        })
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
  
  const indicador = yield select((state) => state.getIn(['catalogoIndicadores','modulosTabla']).toJS());
  const idUsuario = yield select(state => state.getIn(['global', 'currentUser', 'UsuarioId']))

  const desactivaIndicador = 
  {
    'idIndicador':indicador.selected,
    'idUsuario':idUsuario,
    'activo':1,
  }
  try {
    const {
      data,
    } = yield call(setListadoActivar, desactivaIndicador);
    if(data.status === 1 ){
      yield put(
        Actions.get('SET_LISTADO').fn([])
      );
      yield put(
        Actions.get('SET_LISTADO_FILTER').fn([])
      );
      yield put(
        Actions.get('SET_LISTADO').fn(data.recordsets[0])
      );
      yield put(
        Actions.get('SET_LISTADO_FILTER').fn(data.recordsets[0].filter((indica) => indica.Activo))
      );
      yield put(
        Actions.get('SET_SELECTED').fn([])
      );
      yield put(
        Actions.get('SET_STEPPER').fn(0)
      );
      yield put(
        Actions.get('SET_TEXTFIELD_NOMBRE').fn('')
      );
      yield put(
        Actions.get('SET_TEXTFIELD_DESCRIPCION').fn('')
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

export function* getValidaExisteAction(){
  try{
    const nuevoModulo = yield select((state) => state.getIn(['catalogoIndicadores','nuevoModulo']).toJS());
    
    if(nuevoModulo.textFieldNombre==='')
    {
      nuevoModulo.textFieldNombre=null;
    }
    
    const {
      data ,
    } = yield call (getvalidaExiste, nuevoModulo.textFieldNombre)
    
    if(data.length > 0){
      if(data[0].existe===1){
        yield put(
          Actions.get('SET_VACIO_NOMBRE').fn(true,nuevoModulo.textFieldNombre)
        );
      } else{
        yield put(
          Actions.get('SET_VACIO_NOMBRE').fn(false,nuevoModulo.textFieldNombre)
        );
      }
    } 
  } catch( err ) {
    yield put(
      enqueueSnackbar({
        message: "Hubo un error al consultar si existe indicador",
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


export default function* catalogoIndicadoresSaga() {
  // See example in containers/HomePage/saga.js
  yield [
    takeLatest(
      POST_GUARDA_INDICADOR,
      postGuardaIndicadorAction,
    ),
    takeLatest(
      CONSULTA_INDICADOR,
      consultaIndicadorAction,
    ),
    takeLatest(
      SET_LISTADO_DESACTIVAR,
      setListadoDesactivarAction,
    ),
    takeLatest(
      SET_LISTADO_ACTIVAR,
      setListadoActivarAction,
    ),
    takeLatest(
      GET_VALIDA_EXISTE,
      getValidaExisteAction,
    ),
    takeLatest(
      OBTENER_PERMISOS,
      obtenerPermisosSagaAction
    ),
  ]
}


