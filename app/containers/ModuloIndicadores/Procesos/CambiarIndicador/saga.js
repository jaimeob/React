import { takeLatest, call, put, select } from 'redux-saga/effects';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';
import ActionsSpinner from 'components/Spinner/store/actions'
import Actions from './actions';

import {
  getIndicadores,
  getDepartamentos,
  getPuestos,
  getEmpleados,
  postGuardarIndicador,
  postUploadFile,
} from './api';

export const {
  GET_INDICADORES,
  GET_DEPARTAMENTOS,
  ON_CHANGE_DEPARTAMENTO,
  ON_CHANGE_PUESTO,
  ON_CLICK_ACEPTAR_VENTANA,
} = Actions.getConstants();

const {
  CHANGE_SPINNER, 
} = ActionsSpinner.getConstants();

export function* getIndicadoresSaga() {
  try {
    yield put({
      type: CHANGE_SPINNER,
      status: true,
    });
    
    const idUsuario = yield select(state => state.getIn(['cambiarIndicador', 'principales', 'filtros', 'empleadoSlc'])) 

    const {
      status,
      data = [],
    } = yield call(getIndicadores, idUsuario);

    yield put({
      type: CHANGE_SPINNER,
      status: false,
    });
    
    if(status === 200){
      if(data.vacio){
        yield put(
          enqueueSnackbar({
            message: 'El usuario no tienen indicadores cerrados',
            options: {
              variant: 'warning',
            },
          })
        );
      }
      yield put(
        Actions.get('SET_INDICADORES').fn(data)
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
        message: 'Hubo un error al obtener los indicadores del usuario',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getDepartamentosSaga() {
  try {
    yield put({
      type: CHANGE_SPINNER,
      status: true,
    });
    
    const {
      status,
      data = [],
    } = yield call(getDepartamentos);

    yield put({
      type: CHANGE_SPINNER,
      status: false,
    });

    if(status === 200){
      yield put(
        Actions.get('SET_DEPARTAMENTOS').fn(data)
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
        message: 'Hubo un error al obtener los departamentos',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getPuestosSaga(action) {
  try {
    yield put({
      type: CHANGE_SPINNER,
      status: true,
    });
    
    const {
      status,
      data = [],
    } = yield call(getPuestos, action.idDepartamento);

    yield put({
      type: CHANGE_SPINNER,
      status: false,
    });

    if(status === 200){
      yield put(
        Actions.get('SET_PUESTOS').fn(data)
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
        message: 'Hubo un error al obtener los puestos',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getEmpleadosSaga(action) {
  try {
    yield put({
      type: CHANGE_SPINNER,
      status: true,
    });
    
    const {
      status,
      data = [],
    } = yield call(getEmpleados, action.idPuesto);

    yield put({
      type: CHANGE_SPINNER,
      status: false,
    });

    if(status === 200){
      yield put(
        Actions.get('SET_EMPLEADOS').fn(data)
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
        message: 'Hubo un error al obtener los empleados',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* postGuardarCambioSaga() {
  try {
    yield put({
      type: CHANGE_SPINNER,
      status: true,
    });
    const principal = yield select(state => state.getIn(['cambiarIndicador', 'principales']).toJS()) 
    if(principal.archivos.length === 0 || principal.observaciones.trim() === ''){
      yield put(
        enqueueSnackbar({
          message: 'Favor de proporcionar los datos requeridos',
          options: {
            variant: 'warning',
          },
        })
      );
      yield put(
        Actions.get('DESACTIVAR_ACEPTAR').fn()
      );
    } else {
      const principales = yield select(state => state.getIn(
        ['cambiarIndicador', 'principales']
      ).toJS())

      const cuant = yield select(state => state.getIn(
        ['cambiarIndicador', 'cuantitativos']
      ).toJS())

      const cual = yield select(state => state.getIn(
        ['cambiarIndicador', 'cualitativos']
      ).toJS())

      const idUsuario = yield select(state => state.getIn(['global', 'currentUser', 'UsuarioId'])) 

      const datos = {
        idPeriodo: principales.idPeriodo,
        idUsuarioIndicador: principales.filtros.empleadoSlc,
        idPuesto: principales.filtros.puestoSlc,
        indicadores: [],
        archivos: [],
        observaciones: principales.observaciones,
        idUsuario,
      }
      // -1 para quitar la columna de resultado
      for (let i = 0; i < cuant.datos.length - 1; i+=1) {
        datos.indicadores.push(
          {
            idIndicadorDetalle: cuant.datos[i].IdIndicadorDetalle,
            resultado: cuant.datos[i].ResultadoInput,
          }
        )
      }
      // -3 para quitar la columna de resultado, la vacia y la de evaluacion total
      for (let j = 0; j < cual.datos.length - 3; j+=1) {
        datos.indicadores.push(
          {
            idIndicadorDetalle: cual.datos[j].IdIndicadorDetalle,
            resultado: cual.datos[j].ResultadoInput,
          }
        )
      }

      const {
        status : estatusDos,
        data : file,
      } = yield call(postUploadFile, principales.archivosTemp)
      
      if(estatusDos === 200){
        for (let k = 0; k < file.length; k+=1) {
          datos.archivos[k]= {
            ruta: file[k].url,
            nombre: file[k].name,
          };
        }
      }

      const {
        status,
        data = [],
      } = yield call(postGuardarIndicador, datos);
  
      yield put({
        type: CHANGE_SPINNER,
        status: false,
      });
  
      if(status === 200){
        yield put(
          enqueueSnackbar({
            message: data[0].Mensaje,
            options: {
              variant: data[0].Error ? 'error' : 'success',
            },
          })
        );
        yield put(
          Actions.get('LIMPIAR_STATE').fn()
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
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al guardar los resultados',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export default function* cambiarIndicadorSaga() {
  yield [
    takeLatest(
      GET_INDICADORES,
      getIndicadoresSaga,
    ),
    takeLatest(
      GET_DEPARTAMENTOS,
      getDepartamentosSaga,
    ),
    takeLatest(
      ON_CHANGE_DEPARTAMENTO,
      getPuestosSaga,
    ),
    takeLatest(
      ON_CHANGE_PUESTO,
      getEmpleadosSaga,
    ),
    takeLatest(
      ON_CLICK_ACEPTAR_VENTANA,
      postGuardarCambioSaga,
    ),
  ]
}

