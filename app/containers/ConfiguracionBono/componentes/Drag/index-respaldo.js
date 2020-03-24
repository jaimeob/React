/* eslint-disable react/prop-types */
/* eslint-disable radix */
import React from 'react';
import {DragDropContext} from 'react-beautiful-dnd';
import styled from 'styled-components';
import { TextField, Grid, IconButton, Typography } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import Column from './column-respaldo';
import '@atlaskit/css-reset';

const Container = styled.div`
  display: flex
`;

class App extends React.Component {
  constructor(props){
    super(props);
   
    const {
      puestos,
      puestosAsigandos,
    } = this.props;
   
    const prueba = {};
        
    Object.assign(prueba, ...puestos.map(el => ({
      [`task-${el.id}`]: {
        id: `task-${el.id}`,
        content: el.content,
      },
    })))
   
    let ids = puestos.map(el => (`task-${el.id}`))

    const asignados = {};
    
    Object.assign(asignados, ...puestosAsigandos.map(el => ({
      [`task-${el.id}`]: {
        id: `task-${el.id}`,
        content: el.content,
      },
    })))
   
    const idsAsignados = puestosAsigandos.map(el => (`task-${el.id}`))
    
    if(puestosAsigandos.length > 0){
      ids = puestos.filter(el => !puestosAsigandos.map(pue=> pue.id).includes(el.id)).map(el => (`task-${el.id}`)); 
    } else {
      ids = puestos.filter(el => el.Asignado === 0).map(el => (`task-${el.id}`)); 
    }

    this.state = {
      searchDrag: '',
      tasks: prueba,
      columns: {
        'column-1': {
          id: 'column-1',
          title: '',
          taskIds: [...ids],
  
        },
        'column-2': {
          id: 'column-2',
          title: '',
          taskIds: [...idsAsignados],
        },
      },
      columnOrder: ['column-1', 'column-2'],
    }
  }

  onClick = (params,column) => {
    const {
      actions: {
        setPuestosDragAction,
      },
    } = this.props;

    const {columns} = this.state;
    
    const start = columns['column-1'];
    const finish = columns['column-2'];

    const startTaskIds = Array.from(start.taskIds);
    const index = startTaskIds.indexOf(params.id)
    
    let newStart;
    let newFinish;
    if(column.id==='column-1'){
      startTaskIds.splice(index, 1);
      newStart = {
        ...start,
        taskIds: startTaskIds, 
      }

      const finishTaskIds = Array.from(finish.taskIds);
      let indexfinish = finish.taskIds.indexOf();
      if (indexfinish === -1) {
        indexfinish=0
      } 
      
      finishTaskIds.splice(indexfinish, 0, params.id);
      newFinish = {
        ...finish,
        taskIds: finishTaskIds, 
      }
    } else {
      
      startTaskIds.splice(0,0,params.id);
      
      newStart = {
        ...start,
        taskIds: startTaskIds, 
      }

      const finishTaskIds = Array.from(finish.taskIds);
      let indexfinish = finish.taskIds.indexOf();
      if (indexfinish === -1) {
        indexfinish=0
      } 
      
      const indexfin = finishTaskIds.indexOf(params.id)
      finishTaskIds.splice(indexfin, 1);
      newFinish = {
        ...finish,
        taskIds: finishTaskIds, 
      }
    }
    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    }


    const puestosSeleccionadosIds = newState.columns['column-2'].taskIds.map(el => parseInt(el.replace('task-', '')))
    
    setPuestosDragAction(puestosSeleccionadosIds);
    
    this.setState(newState);
  };

  componentDidMount(){
    const {
      
      puestosAsigandos,
    } = this.props;
  }

  onDragEnd = result => {
    
    document.body.style.color = 'inherit';
    document.body.style.backgroundColor = 'inherit';
    const {destination, draggableId, source} = result;
    const {columns} = this.state;
    const {
      actions: {
        setPuestosDragAction,
      },
    } = this.props;

    if(!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index ) {
      return;
    }

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];
    console.log('start',start);
    console.log('start',finish);
    if(start === finish) {
      console.log('entro')
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

      const puestosSeleccionadosIds = newState.columns['column-2'].taskIds.map(el => parseInt(el.replace('task-', '')))
      console.log('puestosSeleccionadosIds',puestosSeleccionadosIds);
      setPuestosDragAction(puestosSeleccionadosIds);
      console.log('newState',newState);
      this.setState(newState);

      return;
    }
    console.log('start.taskIds',start.taskIds)
    const startTaskIds = Array.from(start.taskIds);
    console.log('source',source);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds, 
    }

    console.log('finish.taskIds',finish.taskIds)
    const finishTaskIds = Array.from(finish.taskIds);
    console.log('finishTaskIds',finishTaskIds)
    console.log('destination.index',destination.index)
    console.log('draggableId',draggableId)
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
    
    const puestosSeleccionadosIds = newState.columns['column-2'].taskIds.map(el => parseInt(el.replace('task-', '')))
    
    setPuestosDragAction(puestosSeleccionadosIds);
    this.setState(newState);
  }

  componentWillUnmount(){
    const newState = {
      searchDrag: '',
      tasks: {},
      columns: {
        'column-1': {
          id: 'column-1',
          title: '',
          taskIds: [],
  
        },
        'column-2': {
          id: 'column-2',
          title: '',
          taskIds: [],
        },
      },
      columnOrder: ['column-1', 'column-2'],
    }
    this.setState(newState)
  }

  onChangeSearchDrag = searchDrag => {
    const taskIds = this.props.puestos
      .filter(el => el.content
        .toUpperCase()
        .includes(searchDrag.toUpperCase()) && !this.state.columns['column-2'].taskIds.includes(`task-${el.id}`) && el.Asignado===0) 
      .map(el => `task-${el.id}`);
    
    const newState = {
      ...this.state,
      searchDrag,
      columns: {
        'column-1': {
          ...this.state.columns['column-1'],
          taskIds: [...taskIds],
        },
        'column-2': {
          ...this.state.columns['column-2'],
        },
      },
    }

    this.setState(newState)
  }

  render() {
    const {
      moduloSoloLectura,
      actions
    } = this.props;
    
    const styles = {
      searchGrid: {
        textAlign: 'right',
      },
      grid: {
        padding: '0 8px 0 8px',
        textAlign: 'center',
      },
      grayText: {
        color: 'gray',
      },
    }

    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
      >
        <Grid container>
          <Grid item xs={6} style={styles.searchGrid}>
            <TextField 
              onChange={(e) => this.onChangeSearchDrag(e.target.value)}
              value={this.state.searchDrag}
              placeholder="Realizar búsqueda"
            />
            <IconButton aria-label="Buscar">
              <SearchIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid container>
          <Grid 
            item xs={6} style={styles.grid}>
            <Typography style={styles.grayText}>Seleccione los puestos necesarios que aplicarán para el grupo a configurar</Typography>
          </Grid>
          <Grid 
            item xs={6} style={styles.grid}>
            <Typography style={styles.grayText}>Agregue los puestos necesarios que integrarán el grupo</Typography>
          </Grid>
        </Grid>
        <Container >
          {
            this.state.columnOrder.map((columnId) => {
              const column = this.state.columns[columnId];
              const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);
                          
              return <React.Fragment>
                <Column onClickColumn ={this.onClick} actions={actions} moduloSoloLectura={moduloSoloLectura} key={column.id} column={column} tasks={tasks}/>
              </React.Fragment>;
            })
          }
        </Container>
      </DragDropContext>
    )
  }
}

export default App;