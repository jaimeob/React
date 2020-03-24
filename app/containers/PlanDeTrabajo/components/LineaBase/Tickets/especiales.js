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
import { withStyles,MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import '@zendeskgarden/react-tables/dist/styles.css';
import {
  startCase,
  uniqueId,
  isArray,
} from 'lodash';
// import { ThemeProvider } from '@zendeskgarden/react-theming';
import {
  Table,
  // Caption,
  Head,
  HeaderRow,
  HeaderCell,
  Body,
  Row,
  Cell,
  GroupRow,
} from '@zendeskgarden/react-tables';

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
  MenuList,
  
} 
  from '@material-ui/core';

import grey from '@material-ui/core/colors/grey'
import styled from 'styled-components'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ThemeProvider } from 'react-bootstrap';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
// import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Drawer from '@material-ui/core/Drawer';
// import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { Container } from '../../../ConfiguracionTicket/styledComponents';
import TipoComponente from "../TipoComponente/index";
import './style.css';
import Bandeja from './Tickets/BandejaTickets'
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
    },
    padding: '0px 13px 0px 13px',
    marginTop: '0px',
    marginBottom: '0px',
    width:'100%',
  },
  button:{
    color:'green',
    margin: '1vh 1vh',
  },
  btnRecurso:{
    fontSize:'11px',
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
  },
  modalConfirmacion:{
    backgroundColor: '#ff00234d',
    height: '9vh',
    padding: '2.3vh 1vw 2vh 1vw',
  },
  dialogContent:{
    padding:0,
  },
  drawerSide:{
    top: '47px',
    width: '57%',
  },
  // list: {
  //   height: '650px',
  // },
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

class LineaBase extends React.Component {

  componentDidMount(){
    const{
      getArreglo,
      obtenerCatalogos,
    } = this.props;
    getArreglo();
    obtenerCatalogos();
  }

  state = {
    anchorEl: null,
    top: false,
    left: false,
    bottom: false,
    right: false,
    openDrawer: false,
  };

  render() {

    const {
      classes,
      propsLineaBase:{
        lineaBase:{
          arregloComponentes,
          arrPlazas,
          arrDepartamentos,
          arrPuestos,
          arrRecursos,
          cabeceras,
          arrCabecerasExtras,
          fechaValida,
          fecInicio,
          fecFin,
          fecInput,
          selectRecurso,
          openModal,
          autoAsignarmelo,
          openModalNColumna,
          openConfirmacionBorrar,
          plazaSeleccionadaRecurso,
          departamentoSeleccionadoRecurso,
          puestoSeleccionadoRecurso,
          recursoSeleccionadoRecurso,
          tipoDatoNColumna,
          nombreNColumna,
          tamanioTabla,
          // openMenuTabla,
          anchorElSeleccionado,
          bandejaTickets,
        },
      },
      agregarRegistro,
      borrarRegistro,
      onChangeInputBase,
      onChangeFechas,
      onDragEnd,
      cambiarStepper,
      filtrarRecurso,
      cambiarValor,
      agregarNuevaColumna,
      abrirMenuTabla,

      handleClickOpenModal,
      asignarRecurso,
      onChangeSwitchAsignar,
      onClickAgregarColumna,
      modalConfirmación,
      openModalConfirmaciónBorrar,
      onclickAceptarConfirmacion,
      onSelectRow,
      bajarNodo,
      subirNodo,
      onClickGenerarLineaBase,
    } = this.props;
    
    const { anchorEl } = this.state;
    const openMenu = Boolean(anchorEl);
    const tableWidth = tamanioTabla;
    const Link1 = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);


    const toggleDrawer = (side, open) => event => {
      if ( event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
        return;
      }
      // eslint-disable-next-line react/no-access-state-in-setstate
      this.setState({ ...this.state, [side]: open });
    };
    // className={classes.list}
    // onClick={toggleDrawer(side, false)}
    const sideList = side => (
      <div  >
          
        <Bandeja  
          bandejaTickets = {bandejaTickets}/>
      </div>
    );
  
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
                  onClick={cambiarStepper(1)}
                >
                  <Icon
                    style={{
                      fontSize:'29px',
                      color:'black',
                    }}
                  >
                    keyboard_backspace
                  </Icon>
                </IconButton>
                <Typography variant="h6" gutterBottom color="primary" style={{textTransform: 'inherit', margin: 0,fontWeight: 'normal',color:'black'}}> 
                  Administrador de actividades
                </Typography>
                <InputBase
                  id={uniqueId('nomProyecto_')}
                  className={classes.textField}
                  // startAdornment={item.Padre ? <Icon style={{fontSize:'17px'}}>arrow_right</Icon> : null}
                  value='Nombre del Proyecto'
                  style={{
                    width:'auto',
                    fontSize: '3vh',
                    color:'black',
                  }}
                  // onChange={onChangeInputBase(index,0)}
                  inputProps={{ 'aria-label': 'bare' }}
                />
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
                  <Button color="primary" className={classes.button} onClick={agregarRegistro}>
                    + Agregar
                  </Button>

