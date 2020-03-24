import { takeLatest, call, put, select} from 'redux-saga/effects';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';
import _ from 'lodash';
import Actions from './actions';

import {
  getTransformaciones,
  deleteTransformacion,
  getMoldes,
  getSecciones,
  getPiezas,
  postTransformacion,
  getTransformacionDetalle,
  updateTransformacion,
} from './api';

export const {
  GET_TRANSFORMACIONES,
  GET_MOLDES,
  DELETE_TRANSFORMACION,
  GET_MOLDE_ID,
  POST_TRANSFORMACION,
  GET_TRANSFORMACION_DETALLE,
  UPDATE_TRANSFORMACION,
  SET_SNACKBAR,
} = Actions.getConstants();
// Individual exports for testing

export function* getTransformacionesAction() {
  try {
    const {
      status,
      data = [],
    } = yield call(getTransformaciones);

    if(status === 200){
      yield put(
        Actions.get('SET_TRANSFORMACIONES').fn(data)
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener las transformaciones',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* setSnackBarAction(action) {
  switch (action.snack) {
    case 1:
      yield put(
        enqueueSnackbar({
          message: 'Esta pieza o accesorio ya se encuentra registrada',
          options: {
            variant: 'warning',
          },
        })
      );
      yield put(
        Actions.get('CLEAN_SNACKBAR').fn()
      );
      break;
    case 2:
      yield put(
        enqueueSnackbar({
          message: 'No es posible agregar piezas a accesorios',
          options: {
            variant: 'warning',
          },
        })
      );
      yield put(
        Actions.get('CLEAN_SNACKBAR').fn()
      );
      break;
    case 3:
      yield put(
        enqueueSnackbar({
          message: 'No es posible agregar accesorios a piezas',
          options: {
            variant: 'warning',
          },
        })
      );
      yield put(
        Actions.get('CLEAN_SNACKBAR').fn()
      );
      break;
  
    default:
      break;
  }
  
  
}

export function* getTransformacionDetalleAction(action) {
  try {
    const {
      status,
      data = [],
    } = yield call(getTransformacionDetalle, action.idTransformacion);
    
    
    const secOrigen = yield call(getSecciones, data.IdMoldeOrigen);
    const secDestino = yield call(getSecciones, data.IdMoldeDestino);
    const origen = yield call(getPiezas, data.IdMoldeOrigen);
    const destino = yield call(getPiezas, data.IdMoldeDestino);
    const piezasOrigen = _.concat(origen.data[0], origen.data[1])
    const piezasDestino = _.concat(destino.data[0], destino.data[1])
    
    const arrayPlantasOrigen = []
    const arrayPlantasDestino = []


    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < data.PlantasOrigen; i++) {
      if (i === 0) {
        arrayPlantasOrigen.push({Id: i + 1, Planta: 'Planta baja'})
      } else {
        arrayPlantasOrigen.push({Id: i + 1, Planta: `Nivel ${i}`})
      }
    }

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < data.PlantasDestino; i++) {
      if (i === 0) {
        arrayPlantasDestino.push({Id: i + 1, Planta: 'Planta baja'})
      } else {
        arrayPlantasDestino.push({Id: i + 1, Planta: `Nivel ${i}`})
      }
    }


    piezasOrigen.forEach(pieza => {
      if(pieza.IdPieza) {
        pieza.id = `task-p-${pieza.IdPieza}`
      } else {
        pieza.id = `task-a-${pieza.IdAccesorio}`
      }    
    });
    
    const nuevaTransformacion = {
      idTransformacion: data.IdTransformacion,
      idOrigen: data.IdMoldeOrigen,
      idDestino: data.IdMoldeDestino,
      tasks: piezasOrigen,
      columns: [
        {
          id: 'columna-1',
          IdPieza: 0,
          Planta: 0,
          IdSeccion: 0,
          Nombre: 'Pieza 0',
          index: 0,
          tasks: [],
          taskIds: [],
        },
      ],
      columnOrder: [],
    }

    piezasOrigen.forEach(pieza => {
      if(pieza.IdPieza) {
        nuevaTransformacion.columns[0].taskIds.push(`task-p-${pieza.IdPieza}`)
      } else {
        nuevaTransformacion.columns[0].taskIds.push(`task-a-${pieza.IdAccesorio}`)
      }
    });
    
    piezasDestino.forEach((pieza, index) => {
      const column = {};
      if (pieza.IdPieza) {
        column.id = `pieza-${pieza.IdPieza}`;
        column.IdPieza = pieza.IdPieza;
        column.Identificador = pieza.Identificador;
      } else {
        column.id = `accesorio-${pieza.IdAccesorio}`;
        column.IdAccesorio = pieza.IdAccesorio;
        column.Identificador = pieza.Identificador;

      }
      column.IdSeccion = pieza.IdSeccion;
      column.Planta = pieza.Planta;
      column.Nombre = pieza.Nombre;
      column.index = index + 1;
      column.tasks = [];
      column.taskIds = [];
      
      nuevaTransformacion.columns.push(column);
    });
    
    data.piezas.forEach(pieza => {
      
      if(pieza.EsPieza === 1) {
        nuevaTransformacion.columns.filter( column => 
          column.IdPieza === pieza.IdPiezaDestino || column.IdAccesorio === pieza.IdPiezaDestino
        )[0].taskIds.push(`task-p-${pieza.IdPiezaOrigen}-${Math.floor(Math.random() * 1000000)}`)
        
      } else {
        nuevaTransformacion.columns.filter( column =>
          column.IdPieza === pieza.IdPiezaDestino || column.IdAccesorio === pieza.IdPiezaDestino
        )[0].taskIds.push(`task-a-${pieza.IdPiezaOrigen}-${Math.floor(Math.random() * 1000000)}`)
      }
    });
    
    // const taskIds = [];
    nuevaTransformacion.columns.forEach(column => {
      if (column.IdPieza !== 0) {
        if(column.IdPieza) {
          nuevaTransformacion.columnOrder.push(`pieza-${column.IdPieza}`)
        } else {
          nuevaTransformacion.columnOrder.push(`accesorio-${column.IdAccesorio}`)
        }
        // column.taskIds.forEach(taskId => {
        //   // const pieza = nuevaTransformacion.tasks.filter(task => `task-p-${task.IdPieza}` === taskId || `task-a-${task.IdAccesorio}` === taskId)[0];
        //   taskIds.push(taskId)
        //   // column.tasks.push(pieza);
        // });
      }
    });
    
    // const c1Ids = nuevaTransformacion.columns[0].taskIds
    // _.pullAll(c1Ids, taskIds)
    // nuevaTransformacion.columns[0].taskIds = c1Ids

    if(status === 200){
      yield put(
        Actions.get('SET_TRANSFORMACION_DETALLE').fn(nuevaTransformacion)
      );
      yield put(
        Actions.get('SET_SECCIONES_ORIGEN').fn(secOrigen.data)
      );
      yield put(
        Actions.get('SET_SECCIONES_DESTINO').fn(secDestino.data)
      );
      yield put(
        Actions.get('SET_PLANTAS_ORIGEN').fn(arrayPlantasOrigen)
      );
      yield put(
        Actions.get('SET_PLANTAS_DESTINO').fn(arrayPlantasDestino)
      );
    } else {
      yield put(
        enqueueSnackbar({
          message: "Hubo un error al obtener la transformación",
          options: {
            variant: 'error',
          },
        })
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener la transformación',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getMoldesAction() {
  try {
    const {
      status,
      data = [],
    } = yield call(getMoldes);

    if(status === 200){
      yield put(
        Actions.get('SET_MOLDES_ORIGEN').fn(data)
      );
      yield put(
        Actions.get('SET_MOLDES_DESTINO').fn(data)
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener los moldes',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getMoldeIdAction(action) {
  try {
    if(action.tipo === 1){
      const {
        status,
        data = [],
      } = yield call(getSecciones, action.IdConfiguracionMolde);

      const piezas = yield call(getPiezas, action.IdConfiguracionMolde);
      const moldes = yield select((state) => state.getIn(['configuracionTransformacion','transformacionesTabla', 'moldes']).toJS());

      
      const plantas = moldes.filter(molde => molde.IdConfiguracionMolde === action.IdConfiguracionMolde)[0].Plantas;
      const arrayPlantas = []

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < plantas; i++) {
        if (i === 0) {
          arrayPlantas.push({Id: i + 1, Planta: 'Planta baja'})
        } else {
          arrayPlantas.push({Id: i + 1, Planta: `Nivel ${i}`})
        }
      }

      if(status === 200){
        yield put(
          Actions.get('SET_SECCIONES_ORIGEN').fn(data)
        );
        yield put(
          Actions.get('SET_PIEZAS_ORIGEN').fn(piezas.data)
        );
        yield put(
          Actions.get('SET_PLANTAS_ORIGEN').fn(arrayPlantas)
        );
      }
    } else {
      const {
        status,
        data = [],
      } = yield call(getSecciones, action.IdConfiguracionMolde);
      const piezas = yield call(getPiezas, action.IdConfiguracionMolde);
      const moldes = yield select((state) => state.getIn(['configuracionTransformacion','transformacionesTabla', 'moldes']).toJS());

      const plantas = moldes.filter(molde => molde.IdConfiguracionMolde === action.IdConfiguracionMolde)[0].Plantas;

      const arrayPlantas = []

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < plantas; i++) {
        if (i === 0) {
          arrayPlantas.push({Id: i + 1, Planta: 'Planta baja'})
        } else {
          arrayPlantas.push({Id: i + 1, Planta: `Nivel ${i}`})
        }
      }

      if(status === 200){
        yield put(
          Actions.get('SET_SECCIONES_DESTINO').fn(data)
        );
        yield put(
          Actions.get('SET_PIEZAS_DESTINO').fn(piezas.data)
        );
        yield put(
          Actions.get('SET_PLANTAS_DESTINO').fn(arrayPlantas)
        );
      }
    }
  } catch(error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener las piezas',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* deleteTransformacionAction(action) {
  try {
    const {
      status,
    } = yield call(deleteTransformacion, action.idTransformacion);
    
    if(status === 200){
      yield put(
        Actions.get('CLOSE_MODAL').fn()
      );
      yield put(
        Actions.get('GET_TRANSFORMACIONES').fn()
      );
      yield put(
        enqueueSnackbar({
          message: 'La transformación fue eliminada con éxito',
          options: {
            variant: 'success',
          },
        })
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al eliminar la transformación',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* postTransformacionAction(){
  try{

    const transformacionNuevo = yield select((state) => state.getIn(['configuracionTransformacion','transformacionesTabla', 'nuevaTransformacion']).toJS());
    const tasks = [];
    for (let i = 1; i < transformacionNuevo.columns.length; i += 1) {
      transformacionNuevo.columns[i].taskIds.forEach(task => {
        
        const splitTask = task.split(/-/);
        const subTask = task.substring(0, (7 + splitTask[2].length));
        const pieza = transformacionNuevo.tasks.filter(tarea => subTask === tarea.id);
        transformacionNuevo.columns[i].tasks.push(pieza[0]);
        tasks.push(pieza[0]);
      });
    }

    if(tasks.length !== 0) {
      const {
        status,
      } = yield call (postTransformacion, transformacionNuevo);
      
      if (status === 200) {
        yield put (
          Actions.get('REGRESAR').fn()
        );
        yield put(
          Actions.get('GET_TRANSFORMACIONES').fn()
        );
        yield put(
          enqueueSnackbar({
            message: 'La transformación se ha guardado correctamente.',
            options: {
              variant: 'success',
            },
          })
        );
      }
    } else {
      yield put(
        enqueueSnackbar({
          message: 'Existen piezas y/o accesorios sin asignar',
          options: {
            variant: 'warning',
          },
        })
      );
    }
    

  } catch( err ) {
    yield put(
      enqueueSnackbar({
        message: "Hubo un error al guardar la transformación",
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* updateTransformacionAction(){
  try{

    const transformacionNuevo = yield select((state) => state.getIn(['configuracionTransformacion','transformacionesTabla', 'nuevaTransformacion']).toJS());
    const tasks = [];
    for (let i = 0; i < transformacionNuevo.columns.length; i += 1) {
      transformacionNuevo.columns[i].taskIds.forEach(task => {
        const splitTask = task.split(/-/);
        const subTask = task.substring(0, (7 + splitTask[2].length));
        const pieza = transformacionNuevo.tasks.filter(tarea => subTask === tarea.id);
        transformacionNuevo.columns[i].tasks.push(pieza[0]);
        tasks.push(pieza[0]);
      });
    }
    if(tasks.length !== 0) {
      const {
        status,
      } = yield call (updateTransformacion, transformacionNuevo);
      
      if (status === 200) {
        yield put (
          Actions.get('REGRESAR').fn()
        );
        yield put(
          Actions.get('GET_TRANSFORMACIONES').fn()
        );
        yield put(
          enqueueSnackbar({
            message: 'La transformación se ha actualizado correctamente.',
            options: {
              variant: 'success',
            },
          })
        );
      }
    } else {
      yield put(
        enqueueSnackbar({
          message: 'Existen piezas y/o accesorios sin asignar',
          options: {
            variant: 'warning',
          },
        })
      );
    }
    
  } catch( err ) {
    yield put(
      enqueueSnackbar({
        message: "Hubo un error al actualizar la transformación",
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export default function* configuracionTransformacionSaga() {
  yield [
    takeLatest(
      GET_TRANSFORMACIONES,
      getTransformacionesAction
    ),
    takeLatest(
      GET_MOLDES,
      getMoldesAction
    ),
    takeLatest(
      DELETE_TRANSFORMACION,
      deleteTransformacionAction
    ),
    takeLatest(
      GET_MOLDE_ID,
      getMoldeIdAction
    ),
    takeLatest(
      POST_TRANSFORMACION,
      postTransformacionAction
    ),
    takeLatest(
      GET_TRANSFORMACION_DETALLE,
      getTransformacionDetalleAction
    ),
    takeLatest(
      UPDATE_TRANSFORMACION,
      updateTransformacionAction
    ),
    takeLatest(
      SET_SNACKBAR,
      setSnackBarAction
    ),
  ]
}
