import React from 'react';
import T from 'prop-types';
import {Droppable} from 'react-beautiful-dnd';
import styled from 'styled-components';
import Task from './task'

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 33.33%;

  display-flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
  min-height: 100px;
  flex-grow: 1;
`;

// eslint-disable-next-line react/prefer-stateless-function
export default class Column extends React.Component {
  render() {
    const {
      column,
      tasks,
    } = this.props;

    return (
      <Container>
        <Title>
          {column.title}
        </Title>
        <Droppable 
          droppableId={column.id}
        >
          {
            (provided, snapshot) => (
              <TaskList
                innerRef={provided.innerRef}
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {tasks.map((task, index) =>
                  <Task key={task.id} index={index} task={task}/>
                )}
                {provided.placeholder}
              </TaskList>
            )
          }
        </Droppable>
      </Container>
    );
  }
}

Column.propTypes = {
  column: T.object,
  tasks: T.array,  
};
