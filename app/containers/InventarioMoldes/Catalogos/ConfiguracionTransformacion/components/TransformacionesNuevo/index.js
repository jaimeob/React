import React from 'react';
import T from 'prop-types';
import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';
import { Grid, AppBar, Toolbar, Typography, TextField, MenuItem, Button } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip'; 
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import IconButton from '@material-ui/core/IconButton';
import {DragDropContext} from 'react-beautiful-dnd';
import { Container, FormContainer } from './styledComponents';
import '@atlaskit/css-reset';
import Dropper from './components/Dropper';
import Modal from '../../../../../Formularios/components/ListadoFormulario/components/Modal/alertDialog';

// import Drag from '../Drag'
// eslint-disable-next-line react/prefer-stateless-function
export class TransformacionNuevo extends React.Component {

  dropper() {
    const {nuevaTransformacion} = this.props;
    const IdsTasks = nuevaTransformacion.columns[0].taskIds;
    const column = {id: "columna-1", IdPieza: 0, Nombre: "Pieza 0", index: 0, tasks: [], taskIds: IdsTasks}
    const tasks = column.taskIds.map((taskId) => nuevaTransformacion.tasks.filter((task) => task.id === taskId)[0]);
    return <Dropper key={column.IdPieza} pieza={column} tasks={tasks}/>
  }

