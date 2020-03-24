import React, { Fragment } from 'react';
import T from 'prop-types';
// import Paper from '@material-ui/core/Paper';
import BotonSucces from 'components/BotonSuccess';
import BotonCancelar from 'components/BotonCancelar';
import { connect } from 'react-redux';
import { Grid,
  // Divider,
  TextField,
  FormControl,
  // Tooltip,
  MenuItem,
  InputLabel,
  Select,
  Typography,
  // IconButton,
  // Paper
} from '@material-ui/core';
import { compose } from 'redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { MuiThemeProvider, createMuiTheme, withStyles } from "@material-ui/core/styles";
import AutoCompletable from 'components/FiltroSeleccion';
import iconProyecto from 'images/iconos/proyecto_icon.svg';
import { withHandlers } from 'recompose';
import { SketchPicker  } from 'react-color'
import Modal from '../../../Formularios/components/ListadoFormulario/components/Modal/alertDialog';
import { Container } from '../../styledComponents';


const styles = _theme => ({
  root: {
    borderTopLeftRadius: '4px',
    height: '100%',
    maxHeight: '100%',
    overflowY: 'auto',
  },
  root2: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: _theme.palette.background.paper,
  },
  paper: {
    padding: _theme.spacing.unit * 2,
    textAlign: 'center',
    color: _theme.palette.text.secondary,
    height: '79vh',
  },
  title: {
    fontSize: 14,
  },
  typography: {
    padding: _theme.spacing.unit * 2,
  },
  formControl: {
    margin: _theme.spacing.unit,
    minWidth: '80%',
    maxWidth: '80%',
    width: '80%',
  },
});

const getMuiTheme = () =>
  createMuiTheme({
    overrides: {
      MuiDialogTitle: {
        root: {
          backgroundColor: "#989898",
          '& h6': {
            color: 'red',
          },
          padding:'5px 10px 5px',
        },
      },
    },
  })

