import React from 'react';
import Grid from '@material-ui/core/Grid';
import T from 'prop-types';
import { compose,withHandlers} from 'recompose';
import withNotifier from 'components/HOC/withNotifier';
import {filter,remove,find} from 'lodash';
import { FormControlLabel,
  TextField,
  RadioGroup,
  Radio,
  Tooltip,
  MenuItem,
  Paper} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Settings from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import { MuiThemeProvider, createMuiTheme,withStyles } from "@material-ui/core/styles";
import AutoCompletable from 'components/FiltroSeleccion';
import ModalRegla from '../ModalRegla';

import { Container } from '../../styledComponents';


const GreenRadio = withStyles({
  root: {
    color: '#28950f',
    '&$checked': {
      color: '#28950f',
    },
  },
  checked: {},
})(props => <Radio color="default" {...props} />);

const getMuiTheme = () =>
  createMuiTheme({
    overrides: {
      MuiCheckbox: {
        colorSecondary: {
          color: '#28950f',
          '&$checked': {
            color: '#28950f !important',
          },
        },
      },
    },
  })

const styles = theme => ({
  root : { 
    border: 1, 
    borderColor: 'black',
    borderStyle: 'solid'},
  formControl: {
    margin: theme.spacing.unit,
    minWidth: '90%',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  customWidth: {
    maxWidth: 500,
    fontSize:15,
  },
});


function ConfEtapas(props) {
  const { 
    classes,
    confEtapas,
    handleChangePlaza,
    handleChangePlazaDestino,
    iniciarSeguimiento,
    changeNombreEtapa,
    seleccionarTipoBusqueda,
    handleChangeTipo,
    handleChangeProxy,
    permitirCancelacionAction,
    handleChangeDependencia,
    redireccionarCampos,
    redireccionarEtapas,
    changeHoraInicio,
    accionesModal,
    etapas,
    componentesEspeciales,
    idPlaza,
    agregarEtapaPlaza,
    etapasTemporales,
    actualizarEtapaTemporal,
    insertarTiempoSla1,
    changeHoraInicio2,
    changeHoraFin,
    changeHoraFin2,
    insertarTiempoSla2,
    idPlantilla,
    datosEtapa,
    configuracionCampos,
    componentesFiltrados,
    // eslint-disable-next-line react/prop-types
    nuevoValor,
  } = props;
  console.log(props.confEtapas,'PROPS DE CONF ETAPAS FORMULARIO');
  let usuariosPuestos = []
  let PuestosArray = {}
  let usuariosArray = {}


  if(confEtapas.tipoBusquedaUsuarios.length > 0){
    if(confEtapas.tipoBusquedaUsuarios[0].NoEmpleado !== undefined){

      usuariosArray = { 
        value: confEtapas.rolUsuarioSelected.id, label: confEtapas.rolUsuarioSelected.nombre === undefined ? 
          find(confEtapas.tipoBusquedaUsuarios,['NoEmpleado',confEtapas.rolUsuarioSelected.id]).Nombre : confEtapas.rolUsuarioSelected.nombre,
      } 
    }else{
      PuestosArray = { 
        value: confEtapas.rolUsuarioSelected.id, label: confEtapas.rolUsuarioSelected.nombre === undefined ? 
          find(confEtapas.tipoBusquedaUsuarios,['IdPuesto',confEtapas.rolUsuarioSelected.id]).Nombre : confEtapas.rolUsuarioSelected.nombre,
      }
    }
    usuariosPuestos= confEtapas.tipoBusquedaUsuarios.map(item => ({ value: item.IdPuesto !== undefined ? item.IdPuesto : item.NoEmpleado, label: item.Nombre }))    
  } 

  
  console.log(PuestosArray,"PuestosArray ------------------------------------------");
  console.log(usuariosArray,"usuariosArray ------------------------------------------");
  console.log(usuariosPuestos,"usuariosPuestos ------------------------------------------");
  
  const longText = `Configurar Campos para las Etapas`;
  const  dependencias = idPlantilla !== undefined ? filter(datosEtapa,['IdPlaza',idPlaza]) : filter(etapasTemporales,['IdPlaza',idPlaza])
  let primeraEtapa = false
  dependencias.forEach((dependencia,index) => {
    dependencia.orden =  index
  })  

  if(dependencias.length > 0){
    if(dependencias[0].IdEtapa === confEtapas.etapaEnEdicion){
      primeraEtapa = true
    }
  }

  remove(dependencias, {
    IdEtapa: confEtapas.etapaEnEdicion,
  });

  if(confEtapas.plazaSelected.id !== ""){
    confEtapas.activarRadioRol = confEtapas.plazaSelected.id !== ""
  }

  return (
    <div>
      <Grid container style={{ padding: '20px 20px', marginTop:'-20px' }}>
        <Paper>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} style={{ padding: '20px 20px' }}>
              <Grid container>
                <Grid item xs={6} sm={6} md={6} >
                  <Typography  variant="h6" gutterBottom>
                Configuración de Etapas
                  </Typography>
                </Grid>
                <Grid item xs={5} sm={5} md={5} ></Grid>
                <Grid item xs={1} sm={1} md={1}>
                  <Tooltip title={longText} classes={{ tooltip: classes.customWidth }} style={{fontSize:'150px'}}>
                    <IconButton onClick={redireccionarCampos}>
                      <Settings style={{color:'#F9AA33', fontSize:"40px" }}   />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: '-70px' }} alignItems="center">
            <Grid item xs={3} sm={3} md={3} style={{ padding: '25px 10px' }} >
              {idPlaza === 0   &&  ( 
                <FormControl className={classes.formControl}>
                  <InputLabel style={{fontSize: 14}} htmlFor="departamento-id">Plaza</InputLabel> 
                  <Select
                    value={confEtapas.plazaSelected.id}
                    onChange={handleChangePlaza}
                    displayEmpty
                    style={{fontSize: 14}}
                    name="plazas"
                    error={confEtapas.errores.errorPlaza}
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
                    {confEtapas.plazas.map((elem) => 
                      <MenuItem style={{fontSize: 14}}  id={`departamentos_${elem.IdPlaza}`} key={`${elem.IdPlaza}`} value={elem.IdPlaza || ''}>{elem.Nombre}</MenuItem>)}
                  </Select>
                </FormControl>)}
              {idPlaza > 0 && (
                <TextField
                  fullWidth
                  type="text"
                  value={confEtapas.plazaSelected.nombre}
                  disabled
                />)}
              
            </Grid>
            <Grid item xs={3} sm={3} md={3} style={{ padding: '40px 10px' }}>
              <MuiThemeProvider theme={getMuiTheme}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={confEtapas.requiereSeguimiento}
                      onChange={(e) => {
                        iniciarSeguimiento(e);
              
                      } }
                      value="checkedA"
                      disabled = {confEtapas.numeroPuestos > 0}
                    />
                  }
                  label="Requiere iniciar seguimiento"
                />
              </MuiThemeProvider>
            </Grid>
            <Grid container item xs={3} sm={3} md={3}  style={{ padding: '45px 0px' }}>
              <ModalRegla 
                acciones = {accionesModal}
                dataReglas = {etapas.reglas} 
                componentesEspeciales={componentesEspeciales}
                reglaSeleccionada = {etapas.reglaSeleccionada}
                configuracionCampos = {configuracionCampos}
                componentesFiltrados = {componentesFiltrados}
                nuevoValor={nuevoValor}
                // nuevoValor = {nuevoValor}
              // ref={(ref) => {this.myTextInput = ref}}
              />
          
            </Grid>
          </Grid>
          <Grid container style={{ padding: '40px 0px', marginTop: '-100px' }}>
            <Grid item xs={8} sm={8} md={8} style={{ padding: '40px 15px' }}>
              <TextField
                label="Capture el nombre de la etapa"
                fullWidth
                type="text"
                value={confEtapas.nombreEtapa}
                onChange={changeNombreEtapa}
                error={confEtapas.errores.errorNombreEtapa}
                helperText="*Requerido"
              />
            </Grid>
            <Grid item xs={3} sm={3} md={3} style={{ padding: '34px 15px' }}>
              <FormControl className={classes.formControl}>
                <InputLabel style={{fontSize: 14}} htmlFor="departamento-id">Dependencia</InputLabel>
                <Select
                  value={confEtapas.dependenciaSeleccionada.id}
                  onChange={handleChangeDependencia}
                  disabled={dependencias.length === 0 || primeraEtapa}
                  displayEmpty
                  style={{fontSize: 14}}
                  name="plazas"
                  error={confEtapas.errores.errorDependencia}
                  MenuProps= {{
                    PaperProps: {
                      style : {
                        maxHeight: 60 * 4.5,
                      },
                    },
                  }}
                  inputProps={{
                    name: 'departamento',
                    id: 'departamento-id',
                  }}
                >
                  {dependencias.map((elem) => 
                    <MenuItem style={{fontSize: 14}}  id={`puestos${elem.orden}`} key={`puestos${elem.orden}`}    value={elem.orden}>{elem.Etapa}</MenuItem>)} 
                </Select>
              </FormControl>
            </Grid>
            
          </Grid>
          <Grid container style={{ padding: '40px 0px', marginTop: '-130px' }}>
            <Grid item xs={3} sm={3} md={3} style={{ padding: '50px 15px', fontSize: '15px' }}>Seleccione tipo de busqueda</Grid>
            <Grid item xs={3} sm={3} md={3} style={{ padding: '38px 0px' }}>
              <RadioGroup
                row
                name="tiempoRespuesta"
                style={{ display: 'flex', flexDirection: 'row' }}
              >
                <Grid  style={{ padding: '0px 1px', fontSize: '15px' }}>Puesto
                  <GreenRadio
                    value="Rol"
                    control={<Radio color="default" />}
                    checked={confEtapas.radioRol === 'Rol' }
                    label="Rol"
                    onChange={seleccionarTipoBusqueda}
                    disabled = {confEtapas.plazaSelected.id === ""}
                  />
                </Grid>
                <Grid  style={{ padding: '0px 1px', fontSize: '15px' }}>Usuario
                  <GreenRadio
                    value="Usuario"
                    control={<Radio color="default" />}
                    checked={confEtapas.radioRol === 'Usuario'}
                    label="Usuario"
                    disabled = {confEtapas.plazaSelected.id === ""}
                    onChange={seleccionarTipoBusqueda}/>
                </Grid>
                
              </RadioGroup>
            </Grid> 
            <Grid item xs={3} sm={3} md={3} style={{ padding: '50px 15px', fontSize: '15px' }}>Permitir cancelación de ticket</Grid>
            <Grid item xs={3} sm={3} md={3} style={{ padding: '38px 0px' }}>
    
              <RadioGroup
                row
                name="tiempoRespuesta"
                style={{ display: 'flex', flexDirection: 'row' }}
              
              >
                <Grid  style={{ padding: '0px 1px', fontSize: '15px' }}>Si
                  <GreenRadio
                    value='si'
                    checked={confEtapas.permitirCancelacion === true}
                    control={<Radio color="default" />}
                    label="Si"
                    onChange={permitirCancelacionAction}
                  />
                </Grid>
                <Grid  style={{ padding: '0px 1px', fontSize: '15px' }}>No
                  <GreenRadio
                    value="no"
                    control={<Radio color="default" />}
                    checked={confEtapas.permitirCancelacion === false || confEtapas.permitirCancelacion === undefined}
                    onChange={permitirCancelacionAction}
                    label="No"/>
                </Grid> 
              </RadioGroup>
            </Grid>
          </Grid>


          <Grid container style={{ padding: '40px 0px', marginTop: '-140px' }}   >
            <Grid item xs={3} sm={3} md={3} style={{ padding: '20px 10px' }} >
              <FormControl className={classes.formControl}>
                <InputLabel style={{fontSize: 14}} htmlFor="plaza-id">Plaza</InputLabel>
                <Select
                  value={confEtapas.plazaDestinoSeleccionada.id || confEtapas.plazaDestinoSeleccionada}
                  onChange={handleChangePlazaDestino}
                  displayEmpty
                  style={{fontSize: 14}}
                  name="plazas"
                  disabled={confEtapas.radioRol === ""  }
                  error={confEtapas.errores.errorPlazaBusqueda}
                  MenuProps= {{
                    PaperProps: {
                      style : {
                        maxHeight: 60 * 4.5,
                      },
                    },
                  }}
                >
                  {confEtapas.plazasDestino.map((elem) => 
                    <MenuItem style={{fontSize: 14}}  id={`departamentos_${elem.IdPlaza}`} key={`${elem.IdPlaza}`} value={elem.IdPlaza || ''}>{elem.Nombre}</MenuItem>)}
                </Select>
              </FormControl> 
            </Grid>
            <Grid item xs={3} sm={3} md={3} style={{ padding: '20px 10px' }}>
              <FormControl className={classes.formControl}>
                {/* <InputLabel style={{fontSize: 14}} htmlFor="departamento-id">Puesto/Usuario</InputLabel> */}
                <AutoCompletable
                  // valor={confEtapas.rolUsuarioSelected.id} -- como estaba antes
                  valor={Object.keys(PuestosArray).length === 0 ? usuariosArray : PuestosArray}
                  onChange={handleChangeProxy}
                  opciones={usuariosPuestos}
                  // campoValido={errores.errorTipoProyecto}
                  campoValido
                  label='Puesto/Usuario'
                  indice={1}
                  // inhabilitado ={idProyecto > 0}
                />


                {/* <Select
                  value={confEtapas.rolUsuarioSelected.id}
                  onChange={handleChangeTipo}
                  displayEmpty
                  style={{fontSize: 14}}
                  name="Rol/Puesto"
                  error={confEtapas.errores.errorPuestoUsuario}
                  disabled={confEtapas.radioRol === "" || confEtapas.plazaDestinoSeleccionada.id === "" }
                  MenuProps= {{
                    PaperProps: {
                      style : {
                        maxHeight: 60 * 4.5,
                      },
                    },
                  }}
                  // disabled = {confEtapas.plazaSelected.id === ""}
                >
                  {confEtapas.tipoBusquedaUsuarios.map((elem) => 
                    <MenuItem 
                      style={{fontSize: 14}}   
                      id={`puestos${elem.IdPuesto || elem.NoEmpleado}`}   
                      value={elem.IdPuesto || elem.NoEmpleado}>
                      {confEtapas.radioRol === 'Usuario' ? `${elem.Nombre} ${elem.ApellidoPaterno} ${elem.ApellidoMaterno}`:`${elem.Nombre}`}
                    </MenuItem>)} 
                </Select>  */}
              </FormControl>
            </Grid> 
          </Grid>
          
          <Grid container style={{ padding: '20px 10px',marginTop: '-50px'}}>

            <Grid className={classes.root} item xs={8} sm={8} md={8} style={{ padding: '20px 10px'}}>
              <Grid container >
                <Grid item xs={3} sm={3} md={3} style={{ padding: '20px 10px' }}>
                  <TextField
                    id="time"
                    label="Hora Inicio"
                    type="time"
                    // defaultValue="00:00"
                    className={classes.textField}
                    error={confEtapas.errores.errorHoraInicio}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={confEtapas.horaInicio1}
                    onChange={changeHoraInicio}
                    inputProps={{
                      step: 5000, // 5 min
                    }}
                  />                
                </Grid>
                <Grid item xs={1} sm={1} md={1}></Grid>
                <Grid item xs={3} sm={3} md={3} style={{ padding: '20px 10px' }}>
                  <TextField
                    id="time"
                    label="Hora Fin"
                    type="time"
                    value={confEtapas.horaFin1}
                    onChange={changeHoraFin}
                    className={classes.textField}
                    error={confEtapas.errores.errorHoraFin}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 5000, // 5 min
                    }}
                  />
                </Grid>
                <Grid item xs={1} sm={1} md={1}></Grid>
                <Grid item xs={4} sm={4} md={4} style={{ padding: '20px 10px' }}>
                  <TextField
                    onInput = {(e) =>{e.target.value = Math.max(0, parseInt(e.target.value, 10) ).toString().slice(0,1000000000)}}
                    label="Capture el tiempo de la SLA"
                    fullWidth
                    type="number"
                    value={confEtapas.tiempoSla1}
                    error={confEtapas.errores.errorTiempoSLA}
                    onChange={insertarTiempoSla1}
                    // onBlur={this.handleBlur}
                    // helperText="*Requerido"
                    // error={this.state.selectionServicio === "" && this.state.camposInvalidos === true}
                  />
                </Grid>
                <Grid item xs={3} sm={3} md={3} style={{ padding: '20px 10px' }}>
                  <TextField
                    id="time"
                    label="Hora Inicio"
                    type="time"
                    defaultValue=""
                    value={confEtapas.horaInicio2}
                    onChange={changeHoraInicio2}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 5000, // 5 min
                    }}
                  
                  />
                </Grid>
                <Grid item xs={1} sm={1} md={1}></Grid>
                <Grid item xs={3} sm={3} md={3} style={{ padding: '20px 10px' }}>
                  <TextField
                    id="time"
                    label="Hora Fin"
                    type="time"
                    defaultValue=""
                    value={confEtapas.horaFin2}
                    onChange={changeHoraFin2}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 5000, // 5 min
                    }}
                  />
                </Grid>
                <Grid item xs={1} sm={1} md={1}></Grid>
                <Grid item xs={4} sm={4} md={4} style={{ padding: '20px 10px' }}>
                  <TextField
                    onInput = {(e) =>{e.target.value = Math.max(0, parseInt(e.target.value, 10) ).toString().slice(0,1000000000)}}
                    label="Capture el tiempo de la SLA"
                    fullWidth
                    type="number"
                    value={confEtapas.tiempoSla2}
                    onChange={ insertarTiempoSla2}
                    // onBlur={this.handleBlur}
                    // helperText="*Requerido"
                    // error={this.state.selectionServicio === "" && this.state.camposInvalidos === true}

                  />
                </Grid>
              </Grid>
            </Grid>
     
            <Grid item xs={8} sm={8} md={4} >
              <Grid  item xs={8} sm={8} md={8}  style={{ padding: '80px 0px' }}></Grid>
              {/* <Button 
                  variant="contained"   
                  color="primary"
                  style={{marginLeft: 8}}
                  onClick={redireccionarEtapas}
                >
                  &nbsp;&nbsp;&nbsp;&nbsp;Cerrar&nbsp;&nbsp;&nbsp;&nbsp;
                </Button> */}
              
              {/* //Aqui poner los botones */}

              <Container
                flexDirection="row"
                justify="flex-end"
                alignItems="flex-end"
                style={{
                  bottom: '0px',
                  // position: 'absolute',
                  padding: '20px 10px 0px 0px',
                }}
              >

                <Button
                  variant="contained"
                  size="small"
                  className={classes.button}
                  style={{ 
                    marginLeft: '20px',
                    backgroundColor:'#FF0023',
                    color:'#F7F7F7',
                  }}
                  // color='#FF0023'
                          
                  onClick={redireccionarEtapas}

                >
                        &nbsp;&nbsp;&nbsp;&nbsp;Cerrar&nbsp;&nbsp;&nbsp;&nbsp;
                </Button>
                {!confEtapas.actualizarEtapa && (
                  <Button
                    variant="contained"
                  
                    size="small"
                    className={classes.button}
                    style={{ 
                      marginLeft: '20px',
                      backgroundColor:'#28950F',
                      color:'#F7F7F7',
                    }}
                    // Validar en vez de redirecciona
                    onClick={agregarEtapaPlaza} 
                  >
                    &nbsp;&nbsp;&nbsp;&nbsp;Agregar&nbsp;&nbsp;&nbsp;&nbsp;
                  </Button>
                )}
                {confEtapas.actualizarEtapa && (
                  <Button
                    variant="contained"
                                    
                    size="small"
                    className={classes.button}
                    style={{ 
                      marginLeft: '8px',
                      backgroundColor:'#28950F',
                      color:'#F7F7F7',
                    }}
                    // Validar en vez de redirecciona
                    onClick={actualizarEtapaTemporal} 
                  >
                  &nbsp;&nbsp;&nbsp;&nbsp;Actualizar&nbsp;&nbsp;&nbsp;&nbsp;
                  </Button>
                )}
              </Container>
            </Grid>

            
          </Grid>
        </Paper>  
      </Grid>
      
    </div>
  );
}

