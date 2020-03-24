/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';
import T from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
// import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
// import TextField from '@material-ui/core/TextField';
// import EditarIcon from "@material-ui/icons/Edit";
import Tooltip from '@material-ui/core/Tooltip';
// import InputBase from '@material-ui/core/InputBase';
import EditIcon from 'images/iconos/edit.svg';
import Circulo from '@material-ui/icons/Lens';
// import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';
import { connect } from 'react-redux';

// import DialogTitle from '@material-ui/core/DialogTitle';
import FilterListIcon from '@material-ui/icons/FilterList';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import { withHandlers } from 'recompose';
import { withStyles } from "@material-ui/core/styles";
import { compose } from 'redux';
import List from '@material-ui/core/List';
// import DialogContent from '@material-ui/core/DialogContent';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Cancel from '@material-ui/icons/Cancel';
import Warning from '@material-ui/icons/Warning';
import Cerrar from '@material-ui/icons/Block';
import Error from '@material-ui/icons/Error';

import ListItemText from '@material-ui/core/ListItemText';
import RedirigirIcon from 'images/iconos/redirigir.svg';
import CandadoAmarillo from 'images/iconos/candadoAmarillo.svg';
import CandadoVerde from 'images/iconos/CandadoVerde.svg';
import CandadoRojo from 'images/iconos/CandadoRojo.svg';
// import { Line } from 'rc-progress';
// import Backdrop from '@material-ui/core/Backdrop';
import Trespuntos from '@material-ui/icons/MoreVert';
import BotonSucces from 'components/BotonSuccess';
import Persona from 'images/iconos/user.png';
import moment from 'moment';
import IconoProyecto from 'images/iconos/ProyectoIcono.svg';

// import { Container } from '../../../ConfiguracionTicket/styledComponents';

import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
// import EditarIcon from "@material-ui/icons/Edit";
import InputBase from '@material-ui/core/InputBase';
// import Paper from '@material-ui/core/Paper';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import ModalFormulario from './ModalFormulario'
import TipoComponente from "../TipoComponente/index";
import Filtro from './Filtro'
import Modal from '../../../Formularios/components/ListadoFormulario/components/Modal/alertDialog';
// import { Line } from 'rc-progress';
// import Backdrop from '@material-ui/core/Backdrop';
import ImpactosDocumentos from '../ImpactosDocumentos'
import { Container } from '../../../ConfiguracionTicket/styledComponents';