function ModalFormulario(props) {  
  const { 
    // classes,
    modalProyectos,
    plantillas,
    plantillaSeleccionada,
    prioridades,
    handleChangePrioridad,
    prioridadSeleccionada,
    nombreProyecto,
    setNombreProyecto,
    colorProyecto,
    onInputChangeProxy,
    onInputChangeEmpleadoProxy,
    cerrarModalProyectos,
    empleadoSeleccionado,
    empleados,
    changeColorProyecto,
    guardarProyectoProxy,
    errores,
    idProyecto,
    IdDepartamento,
    IdPuesto,
    guardarProyecto,
    abrirModalGuardado,
    modalGuardadoProyecto,
    abrirGuardarModal
  } = props;
  console.log(modalGuardadoProyecto,abrirGuardarModal,"MODAL -----------------------------------");
  const plantillasArray  = plantillas.map(item => ({ value: item.IdPlantilla, label: item.nombre }))

  return (
    <div >
      <Fragment>
        <MuiThemeProvider theme={getMuiTheme}>
          <Dialog  aria-labelledby="customized-dialog-title"  fullWidth  open={modalProyectos}>
            <DialogTitle id="customized-dialog-title" style={{backgroundColor:"#E0E0E0"}} >
              <img src={iconProyecto} alt=""/> {plantillaSeleccionada ? 'Editar proyecto' : 'Nuevo Proyecto' }
            </DialogTitle>
            <Container justify="space-between">
              {/* <Divider/> */}
              <DialogContent >
                <DialogContentText>
                  <Grid container >
                    <Grid item xs={6} sm={6} md={6}   style={{padding:'45px 0'}}>
                      <Grid item xs={12} sm={12} md={12}  style={{padding:'10px 0'}}>
                        <AutoCompletable
                          valor={plantillaSeleccionada}
                          onChange={onInputChangeProxy}
                          opciones={plantillasArray}
                          campoValido={errores.errorTipoProyecto}
                          requerido
                          label='Tipo de proyecto'
                          indice={1}
                          inhabilitado ={idProyecto > 0}
                        />
                      </Grid>
                  
                      <Grid item xs={12} sm={12} md={12}  style={{padding:'10px 0'}}>
                        <FormControl fullWidth>
                          <TextField
                            label="Nombre del Proyecto"
                            type="text"
                            value={nombreProyecto}
                            onChange={setNombreProyecto}
                            helperText={errores.errorRepetido === true ? "El nombre del proyecto ya se encuentra registrado" : "*Requerido"}
                            error={errores.errorNombreProyecto || errores.errorRepetido}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}  style={{padding:'10px 0'}}>
                        <FormControl fullWidth >
                          <InputLabel style={{fontSize: 14}} htmlFor="departamento-id">Prioridad</InputLabel> 
                          <Select
                            value={prioridadSeleccionada}
                            onChange={handleChangePrioridad}
                            displayEmpty
                            style={{fontSize: 14}}
                            name="prioridades"
                            helperText="*Requerido"
                            error={errores.errorPrioridad}
                          
                            MenuProps= {{
                              PaperProps: {
                                style : {
                                  maxHeight: 60 * 4.5,
                                },
                              },
                            }}
                            inputProps={{
                              name: 'departamentos',
                              id: 'departamentos_id',
                            }}
                          >
                            {prioridades.map((elem) => 
                              <MenuItem style={{fontSize: 14}}  id={`departamentos_${elem.id}`} key={`${elem.id}`} value={elem.nombre || ''}>{elem.nombre}</MenuItem>)}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}  style={{padding:'15px 0'}}>
                        <AutoCompletable
                          valor={empleadoSeleccionado}
                          onChange={onInputChangeEmpleadoProxy}
                          opciones={empleados}
                          campoValido={errores.errorResponsable}
                          requerido
                          label='Nombre del responsable'
                          indice={1}
                        
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={1} sm={1} md={1}  ></Grid>
                    <Grid item xs={5} sm={5} md={5}  >
                      {/* <Grid item xs={2} sm={3} md={3}  >
                    <IconButton  iconStyle={styles.largeIcon}>
                      <img src={IconoPortafolio} alt="" style={{width:'100%',backgroundColor:colorProyecto.hex, borderRadius:'12px'}} />
                    </IconButton>
                  </Grid> */}
                      <Grid item xs={12} sm={12} md={12}   alignitems="center"  > 
                        {/* direction="row" */}
                        <Typography variant="caption" display="block" gutterBottom style={{padding:'35px 0',fontFamily:'Roboto',fontSize:"14px"}}>
                    Elige un color para el Proyecto
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <SketchPicker  
                          color={ colorProyecto.hex}
                          onChangeComplete={changeColorProyecto }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </DialogContentText>
              </DialogContent>
            </Container>

            <DialogActions>
              <BotonCancelar
                label="CERRAR" 
                // onClick={cerrarModalProyectos}
                onClick={abrirModalGuardado(true)}
              >
            Cerrar
              </BotonCancelar>
              <Grid></Grid>
              <BotonSucces
                onClick={guardarProyectoProxy()}
                
                label="GUARDAR">
              </BotonSucces>
            </DialogActions>
          </Dialog>
        </MuiThemeProvider>
      </Fragment>
      <Fragment>
        <Modal 
          open={modalGuardadoProyecto}
          typeAlert='Report'
          typeOptions='Select'
          title='Confirmar....'
          message='¿Esta seguro que desea salir de la pantalla?'
          onClickAccept={cerrarModalProyectos}
          onClickCancel={abrirModalGuardado(false)}
        />
      </Fragment>
    </div>
  );
}
ModalFormulario.propTypes = {
  // classes:T.object,
  modalProyectos:T.bool,
  plantillas:T.array,
  plantillaSeleccionada:T.oneOfType([T.array,T.string]),
  prioridades:T.array,
  handleChangePrioridad:T.func,
  prioridadSeleccionada:T.string,
  nombreProyecto:T.string,
  setNombreProyecto:T.func,
  colorProyecto:T.object,
  onInputChangeProxy:T.func,
  cerrarModalProyectos:T.func,
  empleadoSeleccionado:T.oneOfType([T.array,T.string]),
  empleados:T.array,
  changeColorProyecto:T.func,
  guardarProyecto:T.func,
  errores:T.object,
};

export default compose(
  withStyles(styles),
  withHandlers({
    onInputChangeProxy: (props) => () => (e) => {      
      const {
        onChangePlantilla,
      } = props;
    
      onChangePlantilla(e);
      
    },
    onInputChangeEmpleadoProxy: (props) => () => (e) => {      
      const {
        onChangeEmpleado,
      } = props;
      console.log(props,"pxndx");
      
      onChangeEmpleado(e)
    },
    guardarProyectoProxy: (props) => () => () => {      
      const {
        guardarProyecto,
        IdDepartamento,
        IdPuesto,
      } = props;
      const item = {IdDepartamento,IdPuesto}
      guardarProyecto(item)
    },
  }),
  connect(
    /* mapStateToProps */
    null,
    /* mapDispatchToProps */
    (dispatch) => ({
      dispatch,
      //= ===========================[ EVENTOS ]===================================
     
      abrirModalGuardado: (event) => () =>{
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/ABRIR_MODAL_GUARDADO_PROYECTOS',
          event,
        })
      },

    })
  ),
)(ModalFormulario);
