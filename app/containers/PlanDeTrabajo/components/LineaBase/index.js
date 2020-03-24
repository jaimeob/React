/* eslint-disable no-plusplus */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prefer-stateless-function */
/**
 *
 * LineaBase
 *
 */
import React, { Fragment } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles} from '@material-ui/core/styles';
import '@zendeskgarden/react-tables/dist/styles.css';
import BotonSucces from 'components/BotonSuccess';
import BotonCancelar from 'components/BotonCancelar';
import injectSaga from 'utils/injectSaga';
import { DAEMON } from 'utils/constants';
import {
  startCase,
  lowerCase,
  uniqueId,
  isArray,
} from 'lodash';

import {
  Table,
  // Caption,
  Head,
  HeaderRow,
  HeaderCell,
  Body,
  Row,
  Cell,
} from '@zendeskgarden/react-tables';
import Fab from '@material-ui/core/Fab';

import {
  Grid,
  Icon,
  AppBar,
  Toolbar,
  Paper,
  Typography,
  // Checkbox,
  IconButton,
  // TextField,
  Tooltip,
  InputBase,
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide,
  FormControlLabel,
  Switch,
  FormControl,
  InputLabel,
  Select,
  Input,
  TextField,
  InputAdornment,
  MenuList,
  OutlinedInput,
} 
  from '@material-ui/core';
import moment from 'moment';
import iconoLineaBase from 'images/iconos/iconoLineaBase.svg'
// import addEtapa from 'images/iconos/addEtapa.svg'
import agregadoEtapas from '@material-ui/icons/LinearScaleOutlined';
import grey from '@material-ui/core/colors/grey'
import styled from 'styled-components'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ThemeProvider } from 'react-bootstrap';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
// import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Drawer from '@material-ui/core/Drawer';
// import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import config from 'config/config.development';
import socketIOClient from "socket.io-client";

import ArrowRight from '@material-ui/icons/KeyboardArrowRight';
import saga from '../../saga';
import Modal from '../../../Formularios/components/ListadoFormulario/components/Modal/alertDialog';
import { Container } from '../../../ConfiguracionTicket/styledComponents';
import TipoComponente from "../TipoComponente/index";

import AutoCompletable from '../AutoCompletar';
// import AutoCompletable from 'components/FiltroSeleccion';
import './styles.css';

import Bandeja from './Tickets/BandejaTickets'
// import Bandeja from '../BandejaTickets'
import AlertaConfirmacion from '../AlertaConfirmacion';

const styles = theme => ({
  typography: {
    useNextVariants: true,
  },
  checkbox: {
    padding:'0px !important',
  },
  cell:{
    // borderRight:'1px solid gainsboro',
    borderTop:'1px solid gainsboro',
    alignItems:'center',
    justifyContent:'center',
    
  },
  cellEmpty:{
    borderTop:'1px solid gainsboro',
    width: '2.1vw',
  },
  row:{
    borderRight:'1px solid gainsboro',
    textAlign:'center',
    padding: '0px 10px 0px 10px',
    alignItems:'center',
    justifyContent:'center',
    width: '1.5vw',
  },
  rowEmpty:{
    borderRight:'1px solid gainsboro',
    paddingLeft:'0px',
    alignItems:'center',
    width: '1.7vw',
  },
  textField:{
    root:{
      padding:'0px',
      margin:'0px',
      width:'100%',
      color:'black !important',
    },
    disabled:{
      color:'black !important',
    },
    padding: '0px 13px 0px 13px',
    marginTop: '0px',
    marginBottom: '0px',
    width:'100%',
    color:'black !important',
  },
  button:{
    color:'green',
    margin: '1vh 1vh',
  },
  btnRecurso:{
    fontSize:'10px',
    textTransform: 'capitalize',
    
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding:0,
  },
  formControl: {
    margin: '10px 40px 10px 40px',
    minWidth: 200,
    maxWidth: 200,
  },
  dialogTitle:{
    backgroundColor:'#E0E0E0 !important',
    height: '8vh',
    padding: '2.3vh 1vw 2vh 1vw',
  },
  typography2:{
    alignSelf:'center',
    marginBottom: 0,
    fontSize:'15px',
    color:'black',
  },
  modalConfirmacion:{
    // height: '6vh',
    // padding: '1vh 1vw 2vh 1vw',
    // backgroundColor: '#ff00234d',
    height: '6vh',
    padding: '1vh 1vw 2vh 1vw',
    backgroundColor: 'rgb(255, 0, 35,0.4)',    
    marginTop: '9px',
  },
  dialogContent:{
    padding:0,
  },
  observacion:{
    backgroundColor: '#EEEAEA',
    borderRadius: '7px',
    padding: '3px 7px',
    margin:0,
  },
  typographyObservaciones:{
    textTransform:'capitalize',
    fontSize:'15px',
  },
  drawerSide:{
    top: '47px',
    width: '57%',
  },
  // list: {
  //   height: '650px',
  // },
  fab: {
    position: 'absolute',
    background: 'transparent', 
    boxShadow: 'none',
    bottom: 250,
    left: -22,
  },

  
});

const CustomSwitch = withStyles({        
  switchBase: {
    color: 'white',
    '&$checked': {
      color: '#28950F',
    },
    '&$checked + $track': {
      backgroundColor: '#28950F',
    },
  },
  checked: {},
  track: {},
})(Switch);

const DraggableRow = styled(Row)`
  ${props =>
    props.isDraggingOver
      ? `
    :hover {
      background-color: inherit !important;
    },
    :focused:{
      background-color: red
    }
  `
      : ''};
    padding: 0px !important;
`;


const DraggableCell = styled(Cell)`
  ${props =>
    props.isDragging
      ? `
    display: inline-block !important;
  `
      : ''};
`;

const DraggableContainer = styled.div`
  :focus {
    outline: none;
  }
`;

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const socket = socketIOClient(config.api.socketURL);

class LineaBase extends React.Component {

  
  componentWillUnmount () {
    socket.off('obtenerMensajesChat')
    socket.close() 
  }
  

  componentDidMount(){
    const{
      getArreglo,
      obtenerCatalogos,
    } = this.props;
    getArreglo();
    obtenerCatalogos();
  } 

  componentDidUpdate(prevProps){
    if(prevProps.propsLineaBase.lineaBase.arregloComponentes.length > 0 ){
      if (prevProps && (this.props.propsLineaBase.lineaBase.arregloComponentes[0].length > prevProps.propsLineaBase.lineaBase.arregloComponentes[0].length)) {
        document.getElementById(`input_base_${prevProps.propsLineaBase.lineaBase.arregloComponentes[0].length}`).focus();
        this.props.setRegistroSeleccionado();
      }
    } 
  }

