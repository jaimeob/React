/* eslint-disable no-console */
/*
 *
 * ConfiguracionTransformacion reducer
 *                                                                                                                                           
 */

import { fromJS, List } from 'immutable';
import _ from 'lodash';
import Actions from './actions';
import STATE from './state';

export const initialState = fromJS(STATE);
export const {
  DEFAULT,
  NUEVA_TRANSFORMACION,
  REGRESAR,
  OPEN_MODAL,
  CLOSE_MODAL,
  SET_TRANSFORMACIONES,
  SET_MOLDES_ORIGEN,
  SET_MOLDES_DESTINO,
  GET_MOLDE_ID,
  LOCK_MOLDES,
  UNLOCK_MOLDES,
  SET_SECCIONES_ORIGEN,
  SET_SECCIONES_DESTINO,
  SET_PIEZAS_ORIGEN,
  SET_PIEZAS_DESTINO,
  DRAG_END,
  SET_TRANSFORMACION_DETALLE,
  PLANTA_FILTER,
  SECCION_FILTER,
  REMOVE_TASK,
  SET_PLANTAS_ORIGEN,
  SET_PLANTAS_DESTINO,
  CLEAN_SNACKBAR,
  REGRESAR_STEPPER,
} = Actions.getConstants();

function configuracionTransformacionReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT: {
      return state;
    }
    case NUEVA_TRANSFORMACION: {
      return state.setIn(['transformacionesTabla', 'stepper'], 1);
    }
    case REGRESAR_STEPPER: {
      return state.setIn(['transformacionesTabla', 'stepper'], 0);
    }
    case REGRESAR: {
      const moldes = state.getIn(['transformacionesTabla', 'moldes']);
      const nuevaTransformacion =  {
        idOrigen: [],
        idDestino: [],
        tasks: [],
        columns: [],
        columnOrder: [],
      }

      const obj = {
        idPlanta: 0,
        idSeccion: 0,
        moldes: moldes,
        secciones: [],
        piezas: [],
        plantas: [],
        datos: {
          value: [],
          error: false,
          text: '',
        },
      }

      return state.setIn(['transformacionesTabla', 'stepper'], 0)
        .setIn(['transformacionesTabla', 'show'], false)
        .setIn(['transformacionesTabla', 'update'], false)
        .setIn(['transformacionesTabla', 'disabled'], false)
        .setIn(['transformacionesTabla', 'origen'], fromJS(obj))
        .setIn(['transformacionesTabla', 'destino'], fromJS(obj))
        .setIn(['transformacionesTabla', 'nuevaTransformacion'], fromJS(nuevaTransformacion))
        .setIn(['transformacionesTabla', 'snackbar'], 0)
    }
    case OPEN_MODAL: {
      const modal = {
        value: false,
        stepper: 0,
        text: '',
      }

      switch (action.stepper) {
        case 1:
          modal.value = true;
          modal.text = '¿Está seguro que desea eliminar el registro seleccionado?';
          modal.stepper = action.stepper;
          return state.setIn(['transformacionesTabla', 'modal'], modal)
            .setIn(['transformacionesTabla', 'transformacionSelec'], action.data);
        case 2:
          modal.value = true;
          modal.text = 'Existen datos no guardados, ¿Desea continuar?';
          modal.stepper = action.stepper;
          return state.setIn(['transformacionesTabla', 'modal'], modal);
        default:
          break;
      }
      
      // eslint-disable-next-line consistent-return
      return;
    }
    case CLOSE_MODAL: {
      const modal = {
        value: false,
        stepper: 0,
        text: '',
      }
      return state.setIn(['transformacionesTabla', 'modal'], modal)
        .setIn(['transformacionesTabla', 'transformacionSelec'], 0)
    }
    case SET_TRANSFORMACIONES:{
      return state.setIn(['transformacionesTabla', 'datos'], List(action.datos));
    }
    case SET_MOLDES_ORIGEN: {
      return state.setIn(['transformacionesTabla', 'origen', 'moldes'], List(action.datos))
        .setIn(['transformacionesTabla', 'moldes'], List(action.datos));
    }
    case SET_MOLDES_DESTINO: {
      return state.setIn(['transformacionesTabla', 'destino','moldes'], List(action.datos));
    }
    case GET_MOLDE_ID:{
      const {
        tipo,
        IdConfiguracionMolde,
      } = action;
      
      let valor;
      let moldes = JSON.parse(
        JSON.stringify(
          state.getIn(
            ['transformacionesTabla', 'moldes']
          )
        )
      );

      const transformaciones = state.getIn(['transformacionesTabla', 'datos']).toJS();

      if (tipo === 1) {
        const filteredMoldes = moldes.filter((molde) => molde.IdConfiguracionMolde !== IdConfiguracionMolde);
        const filteredTrans = transformaciones.filter(transformacion => transformacion.IdMoldeOrigen === IdConfiguracionMolde)
        const nuevaTransformacion = state.getIn(['transformacionesTabla', 'nuevaTransformacion']).toJS()
        nuevaTransformacion.columns.forEach(column => {
          column.taskIds = []
          column.tasks = []
        });

        const arrayMolde = [];
        filteredMoldes.forEach(molde => {
          arrayMolde.push(molde.IdConfiguracionMolde)
        });

        const arrayTrans = [];
        filteredTrans.forEach(transformacion => {
          arrayTrans.push(transformacion.IdMoldeDestino)
        });

        const filtered = _.pullAll(arrayMolde, arrayTrans);
        const arrayFinal = []
        filtered.forEach(filter => {
          const finalMolde = filteredMoldes.filter(filMol => filMol.IdConfiguracionMolde === filter)[0]
          arrayFinal.push(finalMolde)
        });
        moldes = arrayFinal;

        valor = state.setIn(['transformacionesTabla', 'origen', 'datos', 'value'], IdConfiguracionMolde)
          .setIn(['transformacionesTabla', 'nuevaTransformacion', 'idOrigen'], IdConfiguracionMolde)
          .setIn(['transformacionesTabla', 'nuevaTransformacion', 'columns'], fromJS(nuevaTransformacion.columns))
          .setIn(['transformacionesTabla', 'origen', 'datos', 'error'], false)
          .setIn(['transformacionesTabla', 'origen', 'datos', 'text'], '')
          .setIn(['transformacionesTabla', 'destino', 'moldes'], List(moldes))
      } else {
        const filteredMoldes = moldes.filter((molde) => molde.IdConfiguracionMolde !== IdConfiguracionMolde);
        const filteredTrans = transformaciones.filter(transformacion => transformacion.IdMoldeDestino === IdConfiguracionMolde)
        
        const arrayMolde = [];
        filteredMoldes.forEach(molde => {
          arrayMolde.push(molde.IdConfiguracionMolde)
        });

        const arrayTrans = [];
        filteredTrans.forEach(transformacion => {
          arrayTrans.push(transformacion.IdMoldeOrigen)
        });

        const filtered = _.pullAll(arrayMolde, arrayTrans);
        const arrayFinal = []
        filtered.forEach(filter => {
          const finalMolde = filteredMoldes.filter(filMol => filMol.IdConfiguracionMolde === filter)[0]
          arrayFinal.push(finalMolde)
        });
        moldes = arrayFinal;
        valor = state.setIn(['transformacionesTabla', 'destino', 'datos', 'value'], IdConfiguracionMolde)
          .setIn(['transformacionesTabla', 'nuevaTransformacion', 'idDestino'], IdConfiguracionMolde)
          .setIn(['transformacionesTabla', 'destino', 'datos', 'error'], false)
          .setIn(['transformacionesTabla', 'destino', 'datos', 'text'], '')
          .setIn(['transformacionesTabla', 'origen', 'moldes'], List(moldes))
      }

      return valor;
    }
    case LOCK_MOLDES: {
      const moldeOrigen = JSON.parse(
        JSON.stringify(
          state.getIn(
            ['transformacionesTabla', 'origen','datos']
          )
        )
      );

      const moldeDestino = JSON.parse(
        JSON.stringify(
          state.getIn(
            ['transformacionesTabla', 'destino' ,'datos']
          )
        )
      );

      let accion;
      let errorOrigen = false;
      let textOrigen = '';
      let errorDestino = false;
      let textDestino = '';

      if (moldeOrigen.value.length === 0 || moldeDestino.value.length === 0) {
        if(moldeOrigen.value.length === 0) {
          errorOrigen = true;
          textOrigen = '*Requerido';
        }

        if(moldeDestino.value.length === 0) {
          errorDestino = true;
          textDestino = '*Requerido';
        }

        accion = state.setIn(['transformacionesTabla', 'origen','datos', 'error'], errorOrigen)
          .setIn(['transformacionesTabla', 'origen','datos', 'text'], textOrigen)
          .setIn(['transformacionesTabla', 'destino' ,'datos', 'error'], errorDestino)
          .setIn(['transformacionesTabla', 'destino' ,'datos', 'text'], textDestino)

      } else {
        accion = state.setIn(['transformacionesTabla', 'disabled'], true)
          .setIn(['transformacionesTabla', 'show'], true)
      }

      return accion;
    }
    case UNLOCK_MOLDES: {
      return state.setIn(['transformacionesTabla', 'disabled'], false)
      // .setIn(['transformacionesTabla', 'show'], false);
    }
    case SET_SECCIONES_ORIGEN: {
      const secciones = state.getIn(['transformacionesTabla', 'destino','secciones']).toJS();

      action.data.forEach(seccion => {
        secciones.push(seccion)
      });

      return state.setIn(['transformacionesTabla', 'origen','secciones'], List(action.data))
        .setIn(['transformacionesTabla', 'secciones'], fromJS(secciones));
    }
    case SET_SECCIONES_DESTINO: {
      const secciones = state.getIn(['transformacionesTabla', 'origen','secciones']).toJS();
      
      action.data.forEach(seccion => {
        secciones.push(seccion)
      });

      return state.setIn(['transformacionesTabla', 'destino','secciones'], List(action.data))
        .setIn(['transformacionesTabla', 'secciones'], fromJS(secciones));
    }
    case PLANTA_FILTER: {
      const {
        idPlanta,
        tipo,
      } = action;

      if(tipo === 1) {
        let tasks
        let idSeccion = state.getIn(['transformacionesTabla', 'origen', 'idSeccion'])
        const nuevaTransformacion = state.getIn(['transformacionesTabla', 'nuevaTransformacion']).toJS()
        const secciones = state.getIn(['transformacionesTabla', 'secciones']).toJS();
        const update = state.getIn(['transformacionesTabla', 'update'])

        if (update) {
          tasks = state.getIn(['transformacionesTabla', 'nuevaTransformacion', 'tasks']).toJS()
        } else {
          tasks = state.getIn(['transformacionesTabla', 'nuevaTransformacion', 'tasks'])
        }
        
        let filteredTasks = [];
        let filteredSec = [];
        if(idPlanta !== 0) {
          if(idSeccion !== 0) {
            filteredTasks = tasks.filter(task => task.Planta === idPlanta)
            idSeccion = 0;
            filteredSec = secciones.filter(seccion => seccion.IdConfiguracionMolde === nuevaTransformacion.idOrigen && seccion.IdPlanta === idPlanta)
          } else {
            filteredTasks = tasks.filter(task => task.Planta === idPlanta)
            filteredSec = secciones.filter(seccion => seccion.IdConfiguracionMolde === nuevaTransformacion.idOrigen && seccion.IdPlanta === idPlanta)
          }
        } else {
          // eslint-disable-next-line no-lonely-if
          if(idSeccion !== 0) {
            filteredTasks = tasks.filter(task => task.IdSeccion === idSeccion)
            filteredSec = secciones.filter(seccion => seccion.IdConfiguracionMolde === nuevaTransformacion.idOrigen)
          } else {
            filteredTasks = tasks
            filteredSec = secciones.filter(seccion => seccion.IdConfiguracionMolde === nuevaTransformacion.idOrigen)
          }
        }

        const taskIds = [];
        filteredTasks.forEach(taskId => {
          taskIds.push(taskId.id)
        });

        const tasksColumn = [];
        nuevaTransformacion.columns.forEach(column => {
          if (column.IdPieza !== 0) {
            column.taskIds.forEach(taskId => {
              tasksColumn.push(taskId)
            });
          }
        });

        _.pullAll(taskIds, tasksColumn)
        return state.setIn(['transformacionesTabla', 'origen','idPlanta'], idPlanta)
          .setIn(['transformacionesTabla', 'origen','idSeccion'], idSeccion)
          .setIn(['transformacionesTabla', 'origen','secciones'], fromJS(filteredSec))
          .setIn(['transformacionesTabla', 'nuevaTransformacion', 'columns', 0, 'taskIds'], taskIds);
      // eslint-disable-next-line no-else-return
      } else {
        const columns = state.getIn(['transformacionesTabla', 'nuevaTransformacion', 'columns']).toJS()
        let idSeccion = state.getIn(['transformacionesTabla', 'destino', 'idSeccion'])
        const nuevaTransformacion = state.getIn(['transformacionesTabla', 'nuevaTransformacion']).toJS()        
        const secciones = state.getIn(['transformacionesTabla', 'secciones']).toJS();
        let filteredTasks = [];
        let filteredSec = [];
        if(idPlanta !== 0) {

          if(idSeccion !== 0) {
            filteredTasks = columns.filter(column => column.Planta === idPlanta)
            idSeccion = 0;
            filteredSec = secciones.filter(seccion => seccion.IdConfiguracionMolde === nuevaTransformacion.idDestino && seccion.IdPlanta === idPlanta)
          } else {

            filteredTasks = columns.filter(column => column.Planta === idPlanta)

            filteredSec = secciones.filter(seccion => seccion.IdConfiguracionMolde === nuevaTransformacion.idDestino && seccion.IdPlanta === idPlanta)
          }

        } else {
          // eslint-disable-next-line no-lonely-if
          if(idSeccion !== 0) {
            filteredTasks = columns.filter(column => column.IdSeccion === idSeccion)
            filteredSec = secciones.filter(seccion => seccion.IdConfiguracionMolde === nuevaTransformacion.idDestino)
          } else {
            filteredTasks = columns
            filteredSec = secciones.filter(seccion => seccion.IdConfiguracionMolde === nuevaTransformacion.idDestino)
          }
        }

        const colunmnsIds = [];
        
        filteredTasks.forEach(columnId => {
          if(columnId.IdPieza !== 0) {
            colunmnsIds.push(columnId.id)
          }
        });
        

        return state.setIn(['transformacionesTabla', 'destino','idPlanta'], idPlanta)
          .setIn(['transformacionesTabla', 'destino','idSeccion'], idSeccion)
          .setIn(['transformacionesTabla', 'destino','secciones'], fromJS(filteredSec))
          .setIn(['transformacionesTabla', 'nuevaTransformacion', 'columnOrder'], fromJS(colunmnsIds));
      }
      
    }
    case SECCION_FILTER: {
      const {
        idSeccion,
        tipo,
      } = action;

      if(tipo === 1) {
        let tasks
        const idPlanta = state.getIn(['transformacionesTabla', 'origen', 'idPlanta'])
        const nuevaTransformacion = state.getIn(['transformacionesTabla', 'nuevaTransformacion']).toJS()
        const update = state.getIn(['transformacionesTabla', 'update'])

        let filteredTasks = [];

        if (update) {
          tasks = state.getIn(['transformacionesTabla', 'nuevaTransformacion', 'tasks']).toJS()
        } else {
          tasks = state.getIn(['transformacionesTabla', 'nuevaTransformacion', 'tasks'])
        }

        if(idSeccion !== 0) {
          if(idPlanta !== 0) {
            filteredTasks = tasks.filter(task => task.IdSeccion === idSeccion && task.Planta === idPlanta)
          } else {
            filteredTasks = tasks.filter(task => task.IdSeccion === idSeccion)
          }
        } else {
          // eslint-disable-next-line no-lonely-if
          if(idPlanta !== 0) {
            filteredTasks = tasks.filter(task => task.Planta === idPlanta)
          } else {
            filteredTasks = tasks
          }
        }

        const taskIds = [];
        filteredTasks.forEach(taskId => {
          taskIds.push(taskId.id)
        });

        const tasksColumn = [];
        nuevaTransformacion.columns.forEach(column => {
          if (column.IdPieza !== 0) {
            column.taskIds.forEach(taskId => {
              tasksColumn.push(taskId)
            });
          }
        });

        _.pullAll(taskIds, tasksColumn)

        return state.setIn(['transformacionesTabla', 'origen','idSeccion'], idSeccion)
          .setIn(['transformacionesTabla', 'nuevaTransformacion', 'columns', 0, 'taskIds'], taskIds);
      // eslint-disable-next-line no-else-return
      } else {
        const columns = state.getIn(['transformacionesTabla', 'nuevaTransformacion', 'columns']).toJS()
        const idPlanta = state.getIn(['transformacionesTabla', 'destino', 'idPlanta'])
        let filteredTasks = [];
        
        if(idSeccion !== 0) {
          if(idPlanta !== 0) {
            filteredTasks = columns.filter(column => column.Planta === idPlanta && column.IdSeccion === idSeccion)
          } else {
            filteredTasks = columns.filter(column => column.IdSeccion === idSeccion)
          }
        } else {
          // eslint-disable-next-line no-lonely-if
          if(idPlanta !== 0) {
            filteredTasks = columns.filter(column => column.Planta === idPlanta)
          } else {
            filteredTasks = columns
          }
        }

        const colunmnsIds = [];
        
        filteredTasks.forEach(columnId => {
          if(columnId.IdPieza !== 0) {
            colunmnsIds.push(columnId.id)
          }
        });

        return state.setIn(['transformacionesTabla', 'destino','idSeccion'], idSeccion)
          .setIn(['transformacionesTabla', 'nuevaTransformacion', 'columnOrder'], fromJS(colunmnsIds));
      }
    }
    case SET_PIEZAS_ORIGEN: {
      const tasks = [];
      const piezas = [];
      for (let i = 0; i < action.data[0].length; i += 1) {
        let task = 0;
        task = `task-p-${action.data[0][i].IdPieza}`;
        action.data[0][i].id = `task-p-${action.data[0][i].IdPieza}`;
        tasks.push(task);
        piezas.push(action.data[0][i])
      }
      for (let i = 0; i < action.data[1].length; i += 1) {
        let task = 0;
        task = `task-a-${action.data[1][i].IdAccesorio}`;
        action.data[1][i].id = `task-a-${action.data[1][i].IdAccesorio}`;
        tasks.push(task);
        piezas.push(action.data[1][i])
      }

      return state.setIn(['transformacionesTabla', 'origen', 'piezas'], List(piezas))
        .setIn(['transformacionesTabla', 'nuevaTransformacion', 'tasks'], piezas)
        .setIn(['transformacionesTabla', 'nuevaTransformacion', 'columns', 0,'taskIds'], tasks);
    }
    case SET_PIEZAS_DESTINO: {
      const piezas = JSON.parse(
        JSON.stringify(
          state.getIn(
            ['transformacionesTabla', 'origen', 'piezas']
          )
        )
      );
      
      const tasks = [];
      for (let i = 0; i < piezas.length; i += 1) {
        let task = 0;
        if(piezas[i].IdPieza) {
          task = `task-p-${piezas[i].IdPieza}`;
          tasks.push(task);
        } else {
          task = `task-a-${piezas[i].IdAccesorio}`;
          tasks.push(task);
        } 
      }

      const columns = [
        {
          id: 'columna-1',
          IdPieza: 0,
          Planta: 0,
          IdSeccion: 0,
          Nombre: 'Pieza 0',
          index: 0,
          tasks: [],
          taskIds: tasks,
        },
      ];

      for (let i = 0; i < action.data[0].length; i += 1) {
        const column = {};
        column.id = `pieza-${action.data[0][i].IdPieza}`;
        column.Identificador = action.data[0][i].Identificador;
        column.IdPieza = action.data[0][i].IdPieza;
        column.Planta = action.data[0][i].Planta;
        column.IdSeccion = action.data[0][i].IdSeccion;
        column.Nombre = action.data[0][i].Nombre;
        column.index = i + 1;
        column.tasks = [];
        column.taskIds = [];
        columns.push(column);
      }

      for (let i = 0; i < action.data[1].length; i += 1) {
        const column = {};
        const idx = columns[columns.length -1].index;
        column.id = `accesorio-${action.data[1][i].IdAccesorio}`;
        column.Identificador = action.data[1][i].Identificador;
        column.IdAccesorio = action.data[1][i].IdAccesorio;
        column.Planta = action.data[1][i].Planta;
        column.Nombre = action.data[1][i].Nombre;
        column.index = idx + 1;
        column.tasks = [];
        column.taskIds = [];
        columns.push(column);
      }
      const columnOrder = [];

      for (let i = 0; i < action.data[0].length; i += 1) {
        let order = 0;
        order = `pieza-${action.data[0][i].IdPieza}`;
        columnOrder.push(order);
      }

      for (let i = 0; i < action.data[1].length; i += 1) {
        let order = 0;
        order = `accesorio-${action.data[1][i].IdAccesorio}`;
        columnOrder.push(order);
      }

      return state.setIn(['transformacionesTabla', 'destino', 'piezas'], List(action.data[0]))
        .setIn(['transformacionesTabla', 'nuevaTransformacion', 'columnOrder'], List(columnOrder))
        .updateIn(['transformacionesTabla', 'nuevaTransformacion', 'columns'], columnas => columnas.merge(columns));
    }
    case DRAG_END : {
      const {destination, draggableId, source} = action.result;
      const columns = JSON.parse(
        JSON.stringify(
          state.getIn(
            ['transformacionesTabla', 'nuevaTransformacion', 'columns']
          )
        )
      );
      if(!destination) {
        // eslint-disable-next-line consistent-return
        return;
      }
  
      if (destination.droppableId === source.droppableId && destination.index === source.index ) {
        // eslint-disable-next-line consistent-return
        return;
      }
      
      const start = columns.filter(columna => columna.id === source.droppableId)[0];
      const finish = columns.filter(columna => columna.id === destination.droppableId)[0];
      let accion;
      if (start === finish) {
        const newTaskIds = Array.from(start.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);
        const newColumn = {
          ...start,
          taskIds: newTaskIds,
        }

        return state.setIn(['transformacionesTabla', 'nuevaTransformacion', 'columns', newColumn.index,'taskIds'], fromJS(newTaskIds))
          .setIn(['transformacionesTabla', 'snackbar'], 0);
      } 

      const splitTask = draggableId.split(/-/);
      const subTask = draggableId.substring(0, (7 + splitTask[2].length));
      const columna = columns.filter(column => column.id === finish.id)[0]

      const splitColumn = columna.id.split(/-/);

      if(splitTask[1] === 'p' && splitColumn[0] === 'accesorio') {
        // eslint-disable-next-line consistent-return
        return state.setIn(['transformacionesTabla', 'snackbar'], `2.${Math.floor(Math.random() * 1000000)}`);
      }

      if(splitTask[1] === 'a' && splitColumn[0] === 'pieza') {
        // eslint-disable-next-line consistent-return
        return state.setIn(['transformacionesTabla', 'snackbar'], `3.${Math.floor(Math.random() * 1000000)}`);
      }

      const array = []
      columna.taskIds.forEach(taskId => {
        const splitTask1 = taskId.split(/-/);
        const subTask1 = taskId.substring(0, (7 + splitTask1[2].length));
        array.push(subTask1)
      });
      const atasks = array.filter(element => element === subTask)
      if(atasks.length > 0) {
        // eslint-disable-next-line consistent-return
        return state.setIn(['transformacionesTabla', 'snackbar'], `1.${Math.floor(Math.random() * 1000000)}`);        
      }

      const startTaskIds = Array.from(start.taskIds);
      // startTaskIds.splice(source.index, 1);

      const finishTaskIds = Array.from(finish.taskIds);
      let idDraggable
      if(splitTask[1] === 'p') {
        idDraggable = `${draggableId}-${Math.floor(Math.random() * 1000000)}`
      } else {
        idDraggable = `${draggableId}`
        startTaskIds.splice(source.index, 1)
      }
      
      const newStart = {
        ...start,
        taskIds: startTaskIds, 
      }

      finishTaskIds.splice(destination.index, 0, idDraggable);

      const newFinish = {
        ...finish,
        taskIds: finishTaskIds, 
      }

      // eslint-disable-next-line prefer-const
      accion = state.setIn(['transformacionesTabla', 'nuevaTransformacion', 'columns', newStart.index], fromJS(newStart))
        .setIn(['transformacionesTabla', 'nuevaTransformacion', 'columns', newFinish.index], fromJS(newFinish))
        .setIn(['transformacionesTabla', 'snackbar'], 0)

      return accion;
    }
    case REMOVE_TASK: {
      const {
        pieza,
        task,
      } = action;

      const filteredTasks = pieza.taskIds.filter((taskId) => taskId !== task.id);
      return state.setIn(['transformacionesTabla', 'nuevaTransformacion', 'columns', pieza.index, 'taskIds'], fromJS(filteredTasks));
    }
    case SET_TRANSFORMACION_DETALLE: {
      
      return state.setIn(['transformacionesTabla', 'nuevaTransformacion'], fromJS(action.datos))
        .setIn(['transformacionesTabla', 'show'], true)
        .setIn(['transformacionesTabla', 'update'], true)
        .setIn(['transformacionesTabla', 'stepper'], 1)
        .setIn(['transformacionesTabla', 'disabled'], true)
        .setIn(['transformacionesTabla', 'origen', 'datos', 'value'], action.datos.idOrigen)
        .setIn(['transformacionesTabla', 'destino', 'datos', 'value'], action.datos.idDestino)
        
    }
    case SET_PLANTAS_ORIGEN: {
      return state.setIn(['transformacionesTabla', 'origen','plantas'], fromJS(action.data));
    }
    case SET_PLANTAS_DESTINO: {
      return state.setIn(['transformacionesTabla', 'destino','plantas'], fromJS(action.data));
    }
    case CLEAN_SNACKBAR: {
      return state.setIn(['transformacionesTabla', 'snackbar'], 0)
    }
    default: {
      return state;
    }
  }
}

export default configuracionTransformacionReducer;