export class Tabla extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal : false, 
      bandFiltros : false, 
      anchorEl : null,
      bandOpciones : false, 
      anchorElOpciones:null,
      IdProyecto:"",
      EstatusProyecto : false,
      Avance:0,
      Portafolio:"",
      AutorizacionEstatus:"",
      LineaBaseActiva:"",
    };
    this.openModal = this.openModal.bind(this);
  }
  
  openModal() {
    const {
      modal,
    } = this.state
    this.setState({modal : !modal})
  }

  showFiltros = event => {
    const {
      bandFiltros,
    } = this.state;
    this.setState({'bandFiltros': !bandFiltros, anchorEl: event.currentTarget})
  }

  showOpciones = (idProyecto,estatus,avance,portafolio,autorizacionEstatus,lineaBaseActiva) => (event) => {
    const {
      bandOpciones,      
    } = this.state;
    this.setState({
      'bandOpciones': !bandOpciones, 
      anchorElOpciones: event.currentTarget,
      IdProyecto:idProyecto, EstatusProyecto:estatus,
      Avance: avance,
      Portafolio: portafolio,
      AutorizacionEstatus:autorizacionEstatus,
      LineaBaseActiva:lineaBaseActiva,
    })
  }

  clickHandle(){
    this.setState({'bandOpciones': false})
  }
 
  handleClose = () => {
    this.setState({ anchorElOpciones: null,'bandOpciones': false });
  };

  render(){
    const { 
      classes,
      abrirModalProyectos,
      modalProyectos,
      plantillas,
      onChangePlantilla,
      plantillaSeleccionada,
      prioridades,
      handleChangePrioridad,
      prioridadSeleccionada,
      nombreProyecto,
      setNombreProyecto,
      colorProyecto,
      cerrarModalProyectos,
      empleadoSeleccionado,
      empleados,
      onChangeEmpleado,
      changeColorProyecto,
      guardarProyecto,
      proyectos,
      onEdicionProxy,
      errores,
      // fechas,
      // filtrosWidth = '600px',
      // onFechaInput,
      // onChangeEstatus,
      // estatusSeleccionado,
      // responsableSeleccionado,
      // onChangeResponsable,
      // onFechaInputRes,
      // changeFecha,
      // changeFechaResponsable,
      // onClickLimpiar,
      // onClickFiltrar,
      // estatusProyectos,
      // responsableEstatus,
      idPortafolio,
      cambiarStepperProxy,
      idProyecto,
      IdDepartamento,
      IdPuesto,
      obtenerObservacionesProxy,
      openModalCerrarProyecto,
      abrirModalCerrado,
      cancelarProyecto,
      openModalCanceladoProyecto,
      abrirModalCancelacion,
      abrirModalDocumentosProxy,
      observaciones,
      cerrarModalObservaciones,
      openModalObservaciones,
      ticketsEnCancelacion,
      modalGuardadoProyecto,
      abrirGuardarModal,
      
    } = this.props;
        
    console.log(modalGuardadoProyecto,"TABLA -----------------------------------");
    
    let IdPortafolio =""
    if(idPortafolio !==""){
      const {
        IdPortafolio,
      } = idPortafolio.item;
    }else{
      IdPortafolio = 1
    }
    
    const {
      IdProyecto,
    } = this.state
    const id = this.state.bandFiltros ? 'simple-popper' : null;

    // const open = Boolean(this.state.anchorEl);  
    const idOpciones = this.state.bandOpciones ? 'simple-popper' : null;
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div>
        <Table  style={{height:'100%',overflowY:'auto'}} >
          <TableHead>
            <TableRow >
              <TableCell style={{padding: '4px 0px 4px 0px', fontFamily:'Roboto',width:'25%'}} > 
                <BotonSucces
                  label="NUEVO PROYECTO"
                  onClick={abrirModalProyectos}
                />
              </TableCell>
              <TableCell align="center"  style={{padding: '4px 4px 4px 4px', fontFamily:'Roboto',fontSize:'13px',width:'10%'}}>Estatus</TableCell>
              <TableCell align="center"  style={{padding: '4px 4px 4px 4px', fontFamily:'Roboto',fontSize:'13px',width:'10%'}}>Progreso</TableCell>
              <TableCell align="center"  style={{padding: '4px 4px 4px 4px', fontFamily:'Roboto',fontSize:'13px',width:'20%'}}>Fechas</TableCell>
              <TableCell align="center"  style={{padding: '4px 4px 4px 4px', fontFamily:'Roboto',fontSize:'13px',width:'10%'}}>Prioridad</TableCell>
              <TableCell align="center"  style={{padding: '4px 4px 4px 4px', fontFamily:'Roboto',fontSize:'13px',width:'10%'}}>Responsable</TableCell>
              {/* <TableCell align="center"  style={{padding: '4px 4px 4px 4px', fontFamily:'Roboto',fontSize:'13px',width:'15%'}}>
                <div>
                  <Tooltip title='Filtros'>
                    <IconButton 
                      onClick={this.showFiltros}
                      aria-describedby={id}
                    >
                      <FilterListIcon/>
                    </IconButton>
                  </Tooltip>
                  <Popper id={id} open={this.state.bandFiltros} anchorEl={this.state.anchorEl} transition style={{zIndex: 1000}}>
                    {({ TransitionProps }) => (
                      <Fade {...TransitionProps} timeout={350}>
                        <Paper style={{float: 'right', width: filtrosWidth, maxWidth: filtrosWidth, zIndex: 1005}}>
                          <Filtro
                            classes ={classes}
                            fechas ={fechas}
                            onFechaInput ={onFechaInput}
                            onChangeEstatus = {onChangeEstatus}
                            estatusSeleccionado ={estatusSeleccionado}
                            responsableSeleccionado = {responsableSeleccionado}
                            onChangeResponsable = {onChangeResponsable}
                            onFechaInputRes= {onFechaInputRes}
                            changeFecha ={changeFecha}
                            changeFechaResponsable = {changeFechaResponsable}
                            onClickLimpiar={onClickLimpiar}
                            onClickFiltrar={onClickFiltrar}
                            estatusProyectos={estatusProyectos}
                            empleados ={empleados}
                            responsableEstatus={responsableEstatus}
                            idPortafolio={idPortafolio}
                          />
                        </Paper> 
                      </Fade>
                    )}
                  </Popper>
                </div> 
              </TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {proyectos.map(item => (
              <TableRow>
                {/* <TableCell component="th" scope="row" colSpan={1}> */}
                <TableCell  align="center" style={{padding: '4px 4px 4px 4px', fontFamily:'Roboto'}} > 
                  <List component="nav" aria-label="main mailbox folders" style={{padding: '0px 0px 0px 0px'}} >
                    <ListItem  >
                      <ListItemIcon style={{padding:'0px 0px 0px 0px',fontFamily:'Roboto',fontSize:"10px"}}>
                        <img src={IconoProyecto} alt="" style={{fontFamily:'Roboto', fontSize:'14px', width:'60%',backgroundColor:item.Color, borderRadius:'5px'}} /> 
                      </ListItemIcon>
                      <ListItemText primary={item.NombreProyecto}  classes={{primary:classes.listItemText}} style={{marginLeft:'-50px',fontFamily:'Roboto',fontSize:"10px"}}/>
                      {(item.AutorizacionEstatus === null   && 
                    <IconButton tooltip="Ver"    >
                      <img src={CandadoAmarillo} alt="" /> 
                    </IconButton> 
                      )}
                      {(item.AutorizacionEstatus === 1   && 
                    <IconButton tooltip="Ver"    >
                      <img src={CandadoAmarillo} alt="" /> 
                    </IconButton> 
                      )}
                      {(item.AutorizacionEstatus === 2 &&
                    <IconButton tooltip="Ver"   >
                      <img src={CandadoVerde} alt="" /> 
                    </IconButton> 
                      )}
                      {(item.AutorizacionEstatus === 3 &&
                    <IconButton tooltip="Ver"   onClick={obtenerObservacionesProxy(item.IdProyecto)} >
                      <img src={CandadoRojo} alt="" /> 
                    </IconButton> 
                      )}                   
                    </ListItem>
                  </List>
                </TableCell>
                {/* {item. */}
                {(item.Estatus === 2 &&  item.Avance < 100 &&
              <TableCell  align="center" style={{padding: '4px 4px 4px 4px', fontFamily:'Roboto'}}  >
                <Circulo style={{color:"#616161"}}/>
                <Typography variant="caption" display="block" gutterBottom style={{fontFamily:'Roboto',fontSize:"12px",marginLeft:"0px"}}>
                    Por Iniciar
                </Typography>
              </TableCell>)}
                {(item.Estatus === 1 && 
              <TableCell  align="center" style={{padding: '4px 4px 4px 4px', fontFamily:'Roboto'}}  >
                <Circulo style={{color:"#FFE352"}}/>
                <Typography variant="caption" display="block" gutterBottom style={{fontFamily:'Roboto',fontSize:"12px",marginLeft:"0px"}}>
                    En proceso
                </Typography>
              </TableCell>)}
                {(item.Estatus === 3 && 
              <TableCell  align="center" style={{padding: '4px 4px 4px 4px', fontFamily:'Roboto'}}  >
                <Circulo style={{color:"#FF0023"}}/>
                <Typography variant="caption" display="block" gutterBottom style={{fontFamily:'Roboto',fontSize:"12px",marginLeft:"0px"}}>
                    Retrasado
                </Typography>
              </TableCell>)}
                {(item.Avance === 100 && item.Estatus !== 5 && 
              <TableCell  align="center" style={{padding: '4px 4px 4px 4px', fontFamily:'Roboto'}}  >
                <Circulo style={{color:"#0FC221"}}/>
                <Typography variant="caption" display="block" gutterBottom style={{fontFamily:'Roboto',fontSize:"12px",marginLeft:"0px"}}>
                  {item.Estatus === 4 ?  'Cerrado' : 'Finalizado'}
                </Typography>
              </TableCell>)}
                {(item.Estatus === 6 && 
              <TableCell  align="center" style={{padding: '4px 4px 4px 4px', fontFamily:'Roboto'}}  >
                <Circulo style={{color:"#FFE352"}}/>
                <Typography variant="caption" display="block" gutterBottom style={{fontFamily:'Roboto',fontSize:"12px",marginLeft:"0px"}}>
                    Pendiente
                </Typography>
              </TableCell>)}
                {(item.Estatus === 5 && 
              <TableCell  align="center" style={{padding: '4px 4px 4px 4px', fontFamily:'Roboto'}}  >
                <Circulo style={{color:"#FF0023"}}/>
                <Typography variant="caption" display="block" gutterBottom style={{fontFamily:'Roboto',fontSize:"12px",marginLeft:"0px"}}>
                    Cancelado
                </Typography>
              </TableCell>)}
                <TableCell  align="center" style={{fontFamily:'Roboto',padding: '4px 5px 4px 4px'}}  alignitems="center" >  
                  {/* <Line percent="25" strokeWidth="15" strokeColor="#00FFFF"/> */}
                  <TipoComponente
                    tipo={8}
                    valor={item.Avance === undefined ? 0 :item.Avance}
                    // row={index}
                    cell={3}
                    style={{
                      textAlign:'center',
                    }}
                  />
                </TableCell>
                <TableCell  align="center" component="th" scope="row" style={{padding: '4px 4px 4px 4px',  fontFamily:'Roboto'}} colSpan={1}>
                  {moment.utc(item.FechaInicial).format('DD/MM/YYYY')} - {moment.utc(item.FechaFinal).format('DD/MM/YYYY')}

                </TableCell>
                <TableCell  align="center" style={{padding: '4px 4px 4px 4px', fontFamily:'Roboto'}} >  
                  {(item.Prioridad === 'Baja' && 
             <Chip
               label={item.Prioridad}
               //  className={classes.chip}
               style={{backgroundColor:'#0FC221',opacity:56}}
               color="primary"
             />)}
                  {(item.Prioridad === 'Alta' && 
             <Chip
               label={item.Prioridad}
               //  className={classes.chip}
               style={{backgroundColor:'#C20F0F',opacity:34}}
               color="primary"
             />)}
                  {(item.Prioridad === 'Mediana' && 
              <Chip
                label={item.Prioridad}
                className={classes.chipMedio}
                style={{backgroundColor:'#FFE352',opacity:49}}
                color="primary"
              />)}
                </TableCell>
                <TableCell align="center"   style={{padding: '4px 0px 4px 0px', fontFamily:'Roboto', width:'10%'}}>
                  <Tooltip title={item.NombreResponsable}>
                    <Avatar alt="Remy Sharp" src={item.imagen ? item.imagen : Persona} className={classes.avatar}  style={{marginLeft:'37%'}}/>
                  </Tooltip>

                </TableCell>
                <TableCell align="center" >
                  <IconButton tooltip="Editar" style={{padding: 8}} onClick={onEdicionProxy(item)}><img src={EditIcon} alt="" /></IconButton>
                  <IconButton tooltip="Ver"  style={{padding: 8}} onClick={cambiarStepperProxy(2,item.IdPortafolio,item.IdProyecto,item.Tipo,item.Estatus)} ><img src={RedirigirIcon} alt="" /></IconButton>
                  <IconButton tooltip="Ver" onClick={this.showOpciones(item.IdProyecto,item.Estatus,item.Avance,item.IdPortafolio,item.AutorizacionEstatus,item.LineaBaseActiva)}  style={{padding: 8}}><Trespuntos  /></IconButton>
                
                </TableCell>
              </TableRow> 
            ))}
          </TableBody>
     
          <ModalFormulario 
            classes = {classes}
            modalProyectos = {modalProyectos}
            plantillas = {plantillas}
            onChangePlantilla = {onChangePlantilla}
            plantillaSeleccionada = {plantillaSeleccionada}
            prioridades = {prioridades}
            handleChangePrioridad = {handleChangePrioridad}
            prioridadSeleccionada = {prioridadSeleccionada}
            nombreProyecto={nombreProyecto}
            setNombreProyecto = {setNombreProyecto}
            colorProyecto ={colorProyecto}
            cerrarModalProyectos = {cerrarModalProyectos}
            empleadoSeleccionado = {empleadoSeleccionado}
            empleados = {empleados}
            onChangeEmpleado = {onChangeEmpleado}
            changeColorProyecto = {changeColorProyecto}
            guardarProyecto = {guardarProyecto}
            errores={errores}
            idProyecto={idProyecto}
            IdDepartamento={IdDepartamento}
            IdPuesto = {IdPuesto}
            modalGuardadoProyecto = {modalGuardadoProyecto}
            abrirGuardarModal = {abrirGuardarModal}
          />

          {/* Opciones  ------------------------------------------------------------------*/}
          <Fragment>
            <Popover
              id={idOpciones} 
              open={this.state.bandOpciones}
              anchorEl={this.state.anchorElOpciones }
              onClose={this.handleClose} 
                   
              // onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <List className={classes.root2}>
                <ListItem style={{cursor:'pointer'}}   >
                  {/* onClick={edicionPortafolio(item,idx)} */}
                  <Error>
                    <Error />
                  </Error>
                  <ListItemText id="switch-list-label-bluetooth" primary="Impacto de documento" onClick ={cambiarStepperProxy(3,1,IdProyecto)} />
                  {/* onClick ={abrirModalDocumentosProxy(true,idProyecto)}  */}
                </ListItem>
                <ListItem style={{cursor:'pointer'}}  >
                  <Warning>
                    <Warning />
                  </Warning>
                  <ListItemText id="switch-list-label-bluetooth" primary="Impacto de riesgo" onClick ={cambiarStepperProxy(4,1,IdProyecto)}/>
                </ListItem>
                {this.state.EstatusProyecto !== 4 && this.state.EstatusProyecto !== 5 && this.state.Avance === 100 &&  (
                  // this.state.Avance > 100 &&
                  <ListItem style={{ cursor:'pointer'}}>
                    <Cerrar>
                      <Cerrar/> 
                    </Cerrar>
                    <ListItemText primary="Cerrar proyecto" onClick = {abrirModalCerrado(IdProyecto,this.state.Portafolio)} />
                  </ListItem>
                )}
                {this.state.EstatusProyecto !== 4 && this.state.EstatusProyecto !== 5 && (
                  <ListItem style={{cursor:'pointer'}} >
                    <Cancel>
                      <Cancel/>
                    </Cancel>
                    <ListItemText  primary="Cancelar proyecto" onClick = {abrirModalCancelacion(true)} />
                  </ListItem>
                )}
              </List>
            </Popover>
          </Fragment>

          {/* modal de cerrrado de proyeto  ------------------------------------------------------------------*/}

          <Fragment>
            <Modal 
              open={openModalCerrarProyecto}
              typeAlert='Report'
              typeOptions='Select'
              title='Confirmar....'
              message='Es necesario completar los impactos de documentos y riesgos'
              onClickAccept={abrirModalCerrado(false)}
              onClickCancel={abrirModalCerrado(false)}
            />
          </Fragment>

          {/* modal de cerrrado de proyeto  ------------------------------------------------------------------*/}

          <Fragment>
            <Modal 
              open={openModalCanceladoProyecto}
              typeAlert='Report'
              typeOptions='Select'
              title='Confirmar....'
              message={this.state.AutorizacionEstatus !== null ? '¿Al cancelar el proyecto se cancelarán los Tickets, impactos y Actividades asociados a el ¿Desea continuar?':'El proyecto será cancelado ¿Desea continuar?'}
              onClickAccept={cancelarProyecto(IdProyecto,this.state.Portafolio,this.state.LineaBaseActiva)}
              onClickCancel={abrirModalCancelacion(false)}
            />
          </Fragment>
        </Table> 

        {/* modal Observaciones  ------------------------------------------------------------------*/}

        <Fragment>
          <Dialog
            open={openModalObservaciones}
            // TransitionComponent={Transition}
            aria-labelledby="alert-dialog-slide-title-ncolumna"
            aria-describedby="alert-dialog-slide-description-ncolumna"
          >
            <DialogTitle
              id="alert-dialog-slide-title-ncolumna"
              className={classes.dialogTitle}
            >
                
              <Container
                flexDirection='row'
              >
                <Icon
                  style={{
                    alignSelf:'center',
                    marginRight:'12px',
                    color:'#28950f',
                  }}
                >
                        assignment
                </Icon>
                <Typography className={classes.typography2} variant="h6" gutterBottom style={{width:'90%',textTransform:'capitalize'}}>
                        Observaciones
                </Typography>
                <IconButton
                  onClick={cerrarModalObservaciones}
                  style={{
                    fontsize: '17px',
                    padding: '2px',
                  }}
                >
                  <Icon>close</Icon>
                </IconButton>
              </Container>
              
            </DialogTitle>

            <DialogContent
              style={{ padding:5, width:'30vw'}}
            >
              {observaciones.map(item => (
                <Container
                  justify='center'
                  className={classes.container}
                  flexDirection='column'
                  style={{ padding:'5px 10px' }}
                >
                  <Container flexDirection='row' style={{alignItems: 'center'}}>
                    <Typography variant="subtitle2" className={classes.typography2} >
                          Línea Base:&nbsp;&nbsp;
                    </Typography>
                    <InputBase
                      id='mo_linea_base'
                      className={classes.textField}
                      value={item.IdLineaBase}
                      // onChange={onChangeInputBase(index,0)}
                      inputProps={{ 'aria-label': 'bare' }}
                      style={{
                        //  width:'70%',
                        fontsize:'100%',
                      }}
                        
                    />
                  </Container>
                  <Container flexDirection='row' style={{alignItems: 'center'}}>
                    <Typography variant="subtitle2"  align='left'>
                          Fecha:&nbsp;&nbsp;
                    </Typography>
                    <InputBase
                      id='mo_fecha'
                      className={classes.textField}
                      value={moment(item.FechaCreacion).format('DD-MM-YYYY')}
                      // onChange={onChangeInputBase(index,0)}
                      inputProps={{ 'aria-label': 'bare' }}
                      style={{
                        width:'70%',
                        fontSize:'15px',
                      }}
                    />
                  </Container>
                  <Container flexDirection='column'>
                    <Typography  variant="subtitle2"  className={classes.typographyObservaciones}>
                          Observación:&nbsp;&nbsp;
                    </Typography>
                    <TextField
                      id="standard-multiline-flexible"
                      multiline
                      rowsMax="4"
                      disabled
                      value={item.Observacion}
                      // onChange={this.handleChange('multiline')}
                      className={classes.observacion}
                      margin="normal"
                    />
                  </Container>
                </Container>
              ))}
            </DialogContent>
          </Dialog>
        </Fragment>
        {/* <Fragment>
          <Popover
            id={idOpciones} 
            open={this.state.bandOpciones}
            anchorEl={this.state.anchorElOpciones}
            onClose={this.handleClose} 
            
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <List className={classes.root2}>
              <ListItem style={{cursor:'pointer'}}   >
             
                <ListItemText id="switch-list-label-bluetooth" primary="Impacto de documento" onClick ={abrirModalDocumentosProxy(true,idProyecto)} />
              </ListItem>
              <ListItem style={{cursor:'pointer'}}  >
         
                <ListItemText id="switch-list-label-bluetooth" primary="Impacto de riesgo" />
              </ListItem>
              <ListItem style={{cursor:'pointer'}}  >
          
                <ListItemText id="switch-list-label-bluetooth" primary="Cerrar proyecto" />
              </ListItem>
            </List>
          </Popover>
        </Fragment> */}


      </div>
    );
  }
}

