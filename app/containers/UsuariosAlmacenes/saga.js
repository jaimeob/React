import { takeLatest, call, put, select} from 'redux-saga/effects';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';
import Actions from './actions';

import {
  getPlazas,
  getAlmacenes,
  getUsuarios,
  getAlmacenesPlaza,
  postAP,
  postAU,
  getUsuariosAlmacenes,
} from './api';

export const {
  GET_PLAZAS,
  GET_ALMACENES,
  GET_USUARIOS,
  GET_ALMACENES_PLAZAS,
  GET_USUARIOS_ALMACENES,
  POST_AP,
  UPDATE_AP,
  ELIMINAR_AP,
  POST_AU,
  UPDATE_AU,
  ELIMINAR_AU,
} = Actions.getConstants();
// Individual exports for testing

export function* getPlazasAction() {
  try {
    const {
      status,
      data = [],
    } = yield call(getPlazas);
    if(status === 200){
      yield put(
        Actions.get('SET_PLAZAS').fn(data)
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener las Plazas',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getAlmacenesAction() {
  try {
    const {
      status,
      data = [],
    } = yield call(getAlmacenes);

    if(status === 200 && data.length > 0){
      yield put(
        Actions.get('SET_ALMACENES').fn(data)
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener los Almacenes',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getUsuariosAction() {
  try {
    const {
      status,
      data = [],
    } = yield call(getUsuarios);

    if(status === 200 && data.length > 0){
      yield put(
        Actions.get('SET_USUARIOS').fn(data)
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener los Usuarios',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* postApAction() {
  try {
    const campos = yield select((state) => state.getIn(['usuariosAlmacenes','usuariosAlmacenes', 'nuevoAP', 'campos']).toJS());
    const registros = yield select((state) => state.getIn(['usuariosAlmacenes','usuariosAlmacenes', 'nuevoAP', 'tablas', 'tablaAP']).toJS());
    
    const datos = {
      idPlaza : campos.plaza.valor,
      idAlmacen : campos.almacen.valor,
      bandera : 1,
      almacenPlazaID: null,
    }
    const almacenesIds = []
    registros.forEach(registro => {
      almacenesIds.push(registro.IdAlmacen)
    });
    const existe = registros.filter(registro => registro.IdPlaza === datos.idPlaza && registro.IdAlmacen === datos.idAlmacen)

    if(almacenesIds.includes(datos.idAlmacen)) {
      yield put(
        enqueueSnackbar({
          message: 'El almacén ya se encuentra asignado',
          options: {
            variant: 'warning',
          },
        })
      );
    } else {
      // eslint-disable-next-line no-lonely-if
      if (existe.length > 0) {
        yield put(
          enqueueSnackbar({
            message: 'Registro ya existente',
            options: {
              variant: 'warning',
            },
          })
        );
      } else {
        const {
          status,
        } = yield call(postAP, datos);
    
        if(status === 200){
          yield put(
            Actions.get('GET_ALMACENES_PLAZAS').fn()
          );
          yield put(
            Actions.get('LIMPIAR_AP').fn()
          )
          yield put(
            enqueueSnackbar({
              message: 'Registro guardado correctamente',
              options: {
                variant: 'success',
              },
            })
          );
        }
      }
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al guardar el registro',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* postAuAction() {
  try {
    const campos = yield select((state) => state.getIn(['usuariosAlmacenes','usuariosAlmacenes', 'nuevoAU', 'campos']).toJS());
    const registros = yield select((state) => state.getIn(['usuariosAlmacenes','usuariosAlmacenes', 'nuevoAU', 'tablas', 'tablaAU']).toJS());
    const datos = {
      idAlmacen : campos.almacen.valor,
      idUsuario : campos.usuario.valor.value,
      bandera : 1,
      usuarioAlmacenID: null,
    }

    const existe = registros.filter(registro => registro.IdUsuario === datos.idUsuario && registro.IdAlmacen === datos.idAlmacen)

    if (existe.length > 0) {
      yield put(
        enqueueSnackbar({
          message: 'Registro ya existente',
          options: {
            variant: 'warning',
          },
        })
      );
    } else {
      const {
        status,
      } = yield call(postAU, datos);

      if(status === 200){
        yield put(
          Actions.get('GET_USUARIOS_ALMACENES').fn()
        );
        yield put(
          Actions.get('LIMPIAR_AU').fn()
        )
        yield put(
          enqueueSnackbar({
            message: 'Registro guardado correctamente',
            options: {
              variant: 'success',
            },
          })
        );
      }
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al guardar el registro',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* updateApAction() {
  try {
    const campos = yield select((state) => state.getIn(['usuariosAlmacenes','usuariosAlmacenes', 'nuevoAP', 'campos']).toJS());
    const IdRegistro = yield select((state) => state.getIn(['usuariosAlmacenes','usuariosAlmacenes', 'idRegistroSlc']));
    const registros = yield select((state) => state.getIn(['usuariosAlmacenes','usuariosAlmacenes', 'nuevoAP', 'tablas', 'tablaAP']).toJS());
    
    const datos = {
      idPlaza : campos.plaza.valor,
      idAlmacen : campos.almacen.valor,
      bandera : 2,
      almacenPlazaID: IdRegistro,
    }
    const almacenesIds = []
    registros.forEach(registro => {
      almacenesIds.push(registro.IdAlmacen)
    });
    const existe = registros.filter(registro => registro.IdPlaza === datos.idPlaza && registro.IdAlmacen === datos.idAlmacen && registro.IdRegistro !== IdRegistro)
    const registro = registros.filter(reg => reg.IdPlaza === datos.idPlaza && reg.IdAlmacen === datos.idAlmacen && reg.IdRegistro === IdRegistro)

    if(almacenesIds.includes(datos.idAlmacen) && registro.length === 0) {
      yield put(
        enqueueSnackbar({
          message: 'El almacén ya se encuentra asignado',
          options: {
            variant: 'warning',
          },
        })
      );
    } else {
      // eslint-disable-next-line no-lonely-if
      if (existe.length > 0) {
        yield put(
          enqueueSnackbar({
            message: 'Registro ya existente',
            options: {
              variant: 'warning',
            },
          })
        );
      } else {
        const {
          status,
        } = yield call(postAP, datos);
    
        if(status === 200){
          yield put(
            Actions.get('GET_ALMACENES_PLAZAS').fn()
          );
          yield put(
            Actions.get('LIMPIAR_AP').fn()
          )
          yield put(
            enqueueSnackbar({
              message: 'Registro actualizado correctamente',
              options: {
                variant: 'success',
              },
            })
          );
        }
      }   
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al actualizar el registro',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* updateAuAction() {
  try {
    const campos = yield select((state) => state.getIn(['usuariosAlmacenes','usuariosAlmacenes', 'nuevoAU', 'campos']).toJS());
    const IdRegistro = yield select((state) => state.getIn(['usuariosAlmacenes','usuariosAlmacenes', 'idRegistroSlc']));
    const registros = yield select((state) => state.getIn(['usuariosAlmacenes','usuariosAlmacenes', 'nuevoAU', 'tablas', 'tablaAU']).toJS());
    const datos = {
      idUsuario : campos.usuario.valor.value,
      idAlmacen : campos.almacen.valor,
      bandera : 2,
      usuarioAlmacenID: IdRegistro,
    }

    const existe = registros.filter(registro => registro.IdUsuario === datos.idUsuario && registro.IdAlmacen === datos.idAlmacen && registro.IdRegistro !== IdRegistro )

    if (existe.length > 0) {
      yield put(
        enqueueSnackbar({
          message: 'Registro ya existente',
          options: {
            variant: 'warning',
          },
        })
      );
    } else {
      const {
        status,
      } = yield call(postAU, datos);
  
      if(status === 200){
        yield put(
          Actions.get('GET_USUARIOS_ALMACENES').fn()
        );
        yield put(
          Actions.get('LIMPIAR_AU').fn()
        )
        yield put(
          enqueueSnackbar({
            message: 'Registro actualizado correctamente',
            options: {
              variant: 'success',
            },
          })
        );
      }
    }    
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al actualizar el registro',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* eliminarApAction() {
  try {
    const IdRegistro = yield select((state) => state.getIn(['usuariosAlmacenes','usuariosAlmacenes', 'idRegistroSlc']));
    const registros = yield select((state) => state.getIn(['usuariosAlmacenes','usuariosAlmacenes', 'nuevoAP', 'tablas', 'tablaAP']).toJS());
    const registrosAU =  yield select((state) => state.getIn(['usuariosAlmacenes','usuariosAlmacenes', 'nuevoAU', 'tablas', 'tablaAU']).toJS());
    const idAlmacen = registros.filter(registro => registro.IdRegistro === IdRegistro)[0].IdAlmacen    
    const registrosPorAlmacen = registrosAU.filter(registro => registro.IdAlmacen === idAlmacen)

    if(registrosPorAlmacen.length > 0) {
      const datos = {
        idUsuario : null,
        // eslint-disable-next-line object-shorthand
        idAlmacen : idAlmacen,
        bandera : 4,
        usuarioAlmacenID: IdRegistro,
      }

      const {
        status,
      } = yield call(postAU, datos);
  
      if(status === 200){
        yield put(
          Actions.get('GET_ALMACENES_PLAZAS').fn()
        );
        yield put(
          Actions.get('LIMPIAR_AP').fn()
        )
        yield put(
          Actions.get('GET_USUARIOS_ALMACENES').fn()
        );
        yield put(
          Actions.get('LIMPIAR_AU').fn()
        )
        yield put(
          Actions.get('CLOSE_MODAL').fn()
        )
        yield put(
          enqueueSnackbar({
            message: 'Registro y usuarios eliminados correctamente',
            options: {
              variant: 'success',
            },
          })
        );
      }
    } else {

      const datos = {
        idUsuario : null,
        idAlmacen : null,
        bandera : 3,
        almacenPlazaID: IdRegistro,
      }

      const {
        status,
      } = yield call(postAP, datos);
  
      if(status === 200){
        yield put(
          Actions.get('GET_ALMACENES_PLAZAS').fn()
        );
        yield put(
          Actions.get('LIMPIAR_AP').fn()
        )
        yield put(
          Actions.get('CLOSE_MODAL').fn()
        )
        yield put(
          enqueueSnackbar({
            message: 'Registro eliminado correctamente',
            options: {
              variant: 'success',
            },
          })
        );
      }
    }

    
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al eliminar el registro',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* eliminarAuAction() {
  try {
    const IdRegistro = yield select((state) => state.getIn(['usuariosAlmacenes','usuariosAlmacenes', 'idRegistroSlc']));

    const datos = {
      idUsuario : null,
      idAlmacen : null,
      bandera : 3,
      usuarioAlmacenID: IdRegistro,
    }

    const {
      status,
    } = yield call(postAU, datos);

    if(status === 200){
      yield put(
        Actions.get('GET_USUARIOS_ALMACENES').fn()
      );
      yield put(
        Actions.get('LIMPIAR_AU').fn()
      )
      yield put(
        Actions.get('CLOSE_MODAL').fn()
      )
      yield put(
        enqueueSnackbar({
          message: 'Registro eliminado correctamente',
          options: {
            variant: 'success',
          },
        })
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al eliminar el registro',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getAlmacenesPlazasAction() {
  try {
    const {
      status,
      data = [],
    } = yield call(getAlmacenesPlaza);

    if(status === 200){
      yield put(
        Actions.get('SET_ALMACENES_PLAZAS').fn(data)
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener los Almacenes - Plaza',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getUsuariosAlmacenesAction() {
  try {
    const {
      status,
      data = [],
    } = yield call(getUsuariosAlmacenes);

    if(status === 200){
      yield put(
        Actions.get('SET_USUARIOS_ALMACENES').fn(data)
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener los Usuarios - Almacén',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export default function* usuariosAlmacenesSaga() {
  yield [
    takeLatest(
      GET_PLAZAS,
      getPlazasAction
    ),
    takeLatest(
      GET_ALMACENES,
      getAlmacenesAction
    ),
    takeLatest(
      GET_ALMACENES_PLAZAS,
      getAlmacenesPlazasAction
    ),
    takeLatest(
      GET_USUARIOS_ALMACENES,
      getUsuariosAlmacenesAction
    ),
    takeLatest(
      GET_USUARIOS,
      getUsuariosAction
    ),
    takeLatest(
      POST_AP,
      postApAction
    ),
    takeLatest(
      UPDATE_AP,
      updateApAction
    ),
    takeLatest(
      ELIMINAR_AP,
      eliminarApAction
    ),
    takeLatest(
      POST_AU,
      postAuAction
    ),
    takeLatest(
      UPDATE_AU,
      updateAuAction
    ),
    takeLatest(
      ELIMINAR_AU,
      eliminarAuAction
    ),
  ]
}
