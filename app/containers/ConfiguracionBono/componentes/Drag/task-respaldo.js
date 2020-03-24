import React from 'react';
import T from 'prop-types';
import {Draggable} from 'react-beautiful-dnd';
import styled from 'styled-components';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

const Container = styled.div`
  margin-bottom: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  background-color: ${props => (props.isDragging ? '#f9aa33' : 'white')};
  display: flex;
  `;

const Handle = styled.div`
  margin-right: 8px;
`;

// eslint-disable-next-line react/prefer-stateless-function
export default class Task extends React.Component {
  render() {
    const {
      task,
      index,
      moduloSoloLectura,
      onClickColumn,
      column,
    } = this.props;
    
    return (
      <Draggable
        draggableId={task.id}
        index={index}
        isDragDisabled={moduloSoloLectura}
      >
        {
          (provided, snapshot) => (
            <Container
              onClick={() => onClickColumn(task,column)}
              {...provided.draggableProps}
              {...provided.dragHandleProps}

              innerRef={provided.innerRef}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
            >
              <Handle
                {...provided.dragHandleProps}
              >
                <DragIndicatorIcon />
              </Handle>
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
  moduloSoloLectura:T.bool,
};
