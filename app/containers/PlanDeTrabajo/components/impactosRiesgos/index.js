import React from 'react';
import T from 'prop-types';
// import Paper from '@material-ui/core/Paper';
import BotonSucces from 'components/BotonSuccess';
import BotonCancelar from 'components/BotonCancelar';
import {parseInt,find} from 'lodash';
import grey from '@material-ui/core/colors/grey'

import { Grid,
  Dialog,
  // DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Icon,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import { connect } from 'react-redux';
import { compose } from 'redux';
import Tabla from 'components/DataTable';
// import { connect } from 'react-redux';
// import { compose, withHandlers} from 'recompose';
import { withStyles } from "@material-ui/core/styles";
import { withHandlers } from 'recompose';
import { Container } from '../../styledComponents';
import Modal from '../../../Formularios/components/ListadoFormulario/components/Modal/alertDialog';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '79vh',
  },
});



// eslint-disable-next-line react/prefer-stateless-function
export class ImpactosRiesgos extends React.Component {

  componentDidMount(){
    const{
      obtenerImpactosRiesgos,
      IdProyecto,
    } = this.props;
    obtenerImpactosRiesgos(IdProyecto)
  }
 
  componentWillUnmount(){
    const {
      limpiarStateImpactos,
    } = this.props;
    limpiarStateImpactos()
  }

