import React from 'react';
import T from 'prop-types';
import {DragDropContext} from 'react-beautiful-dnd';
import styled from 'styled-components';
import InitialData from './initial-data';
import Column from './column';
import '@atlaskit/css-reset';


const Container = styled.div`
  display: flex
`;

export default class App extends React.Component {

  //state = InitialData;
  
  onDragEnd = result => {
    const {
      puestos,
      setPuestosDragAction,
      puestosAsigandos,
    } = this.props;
    document.body.style.color = 'inherit';
    document.body.style.backgroundColor = 'inherit';
    const {destination, draggableId, source} = result;
    const {columns} = puestos;
    if(!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index ) {
      return;
    }

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];
    
    if(start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      console.log('newTaskIds 1',newTaskIds)
      newTaskIds.splice(source.index, 1);
      console.log('newTaskIds 2',newTaskIds)
      newTaskIds.splice(destination.index, 0, draggableId);
      console.log('newTaskIds 3',newTaskIds)
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      }
      
      console.log('newColumn',newColumn)
      const newState = {
        ...puestos,
        columns: {
          ...columns,
          [newColumn.id]: newColumn,
        },
        tasks: newTaskIds,
      }
      console.log('newState',newState)

      setPuestosDragAction(newState);
      // eslint-disable-next-line no-useless-return
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds, 
    }
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds[0], 
    }
    const newState = {
      ...puestos,
      columns: {
        ...columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    }
    setPuestosDragAction(newState);
  }

  render() {
    const {
      puestos,
      puestosAsigandos,
      moduloSoloLectura,
    } = this.props;
    
    return (
      
      <DragDropContext
        onDragEnd={this.onDragEnd}
      >
        <Container>
          {
            
            puestos.columnOrder.map((columnId) => {
              const column = puestos.columns[columnId];
              
              const tasks = []
              column.taskIds.map(taskId => {
                //console.log('taskId', taskId)
                const tarea = puestos.tasks.filter(task => task.id === taskId)[0]
                tasks.push(tarea)
                
                return tasks;
              })
              
              // console.log('column',column)
              // const tasks = column.taskIds.filter(taskId => puestos.tasks.id===taskId.id);
              // const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);
              return <Column moduloSoloLectura={moduloSoloLectura} key={column.id} column={column} tasks={tasks}/>;
            })
          }
        </Container>
      </DragDropContext>
    )
  }
}

App.propTypes = {
  puestos:T.object,
  puestosAsigandos:T.array,
  setPuestosDragAction:T.func,
  moduloSoloLectura:T.bool,
};

//export default App;