                  <IconButton
                    onClick={bajarNodo}
                  >
                    <Icon>
                    format_indent_increase
                    </Icon>
                  </IconButton>
                  <IconButton
                    onClick={subirNodo}
                  >
                    <Icon>
                    format_indent_decrease
                    </Icon>
                  </IconButton>
                  <IconButton>
                    <Icon>
                      textsms
                    </Icon>
                  </IconButton>
                  <Fragment>
                    <IconButton
                      aria-label="More"
                      aria-owns={openMenu ? 'long-menu' : undefined}
                      aria-haspopup="true"
                      onClick={this.handleClick}
                    >
                      <Icon>
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
                        // onClick={this.handleClose}
                      >
                        <Icon style={{ marginRight:'5px'}}>person_add</Icon>
                        Invitar Amigo
                      </MenuItem>
                      <MenuItem
                        key='Generar Linea Base'
                        onClick={onClickGenerarLineaBase}
                      >
                        <Icon style={{ marginRight:'5px'}}>linear_scale</Icon>
                        Generar Linea Base
                      </MenuItem>
                      <MenuItem
                        key='Editar Linea Base'
                        // onClick={this.handleClose}
                      >
                        <Icon style={{ marginRight:'5px'}}>edit</Icon>
                        Editar Linea Base
                      </MenuItem>
                      <MenuItem
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
                          
