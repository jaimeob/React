import React from 'react';
import T from 'prop-types';
import {Draggable} from 'react-beautiful-dnd';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 10px;
  border-radius: 4px;
  padding: 5px;
  background-color: ${props => (props.isDragging ? '#f9aa33' : 'white')};

  display: flex;
  box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.2),
              0px 2px 2px 0px rgba(0,0,0,0.14),
              0px 3px 1px -2px rgba(0,0,0,0.12);
  position: relative;
  `;

const Handle = styled.div`
  margin-right: 8px;
`;

const Text = styled.div`
  margin-top: 2px;
  font-weight: 500;
`;

const Span = styled.div`
  margin-top: 2px;
  font-weight: 500;
  position: absolute;
  right: 40px;
`;

const Close = styled.div`
  margin-top: 1px;
  font-weight: 500;
  position: absolute;
  right: 15px;
  cursor: pointer
`;

// eslint-disable-next-line react/prefer-stateless-function
export default class Task extends React.Component {
  render() {
    const {
      task,
      index,
      pieza,
      removeTaskAction,
    } = this.props;
    return (
      <Draggable
        draggableId={task.id}
        index={index}
      >
        {
          (provided, snapshot) => (
            <Container
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
              <Text>
                {task.Nombre}
              </Text>
              {
                pieza.id !== 'columna-1' ? 
                  (
                    <Close onClick={() => removeTaskAction(pieza, task)}><CloseIcon style={{height: '0.7em', width: '0.7em'}}/></Close>
                  ) : (
                    <div>
                      
                    </div>
                  )
              }
              
              <Span>{task.Identificador}</Span>
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
  removeTaskAction: T.func,
};