Tabla.propTypes = {
  abrirModalProyectos:T.func,
  classes:T.object,
  modalProyectos:T.bool,
  plantillas:T.array,
  onChangePlantilla:T.func,
  plantillaSeleccionada:T.oneOfType([T.array,T.string]),
  prioridades:T.array,
  handleChangePrioridad:T.func,
  prioridadSeleccionada:T.string,
  nombreProyecto:T.string,
  setNombreProyecto:T.func,
  colorProyecto:T.object,
  cerrarModalProyectos:T.func,
  empleadoSeleccionado:T.oneOfType([T.array,T.string]),
  empleados:T.array,
  onChangeEmpleado:T.func,
  changeColorProyecto:T.func,
  guardarProyecto:T.func,
  proyectos:T.array,
  onEdicionProxy:T.func,
  errores:T.object,
  idPortafolio:T.bool,
  cambiarStepperProxy:T.func,
  idProyecto:T.number,
  IdDepartamento:T.number,
  IdPuesto:T.number,
  obtenerObservacionesProxy:T.func,
  openModalCerrarProyecto:T.func,
  abrirModalCerrado:T.func,
  cancelarProyecto:T.func,
  openModalCanceladoProyecto:T.func,
  abrirModalCancelacion:T.func,
  abrirModalDocumentosProxy:T.func,
  observaciones:T.array,
  cerrarModalObservaciones:T.func,
  openModalObservaciones:T.func,
  ticketsEnCancelacion:T.array,
  modalGuardadoProyecto:T.bool,
};