                          {/* <HeaderCell width="18%" className={classes.cell}>% De Avance</HeaderCell>
                          <HeaderCell width="18%" className={classes.cell}>Dependencia</HeaderCell> */}
                          {arrCabecerasExtras.map((cab) => (
                            <HeaderCell
                              className={classes.cell}
                              width="10vw"
                            >
                              {cab.Nombre}
                            </HeaderCell>
                          ))}
                          <HeaderCell minimum className={classes.cell} style={{ width:'2.1vw',borderRight:'1px solid gainsboro'}}/>
                        </HeaderRow>
                      </Head>
                      <Droppable droppableId="droppable">
                        {(provided, droppableSnapshot) => (
                          <Body 
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
                              <Draggable key={`${item.Configuracion[0].config.nomCampo}-${index}`} draggableId={`${item.Configuracion[0].config.nomCampo}-${index}`} index={index}>
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
                                        disabled={index === 0}
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
                                      className={classes.row} 
                                    >
                                      <InputBase
                                        id={uniqueId('input_base_')}
                                        className={classes.textField}
                                        startAdornment={item.Padre ? <Icon style={{fontSize:'17px'}}>arrow_right</Icon> : null}
                                        value={item.Configuracion[0].config.valor}
                                        onChange={onChangeInputBase(index,0)}
                                        row={index}
                                        cell={0}
                                        style={{
                                          fontSize: item.Padre ? '12px' : '11px',
                                          fontWeight: item.Padre ? 'bold': null,
                                          paddingLeft: item.NumOrdenamiento === 1 ? 0 : item.NumOrdenamiento * 12,
                                        }}
                                        inputProps={{ 'aria-label': 'bare' }}
                                      />

                                      
                                      {/* <button onClick={this.toggleDrawer.bind(this)}> Toggle Drawer</button> */}
                                      {/* <ClickAwayListener onClickAway={this.handleDrawerClose}>
                                      <Drawer width={this.state.width} //<- Update
                                        open={this.state.openDrawer}
                                        containerClassName="drawer-side-drawer"
                                        openSecondary={false}
                                        docked={false} 
                                      >
                                        <div className="drawer-title-div">
                                          <h4 className="drawer-title-text">It's my drawer</h4>
                                        </div>
                                      </Drawer>   
                                      </ClickAwayListener> */}
                                     
                                      <Link component="button" onClick={toggleDrawer("right", true)} variant="inherit">Detalles</Link>
                       
                                      <Drawer
                                        anchor="right"
                                        open={this.state.right}
                                        onClose={toggleDrawer("right", false)}
                                        onOpen={toggleDrawer("right", true)}
                                        // className={classes.drawerSide}
                                        docked = {false}
                                        className={classes.list}
                                        
                                        variant="persistent"
                                        containerStyle={{height: '100px', width: 3000}}
                                      >
                                        <div className="ticketsSide">
                                          {sideList("right")}
                                        </div>
                                        
                                      
                                      </Drawer>
                                      
                                      {/* <Button onClick={toggleDrawer("right", true)}>Detalles</Button> */}
                                      
                                      {/* <Link component={Link1}  to="/">
                                        Detalles
                                      </Link> */}
                                    </DraggableCell>
                                      

                                    <DraggableCell 
                                      isDragging={snapshot.isDragging} 
                                      width='17vw'
                                      className={classes.row}>
                                      <TipoComponente
                                        tipo={7}
                                        padre={item.Padre}
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
                                        padre={item.Padre}
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
                                        className={classes.btnRecurso}
                                        onClick={handleClickOpenModal(index,3)}
                                      >
                                        {item.Recurso === null ? '' : item.Recurso}
                                      </Button>
                                    </DraggableCell>
                                    <DraggableCell 
                                      isDragging={snapshot.isDragging} 
                                      width="7vw" 
                                      className={classes.row}
                                    >
                                      <TipoComponente
                                        tipo={8}
                                        valor={item.Recurso}
                                        row={index}
                                        cell={3}
                                        style={{
                                          textAlign:'center',
                                        }}
                                      />
                                    </DraggableCell>
                                    <DraggableCell 
                                      isDragging={snapshot.isDragging} 
                                      width="9vw" 
                                      className={classes.row}
                                    >
                                      <TipoComponente
                                        tipo={1}
                                        valor={item.Dependencia}
                                        row={index}
                                        cell={3}
                                        style={{
                                          textAlign:'center',
                                        }}
                                      />

                                    </DraggableCell>
                                    {arrCabecerasExtras.map((celda) =>(
                                      <DraggableCell 
                                        isDragging={snapshot.isDragging}
                                        width='10vw'
                                        className={classes.row} 
                                      >
                                        <InputBase
                                          id={uniqueId('input_base_')}
                                          className={classes.textField}
                                          // startAdornment={item.Padre ? <Icon style={{fontSize:'17px'}}>arrow_right</Icon> : null}
                                          value=''
                                          // onChange={onChangeInputBase(index,0)}
                                          // row={index}
                                          // cell={0}
                                          // style={{
                                          //   fontSize: item.Padre ? '12px' : '11px',
                                          //   fontWeight: item.Padre ? 'bold': null,
                                          //   paddingLeft: item.NumOrdenamiento === 1 ? 0 : item.NumOrdenamiento * 12,
                                          // }}
                                          inputProps={{ 'aria-label': 'bare' }}
                                        />
                                      </DraggableCell>
                                      // <DraggableCell
                                      //   className={classes.row}
                                      //   width="18%"
                                      // >
                                      //   {arregloComponentes[index].val}
                                      // </DraggableCell>
                                    ))}
                                    <DraggableCell isDragging={snapshot.isDragging} minimum className={classes.row}>
                                      <Icon
                                        // onClick={borrarRegistro(index)}
                                        onClick={openModalConfirmaciónBorrar(index)}
                                      >
                                          delete
                                      </Icon>
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
                  }}>
                  <Button variant="contained" color="secondary" className={classes.button} style={{color:'white',backgroundColor:'#FF0023'}}>
                    Cerrar
                  </Button>
                  <Button variant="contained" color="secondary" className={classes.button} style={{color:'white',backgroundColor:'#28950F'}}>
                    Guardar
                  </Button>
                  <Button onClick={onClickGenerarLineaBase}  variant="contained" color="secondary" className={classes.button} style={{color:'white',backgroundColor:'#F9AA33'}}>
                    Enviar
                  </Button>
                    
