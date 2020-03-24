import React from 'react';
import {DragDropContext} from 'react-beautiful-dnd';
import styled from 'styled-components';
import InitialData from './initial-data';
import Column from './column';
import '@atlaskit/css-reset';


const Container = styled.div`
  display: flex
`;

export default class App extends React.Component {

  state = InitialData;
  
  onDragEnd = result => {
    document.body.style.color = 'inherit';
    document.body.style.backgroundColor = 'inherit';
    const {destination, draggableId, source} = result;
    const {columns} = this.state;
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
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      }
      
      const newState = {
        ...this.state,
        columns: {
          ...columns,
          [newColumn.id]: newColumn,
        },
      }

      this.setState(newState);
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
      taskIds: finishTaskIds, 
    }

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    }

    this.setState(newState);
  }

  render() {
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
      >
        <Container>
          {
            this.state.columnOrder.map((columnId) => {
              const column = this.state.columns[columnId];
              const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);
              return <Column key={column.id} column={column} tasks={tasks}/>;
            })
          }
        </Container>
      </DragDropContext>
    )
  }
}