export default compose(
  withStyles(),
  withHandlers({
    onEdicionProxy: (props) => (item) => () => {
      const {
        abrirEdicionProyecto,
      } = props;
      abrirEdicionProyecto(item)
  
    },
    cambiarStepperProxy: (props) => (id,idPortafolio,IdProyecto,IdPlantilla,Estatus) => () => {
      const{
        cambiarStepper,
      } = props;      
      cambiarStepper(id,idPortafolio,IdProyecto,IdPlantilla,Estatus);
    },
    abrirModalDocumentosProxy: (props) => (event) => () => {
      const{
        abrirModalDocumentos,
      } = props;
      abrirModalDocumentos(event);
    },

    obtenerObservacionesProxy: (props) => (IdProyecto) => () => {      
      const{
        obtenerObservaciones,
      } = props;
      obtenerObservaciones(IdProyecto);
    },

    ImpactosDocumentosModalProxy: (props) => (event) => {
      const{
        abrirModalDocumentos,
      } = props;
      abrirModalDocumentos(event);
    },
  }),
  connect(
    /* mapStateToProps */
    null,
    /* mapDispatchToProps */
    (dispatch) => ({
      dispatch,
      abrirModalCerrado:(IdProyecto,IdPortafolio)=>() => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/ABRIR_MODAL_CERRADO_PROYECTO',
          IdProyecto,
          IdPortafolio,
        })
      },
      cancelarProyecto:(IdProyecto,IdPortafolio,LineaBaseActiva)=>() => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/CANCELAR_PROYECTO',
          IdProyecto,
          IdPortafolio,
          LineaBaseActiva,
        })
      },
      abrirModalCancelacion:(event)=>() => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/ABRIR_MODAL_CANCELADO_PROYECTO',
          event,
        })
      },
    })
  )

)(Tabla);