  render(){
    const { 
      // classes,    
      propsListadoProyectos:{
        listadoProyectos:{
          cabecerasImpactoDocumentos,
          nombreDocumentos,
          objetivoDocumentos,
          realDocumentos,
          unidadDocumentos,
          cumplimientoDocumentos,
          ponderacionDocumentos,
          condicionDocumentos,
          modalImpactos,
          impactosDocumentos,
          idImpactoRiesgo,
          proyectos,
          idProyecto,
          openModalBorradoImpactos,
          condiciones,
        },
      },
      setNombreDocumentos,
      setObjetivo,
      setReal,
      setUnidad,
      setCumplimiento,
      setPonderacion,
      setCondicion,
      guardarImpactosRiesgos,
      IdProyecto,
      abrirFormularioImpactos,
      cerrarFormularioImpactos,
      editarImpactosDocumentos,
      cambiarStepper,
      abrirModalBorradoImpactos,
      cambiarEstatus,
      permisos,
    } = this.props;

    const configuracion = {
      columnas : false,
      seleccionable: true,
    };

    const proyecto =  find(proyectos,['IdProyecto',idProyecto])

    return (
      <div >
        <AppBar style={{backgroundColor: grey[200]}} position="static"> 
          <Toolbar variant="dense" style={{paddingLeft: 8}}> 
            <IconButton
              onClick={cambiarStepper(1)}
            >
              <Icon
                style={{
                  fontSize:'29px',
                  color: '#263238',
                }}
              >
                    keyboard_backspace
              </Icon>
            </IconButton>
            <Typography variant="h6" gutterBottom color="primary" style={{textTransform: 'inherit', margin: 0,fontWeight: 'normal',color:'black'}}> 
                  Impactos Riesgos
            </Typography>
          </Toolbar> 
        </AppBar>
        <React.Fragment>
          <Dialog  aria-labelledby="customized-dialog-title"  fullWidth  open={modalImpactos}  maxWidth = 'sm'>
            <DialogTitle id="customized-dialog-title" style={{backgroundColor:"#E0E0E0"}} >
              {/* <img src={iconProyecto} alt=""/> {plantillaSeleccionada ? 'Editar proyecto' : 'Nuevo Proyecto' } */}
            Registrar impactos 
            </DialogTitle>
            <Container justify="space-between">
              <DialogContent >
                <DialogContentText>
                  <Grid item  xs={12} sm={12} md={12} style={{marginLeft:"50px"}} >
                    {/* style={{padding: '10px 5px 10px 10px',position: 'relative'}} */}
                    <Grid container >
                      <Grid item xs={10} sm={10} md={10}>
                        <FormControl fullWidth>
                          <TextField
                            helperText="*Requerido"
                            label="Nombre"
                            type="text"
                            value={nombreDocumentos}
                            onChange={setNombreDocumentos}
                            fullWidth
                            // helperText={errores.errorRepetido === true ? "El nombre del proyecto ya se encuentra registrado" : "*Requerido"}
                            // error={errores.errorNombreProyecto || errores.errorRepetido}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={5} sm={5} md={5}  > 
                        <FormControl fullWidth>
                          <InputLabel style={{fontSize: 14}} htmlFor="Condición-id">Condición</InputLabel>
                          <Select
                            value={condicionDocumentos}
                            onChange={setCondicion}
                            style={{fontSize: 18,width:'184px'}}
                            displayEmpty
                            name="Condiciónes"
                            MenuProps= {{
                              PaperProps: {
                                style : {
                                  maxHeight: 60 * 4.5,
                                },
                              },
                            }}
                          >
                            <MenuItem key={0} value={0} style={{fontSize: 14}}>
                            </MenuItem>
                            {condiciones.map((elem) => 
                              <MenuItem style={{fontSize: 14}}  id={`departamentos_${elem.id}`} key={`${elem.id}`} value={elem.condicion || ''}>{elem.condicion}</MenuItem>)}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={1} sm={1} md={1}></Grid>
                      <Grid item xs={5} sm={5} md={5}>
                        <FormControl>
                          <TextField
                            helperText="*Requerido"
                            label="Objetivo"
                            type="text"
                            value={objetivoDocumentos}
                            onChange={setObjetivo}
                            fullWidth
                            // helperText={errores.errorRepetido === true ? "El nombre del proyecto ya se encuentra registrado" : "*Requerido"}
                            // error={errores.errorNombreProyecto || errores.errorRepetido}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid item  xs={12} sm={12} md={12} >
                      <Grid container >
                        {proyecto.ImpactosVacios === 1  && (
                          <Grid item xs={5} sm={5} md={5}>
                            <FormControl>
                              <TextField
                                helperText="*Requerido"
                                label="Real"
                                type="number"
                                value={realDocumentos}
                                onChange={setReal}
                                fullWidth
                              // helperText={errores.errorRepetido === true ? "El nombre del proyecto ya se encuentra registrado" : "*Requerido"}
                              // error={errores.errorNombreProyecto || errores.errorRepetido}
                              />
                            </FormControl>
                          </Grid>
                        )}
                        
                        <Grid item xs={1} sm={1} md={1}></Grid>
                        {proyecto.ImpactosVacios === 1 && (
                          <Grid item xs={5} sm={5} md={5}>
                          
                            <FormControl>
                              <TextField
                                helperText="*Requerido"
                                label="Cumplimiento"
                                type="number"
                                value={cumplimientoDocumentos}
                                onChange={setCumplimiento}
                                fullWidth
                              // helperText={errores.errorRepetido === true ? "El nombre del proyecto ya se encuentra registrado" : "*Requerido"}
                              // error={errores.errorNombreProyecto || errores.errorRepetido}
                              />
                            </FormControl>
                          
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                    <Grid item  xs={12} sm={12} md={12} >
                      <Grid container >
                       
                        <Grid item xs={5} sm={5} md={5}>
                          <FormControl>
                            <TextField
                              helperText="*Requerido"
                              label="Unidad"
                              type="text"
                              value={unidadDocumentos}
                              onChange={setUnidad}
                              fullWidth
                              // helperText={errores.errorRepetido === true ? "El nombre del proyecto ya se encuentra registrado" : "*Requerido"}
                              // error={errores.errorNombreProyecto || errores.errorRepetido}
                            />
                          </FormControl>
                        </Grid>
                        
                        <Grid item xs={1} sm={1} md={1}></Grid>
                        <Grid item xs={5} sm={5} md={5}>
                          <FormControl>
                            <TextField
                              helperText="*Requerido"
                              label="Ponderación"
                              type="number"
                              value={ponderacionDocumentos}
                              onChange={setPonderacion}
                              fullWidth
                            // helperText={errores.errorRepetido === true ? "El nombre del proyecto ya se encuentra registrado" : "*Requerido"}
                            // error={errores.errorNombreProyecto || errores.errorRepetido}
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} style={{marginLeft:"-30px"}}>
                        <Grid container >
                          <Grid item xs={6} sm={6} md={6} ></Grid>
                          <Grid item xs={3} sm={3} md={3} style={{padding:'25px'}}>
                            <BotonCancelar
                              label="CANCELAR" 
                              onClick={cerrarFormularioImpactos}
                              size='medium'
                            >
                                  Cancelar
                            </BotonCancelar>
                          </Grid>
                          <Grid item xs={3} sm={3} md={3} style={{padding:'25px'}}>
                            <BotonSucces
                              onClick={guardarImpactosRiesgos(nombreDocumentos,objetivoDocumentos,realDocumentos,unidadDocumentos,cumplimientoDocumentos,ponderacionDocumentos,IdProyecto,idImpactoRiesgo,condicionDocumentos)}
                              label="GUARDAR"
                              size='medium'>
                            </BotonSucces>
                          </Grid>             
                        </Grid> 
                      </Grid>
                    </Grid>
                  </Grid>
                </DialogContentText>
              </DialogContent>
            </Container>
          </Dialog>
          <Container justify="space-between">
            {/* <Divider/> */}
            <Grid container >
              {/* style={{cursor : carga === false ? "wait": null}} */}
              <Container width={100}  >
                {/* <CircularProgress/> */}
                <Grid container alignItems="center" >
                  <Grid item xs={12} sm={12} md={12} >
                    <Container flexDirection="column">
                      <Tabla
                        data = {impactosDocumentos}
                        headers = {cabecerasImpactoDocumentos}
                        configuracion = {configuracion}
                        opciones = {
                          [
                            {'icon' : 'editar', 'action':  editarImpactosDocumentos},
                            {'icon' : 'eliminar', 'action': abrirModalBorradoImpactos(true)},
                          ]
                        }
                        idPosition = "IdImpactoRiesgo"
                        admin
                        small = {0}
                        //   onRowsDelete = {this.abrirModal} 
                        //   onDelete = {this.selectedRow()}
                        onClickAgregar = {abrirFormularioImpactos}
                        permisos = {permisos}
                      />
                    </Container>
                  </Grid>
                </Grid>
              </Container>
            </Grid>
          </Container>  
          <Modal 
            open={openModalBorradoImpactos}
            typeAlert='Report'
            typeOptions='Select'
            title='Confirmar....'
            message='¿Esta seguro que desea borrar el registro?'
            onClickAccept={cambiarEstatus()}
            onClickCancel={abrirModalBorradoImpactos(false)}
          />
        </React.Fragment>
      </div>
    )
  }
}

ImpactosRiesgos.propTypes = {
  // classes:T.object,
  propsListadoProyectos:T.object,
  // abrirFormulario:T.func,
  setNombreDocumentos:T.func,
  setObjetivo:T.func,
  setReal:T.func,
  setUnidad:T.func,
  setCumplimiento:T.func,
  guardarImpactosRiesgos:T.func,
  setPonderacion:T.func,
  // obtenerImpactosRiesgos:T.func,
  IdProyecto:T.number,
  abrirFormularioImpactos:T.func,
  cerrarFormularioImpactos:T.func,
  editarImpactosDocumentos:T.func,
  cambiarStepper:T.func,
  obtenerImpactosRiesgos:T.func,
  limpiarStateImpactos:T.func,
  abrirModalBorradoImpactos:T.func,
  cambiarEstatus:T.func,
  permisos:T.object,


};

export default compose(
  withStyles(styles),
  withHandlers({}),
  connect(
    /* mapStateToProps */
    null,
    /* mapDispatchToProps */
    (dispatch) => ({
      dispatch,
      abrirFormulario: (event) => () => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/ABRIR_FORMULARIO',
          event:event.target.value,
        })
      },
      setNombreDocumentos: (event) => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/SET_NOMBRE_DOCUMENTOS',
          event:event.target.value,
        })
      },
      setObjetivo: (event) => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/SET_OBJETIVO',
          event:event.target.value,
        })
      },
      setReal: (event) => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/SET_REAL',
          event:event.target.value,
        })
      },
      setUnidad: (event) => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/SET_UNIDAD',
          event:event.target.value,
        })
      },
      setCumplimiento: (event) => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/SET_CUMPLIMIENTO',
          event:event.target.value,
        })
      },
      setPonderacion: (event) => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/SET_PONDERACION',
          event:event.target.value,
        })
      },
      guardarImpactosRiesgos: (nombreDocumentos,objetivoDocumentos,realDocumentos,unidadDocumentos,cumplimientoDocumentos,ponderacionDocumentos,IdProyecto,IdImpactoRiesgo,condicionDocumentos)  => () =>{
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/GUARDAR_IMPACTOS_RIESGOS',
          datos: {
            nombreDocumentos,
            objetivoDocumentos,
            realDocumentos:parseInt(realDocumentos),
            unidadDocumentos,
            cumplimientoDocumentos:parseInt(cumplimientoDocumentos),
            ponderacionDocumentos:parseInt(ponderacionDocumentos),
            calificacion:parseInt(cumplimientoDocumentos*ponderacionDocumentos/100),
            IdProyecto,
            IdImpactoRiesgo,
            condicionDocumentos,
          },
        })
      },
      abrirFormularioImpactos: () => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/OPEN_FORM_IMPACTOS_DOCUMENTOS',
          event:true,
        })
      },
      cerrarFormularioImpactos: () => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/OPEN_FORM_IMPACTOS_DOCUMENTOS',
          event:false,
        })
      },
      obtenerImpactosRiesgos: (IdProyecto) => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/OBTENER_IMPACTOS_RIESGOS',
          IdProyecto,
        })
      },
      editarImpactosDocumentos: (IdImpacto) =>{
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/EDITAR_IMPACTOS_RIESGOS',
          indice:IdImpacto,
        })
      },
      cambiarStepper: (stepper) => () =>{
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/CAMBIAR_STP',
          stepper,
        })
      },
      limpiarStateImpactos:()=>{
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/LiMPIAR_IMPACTOS_DOCUMENTOS',
        })
      },
      abrirModalBorradoImpactos: (event) => (id) =>{
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/ABRIR_MODAL_BORRADO_IMPACTOS',
          event,
          IdImpacto:id,
        })
      },
      cambiarEstatus: (id) => () =>{
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/CAMBIAR_ESTATUS_IMPACTOS',
          id,
          tipoImpacto:"Riesgo",
        })
      },
      setCondicion: (event) => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/SET_CONDICION',
          event:event.target.value,
        })
      },
    })
  )
  
)(ImpactosRiesgos);

// https://www.amazon.com.mx/Maceta-autorregable-RA1009-decorativa-cuadrada/dp/B06XXLYYKF/ref=sr_1_42?__mk_es_MX=%C3%85M%C3%85%C5%BD%C3%95%C3%91&keywords=smart+home&qid=1575048389&sr=8-42	
// eddie