  render() {
    const {
      regresarAction,
      getMoldeIdAction,
      disabled,
      lockMoldesAction,
      unlockMoldesAction,
      show,
      origen,
      destino,
      dragEndAction,
      nuevaTransformacion,
      postTransformacionAction,
      update,
      updateTransformacionAction,
      modal,
      openModalAction,
      closeModalAction,
      plantaFilterAction,
      seccionFilterAction,
      removeTaskAction,
    } = this.props;


    return (
      <Container>
        <AppBar style={{backgroundColor: grey[200]}} position="static"> 
          <Toolbar variant="dense" style={{paddingLeft: 8}}> 
            <Tooltip title="Regresar" placement="bottom-end"> 
              <IconButton onClick={regresarAction}> 
                <ArrowBackIcon /> 
              </IconButton>
            </Tooltip>
            <Typography variant="h6" color="primary" style={{flexGrow: 1, textTransform: 'none'}}> 
              {!update ? 'Nueva Transformación ': 'Editar Transformación ' }
            </Typography> 
          </Toolbar> 
        </AppBar>
        <FormContainer style={{maxWidth: "calc(100% - 16px)", margin: 8, marginTop: 30}}>
          <Typography variant="h5" color="primary" style={{flexGrow: 1}}> 
            Seleccionar moldes
          </Typography>
          <Grid
            container
            xs={6}
          >
            <Grid
              item
              xs={6}
            >
              <TextField
                style={{marginTop: 0}}
                select
                label="Molde origen"
                margin="normal"
                fullWidth
                name="molde"
                value={origen.datos.value}
                error={origen.datos.error}
                helperText={origen.datos.text}
                onChange={(event)=>getMoldeIdAction(event, 1)}
                disabled={disabled}
              >
                {origen.moldes.map(molde => (
                  <MenuItem key={molde.IdConfiguracionMolde} value={molde.IdConfiguracionMolde}>
                    {`${molde.Nombre} ${molde.Version}`}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              xs={6}
            >
              <TextField
                style={{marginTop: 0, marginLeft: 15}}
                select
                label="Molde destino"
                margin="normal"
                fullWidth
                name="molde"
                value={destino.datos.value}
                error={destino.datos.error}
                helperText={destino.datos.text}
                onChange={(event)=>getMoldeIdAction(event, 2)}
                disabled={disabled}
              >
                {destino.moldes.map(molde => (
                  <MenuItem key={molde.IdConfiguracionMolde} value={molde.IdConfiguracionMolde}>
                    {`${molde.Nombre} ${molde.Version}`}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Grid container xs={6}>
            {
              // eslint-disable-next-line no-nested-ternary
              !update ? (
                disabled ? (
                  <div>
                    <Tooltip title="Desbloquear" placement="bottom-end"> 
                      <IconButton onClick={unlockMoldesAction}> 
                        <LockIcon/>
                      </IconButton>
                    </Tooltip>
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label>Desbloquear</label>
                  </div>
                ) : (
                  <div>
                    <Tooltip title="Bloquear" placement="bottom-end"> 
                      <IconButton onClick={lockMoldesAction}> 
                        <LockOpenIcon/>
                      </IconButton>
                    </Tooltip>
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label>Bloquear</label>
                  </div>
                )
              ) : (
                <div>
                  
                </div>
              )
            } 
          </Grid>
          {
            show ? (
              <Grid
                container
              >
                <DragDropContext onDragEnd={(result)=> dragEndAction(result)}>
                  <Grid
                    xs={5}
                  >
                    <Typography variant="h5" color="primary" style={{flexGrow: 1, marginTop: 30}}> 
                      Origen
                    </Typography>
                    <Grid
                      container
                      xs={10}
                    >
                      <Grid
                        item
                        xs={6}
                      >
                        <TextField
                          style={{marginTop: 0}}
                          select
                          label="Planta"
                          margin="normal"
                          fullWidth
                          name="molde"
                          value={origen.idPlanta}
                          onChange={(e) => plantaFilterAction(e, 1)}
                        >
                          <MenuItem key={0} value={0}>
                            Todos
                          </MenuItem>
                          {origen.plantas.map(planta => (
                            <MenuItem key={planta.Id} value={planta.Id}>
                              {planta.Planta}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                      >
                        <TextField
                          style={{marginTop: 0, marginLeft: 15}}
                          select
                          label="Sección"
                          margin="normal"
                          fullWidth
                          name="molde"
                          value={origen.idSeccion}
                          onChange={(e) => seccionFilterAction(e, 1)}
                        >
                          <MenuItem key={0} value={0}>
                            Todos
                          </MenuItem>
                          {origen.secciones.map(seccion => (
                            <MenuItem key={seccion.IdSeccion} value={seccion.IdSeccion}>
                              {seccion.Nombre}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                    </Grid>
                    <div>
                      {
                        this.dropper()
                      }
                    </div>
                  </Grid>
                  <Grid xs={2}></Grid>
                  <Grid
                    xs={5}
                  >
                    <Typography variant="h5" color="primary" style={{flexGrow: 1, marginTop: 30}}> 
                      Destino
                    </Typography>
                    <Grid
                      container
                      xs={10}
                    >
                      <Grid
                        item
                        xs={6}
                      >
                        <TextField
                          style={{marginTop: 0}}
                          select
                          label="Planta"
                          margin="normal"
                          fullWidth
                          name="molde"
                          value={destino.idPlanta}
                          onChange={(e) => plantaFilterAction(e, 2)}
                        >
                          <MenuItem key={0} value={0}>
                            Todos
                          </MenuItem>
                          {destino.plantas.map(planta => (
                            <MenuItem key={planta.Id} value={planta.Id}>
                              {planta.Planta}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                      >
                        <TextField
                          style={{marginTop: 0, marginLeft: 15}}
                          select
                          label="Sección"
                          margin="normal"
                          fullWidth
                          name="molde"
                          value={destino.idSeccion}
                          onChange={(e) => seccionFilterAction(e, 2)}
                        > 
                          <MenuItem key={0} value={0}>
                            Todos
                          </MenuItem>
                          {destino.secciones.map(seccion => (
                            <MenuItem key={seccion.IdSeccion} value={seccion.IdSeccion}>
                              {seccion.Nombre}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                    </Grid>
                    <div>
                      {
                        nuevaTransformacion.columnOrder.map((columnId) => {
                          const column = nuevaTransformacion.columns.filter((columna) => columna.id === columnId)[0];
                          // const tasks = column.taskIds.map((taskId) => nuevaTransformacion.tasks.filter((task) => task.id === taskId)[0]);
                          const tasks = column.taskIds.map(taskId => {
                            
                            const splitTask = taskId.split(/-/)
                            const subTask = taskId.substring(0, (7 + splitTask[2].length))
                            const tarea = nuevaTransformacion.tasks.filter((task) => task.id === subTask)[0]
                            const tareaCopy ={...tarea}
                            tareaCopy.id = taskId
                            
                            return tareaCopy
                          });
                          return <Dropper pieza={column} tasks={tasks} removeTaskAction={removeTaskAction}/>;
                        })
                      }
                    </div>
                  </Grid>
                </DragDropContext>
                <div style={{width: '100%'}}>
                  {
                    !update ? 
                      (
                        <Button
                          size="small"
                          style={{background: green[500], color: '#fff', marginTop: 30, float: 'right', display: 'block'}}
                          onClick={postTransformacionAction}
                        >
                          Guardar
                        </Button>
                      ):
                      update && 
                      (
                        <Button
                          size="small"
                          style={{background: green[500], color: '#fff', marginTop: 30, float: 'right', display: 'block'}}
                          onClick={updateTransformacionAction}
                        >
                          Actualizar
                        </Button>
                      ) 
                  }
                  <Button
                    size="small"
                    style={{background: '#d50000', color: '#fff', marginTop: 30, marginRight: 15,float: 'right', display: 'block'}}
                    onClick={(e) => {
                      const tareas = [];
                      for (let i = 1; i < nuevaTransformacion.columns.length; i += 1) {
                        nuevaTransformacion.columns[i].taskIds.forEach(task => {
                          tareas.push(task)
                        });
                      }

                      if(tareas.length !== 0) {
                        openModalAction(e, 2)
                      } else {
                        regresarAction()
                        closeModalAction()
                      }

                    }}
                  >
                    Cerrar
                  </Button>
                </div>
                <Modal  
                  open={modal.value} 
                  typeAlert='Report' 
                  typeOptions='Select' 
                  title='Confirmar....' 
                  message={modal.text}
                  onClickCancel={closeModalAction}
                  onClickAccept={() => {
                    switch (modal.stepper){
                      case 2:
                        regresarAction()
                        closeModalAction()
                        break;
                      default:
                        break;
                    }
                  }}
                />
              </Grid>
            ) : (
              <div>
                {/* <Drag/> */}
              </div>
            )
          }
        </FormContainer>
      </Container>
    );
  }
}

TransformacionNuevo.propTypes = {
  regresarAction: T.func,
  getMoldeIdAction: T.func,
  disabled: T.bool,
  lockMoldesAction: T.func,
  unlockMoldesAction: T.func,
  show: T.bool,
  origen: T.object,
  destino: T.object,
  dragEndAction: T.func,
  nuevaTransformacion: T.object,
  update: T.bool,
  postTransformacionAction: T.func,
  updateTransformacionAction: T.func,
  modal: T.object,
  openModalAction: T.func,
  closeModalAction: T.func,
  plantaFilterAction: T.func,
  seccionFilterAction: T.func,
  removeTaskAction: T.func,
};

export default TransformacionNuevo;
