import { takeLatest, call, put, select } from 'redux-saga/effects';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';
import Actions from './actions';
import {setUsuarioLogin} from '../App/actions';

import {
  getUsuarioLogin,
  setUsuarioIntentoLogin,
  getUsuarioImagen,
} from './api';
import transformaAblob from './TransformaABlob';

export const {
  GET_USUARIO_LOGIN,
  GET_USUARIO_IMAGEN,
  SET_USUARIO_IMAGEN,
} = Actions.getConstants();
// Individual exports for testing

let usuarioImagen = '';

export function* getUsuarioLoginAction(params) {
  
  try {
    yield put(
      Actions.get('SET_LOADING').fn(true)
    );
    const {
      status,
      data: usuario = [],
    } = yield call(getUsuarioLogin, params.datos);
    
    if(status === 200 && usuario.recordset.length > 0){
      const {
        status,
        data: intentos = [],
      } = yield call(setUsuarioIntentoLogin, { usuarioDominio: params.datos.usuarioDominio, logueado: 1 });
      if(status === 200 && intentos.recordset.length > 0){
        // localStorage.setItem('token', usuario.token);

        const usuarioFormateado = {
          ...usuario.recordset[0],
          Imagen: usuarioImagen,
        }
        
        yield put(
          setUsuarioLogin(usuarioFormateado)
        );
      }
    } else {
      yield put(
        enqueueSnackbar({
          message: 'Usuario o contraseña incorrectos',
          options: {
            variant: 'error',
          },
        })
      );

      if(usuario.recordset[0].Activo === 1){
        const {
          status,
          data: intentos = [],
        } = yield call(setUsuarioIntentoLogin, { usuarioDominio: params.datos.usuarioDominio, logueado: 0 });
  
        if(status === 200 && intentos.recordset[0].Intento >= 3){
          yield put(
            enqueueSnackbar({
              message: 'Usuario bloqueado por favor comuníquese con soporte técnico',
              options: {
                variant: 'error',
              },
            })
          );
        }
      } else if(usuario.recordset[0].Activo === 0){
        yield put(
          enqueueSnackbar({
            message: 'Usuario inactivo por favor comuníquese con soporte técnico',
            options: {
              variant: 'error',
            },
          })
        );
      }
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Error al conectarse al directorio activo',
        options: {
          variant: 'error',
        },
      })
    );
    yield put(
      Actions.get('SET_LOADING').fn(false)
    );
  }
  yield put(
    Actions.get('SET_LOADING').fn(false)
  );
}

export function* getUsuarioImagenAction(params) {
  try {
    yield put(
      Actions.get('SET_LOADING').fn(true)
    );
    const {
      status,
      data = [],
    } = yield call(getUsuarioImagen, params.datos);

    if(status === 200 && data.imagen){
      usuarioImagen = data.imagen;
      yield put(
        Actions.get('SET_USUARIO_IMAGEN').fn(data.imagen)
      );
    } else {
      yield put(
        Actions.get('SET_USUARIO_IMAGEN').fn('')
      );
      yield put(
        enqueueSnackbar({
          message: 'El Usuario no cuenta con imagen.',
          options: {
            variant: 'warning',
          },
        })
      );
    }
  } catch (error) {
    yield put(
      Actions.get('SET_USUARIO_IMAGEN').fn('')
    );
    yield put(
      enqueueSnackbar({
        message: 'Error al obtener la imagen del usuario',
        options: {
          variant: 'error',
        },
      })
    );
    yield put(
      Actions.get('SET_LOADING').fn(false)
    );
  }

  yield put(
    Actions.get('SET_LOADING').fn(false)
  );
}

export default function* loginSaga() {
  yield [
    takeLatest(
      GET_USUARIO_LOGIN,
      getUsuarioLoginAction,
    ),
    takeLatest(
      GET_USUARIO_IMAGEN,
      getUsuarioImagenAction,
    ),
  ]
}
