import { takeLatest, put, select, call } from 'redux-saga/effects';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';
import {
  consultarPrevalesApi,
} from './api';

export function* consultarPrevalesSaga(){
  try{
    const idUsuario = yield select(state => state.getIn(['global', 'currentUser', 'UsuarioId'])) 
    const {
      status,
      data,
    } = yield call(consultarPrevalesApi, idUsuario);
    
    if(status === 200){
      yield put({
        type: 'APP/CONTAINERS/INVENTARIOSEK/REPORTES/MONITORVALE/GUARDAR_PREVALES', data,
      });
    }
  }catch(error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al consultar la información',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

// Individual exports for testing
export default function* monitorValeSaga() {
  yield takeLatest(
    'APP/CONTAINERS/INVENTARIOSEK/REPORTES/MONITORVALE/CONSULTAR_PREVALES', 
    consultarPrevalesSaga,
  )
  
}