  state = {
    anchorEl: null,
    anchorElAdd: null,
    IdTicket:null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleClickAdd = event => {
    this.setState({ anchorElAdd: event.currentTarget });
  };

  handleCloseAdd = () => {
    this.setState({ anchorElAdd: null });
  };


  handleClickEt = event => {
    this.setState({ anchorElEt: event.currentTarget });
  };

  handleCloseEt = () => {
    this.setState({ anchorElEt: null });
  };

  handleClickAddEt = event => {
    this.setState({ anchorElAddEt: event.currentTarget });
  };

  handleCloseAddEt = () => {
    this.setState({ anchorElAddEt: null });
  };


  closeModalButtonDel= () => {
    const {// eslint-disable-line
      stateUpdater,
      requestTickets,
    } = this.props;
    stateUpdater('openModal',false)
    requestTickets()
  }



  onClickModalButtonDel= (action) => {
    action();
  }
  
  obtenerValorEtapa = (arreglo,idTicket,posicion) =>  {
    let resultado = '';
    for(let x=0;x<arreglo.length;x++){
      if(arreglo[x].IdTicket === idTicket){
        resultado = arreglo[x].Configuracion[posicion].config.valor;
        return resultado
      }
    }
    return null
  }

  render() {

    const {
      numUsuarioLogeado,
      nomUsuarioLogeado,
      classes,
      propsLineaBase:{
        lineaBase:{
          IdLineaBase,
          IdAutorizador,
          LineaBaseActiva,
          modalAutorizacion,
          arrColumnaComponente,
          arrCabeceraComponente,
          arrCabeceraEtapas,
          arregloComponentes,
          arrPlazas,
          arrDepartamentos,
          arrPuestos,
          arrRecursos,
          arrRecursosInvitarAmigo,
          arrCabecerasExtras,
          arrLineasBase,
          arrEtapas,
          fechaValida,
          fecInicio,
          fecFin,
          fecInput,
          openModal,
          disabledDepartamento,
          autoAsignarmelo,
          openModalNColumna,
          openConfirmacionBorrar,
          plazaSeleccionadaRecurso,
          departamentoSeleccionadoRecurso,
          puestoSeleccionadoRecurso,
          recursoSeleccionadoRecurso,
          nomrecursoSeleccionadoRecurso,
          tipoDatoNColumna,
          nombreNColumna,
          tamanioTabla,
          arregloComponentesExtras,
          departamentoInvitarAmigo,
          valorInvitarAmigo,
          // openMenuTabla,
          arrDepartamentosInvitar,
          openModalGenerarLB,
          openModalCancelarCopia,
          openModalEditarColumna,
          openModalInvitarAmigo,
          openModalSalir,
          anchorElSeleccionado,
          bandejaTickets,
          idAutorizacion,
          // AbrirObservaciones,
          modalobservacionesFormulario,
          observacion,
          tablaPendientes,
          Copia,
          Editando,
          Invitado,
          estatusProyectoSeleccionado,
          IdTicketLineaBase,
        },
      },
      agregarRegistro,
      borrarRegistro,
      onChangeInputBase,
      onChangeFechas,
      onDragEnd,
      salirAdministradorActividades,
      filtrarRecurso,
      cambiarValor,
      cambiarValorRecurso,
      agregarNuevaColumna,
      editarColumna,
      abrirModaleditarNomColumna,
      onChangeInputBaseExtra,
      abrirModalInvitarAmigo,
      guardarLineaBase,
      editarLineaBase,
      cambiarLineaBase,
      cancelarCopia,
      agregarColumnaEtapa,
      agregarColumnaComponente,
      enviarLineaBase,
      asignarInvitarAmigo,
      cambiarDepartamentoInvitarAmigo,
      onChangeFiltro,
      handleClickOpenModal,
      asignarRecurso,
      onChangeSwitchAsignar,
      onClickAgregarColumna,
      openModalConfirmaciónBorrar,
      onSelectRow,
      bajarNodo,
      subirNodo,
      abrirObservaciones,
      onClickGenerarLineaBase,
      handleChangeTabDetails,
      onChangeTextFieldEscribirMensaje,
      abrirCerrarConfirmacion,
      abrirModalAutorizacion,
      autorizarLineaBase,
      setObservacion,
      guadarObservaciones,
      abrirModalObservaciones,
      cerrarModalObservaciones,
      listadoProyectos:{
        observaciones,
        openModalObservaciones,
        idProyecto,
      },
      obtenerTicket,
    } = this.props;
    console.log(arregloComponentes," LINEA BASE");
    

    const { anchorEl,anchorElAdd,anchorElEt,anchorElAddEt } = this.state;
    const openMenu = Boolean(anchorEl);
    const openMenuAdd = Boolean(anchorElAdd);
    const openMenuEt = Boolean(anchorElEt);
    const openMenuAddEt = Boolean(anchorElAddEt);
    const tableWidth = tamanioTabla;

    const toggleDrawer = (side, open,idTicket) => event => {
      
      if ( event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
        return;
      }
      // eslint-disable-next-line react/no-access-state-in-setstate
      this.setState({ ...this.state, [side]: open });      
      obtenerTicket(idTicket)
    };
    const cero = 0.00;
    cero.toFixed(2);
    
    const sideList = side => (
      
      <div> 
        {/* {this.state.IdTicket !== null && ( */}
        {/* obtenerTicket(this.state.IdTicket),
          // this.setState({ IdTicket:null }), */}
        <Bandeja  
          bandejaTickets = {bandejaTickets}
          handleChangeTabDetails = {handleChangeTabDetails}
          onChangeTextFieldEscribirMensaje = {onChangeTextFieldEscribirMensaje}
          numUsuarioLogeado = {numUsuarioLogeado}
          nomUsuarioLogeado = {nomUsuarioLogeado}
          // IdTicket = {this.state.IdTicket}
          IdTicketLineaBase = {IdTicketLineaBase}
        />
        
        <Fab className={classes.fab}  onClick={toggleDrawer("right", false)}>
          <ArrowRight/>
        </Fab>
          
      </div>
    );

    const LBCorrecta = IdLineaBase === LineaBaseActiva;
    
    return (
      <Grid
        container
      >
        <Grid
          item
          xs={12}
          md={12}
          xl={12}
        >
          <Container
            flexDirection="column"
          >
            <AppBar style={{backgroundColor: grey[200]}} position="static"> 
              <Toolbar variant="dense" style={{paddingLeft: 8}}> 
                <IconButton
                  // onClick={abrirCerrarConfirmacion('openModalSalir')}
                  onClick={ (idAutorizacion === 3 && IdLineaBase === LineaBaseActiva) || (IdLineaBase === LineaBaseActiva && Editando && idAutorizacion === 2 && !Invitado) || ((idAutorizacion === '' || idAutorizacion === null) && !Invitado) ? abrirCerrarConfirmacion('openModalSalir'):salirAdministradorActividades(1) }
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
                  Administrador de actividades
                </Typography>
                {/* <InputBase
                  id={uniqueId('nomProyecto_')}
                  className={classes.textField}
                  // startAdornment={item.Padre ? <Icon style={{fontSize:'17px'}}>arrow_right</Icon> : null}
                  value={arregloComponentes.length > 0 ? arregloComponentes[0][0].Configuracion[0].config.valor : ''}
                  style={{
                    width:'auto',
                    fontSize: '3vh',
                    color:'black',
                  }}
                  // onChange={onChangeInputBase(index,0)}
                  inputProps={{ 'aria-label': 'bare' }}
                /> */}
              </Toolbar> 
            </AppBar>
            <Container
              flexDirection="column"
              justify="center"
              style={{
                padding:'10px',
                alignItems:'center',
              }}
            >
              <Paper
                elevation={4}
                style={{
                  padding: '0px 0px 15px 20px',
                  width:'100%',
                  height: '79vh',
                }}
              >
                <Container
                  flexDirection="row"
                  justify="flex-end"
                  style={{
                    alignItems:'center',
                    display:'flex',
                    flexDirection: 'row',
                  }}
                >
                  <Container justify="flex-start" style={{ width: '70%'}}>
                    <div
                      className='justificacion center'
                      style={{
                        fontFamily: 'Roboto',
                        textTransform: 'inherit',
                        margin: 0,
                        fontSize: '1.256rem',
                        color: 'black',
                        textShadow: 'rgb(239, 232, 232) 1px 1px 2px',
                      }}>
                      <img src={iconoLineaBase} alt="" style={{width:'7%',marginRight: '5px', borderRadius:'12px'}} />
                      {arregloComponentes.length > 0 ? arregloComponentes[0][0].Configuracion[0].config.valor : ''}
                    </div>
                  </Container>
                  {arrLineasBase.length > 1 ? 
                    <FormControl style={{ marginBottom: '13px',width: '350px' }}>
                      <InputLabel htmlFor="select-multiple" style={{fontSize: '14px',fontFamily: 'Roboto'}}>Lineas base</InputLabel>
                      <Select
                        value={IdLineaBase}
                        style={{fontSize: '14px',fontFamily: 'Roboto'}}
                        onChange={cambiarLineaBase}
                        input={<Input id="select-multiple" />}
                        MenuProps={ 
                          {
                            PaperProps: {
                              style: {
                                fontSize: '14px',
                                fontFamily: 'Roboto',
                              },
                            },
                          }}
                      >
                        {arrLineasBase.map(name => (
                          <MenuItem key={name.IdLineaBase} value={name.IdLineaBase} style={{fontSize: '14px',fontFamily: 'Roboto'}}>
                            {`Linea Base ${name.IdLineaBase} ${new Date(Date.parse(name.FechaCreación)).toLocaleString('es-ES')}`}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl> : null}
                  <Button 
                    disabled={(!Editando && IdLineaBase !== LineaBaseActiva ) ||  idAutorizacion > 0 && idAutorizacion !== 3 && !Editando || estatusProyectoSeleccionado === 4 || estatusProyectoSeleccionado === 5 || Invitado} 
                    color="primary" style={{width:'150px'}} className={classes.button} onClick={agregarRegistro}
                  >
                    + Agregar
                  </Button>
                  <IconButton
                    disabled={(!Editando && IdLineaBase !== LineaBaseActiva ) ||  (idAutorizacion > 0 && idAutorizacion !==  3 && !Editando) || Invitado}
                    onClick={subirNodo}
                  >
                    <Icon style={{color: '#263238'}}>
                    format_indent_decrease
                    </Icon>
                  </IconButton>
                  <IconButton
                    onClick={bajarNodo}
                    disabled={(!Editando && IdLineaBase !== LineaBaseActiva ) ||  (idAutorizacion > 0 && idAutorizacion !== 3 && !Editando || estatusProyectoSeleccionado === 4 || estatusProyectoSeleccionado === 5) || Invitado}
                  >
                    <Icon style={{color: '#263238'}}>
                    format_indent_increase
                    </Icon>
                  </IconButton>
                  <IconButton
                    disabled={(!Editando && IdLineaBase !== LineaBaseActiva ) ||  (idAutorizacion > 0 && idAutorizacion !== 3 && !Editando || estatusProyectoSeleccionado === 4 || estatusProyectoSeleccionado === 5) || Invitado}
                    onClick={abrirObservaciones(idProyecto)}
                  >
                    <Icon style={{color: '#263238'}}>
                      textsms
                    </Icon>
                  </IconButton>
                  <Fragment>
                    <IconButton
                      // aria-label="More"
                      // disabled={idAutorizacion > 0 && idAutorizacion !== 3}
                      aria-owns={openMenu ? 'long-menu' : undefined}
                      aria-haspopup="true"
                      onClick={this.handleClick}
                    >
                      <Icon style={{color: '#263238'}}>
                        more_vert
                      </Icon>
                    </IconButton>
                    <Menu
                      id="long-menu"
                      anchorEl={anchorEl}
                      open={openMenu}
                      onClose={this.handleClose}
                      PaperProps={{
                        style: {
                          maxHeight: 48 * 4.5,
                          width: 200,
                        },
                      }}
                    >
                      <MenuItem
                        key='Invitar Amigo'
                        disabled={(!Editando && IdLineaBase !== LineaBaseActiva ) ||  (idAutorizacion > 0 && idAutorizacion !== 3 && !Editando || estatusProyectoSeleccionado === 4 || estatusProyectoSeleccionado === 5) || Invitado}
                        // disabled={(idAutorizacion > 0 && IdAutorizador !== 3 && IdLineaBase !== LineaBaseActiva && !Editando) || idAutorizacion === 1 || idAutorizacion === 2 || Invitado || estatusProyectoSeleccionado === 4 || estatusProyectoSeleccionado === 5}
                        onClick={abrirModalInvitarAmigo}
                      >
                        <Icon style={{ marginRight:'5px'}}>person_add</Icon>
                        Invitar Amigo
                      </MenuItem>
                      <MenuItem
                        key='Generar Linea Base'
                        disabled={(!Editando && IdLineaBase !== LineaBaseActiva ) ||  (idAutorizacion > 0 && idAutorizacion !== 3 && !Editando || estatusProyectoSeleccionado === 4 || estatusProyectoSeleccionado === 5) || Invitado}
                        onClick={abrirCerrarConfirmacion('openModalGenerarLB')}
                      >
                        <Icon style={{ marginRight:'5px'}}>linear_scale</Icon>
                        Generar Linea Base
                      </MenuItem>
                      <MenuItem
                        key='Editar Linea Base'
                        disabled={idAutorizacion === '' || idAutorizacion === null || idAutorizacion === 1 || (idAutorizacion === 3 &&  IdLineaBase === LineaBaseActiva && !Editando)  || (idAutorizacion === 2 && Editando && IdLineaBase === LineaBaseActiva) || idAutorizacion === 1 || Invitado || estatusProyectoSeleccionado === 4 || estatusProyectoSeleccionado === 5}
                        // disabled={!(idAutorizacion > 0 && idAutorizacion === 2 ) && !Editando}
                        onClick={editarLineaBase}
                      >
                        <Icon style={{ marginRight:'5px'}}>edit</Icon>
                        Editar Linea Base
                      </MenuItem>
                      <MenuItem
                        disabled={(!Editando && IdLineaBase !== LineaBaseActiva ) ||  (idAutorizacion > 0 && idAutorizacion !== 3 && !Editando || estatusProyectoSeleccionado === 4 || estatusProyectoSeleccionado === 5) || Invitado}
                        // disabled={idAutorizacion > 0 && IdAutorizador !== 3 && IdLineaBase !== LineaBaseActiva && !Editando || idAutorizacion === 1 || idAutorizacion === 2 || estatusProyectoSeleccionado === 4 || estatusProyectoSeleccionado === 5 || Invitado}
                        key='Nueva Columna'
                        onClick={onClickAgregarColumna}
                      >
                        <Icon style={{ marginRight:'5px'}}>view_week</Icon>
                        Nueva Columna
                      </MenuItem>
                      {/* {options.map(option => (
                        <MenuItem 
                          key={option.Nombre}
                          onClick={this.handleClose}>
                          <Icon style={{ marginRight:'5px'}}>{option.Icono}</Icon>
                          {option.Nombre}
                        </MenuItem>
                      ))} */}
                    </Menu>
                  </Fragment>
                  {arregloComponentes.length > 0 ? 
                    arregloComponentes[0][0].Configuracion.length > 3 ?
                      <Fragment>
                        <Tooltip title="Tickets">
                          <IconButton
                            aria-owns={openMenuAdd ? 'long-menu-add' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleClickAdd}
                            disabled={(idAutorizacion > 0 && idAutorizacion !== 3 && !Editando || estatusProyectoSeleccionado === 4 || estatusProyectoSeleccionado === 5) || Invitado}
                          >
                            <Icon style={{color: '#263238'}}>
                            add_circle_outline
                            </Icon>
                          </IconButton>
                        </Tooltip>
                        <Menu
                          id="long-menu-add"
                          anchorEl={anchorElAdd}
                          open={openMenuAdd}a
                          onClose={this.handleCloseAdd}
                          PaperProps={{
                            style: {
                              maxHeight: 48 * 4.5,
                              width: 200,
                            },
                          }}
                        >
                          {arregloComponentes[0][0].Configuracion.map((componente,idxComp) => (
                            idxComp > 2 ?
                              <MenuItem
                                disabled={(componente.config.nomCampo === arrColumnaComponente.find(comp => comp === componente.config.nomCampo)) || Invitado}
                                key={uniqueId('config.nomCampo_')}
                                onClick={agregarColumnaComponente(componente.config.nomCampo,idxComp)}
                              >
                                <Icon style={{ marginRight:'5px'}}>add_box</Icon>
                                {componente.config.nomCampo}
                              </MenuItem> : null 
                          ))}
                       
                        </Menu>
                      </Fragment> : null : null
                  }
                  {arrEtapas.length > 0 ? 
                    <Fragment>
                      <Tooltip title="Etapas">
                        <IconButton
                          aria-owns={openMenuAddEt ? 'long-menu-addEt' : undefined}
                          aria-haspopup="true"
                          onClick={this.handleClickAddEt}
                          // disabled={(idAutorizacion > 0 && idAutorizacion !== 3 && !Editando || estatusProyectoSeleccionado === 4 || estatusProyectoSeleccionado === 5) || Invitado}
                        >
                          <Icon style={{color: '#263238'}}>
                          linear_scale
                            {/* <img src={agregadoEtapas} alt="" style={{width:'7%',marginRight: '5px', borderRadius:'12px', color :'white'}} /> */}
                          </Icon>
                        </IconButton>
                      </Tooltip>
                      <Menu
                        id="long-menu-addEt"
                        anchorEl={anchorElAddEt}
                        open={openMenuAddEt}
                        onClose={this.handleCloseAddEt}
                        PaperProps={{
                          style: {
                            maxHeight: 48 * 4.5,
                            width: 200,
                          },
                        }}
                      >
                        {arrEtapas[0].Configuracion.map((etapa,idxComp) => (
                          <MenuItem
                            disabled={(etapa.config.nomCampo === arrColumnaComponente.find(comp => comp === etapa.config.nomCampo)) || Invitado}
                            key={uniqueId('et_config.nomCampo_')}
                            onClick={agregarColumnaEtapa(etapa.config.nomCampo,idxComp)}
                          >
                            <Icon style={{ marginRight:'5px'}}>add_box</Icon>
                            {etapa.config.nomCampo}
                          </MenuItem>
                        ))}
                       
                      </Menu>
                    </Fragment> : null
                  }
                </Container>
                <DragDropContext 
                  onDragEnd={onDragEnd}
                  
                >
                  <Grid
                    item
                    md={12}
                    lg={12}
                    sm={12}
                    style={{
                      overflowX:'auto',
                      width:'100%',
                    }}
                    disabled
                  >
                    <Table
                      // scrollable='58vh'
                      style={{
                        overflow: 'auto',
                        width: '100vh',
                      }}
                    >
                      <Head
                        style={{
                          width:`${tableWidth}vw`,
                        }}
                      >
                        <HeaderRow>
                          <HeaderCell minimum className={classes.cellEmpty} style={{ borderLeft:'1px solid gainsboro'}}/>
                          {/* <HeaderCell minimum className={classes.cell}/> */}
                          <HeaderCell minimum className={classes.cell} />
                          <HeaderCell 
                            // width="18%" 
                            className={classes.cell} 
                            style={{ width:'24vw'}}
                          >
                            Actividad
                          </HeaderCell>
                          
                          <HeaderCell 
                            width="17vw" 
                            className={classes.cell}>Fecha Inicio</HeaderCell>
                          <HeaderCell 
                            width="17vw" 
                            className={classes.cell}>Fecha Fin</HeaderCell>
                          <HeaderCell 
                            width="13vw"
                            className={classes.cell}>Recurso</HeaderCell>
                          <HeaderCell 
                            width="7vw" 
                            className={classes.cell}>% de Avance</HeaderCell>
                          <HeaderCell 
                            width="9vw" 
                            className={classes.cell}>Dependencia</HeaderCell>
                          
                          {arrCabeceraComponente.map(cabComp => (
                            <HeaderCell
                              className={classes.cell}
                              width="10vw"
                            >
                              {cabComp.Nombre}
                            </HeaderCell>
                          ))}
                          {arrCabeceraEtapas.length > 0 ?
                            arrCabeceraEtapas.map(cabComp => (
                              <HeaderCell
                                className={classes.cell}
                                width="10vw"
                              >
                                {cabComp.Nombre}
                              </HeaderCell>
                            ))
                            : null}
                          {arrCabecerasExtras.map((cab,idxCabeceras) => (
                            <HeaderCell
                              className={classes.cell}
                              width="10vw"
                            >
                              <Button
                                disabled={(idAutorizacion > 0 && idAutorizacion !== 3 && !Editando || estatusProyectoSeleccionado === 4 || estatusProyectoSeleccionado === 5) || Invitado}
                                onClick={abrirModaleditarNomColumna(cab.Nombre,cab.Tipo,idxCabeceras)}
                                style={{
                                  textTransform: 'capitalize',
                                }}
                              >
                                {cab.Nombre}
                              </Button>
                            </HeaderCell>
                          ))}
                          <HeaderCell minimum className={classes.cell} style={{ width:'2.1vw',borderRight:'1px solid gainsboro'}}/>
                        </HeaderRow>
                      </Head>
                      <Droppable 
                        // ref={(ins) => { this.chatRef = ins; }}
                        droppableId="droppable"
                      >
                        {(provided, droppableSnapshot) => (
                          <Body 
                            // ref={(ins) => { this.chatRef = ins; }}
                            ref={provided.innerRef} 
                            isDraggingOver={droppableSnapshot.isDraggingOver}
                            style={{
                              height: '55vh',
                              overflowY: 'auto',
                              width:`${tableWidth}vw`,                                
                            }}
                          >
                            {  isArray(arregloComponentes) && arregloComponentes.length > 0 ?  arregloComponentes[0].map((item, index) => (
                              // item.map((componente,idxComp) => (
                              <Draggable 
                                key={`${item.Configuracion[0].config.nomCampo}-${index}`} 
                                draggableId={`${item.Configuracion[0].config.nomCampo}-${index}`} 
                                index={index} 
                                isDragDisabled ={ (idAutorizacion > 0 && idAutorizacion !== 3 && !Editando || estatusProyectoSeleccionado === 4 || estatusProyectoSeleccionado === 5) || (Editando && !item.Editable) || Invitado || (!Editando && IdLineaBase !== LineaBaseActiva )}
                              >
                                {(provided, snapshot) => (
                                    
                                  <DraggableRow
                                    ref={provided.innerRef}
                                    isDragging={snapshot.isDragging}
                                    isDraggingOver={droppableSnapshot.isDraggingOver}
                                    hovered={snapshot.isDragging}
                                    focused={
                                      droppableSnapshot.isDraggingOver ? snapshot.isDragging : undefined
                                    }
                                    {...provided.draggableProps.style}
                                    {...provided.draggableProps}
                                    onClick={onSelectRow(index)}
                                    
                                  >
                                    <DraggableCell
                                      minimum
                                      className={classes.row}
                                      style={{
                                        borderLeft:'1px solid gainsboro',
                                        // width:'3%',
                                        alignItems:'center',
                                        justifyContent:'center',
                                      }}
                                    >
                                      {index+1}
                                    </DraggableCell>
                                    <DraggableCell 
                                      minimum 
                                      className={classes.rowEmpty} 
                                      style={{ 
                                        // width:'2.5%',
                                        paddingLeft:'0px !important',
                                      }}
                                    >
                                      <DraggableContainer
                                        id={`${item.Configuracion[0].config.nomCampo}-${index}`}
                                        {...provided.dragHandleProps}
                                        disabled={index === 0 || Invitado }
                                      >
                                        <Icon style={{ color:'#4a6572'}}>
                                            drag_indicator 
                                        </Icon>
                                      </DraggableContainer>
                                    </DraggableCell>
                                    {/* {item.map((celda,idxCelda) => (
                                        <DraggableCell isDragging={snapshot.isDragging} width="18%" className={classes.row}>
                                          {`Celda-${idxCelda}`}
                                        </DraggableCell>
                                      ))} */}
                                      
                                    <DraggableCell 
                                      isDragging={snapshot.isDragging}
                                      width='25vw'
                                      className={`${classes.row} sinDeshabilitar`}
                                      
                                    >
                                      <InputBase
                                        disabled={(idAutorizacion > 0 && idAutorizacion !== 3  && !Editando) || (Editando && !item.Editable)  || Invitado || index === 0 || (!Editando && IdLineaBase !== LineaBaseActiva )}
                                        id={`input_base_${index}`}
                                        className={classes.textField}
                                        // startAdornment={item.Padre ? <Icon style={{fontSize:'17px'}}>arrow_right</Icon> : null}
                                        value={item.Configuracion[0].config.valor}
                                        onChange={onChangeInputBase(index,0)}
                                        row={index}
                                        cell={0}
                                        style={{
                                          fontSize: item.Padre ? '12px' : '11px',
                                          fontWeight: item.Padre ? 'bold': null,
                                          paddingLeft: item.NumOrdenamiento === 1 ? 0 : item.NumOrdenamiento * 12,
                                        }}
                                        inputProps={{ 
                                          'aria-label': 'bare',
                                          tabIndex: index,
                                        }}
                                      />
                                      {(idAutorizacion ===2 && !item.Padre &&
                                      <Link component="button" onClick={toggleDrawer("right", true,item.IdTicket)} variant="inherit">Detalles</Link>
                                      )} 
                                      <Drawer
                                        anchor="right"
                                        open={this.state.right}
                                        onClose={toggleDrawer("right", false)}
                                        onOpen={toggleDrawer("right", true)}
                                        docked = {false}
                                        className={classes.list}
                                        variant="persistent"
                                        // containerStyle={{height: '100px', width: 3000}}
                                        containerStyle={{height: 'calc(0% - 64px)', top: 64}}
                                      >
                                        <div className="ticketsSide">
                                          {sideList("right")}
                                          
                                        </div>
                                      </Drawer>
                                    </DraggableCell>

                                    <DraggableCell 
                                      isDragging={snapshot.isDragging} 
                                      width='17vw'
                                      className={classes.row}>
                                      <TipoComponente
                                        tipo={7}
                                        padre={(!Editando && IdLineaBase !== LineaBaseActiva ) || (idAutorizacion > 0 && idAutorizacion !== 3 && Editando && !item.Editable) || item.Padre}
                                        valorFecha={item.Configuracion[1].config.valor}
                                        onChangeInputBase={onChangeFechas}
                                        row={index}
                                        cell={1}
                                       
                                        fechaValida = {fechaValida}
                                        fecInicio={fecInicio}
                                        fecFin={fecFin}
                                        fecInput={fecInput}
                                      />
                                    </DraggableCell>
                                    <DraggableCell 
                                      isDragging={snapshot.isDragging} 
                                      // width="27%" 
                                      width='17vw'
                                      className={classes.row}
                                    >
                                      <TipoComponente
                                        tipo={7}
                                        padre={(!Editando && IdLineaBase !== LineaBaseActiva ) || (idAutorizacion > 0 && idAutorizacion !== 3 && Editando && !item.Editable) || (idAutorizacion === 2 && !Editando && !item.Editable) || item.Padre}
                                        valorFecha={item.Configuracion[2].config.valor}
                                        onChangeInputBase={onChangeFechas}
                                        row={index}
                                        cell={2}
                                        fechaValida = {fechaValida}
                                        fecInicio={fecInicio}
                                        fecFin={fecFin}
                                        fecInput={fecInput}
                                      />
                                    </DraggableCell>
                                    <DraggableCell 
                                      isDragging={snapshot.isDragging} 
                                      width="13vw" 
                                      className={classes.row}
                                    >
                                      {/* <TipoComponente

                                          tipo={4}
                                          valor={item.Recurso}
                                          row={index}
                                          cell={3}
                                          style={{
                                            textAlign:'center',
                                          }}
                                        /> */}
                                      <Button
                                        disabled = {(index === 0 || (idAutorizacion > 0 && idAutorizacion !== 3 && !Editando || estatusProyectoSeleccionado === 4 || estatusProyectoSeleccionado === 5) || (Editando && !item.Editable) || item.Padre) || Invitado || (!Editando && IdLineaBase !== LineaBaseActiva )}
                                        className='botonRecuro'
                                        onClick={handleClickOpenModal(index,3)}
                                      >
                                        {item.NomRecurso === null || item.NomRecurso === '' ? '' : lowerCase(item.NomRecurso)}
                                      </Button>
                                    </DraggableCell>
                                    <DraggableCell 
                                      isDragging={snapshot.isDragging} 
                                      width="7vw" 
                                      className={classes.row}
                                    >
                                      <TipoComponente
                                        tipo={8}
                                        valor={item.Avance == null ? cero : item.Avance}
                                        row={index}
                                        cell={3}
                                        deshabilitar = {index === 0}
                                        style={{
                                          textAlign:'center',
                                        }}
                                      />
                                    </DraggableCell>
                                    <DraggableCell 
                                      isDragging={snapshot.isDragging}
                                      width='10vw'
                                      className={classes.row} 
                                    >
                                      <TipoComponente
                                        tipo={9}
                                        valor={item.Dependencia}
                                        row={index}
                                        cell={3}
                                        deshabilitar={index === 0 || (idAutorizacion > 0 && idAutorizacion !== 3 && !Editando || estatusProyectoSeleccionado === 4 || estatusProyectoSeleccionado === 5) || (Editando && !item.Editable) || item.Padre || (!Editando && IdLineaBase !== LineaBaseActiva )}
                                        style={{
                                          textAlign:'center',
                                        }}
                                      />
                                    </DraggableCell>
                                    {arrCabeceraComponente.map(compComp => (
                                      <DraggableCell 
                                        isDragging={snapshot.isDragging}
                                        width='10vw'
                                        className={classes.row} 
                                      >
                                        <InputBase
                                          disabled={index === 0 ||  item.Padre || (idAutorizacion > 0 && idAutorizacion !== 3 && !Editando || estatusProyectoSeleccionado === 4 || estatusProyectoSeleccionado === 5) || (Editando && !item.Editable) || Invitado || (!Editando && IdLineaBase !== LineaBaseActiva )}
                                          id={uniqueId('input_base_comp_')}
                                          style={{ fontSize:'11px',fontFamily:'Roboto'}}
                                          className={classes.textField}
                                          value={item.Configuracion[compComp.Posicion].config.valor}
                                          onChange={onChangeInputBase(index,compComp.Posicion)}
                                          inputProps={{ 'aria-label': 'bare' }}
                                        />
                                      </DraggableCell>
                                    ))}
                                    {arrCabeceraEtapas.length > 0 ?
                                      arrCabeceraEtapas.map((compComp) => (
                                        <DraggableCell 
                                          isDragging={snapshot.isDragging}
                                          width='10vw'
                                          className={classes.row} 
                                        >
                                          <InputBase
                                            disabled
                                            id={uniqueId('input_base_et_')}
                                            style={{ fontSize:'11px',fontFamily:'Roboto'}}
                                            className={classes.textField}
                                            value={this.obtenerValorEtapa(arrEtapas,item.IdTicket,compComp.Posicion)}
                                            onChange={onChangeInputBase(index,compComp.Posicion)}
                                            inputProps={{ 'aria-label': 'bare' }}
                                          />
                                        </DraggableCell>
                                      )):null}

                                    {arrCabecerasExtras.map((componente,idxCelda) =>( 
                                      <DraggableCell 
                                        isDragging={snapshot.isDragging}
                                        width='10vw'
                                        className={classes.row} 
                                      >
                                        <InputBase
                                          disabled={index === 0 ||  item.Padre || (Editando && !item.Editable) || (idAutorizacion > 0 && idAutorizacion !== 3 && !Editando || estatusProyectoSeleccionado === 4 || estatusProyectoSeleccionado === 5) || Invitado || (!Editando && IdLineaBase !== LineaBaseActiva )}
                                          id={uniqueId('input_base_')}
                                          className={classes.textField}
                                          // startAdornment={<InputAdornment position="start">{componente.Tipo === 'Porcentaje' ? <span style={{fontSize: '1.4rem'}}>%</span> : <Icon>{componente.Tipo}</Icon>}</InputAdornment>}
                                          // value=''
                                          value={arregloComponentesExtras[0][index][idxCelda].Valor}
                                          onChange={onChangeInputBaseExtra(index,idxCelda)}
                                          inputProps={{ 'aria-label': 'bare' }}
                                          style={{ fontSize:'11px', fontFamily:'Roboto'}}
                                        />
                                      </DraggableCell>
                                    ))}
                                    <DraggableCell isDragging={snapshot.isDragging} minimum className={classes.row}>
                                      <IconButton
                                        disabled={index === 0 || Invitado || (Editando && !item.Editable) || item.Avance > 0 || (idAutorizacion > 0 && idAutorizacion !== 3 && !Editando || estatusProyectoSeleccionado === 4 || estatusProyectoSeleccionado === 5)  }
                                        onClick={openModalConfirmaciónBorrar(index)}
                                        style={{
                                          padding:'6px',
                                        }}
                                      >
                                        <Icon>
                                            delete
                                        </Icon>
                                      </IconButton>
                                    </DraggableCell>
                                      
                                  </DraggableRow>
                                )}
                              </Draggable>
                            ))
                              :null}
                            {provided.placeholder}
                          </Body>
                        )}
                      </Droppable>
                    </Table>
                  </Grid>
                </DragDropContext>
                <Container 
                  flexDirection="row" 
                  justify="flex-end" 
                  style={{ 
                    marginTop:'3vh',
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    width:'30%',
                  }}>
                  {idAutorizacion !== 1  && (
                    <Button  
                      // onClick={!Invitado || (!Editando && (idAutorizacion === '' || idAutorizacion === null || (idAutorizacion === 3 && Editando)) ? salirAdministradorActividades(1) : abrirCerrarConfirmacion('openModalSalir')} 
                      onClick={ (idAutorizacion === 3 && IdLineaBase === LineaBaseActiva) || (IdLineaBase === LineaBaseActiva && Editando && idAutorizacion === 2 && !Invitado) || ((idAutorizacion === '' || idAutorizacion === null) && !Invitado) ? abrirCerrarConfirmacion('openModalSalir'):salirAdministradorActividades(1) }
                      variant="contained" 
                      color="secondary" 
                      className={classes.button} 
                      style={{color:'white',backgroundColor:'#FF0023'}}
                    >
                    Cerrar
                    </Button>
                  )}
                  { Editando && LBCorrecta?
                    (<Button 
                      // onClick={cancelarCopia} 
                      onClick={abrirCerrarConfirmacion('openModalCancelarCopia')}
                      variant="contained" 
                      color="secondary" 
                      className={classes.button} 
                      style={{color:'white',backgroundColor:'#FF0023'}}
                    >
                    Cancelar Copia
                    </Button>) : <div></div>
                  }
                  {!Invitado && idAutorizacion !== 1  && LBCorrecta && (
                    <Button hidden={idAutorizacion > 0 && idAutorizacion !== 3 && !Editando || estatusProyectoSeleccionado === 4 || estatusProyectoSeleccionado === 5} onClick={guardarLineaBase} variant="contained" color="secondary" className={classes.button} style={{color:'white',backgroundColor:'#28950F'}}>
                    Guardar
                    </Button>
                  )}
                  {idAutorizacion === 1 && tablaPendientes  &&  LineaBaseActiva === IdLineaBase  && (
                    <Button onClick={abrirModalAutorizacion(2)} variant="contained" color="secondary" className={classes.button} style={{color:'white',backgroundColor:'#FF0023'}}>
                    Rechazar
                    </Button>
                  )}
                  {idAutorizacion === 1 && tablaPendientes  &&  LineaBaseActiva === IdLineaBase &&(
                    <Button onClick={abrirModalAutorizacion(1)} variant="contained" color="secondary" className={classes.button} style={{color:'white',backgroundColor:'#28950F'}}>
                    Autorizar
                    </Button>
                  )}
                </Container>
              </Paper>
              {/* Modal Asignar Recurso */}
              <Fragment>
                <Dialog
                  open={openModal}
                  TransitionComponent={Transition}
                  aria-labelledby="alert-dialog-slide-title"
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle 
                    id="alert-dialog-slide-title"
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
                        face
                      </Icon>
                      <Typography className={classes.typography2} variant="h6" gutterBottom>
                        Asignar Recurso
                      </Typography>
                    </Container>
                  </DialogTitle>
                  <DialogContent
                    className={classes.dialogContent}
                  >
                    <Container
                      justify='center'
                      className={classes.container}
                    >
                      
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="select_plaza">Plaza</InputLabel>
                        <Select
                          value={plazaSeleccionadaRecurso}
                          disabled={autoAsignarmelo || Invitado}
                          inputProps={{
                            name: 'plazaSeleccionadaRecurso',
                            id: uniqueId('select_plaza_'),
                          }}
                          onChange={filtrarRecurso}
                          input={<Input id="select_plaza" />}
                        >
                          <MenuItem key={uniqueId('plazaSN_')} value={0}>
                            <em>Sin Seleccionar</em>
                          </MenuItem>
                          {arrPlazas.map((plaza) => (
                            <MenuItem
                              key={uniqueId(`${plaza}_`)}
                              value={plaza.Id}
                            >
                              {startCase(plaza.Nombre)}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="select_departamento">Departamento</InputLabel>
                        <Select
                          value={departamentoSeleccionadoRecurso}
                          disabled={autoAsignarmelo || disabledDepartamento || Invitado}
                          inputProps={{
                            name: 'departamentoSeleccionadoRecurso',
                            id: uniqueId('select_departamento_'),
                          }}
                          onChange={filtrarRecurso}
                          input={<Input id="select_departamento" />}
                        >
                          <MenuItem key={uniqueId('depSN_')} value={0}>
                            <em>Sin Seleccionar</em>
                          </MenuItem>
                          {arrDepartamentos.map((departamento) => (
                            <MenuItem
                              key={uniqueId(`${departamento}_`)}
                              value={departamento.Id}
                            >
                              {startCase(departamento.Nombre)}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="select_puesto">Puesto</InputLabel>
                        <Select
                          value={puestoSeleccionadoRecurso}
                          disabled={autoAsignarmelo || departamentoSeleccionadoRecurso === 0 || Invitado}
                          inputProps={{
                            name: 'puestoSeleccionadoRecurso',
                            id: uniqueId('select_puesto_'),
                          }}
                          onChange={filtrarRecurso}
                          input={<Input id="select_puesto" />}
                        >
                          <MenuItem key={uniqueId('puestoSN_')} value={0}>
                            <em>Sin Seleccionar</em>
                          </MenuItem>
                          {arrPuestos.map((puesto) => (
                            <MenuItem
                              key={uniqueId(`${puesto}_`)}
                              value={puesto.Id}
                            >
                              {startCase(puesto.Nombre)}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="select_recurso">Recurso</InputLabel>
                        <Select
                          value={recursoSeleccionadoRecurso}
                          disabled={autoAsignarmelo || Invitado}
                          inputProps={{
                            name: 'recursoSeleccionadoRecurso',
                            id: uniqueId('select_recurso_'),
                          }}
                          onChange={cambiarValorRecurso}
                          input={<Input id="select_recurso" />}
                        >
                          <MenuItem key={uniqueId('recSN_')} value={0}>
                            <em>Sin Seleccionar</em>
                          </MenuItem>
                          {arrRecursos.map((recurso) => (
                            <MenuItem
                              value={recurso.Id}
                            >
                              {startCase(recurso.Nombre)}
                            </MenuItem>
                          ))}
                          
                        </Select>
                      </FormControl>
                    </Container>
                  </DialogContent>
                  <DialogActions>
                    <FormControlLabel
                      control={
                        <CustomSwitch
                          checked={autoAsignarmelo}
                          color='primary'
                          onChange={onChangeSwitchAsignar}
                          value="checkedA"
                        />
                      }
                      label="Asignar para mi"
                    />
                    <Button 
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      onClick={handleClickOpenModal(0,0)}
                      style={{
                        color:'white',
                        backgroundColor:'#FF0023',
                      }}
                    >
                    Cancelar
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      disabled={(recursoSeleccionadoRecurso === 0 && !autoAsignarmelo || Invitado)}
                      className='botonAsignar'
                      onClick={asignarRecurso}
                      style={{
                        // color: 'white !important',
                        backgroundColor:'#28950F',
                      }}
                    >
                    Asignar
                    </Button>
                  </DialogActions>
                </Dialog>
              </Fragment>
              {/* Modal Nueva/Editar Columna */}
              <Fragment>
                <Dialog
                  open={( openModalEditarColumna || openModalNColumna)}
                  TransitionComponent={Transition}
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
                        swap_horizontal_circle
                      </Icon>
                      <Typography className={classes.typography2} variant="h6" gutterBottom>
                        {openModalNColumna ? 'Nueva Columna' : openModalEditarColumna ? 'Editar Columna' : null}
                      </Typography>
                    </Container>
                  </DialogTitle>
                  <DialogContent
                    style={{ padding:0}}
                  >
                    <Container
                      justify='center'
                      className={classes.container}
                    >
                      <FormControl style={{margin: '1vh 2vw 1vh 2vw',minWidth: '14vw'}}>
                        <TextField
                          id="standard-name"
                          label='Nombre de la columna'
                          autoFocus={openModalNColumna}
                          // className={classes.textField}
                          style={{
                            margin:0,
                          }}
                          inputProps={{
                            name: 'nombreNColumna',
                            id: uniqueId('nombreNColumna_'),
                            tabIndex:'1',
                          }}
                          value={nombreNColumna}
                          onChange={cambiarValor}
                          margin="normal"
                        />
                      </FormControl>
                      {/* <FormControl style={{margin: '1vh 2vw 1vh 1vw',minWidth: '14vw'}}>
                        <InputLabel htmlFor="select_tipo_columna">Seleccione tipo de dato</InputLabel>
                        <Select
                          value={tipoDatoNColumna}
                          onChange={cambiarValor}
                          inputProps={{
                            name: 'tipoDatoNColumna',
                            id: uniqueId('tipoDatoNColumna_'),
                            tabIndex:'2',
                          }}
                          style={{height: '32px'}}
                        >
                          <MenuItem key={uniqueId('text_format')} value='text_format'><Container style={{alignItems: 'center'}}><Icon style={{marginRight: '4px'}}>text_format</Icon><span>Texto</span></Container></MenuItem>
                          <MenuItem key={uniqueId('view_module')} value='view_module'><Container style={{alignItems: 'center'}}><Icon style={{marginRight: '4px'}}>view_module</Icon><span>Cantidad</span> </Container></MenuItem>
                          <MenuItem key={uniqueId('date_range')} value='date_range'><Container style={{alignItems: 'center'}}><Icon style={{marginRight: '4px'}}>date_range</Icon><span>Fecha</span></Container></MenuItem>
                          <MenuItem key={uniqueId('attach_money')}value='attach_money'><Container style={{alignItems: 'center'}}><Icon style={{marginRight: '4px'}}>attach_money</Icon><span>Costo</span></Container></MenuItem>
                          <MenuItem  key={uniqueId('Porcentaje')} value='Porcentaje'>
                            <span
                              style={{
                                width: '1em',
                                height: '1em',
                                overflow: 'hidden',
                                fontSize: '22px',
                                userSelect: 'none',
                                flexShrink: 0,
                                marginLeft: '6px',
                              }}
                            >%</span> Porcentaje</MenuItem>
                        </Select>
                      </FormControl> */}
                    </Container>
                  </DialogContent>
                  <DialogActions>
                    <Button 
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      onClick={openModalNColumna ? onClickAgregarColumna : openModalEditarColumna ? abrirModaleditarNomColumna('','',-1) : null}
                      style={{
                        color:'white',
                        backgroundColor:'#FF0023',
                      }}
                    >
                    Cancelar
                    </Button>
                    <Button 
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      onClick={openModalNColumna ? agregarNuevaColumna : openModalEditarColumna ? editarColumna : null}
                      style={{
                        color:'white',
                        backgroundColor:'#28950F',
                      }}
                    >
                    Agregar
                    </Button>
                  </DialogActions>
                </Dialog>
              </Fragment>
              {/* Modal Confirmar Borrar */}
              <Fragment>
                <Dialog
                  open={openConfirmacionBorrar}
                  TransitionComponent={Transition}
                  keepMounted
                  // onClose={handleClose}
                  aria-labelledby="alert-dialog-slide-title-borrar"
                  aria-describedby="alert-dialog-slide-description-borrar"
                >
                  <DialogTitle 
                    id="alert-dialog-slide-title-borrar"
                    className={classes.modalConfirmacion}
                  >
                    <Container
                      flexDirection='row'
                    >
                      <Icon 
                        style={{ 
                          alignSelf: 'center',
                          marginRight: '12px',
                          fontSize: '5vh',
                          color: 'rgb(255, 0, 35)',
                        }}
                      >
                        report
                      </Icon>
                      <Typography className={classes.typography2} variant="h6" gutterBottom>
                        Confirmar...
                      </Typography>
                    </Container>
                  
                  </DialogTitle>
                  <DialogContent style={{ padding: '2px 10px 3px 10px' }}>
                    <DialogContentText 
                      id="alert-dialog-slide-description-borrar"
                      style={{
                        fontSize: '1rem',
                        textAlign: 'center',
                        color: 'black',
                        marginTop: '2vh',
                      }}
                    >
                      ¿Está seguro que desea eliminar el registro seleccionado?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions
                    style={{
                      justifyContent: 'center',
                    }}
                  >
                    <Button 
                      onClick={openModalConfirmaciónBorrar(-1)}
                      color="primary"
                      style={{
                        color:'white',
                        backgroundColor:'#FF0023',
                        marginRight: '3vw',
                      }}
                    >
                    X
                    </Button>
                    <Button 
                      onClick={borrarRegistro}
                      color="primary"
                      style={{
                        color:'white',
                        backgroundColor:'#28950F',
                      }}
                    >
                      ✓
                    </Button>
                  </DialogActions>
                </Dialog>
                  
              </Fragment>
              {/* Modal Observaciones */}
              {/* <Fragment>
                <Dialog
                  open={openModalObservaciones}
                  TransitionComponent={Transition}
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
                        onClick={abrirObservaciones}
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
                    <Container
                      justify='center'
                      className={classes.container}
                      flexDirection='column'
                      style={{ padding:'5px 10px' }}
                    >
                      <Container flexDirection='row' style={{alignItems: 'center'}}>
                        <Typography className={classes.typographyObservaciones} variant="h6" gutterBottom>
                          Línea Base:
                        </Typography>
                        <InputBase
                          id='mo_linea_base'
                          className={classes.textField}
                          value='1'
                          // onChange={onChangeInputBase(index,0)}
                          inputProps={{ 'aria-label': 'bare' }}
                          style={{
                            width:'70%',
                          }}
                        />
                      </Container>
                      <Container flexDirection='row' style={{alignItems: 'center'}}>
                        <Typography className={classes.typographyObservaciones} variant="h6" gutterBottom align='left'>
                          Fecha:
                        </Typography>
                        <InputBase
                          id='mo_fecha'
                          className={classes.textField}
                          value='2019-06-04'
                          // onChange={onChangeInputBase(index,0)}
                          inputProps={{ 'aria-label': 'bare' }}
                          style={{
                            width:'70%',
                            fontSize:'15px',
                          }}
                        />
                      </Container>
                      <Container flexDirection='column'>
                        <Typography variant="h6" gutterBottom className={classes.typographyObservaciones}>
                          Observación:
                        </Typography>
                        <TextField
                          id="standard-multiline-flexible"
                          multiline
                          rowsMax="4"
                          disabled
                          defaultValue='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                          ut labore et dolore magna aliqua.'
                          // onChange={this.handleChange('multiline')}
                          className={classes.observacion}
                          margin="normal"
                        />
                      </Container>
                    </Container>
                  </DialogContent>
                </Dialog>
              </Fragment> */}
              {/* Modal Invitar Amigo */}
              <Fragment>
                <Dialog
                  open={openModalInvitarAmigo}
                  TransitionComponent={Transition}
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
                        swap_horizontal_circle
                      </Icon>
                      <Typography className={classes.typography2} variant="h6" gutterBottom>
                        Invitar Amigo
                      </Typography>
                    </Container>
                  </DialogTitle>
                  <DialogContent
                    style={{ padding:0}}
                  >
                    <Container
                      justify='center'
                      className={classes.container}
                    >
                      <FormControl style={{margin: '1vh 2vw 1vh 1vw',width:'25vw'}}>
                        <InputLabel htmlFor="select_tipo_columna">Seleccione departamento</InputLabel>
                        <Select
                          value={departamentoInvitarAmigo}
                          onChange={cambiarDepartamentoInvitarAmigo}
                          inputProps={{
                            name: 'departamentoInvitarAmigo',
                            id: uniqueId('departamentoInvitarAmigo_'),
                            tabIndex:'1',
                          }}
                          style={{height: '32px'}}
                        >
                          {arrDepartamentosInvitar.map((departamento) => (
                            <MenuItem key={uniqueId(`dep_`)} value={departamento.Id}>{startCase(departamento.Nombre)}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl style={{margin: '1vh 2vw 1vh 1vw',width:'25vw'}}>
                        <AutoCompletable
                          opciones={arrRecursosInvitarAmigo}
                          onChange={onChangeFiltro}
                          label='Nombre del recurso'
                          // indice={1}
                          valor={valorInvitarAmigo}
                          // requerido={false}
                          // arrDepartamentos={arrDepartamentos}
                        />
                      </FormControl>
                     
                    </Container>
                  </DialogContent>
                  <DialogActions>
                    <Button 
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      onClick={abrirModalInvitarAmigo}
                      style={{
                        color:'white',
                        backgroundColor:'#FF0023',
                      }}
                    >
                    Cancelar
                    </Button>
                    <Button 
                      variant="contained"
                      color="secondary"
                      disabled={valorInvitarAmigo === ''}
                      className={classes.button}
                      onClick={asignarInvitarAmigo}
                      style={{
                        color:'white',
                        backgroundColor:'#28950F',
                      }}
                    >
                    Asignar
                    </Button>
                  </DialogActions>
                </Dialog>
              </Fragment>
              <Fragment>
                <AlertaConfirmacion
                  open={openModalSalir}
                  textoContenido='Recuerda guardar antes de salir'
                  onClickCancelar={abrirCerrarConfirmacion('openModalSalir')}
                  onClickAceptar={salirAdministradorActividades(1)}
                />
                <AlertaConfirmacion
                  open={openModalGenerarLB}
                  textoContenido='¿ Está seguro de querer generar la linea base?'
                  onClickCancelar={abrirCerrarConfirmacion('openModalGenerarLB')}
                  onClickAceptar={enviarLineaBase(arregloComponentes.length > 0 ? arregloComponentes[0][0].Configuracion[0].config.valor : '')}
                />
                <AlertaConfirmacion
                  open={openModalCancelarCopia}
                  textoContenido='¿ Está seguro de querer cancelar la copia ?'
                  onClickCancelar={abrirCerrarConfirmacion('openModalCancelarCopia')}
                  onClickAceptar={cancelarCopia}
                />
              </Fragment>
              <Fragment>
                <Modal 
                  open={modalAutorizacion === 1 || modalAutorizacion === 2}
                  typeAlert='Report'
                  typeOptions='Select'
                  title='Confirmar....'
                  message={modalAutorizacion === 1 ? '¿Está seguro que desea autorizar la linea base?' : '¿Está seguro que desea rechazar la linea base?'}
                  onClickAccept={modalAutorizacion === 1 ? autorizarLineaBase(2) : abrirModalObservaciones(true)}
                  onClickCancel={abrirModalAutorizacion(false)}
                />
              </Fragment>
        

              {/* Modal Observaciones  --------------------------------------------------  */}

              <Fragment>
                <Dialog
                  open={modalobservacionesFormulario}
                  TransitionComponent={Transition}
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
                      {/* <IconButton
                        onClick={abrirObservaciones(idProyecto)}
                        style={{
                          fontsize: '17px',
                          padding: '2px',
                        }}
                      >
                        
                      </IconButton> */}
                    </Container>
                  </DialogTitle>
                  <DialogContent
                    style={{ padding:5, width:'30vw'}}
                  >
                    <Container
                      justify='center'
                      className={classes.container}
                      flexDirection='column'
                      style={{ padding:'5px 10px' }}
                    >
                      <Container flexDirection='column'>
                        <Typography variant="h6" gutterBottom className={classes.typographyObservaciones}>
                          Capture observaciones del motivo de rechazo
                        </Typography>
                        <TextField
                          id="standard-multiline-flexible"
                          multiline
                          rows="6"
                          rowsMax="4"
                          variant="outlined"
                          fullWidth
                          onChange={setObservacion}
                          margin="normal"
                          value={observacion}
                        />
                        <Grid item xs={12} sm={12} md={12}>
                          <Grid container> 
                            <Grid item xs={6} sm={6} md={6}></Grid>
                            <Grid item xs={2} sm={2} md={2}>
                              <BotonCancelar
                                label="CERRAR" 
                                onClick={abrirModalAutorizacion(false)}
                              >
                             Cerrar
                              </BotonCancelar>
                            </Grid>
                            <Grid item xs={1} sm={1} md={1}></Grid>
                            <Grid item xs={2} sm={2} md={2} >
                              <BotonSucces
                                onClick={guadarObservaciones(observacion)}
                                label="GUARDAR">
                              </BotonSucces>
                            </Grid>
                            <Grid item xs={1} sm={1} md={1}></Grid>
                          </Grid>
                        </Grid>
                      </Container>
                    </Container>
                  </DialogContent>
                </Dialog>
              </Fragment>
            </Container>
          </Container>
        </Grid>
        
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
              // className={classes.dialogTitle}
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
            {observaciones  !== undefined  ?
              observaciones !== undefined && (
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
                        <Typography style={{whiteSpace: 'nowrap', fontWeight:'bold'}} >
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
                        <Typography style={{whiteSpace: 'nowrap', fontWeight:'bold'}}>
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
                        <Typography style={{whiteSpace: 'nowrap', fontWeight:'bold'}}>
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
              )
              : null}
          </Dialog>
        </Fragment>
      </Grid>

      
    );
  }
}

LineaBase.propTypes = {};
const withSaga = injectSaga({ key: 'planDeTrabajo', saga,mode: DAEMON });

export default compose(
  withStyles(styles),
  withSaga,
  connect(
    /* mapStateToProps */
    null,
    /* mapDispatchToProps */
    (dispatch) => ({
      dispatch,
      getArreglo: () => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/OBTENER_ARREGLO_COMPONENTES_LINEA_BASE_ACTION',
        })
      },
      obtenerCatalogos: () => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/OBTENER_CATALOGOS_RECURSO_ACTION',
        })
      },
      agregarRegistro: () => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/LB_AGREGAR_REGISTRO_NUEVO_ACTION',
        })
      },
      borrarRegistro: () => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/LB_BORRAR_REGISTRO_NUEVO_ACTION',
        })
      },
      onChangeInputBase: (row,cell) => event => {
        const val = event.target.value;
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/LB_CAMBIAR_VALOR_INPUTBASE_ACTION',
          row,
          cell,
          val,
        })
      },
      onChangeFechas: (row,cell) => event => {
        const val = event.target.value;
        
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/LB_CAMBIAR_VALOR_FECHAS_ACTION',
          row,
          cell,
          val,
        })
      },
      onDragEnd:(result) => {
        if(result.destination){
          dispatch({
            type: 'APP/CONTAINER/PLANDETRABAJO/LB_ON_DRAG_END_ACTION',
            result,
          })
        }
      },
      handleClickOpenModal:(row,cell) => () => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/LB_ON_CHANGE_OPEN_MODAL_ACTION',
          row,
          cell,
        })
      },
      asignarRecurso: ()=> {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/LB_ASIGNAR_RECURSO_ACTION',
        })
      },
      onChangeSwitchAsignar: event => {
        const {
          checked,
        } = event.target;
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/LB_ASIGNARME_RECURSO_ACTION',
          checked,
        })
      },
      onClickAgregarColumna: () => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/LB_OPEN_MODAL_NUEVA_COLUMNA_ACTION',
        })
      },
      modalConfirmación:(nomModal,index) => () =>{
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/LB_OPEN_MODAL_CONFIRMACION_ACTION',
          nomModal,
          index,
        })
      },
      openModalConfirmaciónBorrar: (index) => () =>{
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/LB_OPEN_MODAL_CONFIRMACION_BORRAR_ACTION',
          index,
        })
      },
      onSelectRow: (rowSelected) => () =>{
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/LB_ON_SELECT_ROW_ACTION',
          rowSelected,
        })
      },
      bajarNodo: () => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/LB_ON_CLICK_BAJAR_NODO_ACTION',
        })
      },
      subirNodo:()=>{
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/LB_ON_CLICK_SUBIR_NODO_ACTION',
        })
      },
      salirAdministradorActividades: (stepper) => () => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/SALIR_ADMINISTRADOR_ACTIVIDADES_ACTION',
          stepper,
        })
      },
      filtrarRecurso:(event) =>{
        const{
          name,
          value,
        } = event.target;

        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/FILTRAR_RECURSO_ACTION',
          name,
          value,
        })
        
      },
      cambiarValor: (event) =>{
        const{
          name,
          value,
        } = event.target;

        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/CAMBIAR_VALOR_ACTION',
          name,
          value,
        })
      },
      cambiarValorRecurso : (event) => {
        const{
          name,
          value,
        } = event.target;
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/CAMBIAR_VALOR_RECURSO_ACTION',
          name,
          value,
        })
      },
      agregarNuevaColumna: () => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/AGREGAR_NUEVA_COLUMNA_ACTION',
        })
      },
      abrirMenuTabla: (event) => {
        const anchorEl = event.currrentTarget;
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/ABRIR_MENU_TABLA_ACTION',
          anchorEl,
        })
      },
      abrirModaleditarNomColumna: (valor,tipo,idxCabeceras) => () => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/ABRIR_MODAL_EDITAR_COLUMNA_ACTION',
          idxCabeceras,
          valor,
          tipo,
        })
      },
      editarColumna: () => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/EDITAR_COLUMNA_ACTION',          
        })
      },
      abrirObservaciones:(idProyecto) => () => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/OBTENER_OBSERVACIONES',  
          idProyecto,        
        })
        
      },
      onChangeInputBaseExtra: (idxRow,idxCell) => (event) => {
        const {
          value,
        } = event.target;
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/CAMBIAR_INPUT_EXTRA_ACTION',
          idxRow,
          idxCell,
          value,
        })
      },
      abrirModalInvitarAmigo: () => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/ABRIR_INVITAR_AMIGO_ACTION',          
        })
      },
      guardarLineaBase: () => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/GUARDAR_LINEABASE_ACTION',          
        })
      },
      cambiarDepartamentoInvitarAmigo: (event) => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/CAMBIAR_DEPARTAMENTO_INVITAR_AMIGO_ACTION',          
          Departamento: event.target.value,
        })
      },
      enviarLineaBase: (nombreProyecto) =>() => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/ENVIAR_LINEA_BASE_ACTION',
          nombreProyecto,
        })
      },
      onClickGenerarLineaBase: () => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/GENERAR_LINEA_BASE',
        })
      },

      abrirModalAutorizacion: (event) => () => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/ABRIR_AUTORIZACION_MODAL',
          event,
        })
      },

      autorizarLineaBase: (event) => () => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/AUTORIZAR_LINEA_BASE',
          event,
        })
      },
      rechazarLineaBase: (event) => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/AUTORIZAR_LINEA_BASE',
          event,
        })
      },

      onChangeFiltro: (event) =>{
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/CAMBIAR_VALOR_INVITADO_ACTION',
          value :event,
        })
      },
      asignarInvitarAmigo: () => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/ASIGNAR_INVITAR_AMIGO_ACTION',
        })
      },
      agregarColumnaComponente:(nomCampo,posicion) => () =>{
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/AGREGAR_COLUMNA_CAMPO_ACTION',
          nomCampo,
          posicion,
        })
      },
      agregarColumnaEtapa:(nomCampo,posicion) => () =>{
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/AGREGAR_COLUMNA_ETAPA_CAMPO_ACTION',
          nomCampo,
          posicion,
        })
      },
      abrirCerrarConfirmacion:(nombreConfirmacion) => () => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/ABRIR_CERRAR_CONFIRMACION_ACTION',
          nombreConfirmacion,
        })
      },
      setObservacion: (event) =>{
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/SET_INPUT_OBSERVACION',
          event : event.target.value,
        })
      },

      guadarObservaciones: (observacion) => () => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/GUARDAR_OBSERVACIONES',
          observacion,
        })
      },

      abrirModalObservaciones: (event) => () => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/OPEN_MODAL_OBSERVACIONES_FORM',
          event,
        })
      },
      editarLineaBase: () => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/EDITAR_LINEABASE_ACTION',
        })
      },
      cambiarLineaBase: (event) => {
        const {
          value,
        } = event.target;
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/CAMBIAR_LINEABASE_ACTION',
          value,
        })
      },
      cancelarCopia: () => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/CANCELAR_COPIA_LINEABASE_ACTION',
        })
      },
      setRegistroSeleccionado: () => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/SET_REGISTRO_SELECCIONADO_LINEABASE_ACTION',
        })
      },
      obtenerTicket: (IdTicket) => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/OBTENER_TICKET',
          IdTicket,
        })
      },
    })
  ))(LineaBase);