ConfEtapas.propTypes = {
  classes: T.object,
  confEtapas: T.object,
  handleChangePlaza: T.func,
  iniciarSeguimiento:T.func,
  changeNombreEtapa: T.func,
  seleccionarTipoBusqueda: T.func,
  handleChangeTipo: T.func,
  permitirCancelacionAction: T.func,
  handleChangeDependencia: T.func,
  redireccionarCampos: T.func,
  redireccionarEtapas: T.func,
  changeHoraInicio: T.func, 
  accionesModal:T.object,
  etapas:T.object,
  componentesEspeciales: T.array,
  idPlaza: T.number,
  handleChangePlazaDestino:T.func,
  agregarEtapaPlaza:T.func,
  etapasTemporales: T.array,
  actualizarEtapaTemporal: T.func,
  insertarTiempoSla1: T.func,
  changeHoraInicio2: T.func,
  changeHoraFin: T.func,
  changeHoraFin2: T.func,
  insertarTiempoSla2: T.func,
  idPlantilla:T.number,
  datosEtapa:T.array,
  configuracionCampos:T.array,
  componentesFiltrados:T.array,
  // obtenerNumeroDePuestos:T.func,
};

export default compose(
  withNotifier,
  withStyles(styles),
  withHandlers({
    onInputChangeProxy: (props) => () => (e) => {      
      const {
        actions:{
          handleChangeDepartamento,
        },
      } = props;
    
      console.log(props,"collective paranoioa");

      // event : {
      //   id: toSafeInteger(event.target.value),
      //   nombre: event.currentTarget.textContent,
      // },

      // const obt = {
      //   target:{value:e.value  },
      // }
      // console.log(obt,"ONJEO");
      
      handleChangeDepartamento(e)
      
    },
    handleChangeProxy: (props) => () => (e) => {   
      console.log(props,e,"collective paranoioa");
   
      const {
        handleChangeTipo,
      } = props;
      const obt  = {}

      handleChangeTipo(e)
    },
  }),

)(ConfEtapas);