                </Container>
              </Paper>
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
                          disabled={autoAsignarmelo}
                          inputProps={{
                            name: 'plazaSeleccionadaRecurso',
                            id: uniqueId('select_plaza_'),
                          }}
                          onChange={filtrarRecurso}
                          input={<Input id="select_plaza" />}
                        >
                          <MenuItem value={0}>
                            <em>Sin Seleccionar</em>
                          </MenuItem>
                          {arrPlazas.map((plaza) => (
                            <MenuItem
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
                          disabled={autoAsignarmelo}
                          inputProps={{
                            name: 'departamentoSeleccionadoRecurso',
                            id: uniqueId('select_departamento_'),
                          }}
                          onChange={filtrarRecurso}
                          input={<Input id="select_departamento" />}
                        >
                          <MenuItem value={0}>
                            <em>Sin Seleccionar</em>
                          </MenuItem>
                          {arrDepartamentos.map((departamento) => (
                            <MenuItem
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
                          disabled={autoAsignarmelo}
                          inputProps={{
                            name: 'puestoSeleccionadoRecurso',
                            id: uniqueId('select_puesto_'),
                          }}
                          onChange={filtrarRecurso}
                          input={<Input id="select_puesto" />}
                        >
                          <MenuItem value={0}>
                            <em>Sin Seleccionar</em>
                          </MenuItem>
                          {arrPuestos.map((puesto) => (
                            <MenuItem
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
                          disabled={autoAsignarmelo}
                          inputProps={{
                            name: 'recursoSeleccionadoRecurso',
                            id: uniqueId('select_recurso_'),
                          }}
                          onChange={cambiarValor}
                          input={<Input id="select_recurso" />}
                        >
                          <MenuItem value={0}>
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
                      disabled={recursoSeleccionadoRecurso === 0 && !autoAsignarmelo}
                      className={classes.button}
                      onClick={asignarRecurso}
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
                <Dialog
                  open={openModalNColumna}
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
                        Nueva Columna
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
                          // className={classes.textField}
                          style={{
                            margin:0,
                          }}
                          inputProps={{
                            name: 'nombreNColumna',
                            id: uniqueId('nombreNColumna_'),
                          }}
                          value={nombreNColumna}
                          onChange={cambiarValor}
                          margin="normal"
                        />
                      </FormControl>
                      <FormControl style={{margin: '1vh 2vw 1vh 1vw',minWidth: '14vw'}}>
                        <InputLabel htmlFor="select_tipo_columna">Seleccione tipo de dato</InputLabel>
                        <Select
                          value={tipoDatoNColumna}
                          onChange={cambiarValor}
                          inputProps={{
                            name: 'tipoDatoNColumna',
                            id: uniqueId('tipoDatoNColumna_'),
                          }}
                          style={{height: '32px'}}
                        >
                          <MenuItem value={1}><Container style={{alignItems: 'center'}}><Icon style={{marginRight: '4px'}}>text_format</Icon><span>Texto</span></Container></MenuItem>
                          <MenuItem value={2}><Container style={{alignItems: 'center'}}><Icon style={{marginRight: '4px'}}>view_module</Icon><span>Cantidad</span> </Container></MenuItem>
                          <MenuItem value={3}><Container style={{alignItems: 'center'}}><Icon style={{marginRight: '4px'}}>date_range</Icon><span>Fecha</span></Container></MenuItem>
                          <MenuItem value={4}><Container style={{alignItems: 'center'}}><Icon style={{marginRight: '4px'}}>attach_money</Icon><span>Costo</span></Container></MenuItem>
                          <MenuItem value={5}>
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
                      </FormControl>
                    </Container>
                  </DialogContent>
                  <DialogActions>
                    <Button 
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      onClick={onClickAgregarColumna}
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
                      onClick={agregarNuevaColumna}
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
                          alignSelf:'center',
                          marginRight:'12px',
                          fontSize: '5vh',
                          color:'#ff00234d',
                        }}
                      >
                        report
                      </Icon>
                      <Typography className={classes.typography2} variant="h6" gutterBottom>
                        Confirmar...
                      </Typography>
                    </Container>
                  
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText 
                      id="alert-dialog-slide-description-borrar"
                      style={{
                        fontSize: '3vh',
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
            </Container>
          </Container>
        </Grid>
      </Grid>
    );
  }
}

LineaBase.propTypes = {};

export default compose(
  withStyles(styles),
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
      cambiarStepper: (data) => () => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/CAMBIAR_STEPPER_ACTION',
          data,
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
      // onClickGenerarLineaBase: () => {
      //   dispatch({
      //     type: 'APP/CONTAINER/PLANDETRABAJO/LB_OPEN_MODAL_NUEVA_COLUMNA_ACTION',
      //   })
      // },

      onClickGenerarLineaBase: () => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/GENERAR_LINEA_BASE',
        })
      },


      // onclickAceptarConfirmacion: (tipo) => () => {

      //   switch (tipo) {
      //     case 'openConfirmacionBorrar':
      //       dispatch({
      //         type: 'APP/CONTAINER/PLANDETRABAJO/LB_BORRAR_REGISTRO_NUEVO_ACTION',
      //       })
      //       break;
        
      //     default:
      //       break;
      //   }
      // },

    })
  ))(LineaBase);
