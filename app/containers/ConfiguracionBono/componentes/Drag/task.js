import React from 'react';
import T from 'prop-types';
import {Draggable} from 'react-beautiful-dnd';
import styled from 'styled-components';
import SinResultados from 'images/iconos/drag_indicator_24px_outlined.png';

const Container = styled.div`
  margin-bottom: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  background-color: ${props => (props.isDragging ? '#F9AA33' : 'white')};

  display: flex;
  `;

const Handle = styled.div`
  width: 20px;
  height: 20px;
  background-image: url(${SinResultados});
  border-radius: 4px;
  margin-right: 8px;
  background-repeat: no-repeat;
  background-position: center;
`;

// eslint-disable-next-line react/prefer-stateless-function
export default class Task extends React.Component {
  render() {
    const {
      task,
      index,
    } = this.props;
    //console.log('this.props',this.props);
    return (
      <Draggable
        draggableId={task.id}
        index={index}
      >
        {
          (provided, snapshot) => (
            <Container
              {...provided.draggableProps}
              innerRef={provided.innerRef}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
            >
              <Handle
                {...provided.dragHandleProps}
              />
              {task.content}
            </Container>
          )
        }
      </Draggable>
    );
  }
}

Task.propTypes = {
  task: T.object,
  index: T.number,
};
