import React from 'react';
import T from 'prop-types';
import {Droppable} from 'react-beautiful-dnd';
import styled from 'styled-components';
import Task from '../Drag';

const Container = styled.div`
  margin-top: 10px;
  border: 1px solid lightgrey;
  border-radius: 4px;
  width: 100%;
`;
const Title = styled.h6`
  padding: 5px;
`;

const Span = styled.h6`
  margin-top: -21px;
  position: absolute;
  right: 40px;
`;

const TaskList = styled.div`
  padding: 5px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? '#e0e0e0' : 'white')};
  padding: 10px;
  flex-grow: 1;
`;

// eslint-disable-next-line react/prefer-stateless-function
export default class Dropper extends React.Component {
  render() {
    const {
      pieza,
      tasks,
      removeTaskAction,
    } = this.props;
    
    return (
      <Container>
        <Title>
          {pieza.Nombre}
        </Title>
        
        <Span>
          {
            pieza.id !== 'columna-1' ? pieza.Identificador : null
          }
        </Span>
        <Droppable
          droppableId={pieza.id}
        >
          {
            (provided, snapshot) => (
              <TaskList
                innerRef={provided.innerRef}
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {
                  // eslint-disable-next-line react/no-array-index-key
                  tasks.map((task, index) => <Task pieza={pieza} key={`${pieza.id}-${index}`} index={index} task={task} removeTaskAction={removeTaskAction}/>)
                }
                {provided.placeholder}
              </TaskList>
            )
          }
        </Droppable>
      </Container>
    );
  }
}

Dropper.propTypes = {
  pieza: T.object,
  index: T.number,
  removeTaskAction: T.func,
};
